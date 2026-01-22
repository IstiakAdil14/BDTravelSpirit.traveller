'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin } from 'lucide-react';
import { useDashboardStore } from '@/lib/store/dashboard';
import { mockTravellerData } from '@/lib/data/mockData';

interface HeaderProps {
  travellerId?: string;
}

export function Header({ travellerId }: HeaderProps = {}) {
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });

  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/60 backdrop-blur-xl rounded-3xl p-6 border border-slate-200/50"
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2"
          >
            {getGreeting()}, {mockTravellerData.profile.name}! ✨
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-slate-600 flex items-center space-x-4"
          >
            <span className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{currentDate}</span>
            </span>
            <span className="hidden sm:block">•</span>
            <span className="flex items-center space-x-1">
              <MapPin className="w-4 h-4" />
              <span>{mockTravellerData.profile.location}</span>
            </span>
          </motion.p>
        </div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-4 sm:mt-0"
        >
          <div className="text-right">
            <div className="text-2xl font-bold text-slate-900">{currentTime}</div>
            <div className="text-sm text-slate-500">Local time</div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}