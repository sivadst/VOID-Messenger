import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppStore } from '../store/useAppStore';

const SOCKET_URL = 'http://localhost:3001';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const user = useAppStore(state => state.user);
  const receiveMessage = useAppStore(state => state.receiveMessage);
  const updateMessageStatus = useAppStore(state => state.updateMessageStatus);

  useEffect(() => {
    if (!user) return;

    socketRef.current = io(SOCKET_URL);

    socketRef.current.on('connect', () => {
      socketRef.current?.emit('join', user.phone);
    });

    socketRef.current.on('receive_message', (payload: { chatId: string, message: { id: string, from: string, to: string, text: string, timestamp: number, status: 'sent' | 'delivered' | 'read' } }) => {
      const localChatId = payload.message.from === user.phone ? payload.message.to : payload.message.from;
      receiveMessage(localChatId, payload.message);
    });
    
    socketRef.current.on('message_status', (payload: { chatId: string, messageId: string, status: 'sent' | 'delivered' | 'read' }) => {
        const localChatId = payload.chatId.split('_').find(p => p !== user.phone) || payload.chatId;
        updateMessageStatus(localChatId, payload.messageId, payload.status);
    });

    socketRef.current.on('typing', (payload: { from: string }) => {
        const event = new CustomEvent('socket_typing', { detail: { from: payload.from } });
        window.dispatchEvent(event);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, [user, receiveMessage, updateMessageStatus]);

  const sendSocketMessage = (to: string, text: string) => {
    if (socketRef.current && user) {
      socketRef.current.emit('send_message', {
        to,
        from: user.phone,
        text,
        timestamp: Date.now()
      });
    }
  };

  const emitTyping = (to: string) => {
    if (socketRef.current && user) {
      socketRef.current.emit('typing', { to, from: user.phone });
    }
  };

  return { sendSocketMessage, emitTyping };
};
