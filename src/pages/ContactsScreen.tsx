import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { AnimatedPage } from '../components/AnimatedPage';
import { useAppStore } from '../store/useAppStore';

export const ContactsScreen: React.FC = () => {
  const contacts = useAppStore(state => state.contacts);
  const navigate = useNavigate();

  const handleContactClick = (phone: string) => {
    // Navigate to chat. The chat should already exist due to mock data generation.
    navigate(`/chat/${phone}`);
  };

  return (
    <AnimatedPage className="flex flex-col bg-black h-full w-full relative">
      <Header
        center={
          <span className="font-space-grotesk text-[16px] text-white tracking-[0.05em]">
            CONTACTS
          </span>
        }
      />
      
      <div className="flex-1 overflow-y-auto w-full px-[24px] pt-4 custom-scrollbar">
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.05 }
            }
          }}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-6 pb-24"
        >
          {contacts.map(contact => (
            <motion.div 
              key={contact.phone} 
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center cursor-pointer min-h-[44px]"
              onClick={() => handleContactClick(contact.phone)}
            >
              <div className="w-[40px] flex-shrink-0 flex justify-start">
                <span className="font-jetbrains-mono text-[24px] text-dark-grey leading-none">
                  {contact.name.charAt(0).toUpperCase()}
                </span>
              </div>
              <span className="font-space-grotesk text-[16px] text-white tracking-[0.05em]">
                {contact.name.toUpperCase()}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 w-full">
        <BottomNav />
      </div>
    </AnimatedPage>
  );
};
