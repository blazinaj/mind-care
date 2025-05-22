import React from 'react';
import { CheckCircle, Clock } from 'lucide-react';
import Card from '../Card';
import Button from '../Button';

type WorkflowStep = {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
};

type AssessmentDetailsProps = {
  assessmentId: string;
  workflowStatus: string;
  onClose: () => void;
};

const AssessmentDetails: React.FC<AssessmentDetailsProps> = ({
  workflowStatus,
  onClose
}) => {
  const getStepStatus = (stepId: string): 'completed' | 'current' | 'upcoming' => {
    const steps = ['assessment_completed', 'provider_matching', 'provider_matched', 'appointment_scheduled', 'treatment_started'];
    const currentIndex = steps.indexOf(workflowStatus);
    const stepIndex = steps.indexOf(stepId);
    
    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  const workflowSteps: WorkflowStep[] = [
    {
      id: 'assessment_completed',
      title: 'Assessment Completed',
      description: 'Your responses are being reviewed by our team',
      status: getStepStatus('assessment_completed')
    },
    {
      id: 'provider_matching',
      title: 'Provider Matching',
      description: "We're finding the right provider for your needs",
      status: getStepStatus('provider_matching')
    },
    {
      id: 'provider_matched',
      title: 'Provider Matched',
      description: 'A provider has been selected for you',
      status: getStepStatus('provider_matched')
    },
    {
      id: 'appointment_scheduled',
      title: 'Appointment Scheduled',
      description: 'Your first appointment has been booked',
      status: getStepStatus('appointment_scheduled')
    },
    {
      id: 'treatment_started',
      title: 'Treatment Started',
      description: 'Your treatment journey has begun',
      status: getStepStatus('treatment_started')
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Treatment Progress</h2>
          <Button variant="outline" onClick={onClose}>Close</Button>
        </div>

        <div className="space-y-8">
          {workflowSteps.map((step, index) => (
            <div key={step.id} className="relative">
              {index !== workflowSteps.length - 1 && (
                <div 
                  className={`absolute left-[27px] top-12 w-0.5 h-16 
                    ${step.status === 'upcoming' ? 'bg-gray-200' : 'bg-blue-200'}`
                  }
                />
              )}
              
              <div className="flex items-start">
                <div className={`
                  w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0
                  ${step.status === 'completed' ? 'bg-green-100' : 
                    step.status === 'current' ? 'bg-blue-100' : 'bg-gray-100'}
                `}>
                  {step.status === 'completed' ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <Clock className={`w-6 h-6 ${
                      step.status === 'current' ? 'text-blue-600' : 'text-gray-400'
                    }`} />
                  )}
                </div>
                
                <div className="ml-4">
                  <h3 className={`text-lg font-semibold ${
                    step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-900'
                  }`}>
                    {step.title}
                  </h3>
                  <p className={`${
                    step.status === 'upcoming' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {step.description}
                  </p>
                  
                  {step.status === 'current' && (
                    <div className="mt-3">
                      <div className="animate-pulse flex space-x-2 items-center text-blue-600">
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <div className="w-2 h-2 bg-blue-600 rounded-full" />
                        <span className="ml-1 text-sm">In Progress</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default AssessmentDetails;