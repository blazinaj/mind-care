import React, { useState, useEffect } from 'react';
import Card from '../Card';
import { MapPin, UserCheck, Star, Calendar, CheckCircle } from 'lucide-react';

type MatchingStep = {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  duration: number;
};

const ProviderMatching: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const steps: MatchingStep[] = [
    {
      id: 'location',
      icon: <MapPin className="w-6 h-6" />,
      title: 'Matching Location',
      description: 'Finding providers in your area',
      duration: 2000
    },
    {
      id: 'specialties',
      icon: <UserCheck className="w-6 h-6" />,
      title: 'Matching Specialties',
      description: 'Identifying providers with relevant expertise',
      duration: 3000
    },
    {
      id: 'ratings',
      icon: <Star className="w-6 h-6" />,
      title: 'Finding Highest Ratings',
      description: 'Selecting top-rated providers',
      duration: 2500
    },
    {
      id: 'availability',
      icon: <Calendar className="w-6 h-6" />,
      title: 'Checking Availability',
      description: 'Finding earliest appointment slots',
      duration: 2000
    }
  ];

  useEffect(() => {
    if (currentStepIndex < steps.length) {
      const timer = setTimeout(() => {
        setCurrentStepIndex(prev => prev + 1);
      }, steps[currentStepIndex].duration);

      return () => clearTimeout(timer);
    } else {
      setIsComplete(true);
    }
  }, [currentStepIndex]);

  return (
    <div className="max-w-2xl mx-auto px-4">
      <Card className="text-center py-8">
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Finding Your Perfect Provider Match
          </h2>

          <div className="space-y-6">
            {steps.map((step, index) => {
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;

              return (
                <div key={step.id} className="relative">
                  {index !== steps.length - 1 && (
                    <div 
                      className={`absolute left-[27px] top-12 w-0.5 h-16 
                        ${isCompleted ? 'bg-green-200' : 'bg-gray-200'}`
                      }
                    />
                  )}
                  
                  <div className="flex items-start">
                    <div className={`
                      w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0
                      ${isCompleted ? 'bg-green-100 text-green-600' : 
                        isActive ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-400'}
                    `}>
                      {isCompleted ? <CheckCircle className="w-6 h-6" /> : step.icon}
                    </div>
                    
                    <div className="ml-4 text-left">
                      <h3 className={`text-lg font-semibold ${
                        isCompleted ? 'text-green-600' :
                        isActive ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`${
                        isCompleted ? 'text-green-600' :
                        isActive ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {step.description}
                      </p>
                      
                      {isActive && (
                        <div className="mt-2">
                          <div className="animate-pulse flex space-x-2 items-center text-blue-600">
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            <div className="w-2 h-2 bg-blue-600 rounded-full" />
                            <span className="ml-1 text-sm">Processing</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {isComplete && (
            <div className="mt-8 text-green-600">
              <CheckCircle className="w-12 h-12 mx-auto mb-4" />
              <p className="text-lg font-semibold">Provider Match Complete!</p>
              <p className="text-sm mt-2">You'll receive an email shortly with your matched provider details.</p>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default ProviderMatching;