import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { ChatListItem } from '../components/ChatListItem';
import { AnimatedPage } from '../components/AnimatedPage';
import { useAppStore } from '../store/useAppStore';

export const HomeScreen: React.FC = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showRefresh, setShowRefresh] = useState(false);
  const chats = useAppStore(state => state.chats);

  const filteredChats = chats.filter(chat => 
    chat.contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    if (target.scrollTop < -20 || (target.scrollTop === 0 && e.nativeEvent instanceof WheelEvent && e.nativeEvent.deltaY < 0)) {
      setShowRefresh(true);
      setTimeout(() => setShowRefresh(false), 1000);
    }
  };

  return (
    <AnimatedPage className="flex flex-col bg-black h-full w-full relative">
      <Header
        left={<span className="font-dot-gothic text-[16px] text-white">VOID</span>}
        right={
          <Search 
            size={20} 
            strokeWidth={1} 
            className="text-white cursor-pointer opacity-70 hover:opacity-100" 
            onClick={() => setIsSearching(!isSearching)}
          />
        }
      />
      
      <AnimatePresence>
        {isSearching && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 48, opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="px-[24px] overflow-hidden flex-shrink-0"
          >
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="SEARCH..."
              className="w-full bg-transparent text-white font-space-grotesk text-[16px] outline-none border-b border-white placeholder:text-dark-grey pb-2"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {showRefresh && (
        <div className="absolute top-14 w-full flex justify-center z-10 py-2">
          <span className="font-jetbrains-mono text-[12px] text-dark-grey animate-pulse">
            ...
          </span>
        </div>
      )}

      <div 
        className="flex-1 overflow-y-auto w-full pt-4 custom-scrollbar"
        onScroll={handleScroll}
        onTouchMove={(e) => {
           // Basic hack to detect pull to refresh on mobile
           if (e.currentTarget.scrollTop <= 0) {
               setShowRefresh(true);
               setTimeout(() => setShowRefresh(false), 1000);
           }
        }}
      >
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
          className="flex flex-col gap-2 pb-24"
        >
          {filteredChats.map(chat => (
            <motion.div key={chat.id} variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
              <ChatListItem chat={chat} />
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
