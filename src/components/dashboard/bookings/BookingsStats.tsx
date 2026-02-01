'use client';

import { motion } from 'framer-motion';
import { Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { label: 'Total Bookings', value: '12', icon: Calendar, color: 'from-purple-500 to-violet-500' },
  { label: 'Confirmed', value: '8', icon: CheckCircle, color: 'from-green-500 to-emerald-500' },
  { label: 'Pending', value: '2', icon: AlertCircle, color: 'from-yellow-500 to-orange-500' },
  { label: 'Completed', value: '7', icon: CheckCircle, color: 'from-blue-500 to-indigo-500' }
];

export default function BookingsStats() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="grid grid-cols-1 md:grid-cols-4 gap-6"
    >
      {stats.map((stat, index) => (
        <Card key={stat.label} className="professional-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
}