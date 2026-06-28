// In-memory store
export const users = new Map<string, string>(); // phone -> socket id
export const messages = new Map<string, { id: string, from: string, to: string, text: string, timestamp: number, status: string }[]>(); // chatId (sorted phones joined by _) -> messages
