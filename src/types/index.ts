export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  timestamp: number;
  status: 'sent' | 'delivered' | 'read';
}

export interface Contact {
  phone: string;
  name: string;
}

export interface Chat {
  id: string; // phone of the other person for simplicity in MVP, or a sorted string of both phones
  contact: Contact;
  messages: Message[];
  unreadCount: number;
}

export interface AppState {
  user: { phone: string } | null;
  contacts: Contact[];
  chats: Chat[];
  activeChatId: string | null;
  setUser: (phone: string | null) => void;
  sendMessage: (chatId: string, text: string) => void;
  receiveMessage: (chatId: string, message: Message) => void;
  updateMessageStatus: (chatId: string, messageId: string, status: 'sent' | 'delivered' | 'read') => void;
  markAsRead: (chatId: string) => void;
  setActiveChatId: (chatId: string | null) => void;
  logout: () => void;
}
