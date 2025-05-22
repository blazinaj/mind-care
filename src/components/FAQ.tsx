import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

type FAQItemProps = {
  question: string;
  answer: string;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex justify-between items-center w-full text-left focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="ml-6 flex-shrink-0 text-blue-600">
          {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </span>
      </button>
      {isOpen && (
        <div className="mt-3 pr-12">
          <p className="text-base text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How long does the assessment take to complete?",
      answer: "Our assessment typically takes 10-15 minutes to complete. It's designed to be thorough yet efficient, gathering the essential information our providers need to understand your unique situation."
    },
    {
      question: "How quickly can I see a psychiatrist?",
      answer: "Most patients can see a psychiatrist within a few days of completing their assessment. We prioritize quick access to care while ensuring you're matched with the right provider for your needs."
    },
    {
      question: "Is my information kept confidential?",
      answer: "Yes, absolutely. We take your privacy very seriously. All your assessment responses and medical information are protected in accordance with HIPAA regulations and our strict privacy policies."
    },
    {
      question: "What types of treatment do you offer?",
      answer: "We offer comprehensive treatment plans that may include medication management, supportive therapy, lifestyle recommendations, and ongoing care. Your treatment plan will be personalized based on your specific needs and preferences."
    },
    {
      question: "Do you accept insurance?",
      answer: "Yes, we accept most major insurance plans. During the intake process, we'll verify your insurance coverage and explain any potential out-of-pocket costs before your first appointment."
    }
  ];

  return (
    <section id="faq" className="py-16">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">
              Find answers to common questions about our services and process.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
            {faqs.map((faq, index) => (
              <FAQItem 
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;