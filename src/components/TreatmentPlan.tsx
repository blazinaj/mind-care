import React from 'react';
import { PillIcon, MessagesSquare, Calendar } from 'lucide-react';
import Card from './Card';

type TreatmentCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const TreatmentCard: React.FC<TreatmentCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="h-full">
      <div className="flex items-start">
        <div className="bg-blue-100 p-3 rounded-lg text-blue-600 mr-4">
          {icon}
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600">{description}</p>
        </div>
      </div>
    </Card>
  );
};

const TreatmentPlan: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Your Treatment Plan</h2>
          <p className="text-lg text-gray-600">
            After your assessment and first appointment, you'll receive a personalized treatment plan that may include:
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <TreatmentCard 
            icon={<PillIcon size={24} />}
            title="Medication Management"
            description="If appropriate, your psychiatrist may prescribe medication as part of your treatment plan, with ongoing adjustments to ensure optimal results."
          />
          <TreatmentCard 
            icon={<MessagesSquare size={24} />}
            title="Supportive Therapy"
            description="Regular sessions with a therapist can help you develop coping strategies, process emotions, and make positive changes in your life."
          />
          <TreatmentCard 
            icon={<Calendar size={24} />}
            title="Follow-up Care"
            description="Ongoing appointments to monitor your progress, adjust your treatment plan as needed, and provide continued support on your journey."
          />
          <TreatmentCard 
            icon={<div className="flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 7V12L15 15M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>}
            title="Self-Care Resources"
            description="Access to educational materials, wellness tools, and self-care strategies to support your mental health between appointments."
          />
        </div>

        <div className="max-w-3xl mx-auto mt-12 bg-blue-50 rounded-2xl p-6 md:p-8">
          <h3 className="text-xl font-semibold mb-4 text-center">Your Journey to Better Mental Health</h3>
          <p className="text-gray-700 mb-6 text-center">
            We believe in a collaborative approach to mental health care. Your treatment plan will be developed with your input and adjusted over time based on your progress and feedback.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">1</div>
              <div className="ml-3">
                <p className="font-medium">Initial Assessment</p>
              </div>
            </div>
            <div className="hidden md:block text-gray-400">→</div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">2</div>
              <div className="ml-3">
                <p className="font-medium">First Appointment</p>
              </div>
            </div>
            <div className="hidden md:block text-gray-400">→</div>
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">3</div>
              <div className="ml-3">
                <p className="font-medium">Ongoing Care</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TreatmentPlan;