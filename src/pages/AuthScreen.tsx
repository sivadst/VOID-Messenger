import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store/useAppStore';
import { DottedText } from '../components/DottedText';
import { AnimatedPage } from '../components/AnimatedPage';

export const AuthScreen: React.FC = () => {
  const [phone, setPhoneInput] = useState('');
  const [shake, setShake] = useState(false);
  const setUser = useAppStore(state => state.setUser);
  const navigate = useNavigate();

  const handleEnter = () => {
    const trimmed = phone.trim();
    if (!trimmed) {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      return;
    }
    setUser(trimmed);
    navigate('/');
  };

  const shakeAnimation = {
    x: [0, -10, 10, -10, 10, 0],
    transition: { duration: 0.4 }
  };

  return (
    <AnimatedPage className="flex flex-col items-center justify-center bg-black w-full h-full">
      <div className="flex flex-col items-center mb-16">
        <DottedText text="VOID" size="text-[48px]" />
        <span className="font-jetbrains-mono text-[12px] text-dark-grey tracking-[0.05em] mt-2">
          SECURE MESSAGING
        </span>
      </div>
      
      <div className="w-full max-w-[280px] flex flex-col items-center">
        <motion.div 
          animate={shake ? shakeAnimation : {}} 
          className="w-full"
        >
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhoneInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
            placeholder="ENTER NUMBER"
            className="w-full bg-transparent text-white font-space-grotesk text-[16px] text-center outline-none border-b border-white placeholder:text-dark-grey pb-2"
          />
        </motion.div>
        
        <button
          onClick={handleEnter}
          className="mt-8 font-space-grotesk text-white text-[16px] tracking-[0.05em]"
        >
          ENTER
        </button>
      </div>
    </AnimatedPage>
  );
};
