import React from 'react';
import { motion } from 'framer-motion';
import { Message } from '../types';
import { useAppStore } from '../store/useAppStore';

interface MessageBubbleProps {
  message: Message;
}

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase();
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const user = useAppStore(state => state.user);
  const isMine = message.from === user?.phone;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`flex flex-col mb-4 w-full ${isMine ? 'items-end' : 'items-start'}`}
    >
      <div className={`max-w-[80%] font-space-grotesk text-[16px] tracking-normal break-words ${isMine ? 'text-white text-right' : 'text-grey text-left'}`}>
        {message.text}
      </div>
      <div className={`flex items-center gap-2 mt-1 ${isMine ? 'flex-row-reverse' : 'flex-row'}`}>
        <span className="font-jetbrains-mono text-[10px] text-dark-grey">
          {formatTime(message.timestamp)}
        </span>
        {isMine && (
          <div className="flex gap-[2px]">
            {message.status === 'sent' && <div className="w-[4px] h-[4px] bg-dark-grey" />}
            {message.status === 'delivered' && (
              <>
                <div className="w-[4px] h-[4px] bg-dark-grey" />
                <div className="w-[4px] h-[4px] bg-dark-grey" />
              </>
            )}
            {message.status === 'read' && (
              <>
                <div className="w-[4px] h-[4px] bg-white" />
                <div className="w-[4px] h-[4px] bg-white" />
              </>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};
