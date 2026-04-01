'use client';
import { useState, useEffect } from 'react';

export interface ChatMessage {
  id: string;
  sender: 'you' | 'host';
  text: string;
  timestamp: string;
}

const HOST_REPLIES = [
  'Thanks for your message! Happy to answer any questions.',
  'The room is available from the date listed. Would you like to arrange a viewing?',
  'Utilities are split equally among housemates.',
  'The bond is 4 weeks rent. Let me know if you need more details.',
  'Feel free to come by for an inspection — just let me know what time works for you.',
  'Yes, the place is still available! When would you like to move in?',
];

export function useChat(listingId: string, hostName: string) {
  const KEY = `flatmatefind_chat_${listingId}`;
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) {
      setMessages(JSON.parse(stored));
    } else {
      const welcome: ChatMessage[] = [
        {
          id: 'welcome',
          sender: 'host',
          text: `Hi! Thanks for your interest in my listing. Feel free to ask any questions or arrange a viewing 😊`,
          timestamp: new Date(Date.now() - 60000).toISOString(),
        },
      ];
      setMessages(welcome);
      localStorage.setItem(KEY, JSON.stringify(welcome));
    }
  }, [listingId]);

  function send(text: string) {
    const msg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'you',
      text,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => {
      const next = [...prev, msg];
      localStorage.setItem(KEY, JSON.stringify(next));
      return next;
    });

    // Simulate host reply
    setIsTyping(true);
    setTimeout(() => {
      const reply: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'host',
        text: HOST_REPLIES[Math.floor(Math.random() * HOST_REPLIES.length)],
        timestamp: new Date().toISOString(),
      };
      setMessages((prev) => {
        const next = [...prev, reply];
        localStorage.setItem(KEY, JSON.stringify(next));
        return next;
      });
      setIsTyping(false);
    }, 1500 + Math.random() * 1000);
  }

  return { messages, send, isTyping };
}
