import React from 'react';
import Card from '../Card';
import Button from '../Button';
import ProviderMatching from './ProviderMatching';

type AssessmentCompleteProps = {
  onReset: () => void;
};

const AssessmentComplete: React.FC<AssessmentCompleteProps> = ({ onReset }) => {
  return (
    <div className="max-w-2xl mx-auto px-4">
      <ProviderMatching />
      <div className="mt-8 text-center">
        <Button onClick={onReset} variant="outline">
          Return to Overview
        </Button>
      </div>
    </div>
  );
};

export default AssessmentComplete