import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { users, messages } from "./store.ts";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(express.json());

app.get('/health', (req, res) => {
  res.send('VOID Backend Online');
});

io.on('connection', (socket) => {
  console.log(`Connection established: ${socket.id}`);

  socket.on('join', (phone: string) => {
    console.log(`User joined: ${phone} with socket ${socket.id}`);
    users.set(phone, socket.id);
    socket.join(phone);
  });

  socket.on('send_message', (payload: { to: string, from: string, text: string, timestamp: number }) => {
    console.log('send_message', payload);
    const { to, from, text, timestamp } = payload;
    const chatId = [from, to].sort().join('_');
    
    const messageObj = { id: Math.random().toString(36).substring(7), from, to, text, timestamp, status: 'sent' };
    
    if (!messages.has(chatId)) {
      messages.set(chatId, []);
    }
    messages.get(chatId)!.push(messageObj);

    // Simulate network delay
    setTimeout(() => {
        // change status to delivered
        messageObj.status = 'delivered';
        io.to(from).emit('message_status', { chatId, messageId: messageObj.id, status: 'delivered' });
        
        io.to(to).emit('receive_message', { chatId, message: messageObj });
        
        // Mock auto-reply
        if (to === 'VOID BOT' || true) { // Always reply based on instructions
            simulateAutoReply(from, to, io);
        }
    }, Math.random() * 900 + 300); // 300 - 1200ms
  });

  socket.on('typing', (payload: { to: string, from: string }) => {
    io.to(payload.to).emit('typing', { from: payload.from });
  });
  
  socket.on('mark_read', (payload: { chatId: string, from: string, to: string }) => {
    io.to(payload.to).emit('message_status', { chatId: payload.chatId, status: 'read' });
  });

  socket.on('disconnect', () => {
    console.log(`Disconnected: ${socket.id}`);
    for (const [phone, id] of users.entries()) {
      if (id === socket.id) {
        users.delete(phone);
        break;
      }
    }
  });
});

function simulateAutoReply(to: string, from: string, io: Server) {
    const delay = Math.random() * 3000 + 2000; // 2-5 seconds
    
    setTimeout(() => {
        io.to(to).emit('typing', { from });
        
        setTimeout(() => {
            let replyText = "Message received";
            if (from === 'Void Bot' || from === 'VOID BOT') {
                const voidResponses = ["SYSTEM ONLINE", "SIGNAL SECURE", "TRANSMISSION RECEIVED", "VOID ACKNOWLEDGED"];
                replyText = voidResponses[Math.floor(Math.random() * voidResponses.length)];
            } else {
                const genericResponses = ["Got it", "On my way", "Haha nice", "Sure, sounds good", "I'll check later"];
                replyText = genericResponses[Math.floor(Math.random() * genericResponses.length)];
            }
            
            const timestamp = Date.now();
            const messageObj = { id: Math.random().toString(36).substring(7), from, to, text: replyText, timestamp, status: 'delivered' };
            const chatId = [from, to].sort().join('_');
            
            if (!messages.has(chatId)) {
                messages.set(chatId, []);
            }
            messages.get(chatId)!.push(messageObj);
            
            io.to(to).emit('receive_message', { chatId, message: messageObj });
        }, 1500); // simulate typing duration
    }, delay);
}

const PORT = 3001;
httpServer.listen(PORT, () => {
  console.log(`VOID Server running on port ${PORT}`);
});
