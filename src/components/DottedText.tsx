import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface DottedTextProps {
  text: string;
  size?: string;
  className?: string;
}

export const DottedText: React.FC<DottedTextProps> = ({ text, size = 'text-base', className }) => {
  return (
    <span
      className={cn(
        "font-dot-gothic inline-block bg-clip-text text-transparent [-webkit-background-clip:text]",
        size,
        className
      )}
      style={{
        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
        backgroundSize: '3px 3px',
      }}
    >
      {text}
    </span>
  );
};
