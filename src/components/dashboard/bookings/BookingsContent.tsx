'use client';

import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BookingsStats from './BookingsStats';
import BookingCard from './BookingCard';

interface BookingsContentProps {
  userId: string;
}

const bookings = [
  {
    id: 'BK001',
    tourName: 'Cox\'s Bazar Beach Resort Package',
    location: 'Cox\'s Bazar, Chittagong',
    bookingDate: '2024-11-15',
    travelDate: '2024-12-20',
    travelers: 4,
    totalAmount: '৳45,000',
    status: 'confirmed' as const,
    paymentStatus: 'paid' as const,
    guide: 'Rashid Ahmed',
    guidePhone: '+880 1712-345678'
  },
  {
    id: 'BK002',
    tourName: 'Sundarbans Wildlife Safari',
    location: 'Sundarbans, Khulna',
    bookingDate: '2024-11-10',
    travelDate: '2024-12-05',
    travelers: 2,
    totalAmount: '৳28,000',
    status: 'pending' as const,
    paymentStatus: 'partial' as const,
    paidAmount: '৳14,000',
    guide: 'Fatima Khan',
    guidePhone: '+880 1812-345678'
  },
  {
    id: 'BK003',
    tourName: 'Sylhet Tea Garden Experience',
    location: 'Srimangal, Sylhet',
    bookingDate: '2024-10-20',
    travelDate: '2024-11-15',
    travelers: 3,
    totalAmount: '৳22,500',
    status: 'completed' as const,
    paymentStatus: 'paid' as const,
    guide: 'Karim Uddin',
    guidePhone: '+880 1912-345678'
  }
];

export default function BookingsContent({ userId }: BookingsContentProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            My Bookings
          </h1>
          <p className="text-gray-600 mt-2">Track your travel bookings and reservations</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-500 to-violet-500 hover:from-purple-600 hover:to-violet-600">
          <Calendar className="w-4 h-4 mr-2" />
          New Booking
        </Button>
      </motion.div>

      <BookingsStats />

      {/* Bookings List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="space-y-6"
      >
        {bookings.map((booking, index) => (
          <BookingCard key={booking.id} booking={booking} index={index} />
        ))}
      </motion.div>
    </div>
  );
}