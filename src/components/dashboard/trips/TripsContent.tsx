'use client';

import { motion } from 'framer-motion';
import { MapPin, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import TripsStats from './TripsStats';
import TripCard from './TripCard';

interface TripsContentProps {
  userId: string;
}

const trips = [
  {
    id: '1',
    title: 'Cox\'s Bazar Beach Adventure',
    location: 'Cox\'s Bazar, Chittagong',
    startDate: '2024-12-15',
    endDate: '2024-12-18',
    status: 'upcoming' as const,
    progress: 85,
    travelers: 4,
    guide: { name: 'Rashid Ahmed', rating: 4.8 }
  },
  {
    id: '2',
    title: 'Sundarbans Mangrove Safari',
    location: 'Sundarbans, Khulna',
    startDate: '2024-11-20',
    endDate: '2024-11-23',
    status: 'active' as const,
    progress: 60,
    travelers: 2,
    guide: { name: 'Fatima Khan', rating: 4.9 }
  },
  {
    id: '3',
    title: 'Sylhet Tea Garden Tour',
    location: 'Srimangal, Sylhet',
    startDate: '2024-10-10',
    endDate: '2024-10-13',
    status: 'completed' as const,
    progress: 100,
    travelers: 3,
    guide: { name: 'Karim Uddin', rating: 4.7 }
  }
];

export default function TripsContent({ userId }: TripsContentProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            My Trips
          </h1>
          <p className="text-gray-600 mt-2">Manage your travel adventures</p>
        </div>
        <Button className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
          <MapPin className="w-4 h-4 mr-2" />
          Plan New Trip
        </Button>
      </motion.div>

      <TripsStats />

      {/* Trips Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      >
        {trips.map((trip, index) => (
          <TripCard key={trip.id} trip={trip} index={index} />
        ))}
      </motion.div>
    </div>
  );
}