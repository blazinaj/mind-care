import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Button from '../Button';
import Card from '../Card';
import { questions } from './questions';
import ProgressBar from './ProgressBar';
import { supabase } from '../../lib/supabase'; 
import ProviderMatching from './ProviderMatching';

type Answer = {
  questionId: number;
  value: number;
};

type AuthFormData = {
  email: string;
  password: string;
};

type AssessmentFormProps = {
  onComplete?: () => void;
};

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showAuth, setShowAuth] = useState(false);
  const [authData, setAuthData] = useState<AuthFormData>({ email: '', password: '' });
  const [showMatching, setShowMatching] = useState(false);

  const currentQuestion = questions[currentStep];
  const progress = (currentStep / questions.length) * 100;

  const handleAnswer = (value: number) => {
    setAnswers(prev => {
      const existing = prev.findIndex(a => a.questionId === currentQuestion.id);
      if (existing !== -1) {
        const newAnswers = [...prev];
        newAnswers[existing] = { questionId: currentQuestion.id, value };
        return newAnswers;
      }
      return [...prev, { questionId: currentQuestion.id, value }];
    });
  };

  const getCurrentAnswer = () => {
    return answers.find(a => a.questionId === currentQuestion.id)?.value || 0;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setShowMatching(true);
      setError(null);
      
      // Wait for provider matching animation
      setTimeout(async () => {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (!user) {
          setShowAuth(true);
          return;
        }

        // Insert the assessment with the user_id
        const { error: insertError } = await supabase
          .from('assessments')
          .insert([
            {
              answers: answers,
              status: 'submitted',
              workflow_status: 'assessment_completed',
              user_id: user.id
            }
          ]);

        if (insertError) throw insertError;

        setIsComplete(true);
        onComplete?.();
      }, 10000); // Wait for provider matching animation to complete
    } catch (err) {
      setError('An error occurred while submitting your assessment.');
      console.error('Assessment submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsComplete(false);
    setError(null);
  };

  if (showMatching && !showAuth && !isComplete) {
    return <ProviderMatching />;
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const { error } = await supabase.auth.signUp({
        email: authData.email,
        password: authData.password,
      });

      if (error) throw error;
      
      // After successful signup, submit the assessment
      await handleSubmit();
    } catch (err) {
      setError('Failed to create account. Please try again.');
      console.error('Signup error:', err);
    }
  };

  if (showAuth) {
    return (
      <div className="max-w-md mx-auto px-4">
        <Card>
          <form onSubmit={handleSignUp} className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Create Account to Save Your Assessment
            </h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={authData.email}
                onChange={(e) => setAuthData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                minLength={6}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                value={authData.password}
                onChange={(e) => setAuthData(prev => ({ ...prev, password: e.target.value }))}
              />
            </div>
            {error && (
              <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm">
                {error}
              </div>
            )}
            <div className="flex justify-between items-center pt-4">
              <Button
                variant="outline"
                onClick={() => setShowAuth(false)}
                type="button"
              >
                Back
              </Button>
              <Button type="submit">
                Create Account
              </Button>
            </div>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <ProgressBar progress={progress} />
      
      <Card className="mt-8">
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900">
              {currentQuestion.text}
            </h3>
            <p className="text-gray-600 text-sm">
              {currentQuestion.description}
            </p>
          </div>

          <div className="space-y-3">
            {[0, 1, 2, 3, 4].map((value) => (
              <button
                key={value}
                onClick={() => handleAnswer(value)}
                className={`w-full p-4 text-left rounded-lg transition-all ${
                  getCurrentAnswer() === value
                    ? 'bg-blue-50 border-2 border-blue-600'
                    : 'border-2 border-gray-200 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                    getCurrentAnswer() === value
                      ? 'border-blue-600 bg-blue-600 text-white'
                      : 'border-gray-300'
                  }`}>
                    {getCurrentAnswer() === value && '✓'}
                  </div>
                  <span className="text-gray-900">{currentQuestion.options[value]}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between pt-6">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center"
            >
              <ArrowLeft size={16} className="mr-2" />
              Previous
            </Button>
            
            {currentStep === questions.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={answers.length !== questions.length || isSubmitting}
                className="flex items-center"
              >
                {isSubmitting ? 'Submitting...' : 'Submit'}
                <ArrowRight size={16} className="ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!answers.find(a => a.questionId === currentQuestion.id)}
                className="flex items-center"
              >
                Next
                <ArrowRight size={16} className="ml-2" />
              </Button>
            )}
          </div>
        </div>
        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-600 rounded-lg">
            {error}
          </div>
        )}
      </Card>
    </div>
  );
};