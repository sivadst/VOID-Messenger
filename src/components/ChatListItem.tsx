import React from 'react';
import { motion } from 'framer-motion';
import { Chat } from '../types';
import { useNavigate } from 'react-router-dom';

interface ChatListItemProps {
  chat: Chat;
}

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toUpperCase();
};

export const ChatListItem: React.FC<ChatListItemProps> = ({ chat }) => {
  const navigate = useNavigate();
  const lastMessage = chat.messages[chat.messages.length - 1];

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
      onClick={() => navigate(`/chat/${chat.id}`)}
      className="flex flex-col justify-center min-h-[72px] px-[24px] cursor-pointer w-full"
    >
      <div className="flex justify-between items-center w-full">
        <span className="font-space-grotesk text-[16px] font-medium text-white tracking-[0.05em] truncate pr-4">
          {chat.contact.name.toUpperCase()}
        </span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="font-jetbrains-mono text-[10px] text-dark-grey">
            {lastMessage ? formatTime(lastMessage.timestamp) : ''}
          </span>
          {chat.unreadCount > 0 && (
            <div className="w-[6px] h-[6px] bg-white rounded-none" />
          )}
        </div>
      </div>
      <span className="font-space-grotesk text-[14px] text-grey truncate mt-1 tracking-normal w-full text-left">
        {lastMessage ? lastMessage.text : 'No messages'}
      </span>
    </motion.div>
  );
};
