import { Contact, Chat, Message } from '../types';

export const mockContacts: Contact[] = [
  { name: 'Void Bot', phone: 'VOID BOT' },
  { name: 'Alice Chen', phone: 'alice_chen' },
  { name: 'Marcus Reed', phone: 'marcus_reed' },
  { name: 'Sarah Kim', phone: 'sarah_kim' },
  { name: 'Dev Team', phone: 'dev_team' },
  { name: 'Mom', phone: 'mom' },
  { name: 'Work Group', phone: 'work_group' },
  { name: 'Delivery', phone: 'delivery' },
  { name: 'Gym', phone: 'gym' },
  { name: 'Crypto Alerts', phone: 'crypto_alerts' }
];

const generateMessages = (fromPhone: string, toPhone: string, count: number): Message[] => {
  const msgs: Message[] = [];
  const now = Date.now();
  for (let i = 0; i < count; i++) {
    const isFromMe = Math.random() > 0.5;
    msgs.push({
      id: Math.random().toString(36).substring(7),
      from: isFromMe ? fromPhone : toPhone,
      to: isFromMe ? toPhone : fromPhone,
      text: isFromMe ? `My mock message ${i}` : `Their mock message ${i}`,
      timestamp: now - (count - i) * 1000 * 60 * 60, // spaced by hours
      status: 'read'
    });
  }
  return msgs;
};

// Generates initial chats for the current user
export const generateInitialChats = (userPhone: string): Chat[] => {
  return mockContacts.map((contact) => {
    const chatId = contact.phone; // Using contact's phone as chatId for simplicity in frontend mapping
    return {
      id: chatId,
      contact: contact,
      messages: generateMessages(userPhone, contact.phone, Math.floor(Math.random() * 10) + 1),
      unreadCount: 0
    };
  });
};
