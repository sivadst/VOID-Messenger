import React from 'react';
import { MessageCircle, Users, Settings } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: <MessageCircle size={24} strokeWidth={1} /> },
    { path: '/contacts', icon: <Users size={24} strokeWidth={1} /> },
    { path: '/settings', icon: <Settings size={24} strokeWidth={1} /> }
  ];

  return (
    <nav className="h-[64px] flex-shrink-0 w-full flex items-center justify-around px-[24px] pb-2 z-50 bg-black">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`p-2 transition-opacity duration-200 ${
            location.pathname === item.path ? 'text-white opacity-100' : 'text-dark-grey opacity-70 hover:opacity-100'
          }`}
        >
          {item.icon}
        </Link>
      ))}
    </nav>
  );
};
