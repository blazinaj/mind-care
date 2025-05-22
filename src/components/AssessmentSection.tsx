import React, { useState } from 'react';
import Card from './Card';
import Button from './Button';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { AssessmentForm } from './assessment/AssessmentForm';

type AssessmentSectionProps = {
  onAssessmentComplete?: () => void;
};

const AssessmentSection: React.FC<AssessmentSectionProps> = ({ onAssessmentComplete }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showAssessment, setShowAssessment] = useState(false);

  return (
    <section id="assessment" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        {!showAssessment ? (
          <>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Ready to Get Started?</h2>
              <p className="text-lg text-gray-600">
                Take the first step toward better mental health with our comprehensive assessment.
              </p>
            </div>

            <Card 
              className={`max-w-4xl mx-auto transition-transform duration-500 ${
                isHovered ? 'transform scale-[1.02]' : ''
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 mb-6 md:mb-0 md:pr-8">
                  <h3 className="text-2xl font-semibold mb-4 text-blue-600">Start Your Assessment</h3>
                  <p className="text-gray-600 mb-6">
                    Our assessment is designed by mental health experts to understand your unique situation. 
                    It only takes about 10-15 minutes to complete, and your responses are kept confidential.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Completely confidential</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Takes only 10-15 minutes</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Developed by mental health professionals</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">Helps match you with the right provider</span>
                    </li>
                  </ul>
                  <Button 
                    className="group flex items-center"
                    size="lg"
                    onClick={() => setShowAssessment(true)}
                  >
                    Begin Assessment
                    <ArrowRight 
                      size={18} 
                      className="ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                    />
                  </Button>
                </div>
                <div className="md:w-1/2">
                  <div className="rounded-xl overflow-hidden shadow-md">
                    <img 
                      src="https://images.pexels.com/photos/7176026/pexels-photo-7176026.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                      alt="Person taking assessment on laptop" 
                      className="w-full h-[250px] md:h-[300px] object-cover"
                    />
                  </div>
                </div>
              </div>
            </Card>
          </>
        ) : (
          <>
            <button
              onClick={() => setShowAssessment(false)}
              className="flex items-center text-blue-600 hover:text-blue-700 mb-8 transition-colors"
            >
              <ChevronRight size={20} className="rotate-180 mr-1" />
              Back to Overview
            </button>
            <AssessmentForm onComplete={onAssessmentComplete} />
          </>
        )}
      </div>
    </section>
  );
};

export default AssessmentSection;