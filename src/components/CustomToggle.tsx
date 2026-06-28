import React from 'react';
import { motion } from 'framer-motion';

interface CustomToggleProps {
  isOn: boolean;
  onToggle: () => void;
}

export const CustomToggle: React.FC<CustomToggleProps> = ({ isOn, onToggle }) => {
  return (
    <div 
      className="w-10 h-5 border border-white cursor-pointer relative flex items-center p-[2px]"
      onClick={onToggle}
    >
      <motion.div
        className="w-3 h-3 bg-white"
        layout
        initial={false}
        animate={{
          x: isOn ? 20 : 0
        }}
        transition={{ type: "spring", stiffness: 700, damping: 30 }}
      />
    </div>
  );
};
