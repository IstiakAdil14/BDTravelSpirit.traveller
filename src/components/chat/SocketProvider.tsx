"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { useSession } from 'next-auth/react';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType>({ socket: null, isConnected: false });

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    // Connect to the separate Socket.io server running on port 3001
    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:3001', {
      autoConnect: false,
    });

    socketInstance.on('connect', () => {
      setIsConnected(true);
      if (session?.user) {
        const user = session.user as { id: string; role?: string };
        socketInstance.emit('join', { 
          userId: user.id, 
          role: user.role 
        });
      }
    });

    socketInstance.on('disconnect', () => {
      setIsConnected(false);
    });

    if (session?.user) {
      socketInstance.connect();
      setSocket(socketInstance);
    }

    return () => {
      socketInstance.disconnect();
    };
  }, [session]);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
