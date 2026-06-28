import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

interface InputBarProps {
  onSend: (text: string) => void;
  onTyping?: () => void;
}

export const InputBar: React.FC<InputBarProps> = ({ onSend, onTyping }) => {
  const [text, setText] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSend = () => {
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    } else if (onTyping) {
      onTyping();
    }
  };

  return (
    <div className="h-[56px] flex-shrink-0 w-full px-[24px] flex items-center bg-black relative">
      <div className={`flex-1 flex items-center border-b border-solid transition-colors duration-200 ${isFocused ? 'border-white' : 'border-dark-grey'}`}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="TYPE..."
          className="w-full bg-transparent text-white font-space-grotesk text-[16px] outline-none placeholder:text-dark-grey tracking-[0.05em] py-2"
        />
        <AnimatePresence>
          {text.trim().length > 0 && (
            <motion.button
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.15 }}
              onClick={handleSend}
              className="ml-2 text-white p-1"
            >
              <ArrowUp size={20} strokeWidth={1} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
