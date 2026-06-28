import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { Header } from '../components/Header';
import { InputBar } from '../components/InputBar';
import { MessageBubble } from '../components/MessageBubble';
import { AnimatedPage } from '../components/AnimatedPage';
import { useAppStore } from '../store/useAppStore';
import { useSocket } from '../hooks/useSocket';

export const ChatScreen: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const chats = useAppStore(state => state.chats);
  const setActiveChatId = useAppStore(state => state.setActiveChatId);
  const sendMessageLocal = useAppStore(state => state.sendMessage);
  
  const chat = chats.find(c => c.id === id);
  const { sendSocketMessage, emitTyping } = useSocket();
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (id) {
      setActiveChatId(id);
    }
    return () => setActiveChatId(null);
  }, [id, setActiveChatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages]);
  
  // Listen for socket typing events
  useEffect(() => {
    const handleTypingEvent = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail.from === chat?.contact.phone) {
        setIsTyping(true);
      }
    };
    
    window.addEventListener('socket_typing', handleTypingEvent);
    return () => window.removeEventListener('socket_typing', handleTypingEvent);
  }, [chat?.contact.phone]);

  // Basic mock typing reset
  useEffect(() => {
      if (isTyping) {
          const t = setTimeout(() => setIsTyping(false), 3000);
          return () => clearTimeout(t);
      }
  }, [isTyping, chat?.messages]);

  if (!chat) return null; // Or handle not found

  const handleSend = (text: string) => {
    sendMessageLocal(chat.id, text);
    sendSocketMessage(chat.contact.phone, text);
  };

  const handleTyping = () => {
    emitTyping(chat.contact.phone);
  };

  return (
    <AnimatedPage className="flex flex-col bg-black h-full w-full relative z-10">
      <Header
        className="border-b border-dark-grey bg-black"
        left={
          <div className="flex items-center cursor-pointer p-2 -ml-2" onClick={() => navigate(-1)}>
            <ChevronLeft size={24} strokeWidth={1} className="text-white" />
          </div>
        }
        center={
          <span className="font-space-grotesk text-[16px] text-white tracking-[0.05em]">
            {chat.contact.name.toUpperCase()}
          </span>
        }
        right={
          <div className="p-2 -mr-2">
            <Info size={20} strokeWidth={1} className="text-white opacity-70" />
          </div>
        }
      />
      
      <div className="flex-1 overflow-y-auto px-[24px] py-[16px] custom-scrollbar flex flex-col">
        {chat.messages.length === 0 ? (
          <div className="flex-1 flex items-center justify-center">
            <span className="font-dot-gothic text-[14px] text-dark-grey">
              NO MESSAGES YET
            </span>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {chat.messages.map(msg => (
              <MessageBubble key={msg.id} message={msg} />
            ))}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-jetbrains-mono text-[10px] text-dark-grey self-start mt-2"
              >
                TYPING...
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <InputBar onSend={handleSend} onTyping={handleTyping} />
    </AnimatedPage>
  );
};
