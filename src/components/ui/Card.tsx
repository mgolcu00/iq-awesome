import React from 'react';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={twMerge('bg-white dark:bg-gray-800 rounded-xl shadow-lg', className)}>
      {children}
    </div>
  );
};