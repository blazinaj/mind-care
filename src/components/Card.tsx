import React from 'react';
import { cn } from '../utils/cn';

type CardProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-2xl p-6 shadow-sm transition-all duration-300 hover:shadow-md",
        className
      )}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;