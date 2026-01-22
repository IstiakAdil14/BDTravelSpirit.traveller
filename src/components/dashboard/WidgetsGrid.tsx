'use client';

import { motion } from 'framer-motion';
import { TrendingUp, MapPin, Users, Calendar } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const widgets = [
  {
    id: 1,
    title: 'Popular This Week',
    subtitle: 'Trending destinations',
    items: ['Cox\'s Bazar', 'Sundarbans', 'Sylhet'],
    icon: TrendingUp,
    color: 'from-green-500 to-green-600',
    bgColor: 'from-green-50 to-green-100',
  },
  {
    id: 2,
    title: 'Nearby Events',
    subtitle: 'Happening around you',
    items: ['Pohela Boishakh Festival', 'Beach Volleyball', 'Cultural Show'],
    icon: MapPin,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'from-blue-50 to-blue-100',
  },
  {
    id: 3,
    title: 'Travel Buddies',
    subtitle: 'Connect with travelers',
    items: ['Sarah K.', 'Ahmed R.', 'Priya S.'],
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'from-purple-50 to-purple-100',
  },
  {
    id: 4,
    title: 'This Month',
    subtitle: 'Your travel calendar',
    items: ['3 trips planned', '2 bookings pending', '1 review due'],
    icon: Calendar,
    color: 'from-orange-500 to-orange-600',
    bgColor: 'from-orange-50 to-orange-100',
  },
];

export function WidgetsGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {widgets.map((widget, index) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
          >
            <Card className="p-6 bg-white/60 backdrop-blur-xl border-slate-200/50 hover:shadow-lg transition-all duration-200 h-full">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-10 h-10 rounded-2xl bg-gradient-to-br ${widget.bgColor} flex items-center justify-center`}>
                  <widget.icon className={`w-5 h-5 bg-gradient-to-br ${widget.color} bg-clip-text text-transparent`} />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900">{widget.title}</h4>
                  <p className="text-xs text-slate-500">{widget.subtitle}</p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                {widget.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="text-sm text-slate-600 p-2 rounded-xl bg-slate-50/50 hover:bg-slate-100/50 transition-colors cursor-pointer"
                  >
                    {item}
                  </div>
                ))}
              </div>

              <Button variant="ghost" size="sm" className="w-full text-slate-600 hover:text-slate-900">
                View More
              </Button>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}