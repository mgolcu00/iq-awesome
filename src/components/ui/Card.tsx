import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gradient';
}

export const Card = ({ children, className = '', variant = 'default' }: CardProps) => {
  const baseStyles = 'rounded-xl shadow-lg overflow-hidden transition-colors duration-200';
  
  const variants = {
    default: 'bg-light-card dark:bg-dark-card border border-light-border dark:border-dark-border',
    gradient: 'bg-gradient-to-br from-primary-600 to-primary-800 dark:from-primary-800 dark:to-primary-900',
  };

  return (
    <div className={twMerge(baseStyles, variants[variant], className)}>
      {children}
    </div>
  );
};