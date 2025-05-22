import React from 'react';
import { ClipboardCheck, Users, Lightbulb } from 'lucide-react';
import Card from './Card';

type StepProps = {
  icon: React.ReactNode;
  number: number;
  title: string;
  description: string;
};

const Step: React.FC<StepProps> = ({ icon, number, title, description }) => {
  return (
    <Card className="flex flex-col items-center text-center h-full">
      <div className="bg-blue-100 p-4 rounded-full text-blue-600 mb-4">
        {icon}
      </div>
      <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold mb-4">
        {number}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </Card>
  );
};

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600">
            Our streamlined process makes getting the help you need simple and stress-free.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Step 
            icon={<ClipboardCheck size={28} />}
            number={1}
            title="Online Assessment"
            description="Tell us how you've been feeling with our comprehensive yet simple assessment. It only takes 10-15 minutes to complete."
          />
          <Step 
            icon={<Users size={28} />}
            number={2}
            title="Meet Your Psychiatrist"
            description="Have your first visit within days with a psychiatrist that's right for you, matched based on your specific needs."
          />
          <Step 
            icon={<Lightbulb size={28} />}
            number={3}
            title="Treatment Plan"
            description="Receive a personalized treatment plan that can include medication, supportive therapy, and ongoing care."
          />
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;