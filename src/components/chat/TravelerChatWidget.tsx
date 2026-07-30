"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from './SocketProvider';
import { useSession } from 'next-auth/react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ChatMessage {
  _id?: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string | Date;
}

export default function TravelerChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  
  const { socket, isConnected } = useSocket();
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchHistory = async () => {
    try {
      const res = await fetch('/api/chat');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to load chat history", err);
    }
  };

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      fetchHistory();
      setUnreadCount(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!socket) return;

    const onReceiveMessage = (msg: ChatMessage) => {
      const user = session?.user as { id: string } | undefined;
      setMessages((prev) => [...prev, msg]);
      if (!isOpen && msg.sender !== user?.id) {
        setUnreadCount((prev) => prev + 1);
      }
    };

    const onTyping = (data: { senderId: string, isTyping: boolean }) => {
      const user = session?.user as { id: string } | undefined;
      if (data.senderId !== user?.id) {
        setIsTyping(data.isTyping);
      }
    };

    socket.on('receive_message', onReceiveMessage);
    socket.on('typing', onTyping);

    return () => {
      socket.off('receive_message', onReceiveMessage);
      socket.off('typing', onTyping);
    };
  }, [socket, isOpen, session]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const user = session?.user as { id: string } | undefined;
    if (!input.trim() || !socket || !user?.id) return;

    socket.emit('send_message', {
      senderId: user.id,
      receiverId: user.id, // For traveler sending to admin, we still group by travelerId
      message: input,
      role: 'traveler'
    });

    setInput('');
    socket.emit('typing', { travelerId: user.id, isTyping: false });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const user = session?.user as { id: string } | undefined;
    if (socket && user?.id) {
      socket.emit('typing', { travelerId: user.id, isTyping: e.target.value.length > 0 });
    }
  };

  const user = session?.user as { id: string; role?: string } | undefined;
  // Only show the widget for logged in travelers (or general users, not admins)
  if (!session || user?.role === 'admin') return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <div className="bg-white rounded-xl shadow-2xl w-80 sm:w-96 flex flex-col h-[500px] max-h-[80vh] border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold">AI Travel Assistant</h3>
              <p className="text-xs text-emerald-100 flex items-center">
                <span className={`w-2 h-2 rounded-full mr-1 ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}></span>
                {isConnected ? 'Online' : 'Reconnecting...'}
              </p>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3">
            {messages.length === 0 ? (
              <p className="text-center text-gray-400 text-sm my-auto">How can we help you today?</p>
            ) : (
              messages.map((msg, idx) => {
                const isMine = msg.sender === user?.id;
                return (
                  <div key={msg._id || idx} className={`flex ${isMine ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-lg p-3 text-sm ${isMine ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'}`}>
                      {msg.message}
                    </div>
                  </div>
                );
              })
            )}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-200 rounded-lg p-3 rounded-bl-none shadow-sm">
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></span>
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></span>
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-200 flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={handleTyping}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Button type="submit" size="icon" className="rounded-full bg-emerald-600 hover:bg-emerald-700 h-10 w-10 shrink-0" disabled={!input.trim()}>
              <Send className="w-4 h-4 text-white" />
            </Button>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => { setIsOpen(true); setUnreadCount(0); }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full p-4 shadow-xl transition-transform hover:scale-105 relative"
        >
          <MessageCircle className="w-6 h-6" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
