import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Header } from '../components/Header';
import { BottomNav } from '../components/BottomNav';
import { AnimatedPage } from '../components/AnimatedPage';
import { CustomToggle } from '../components/CustomToggle';
import { useAppStore } from '../store/useAppStore';

export const SettingsScreen: React.FC = () => {
  const [notifications, setNotifications] = useState(true);
  const [readReceipts, setReadReceipts] = useState(true);
  const logout = useAppStore(state => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const sections = [
    { label: 'ACCOUNT', isToggle: false },
    { label: 'NOTIFICATIONS', isToggle: true, state: notifications, toggle: () => setNotifications(!notifications) },
    { label: 'PRIVACY (READ RECEIPTS)', isToggle: true, state: readReceipts, toggle: () => setReadReceipts(!readReceipts) },
    { label: 'ABOUT', isToggle: false }
  ];

  return (
    <AnimatedPage className="flex flex-col bg-black h-full w-full relative">
      <Header
        center={
          <span className="font-space-grotesk text-[16px] text-white tracking-[0.05em]">
            SETTINGS
          </span>
        }
      />
      
      <div className="flex-1 overflow-y-auto w-full px-[24px] pt-8 custom-scrollbar">
        <div className="flex flex-col gap-8 pb-24">
          {sections.map((section, idx) => (
            <div key={idx} className="flex justify-between items-center min-h-[44px] cursor-pointer">
              <span className="font-space-grotesk text-[16px] text-white tracking-[0.05em]">
                {section.label}
              </span>
              {section.isToggle ? (
                <CustomToggle isOn={section.state!} onToggle={section.toggle!} />
              ) : (
                <ChevronRight size={20} strokeWidth={1} className="text-white opacity-70" />
              )}
            </div>
          ))}

          <div 
            className="flex justify-between items-center min-h-[44px] cursor-pointer mt-8"
            onClick={handleLogout}
          >
            <span className="font-space-grotesk text-[16px] text-dark-grey tracking-[0.05em]">
              LOG OUT
            </span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 w-full">
        <BottomNav />
      </div>
    </AnimatedPage>
  );
};
