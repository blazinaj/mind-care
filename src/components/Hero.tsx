import React from 'react';
import Button from './Button';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-28 pb-16 md:pt-40 md:pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Begin Your Journey to <span className="text-blue-600">Better Mental Health</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            We're here to guide you from your first step through ongoing care with compassionate, 
            personalized mental health treatment.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection('assessment')}
              className="group flex items-center justify-center"
            >
              Start Assessment
              <ArrowRight
                size={18}
                className="ml-2 transition-transform duration-300 group-hover:translate-x-1"
              />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('how-it-works')}
            >
              Learn How It Works
            </Button>
          </div>
        </div>

        <div className="mt-16 bg-gray-50 rounded-3xl overflow-hidden shadow-md">
          <img 
            src="https://images.pexels.com/photos/3760607/pexels-photo-3760607.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Patient speaking with healthcare provider" 
            className="w-full h-[300px] md:h-[400px] object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;