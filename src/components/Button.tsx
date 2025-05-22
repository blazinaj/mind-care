import React from 'react';
import { cn } from '../utils/cn';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  onClick,
  type = 'button',
  disabled = false,
}) => {
  const baseClasses = "font-medium rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50";
  
  const variantClasses = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-sm",
    secondary: "bg-teal-600 text-white hover:bg-teal-700 shadow-sm",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
  };
  
  const sizeClasses = {
    sm: "py-1.5 px-4 text-sm",
    md: "py-2.5 px-6 text-base",
    lg: "py-3 px-8 text-lg"
  };
  
  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;