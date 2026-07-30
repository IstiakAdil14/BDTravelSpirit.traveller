'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@/components/ui/icons';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Loader2, Bell, Plane, AlertCircle } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { formatDistanceToNow } from 'date-fns';
import { useRouter } from 'next/navigation';

interface Notification {
  _id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string;
  createdAt: string;
}

export default function NotificationsDropdown() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/notifications');
      if (res.ok) {
        const data = await res.json();
        setNotifications(data);
      }
    } catch (error) {
      console.error('Failed to fetch notifications', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when popover opens, or once on mount. 
  // Let's fetch on mount so we can show the badge count immediately.
  useEffect(() => {
    fetchNotifications();
    // Poll every 2 minutes for new notifications
    const interval = setInterval(fetchNotifications, 120000);
    return () => clearInterval(interval);
  }, []);

  const markAllAsRead = async () => {
    try {
      // Optimistic update
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'mark_all_read' })
      });
    } catch (error) {
      console.error('Failed to mark all as read', error);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      // Optimistic update
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      await fetch('/api/notifications', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notificationId: id })
      });
    } catch (error) {
      console.error('Failed to mark as read', error);
    }
  };

  const handleNotificationClick = (n: Notification) => {
    if (!n.isRead) {
      markAsRead(n._id);
    }
    if (n.link) {
      setOpen(false);
      router.push(n.link);
    }
  };

  const getIcon = (type: string) => {
    if (type.includes('TOUR') || type.includes('PROMO')) {
      return <Plane className="h-5 w-5 text-emerald-500" />;
    }
    if (type.includes('BOOKING') || type.includes('PAYMENT')) {
      return <AlertCircle className="h-5 w-5 text-amber-500" />;
    }
    return <Bell className="h-5 w-5 text-blue-500" />;
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors focus:outline-none cursor-pointer"
          aria-label={`Notifications (${unreadCount} new)`}
        >
          <Icon name="bell" size={24} className="text-slate-600" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full w-5 h-5 flex items-center justify-center font-bold border-2 border-white shadow-sm"
              >
                {unreadCount > 9 ? '9+' : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </PopoverTrigger>
      
      <PopoverContent align="end" className="w-80 p-0 rounded-xl shadow-xl border-slate-200 z-50">
        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/80 rounded-t-xl backdrop-blur-sm">
          <h3 className="font-semibold text-slate-800 text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <button 
              onClick={markAllAsRead}
              className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 transition-colors bg-emerald-50 px-2 py-1 rounded-md"
            >
              Mark all as read
            </button>
          )}
        </div>
        
        <ScrollArea className="h-[380px] w-full">
          {loading && notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 space-y-3">
              <Loader2 className="h-6 w-6 text-emerald-500 animate-spin" />
              <p className="text-xs text-slate-400">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center px-6">
              <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                <Bell className="h-6 w-6 text-slate-300" />
              </div>
              <p className="text-sm font-semibold text-slate-700">All caught up!</p>
              <p className="text-xs text-slate-500 mt-1">Check back later for new tours, booking updates, and exclusive offers.</p>
            </div>
          ) : (
            <div className="flex flex-col pb-2">
              <AnimatePresence>
                {notifications.map((n) => (
                  <motion.div 
                    key={n._id}
                    layout
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    onClick={() => handleNotificationClick(n)}
                    className={`flex items-start gap-3 p-4 border-b border-slate-50 transition-colors ${n.isRead ? 'bg-white' : 'bg-emerald-50/30'} ${n.link || !n.isRead ? 'cursor-pointer hover:bg-emerald-50/60' : ''}`}
                  >
                    <div className="mt-1 shrink-0 bg-white p-2 rounded-full shadow-sm border border-slate-100 flex items-center justify-center">
                      {getIcon(n.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm leading-snug ${n.isRead ? 'font-medium text-slate-700' : 'font-bold text-slate-900'}`}>
                        {n.title}
                      </p>
                      <p className={`text-xs mt-1 line-clamp-2 leading-relaxed ${n.isRead ? 'text-slate-500' : 'text-slate-600'}`}>
                        {n.message}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2 font-medium uppercase tracking-wider">
                        {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                      </p>
                    </div>
                    {!n.isRead && (
                      <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 mt-2 shadow-sm shadow-emerald-200" />
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
