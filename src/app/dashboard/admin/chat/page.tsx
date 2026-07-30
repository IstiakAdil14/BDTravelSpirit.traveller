"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useSocket } from '@/components/chat/SocketProvider';
import { useSession } from 'next-auth/react';
import { Search, Send, User, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface ChatMessage {
  _id?: string;
  sender: string;
  receiver: string;
  message: string;
  timestamp: string | Date;
}

export interface ActiveChat {
  _id: string;
  lastMessage: string;
  lastTimestamp: string | Date;
  unreadCount: number;
  user: {
    name: string;
    image?: string;
    email: string;
  }
}

export default function AdminChatDashboard() {
  const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);
  const [selectedTravelerId, setSelectedTravelerId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTravelerTyping, setIsTravelerTyping] = useState(false);
  
  const { socket, isConnected } = useSocket();
  const { data: session } = useSession();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch active chats sidebar
  const fetchActiveChats = async () => {
    try {
      const res = await fetch('/api/chat', { method: 'POST' });
      if (res.ok) {
        const data = await res.json();
        setActiveChats(data.activeChats || []);
      }
    } catch (err) {
      console.error("Failed to load active chats", err);
    }
  };

  useEffect(() => {
    fetchActiveChats();
  }, []);

  // 2. Fetch specific traveler history
  const fetchHistory = async (travelerId: string) => {
    try {
      const res = await fetch(`/api/chat?travelerId=${travelerId}`);
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
      }
    } catch (err) {
      console.error("Failed to load chat history", err);
    }
  };

  useEffect(() => {
    if (selectedTravelerId) {
      fetchHistory(selectedTravelerId);
    }
  }, [selectedTravelerId]);

  // 3. Socket Listeners
  useEffect(() => {
    if (!socket || !session?.user) return;

    const onReceiveMessage = (msg: ChatMessage) => {
      // If the message belongs to the currently selected traveler chat
      if (msg.sender === selectedTravelerId || msg.receiver === selectedTravelerId) {
        setMessages((prev) => [...prev, msg]);
      }
      // Re-fetch sidebar to update last message & unread count
      fetchActiveChats();
    };

    const onNewTravelerMessage = () => {
      fetchActiveChats();
    };

    const onTyping = (data: { senderId: string, isTyping: boolean }) => {
      if (data.senderId === selectedTravelerId) {
        setIsTravelerTyping(data.isTyping);
      }
    };

    socket.on('receive_message', onReceiveMessage);
    socket.on('new_traveler_message', onNewTravelerMessage);
    socket.on('typing', onTyping);

    return () => {
      socket.off('receive_message', onReceiveMessage);
      socket.off('new_traveler_message', onNewTravelerMessage);
      socket.off('typing', onTyping);
    };
  }, [socket, selectedTravelerId, session]);

  // Join/Leave specific traveler room for typing events
  useEffect(() => {
    if (socket && selectedTravelerId) {
      socket.emit('join_traveler_room', selectedTravelerId);
    }
    return () => {
      if (socket && selectedTravelerId) {
        socket.emit('leave_traveler_room', selectedTravelerId);
      }
    };
  }, [socket, selectedTravelerId]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const user = session?.user as { id: string } | undefined;
    if (!input.trim() || !socket || !user?.id || !selectedTravelerId) return;

    socket.emit('send_message', {
      senderId: user.id,
      receiverId: selectedTravelerId,
      message: input,
      role: 'admin'
    });

    setInput('');
    socket.emit('typing', { travelerId: selectedTravelerId, isTyping: false });
  };

  const handleTyping = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    const user = session?.user as { id: string } | undefined;
    if (socket && selectedTravelerId && user?.id) {
      socket.emit('typing', { travelerId: selectedTravelerId, isTyping: e.target.value.length > 0 });
    }
  };

  const selectedTraveler = activeChats.find(c => c._id === selectedTravelerId);
  const user = session?.user as { id: string } | undefined;

  return (
    <div className="flex h-[80vh] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden m-6">
      {/* Sidebar */}
      <div className="w-1/3 border-r border-gray-200 bg-gray-50 flex flex-col">
        <div className="p-4 border-b border-gray-200 bg-white">
          <h2 className="text-lg font-bold text-gray-800">Traveler Chats</h2>
          <div className="relative mt-3">
            <Search className="w-4 h-4 absolute left-3 top-2.5 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search conversations..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {activeChats.length === 0 ? (
            <p className="text-center text-gray-400 text-sm mt-10">No active conversations</p>
          ) : (
            activeChats.map(chat => (
              <button
                key={chat._id}
                onClick={() => setSelectedTravelerId(chat._id)}
                className={`w-full text-left p-4 border-b border-gray-100 hover:bg-emerald-50 transition-colors ${selectedTravelerId === chat._id ? 'bg-emerald-50 border-l-4 border-l-emerald-500' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-semibold text-gray-800 truncate">{chat.user?.name || 'Unknown User'}</span>
                  <span className="text-xs text-gray-400 whitespace-nowrap">
                    {new Date(chat.lastTimestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500 truncate w-[80%]">{chat.lastMessage}</p>
                  {chat.unreadCount > 0 && (
                    <span className="bg-emerald-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {chat.unreadCount}
                    </span>
                  )}
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="w-2/3 flex flex-col bg-white">
        {selectedTravelerId ? (
          <>
            <div className="p-4 border-b border-gray-200 flex justify-between items-center shadow-sm z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{selectedTraveler?.user?.name || 'Traveler'}</h3>
                  <p className="text-xs text-gray-500">{selectedTraveler?.user?.email || 'No email'}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col gap-4">
              {messages.map((msg, idx) => {
                const isAdmin = msg.sender === user?.id;
                return (
                  <div key={msg._id || idx} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl p-4 text-sm shadow-sm ${isAdmin ? 'bg-emerald-600 text-white rounded-br-sm' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-sm'}`}>
                      {msg.message}
                      <div className={`text-[10px] mt-1 text-right ${isAdmin ? 'text-emerald-200' : 'text-gray-400'}`}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                );
              })}
              {isTravelerTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl p-4 rounded-bl-sm shadow-sm text-sm text-gray-500 italic">
                    Traveler is typing...
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 bg-white border-t border-gray-200 flex gap-3">
              <input 
                type="text"
                value={input}
                onChange={handleTyping}
                placeholder="Type your reply here..."
                className="flex-1 bg-slate-100 rounded-xl px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <Button type="submit" className="rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 h-auto" disabled={!input.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Send
              </Button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageCircle className="w-16 h-16 mb-4 text-gray-200" />
            <h3 className="text-lg font-medium text-gray-500">Select a conversation</h3>
            <p className="text-sm">Choose a traveler from the left sidebar to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
}
