import React from 'react';

interface HeaderProps {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
  className?: string;
}

export const Header: React.FC<HeaderProps> = ({ left, center, right, className = '' }) => {
  return (
    <header className={`flex items-center justify-between px-[24px] h-[56px] flex-shrink-0 w-full ${className}`}>
      <div className="flex-1 flex items-center justify-start">{left}</div>
      <div className="flex-1 flex items-center justify-center">{center}</div>
      <div className="flex-1 flex items-center justify-end">{right}</div>
    </header>
  );
};
