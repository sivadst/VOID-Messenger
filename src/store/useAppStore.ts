import { create } from 'zustand';
import { AppState, Message } from '../types';
import { mockContacts, generateInitialChats } from '../data/mockData';

export const useAppStore = create<AppState>((set, get) => ({
  user: (() => {
    const saved = localStorage.getItem('void_user');
    return saved ? JSON.parse(saved) : null;
  })(),
  contacts: mockContacts,
  chats: (() => {
    const savedUser = localStorage.getItem('void_user');
    return savedUser ? generateInitialChats(JSON.parse(savedUser).phone) : [];
  })(),
  activeChatId: null,

  setUser: (phone) => {
    if (phone) {
      const user = { phone };
      localStorage.setItem('void_user', JSON.stringify(user));
      set({ user, chats: generateInitialChats(phone) });
    } else {
      localStorage.removeItem('void_user');
      set({ user: null, chats: [] });
    }
  },

  sendMessage: (chatId, text) => {
    const { user, chats } = get();
    if (!user) return;
    
    const newMessage: Message = {
      id: Math.random().toString(36).substring(7),
      from: user.phone,
      to: chatId,
      text,
      timestamp: Date.now(),
      status: 'sent',
    };

    set({
      chats: chats.map((chat) => 
        chat.id === chatId 
          ? { ...chat, messages: [...chat.messages, newMessage] } 
          : chat
      )
    });
  },

  receiveMessage: (chatId, message) => {
    const { chats, activeChatId } = get();
    set({
      chats: chats.map((chat) => 
        chat.id === chatId 
          ? { 
              ...chat, 
              messages: [...chat.messages, message],
              unreadCount: activeChatId === chatId ? chat.unreadCount : chat.unreadCount + 1
            } 
          : chat
      )
    });
  },

  updateMessageStatus: (chatId, messageId, status) => {
    const { chats } = get();
    set({
      chats: chats.map(chat => 
        chat.id === chatId
          ? {
              ...chat,
              messages: chat.messages.map(msg => 
                msg.id === messageId ? { ...msg, status } : msg
              )
            }
          : chat
      )
    });
  },

  markAsRead: (chatId) => {
    const { chats } = get();
    set({
      chats: chats.map(chat => 
        chat.id === chatId 
          ? { 
              ...chat, 
              unreadCount: 0,
              messages: chat.messages.map(m => m.from !== get().user?.phone ? { ...m, status: 'read' as const } : m)
            }
          : chat
      )
    });
  },

  setActiveChatId: (chatId) => {
    set({ activeChatId: chatId });
    if (chatId) {
      get().markAsRead(chatId);
    }
  },

  logout: () => {
    localStorage.removeItem('void_user');
    set({ user: null, chats: [], activeChatId: null });
  }
}));
