'use client';

import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, Star, Navigation, Camera, MoreVertical } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Trip {
  id: string;
  title: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'upcoming' | 'active' | 'completed';
  progress: number;
  travelers: number;
  guide: { name: string; rating: number };
}

const statusConfig = {
  upcoming: { color: 'bg-blue-100 text-blue-700', label: 'Upcoming' },
  active: { color: 'bg-green-100 text-green-700', label: 'Active' },
  completed: { color: 'bg-gray-100 text-gray-700', label: 'Completed' }
};

interface TripCardProps {
  trip: Trip;
  index: number;
}

export default function TripCard({ trip, index }: TripCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index }}
    >
      <Card className="professional-card border-0 overflow-hidden group hover:shadow-professional-lg transition-all duration-300">
        {/* Trip Image */}
        <div className="relative h-48 bg-gradient-to-r from-emerald-400 to-teal-500">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute top-4 left-4">
            <Badge className={`${statusConfig[trip.status].color} border-0`}>
              {statusConfig[trip.status].label}
            </Badge>
          </div>
          <div className="absolute top-4 right-4">
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
          {trip.status === 'active' && (
            <div className="absolute bottom-4 left-4 right-4">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Progress</span>
                  <span className="font-medium">{trip.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${trip.progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-lg text-gray-900 group-hover:text-emerald-600 transition-colors">
                {trip.title}
              </h3>
              <p className="text-gray-600 flex items-center gap-1 mt-1">
                <MapPin className="w-4 h-4" />
                {trip.location}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(trip.startDate).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {trip.travelers} travelers
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{trip.guide.name}</p>
                <p className="text-sm text-gray-600">Tour Guide</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber-500 fill-current" />
                <span className="text-sm font-medium">{trip.guide.rating}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600">
                <Navigation className="w-4 h-4 mr-2" />
                View Details
              </Button>
              {trip.status === 'completed' && (
                <Button size="sm" variant="outline" className="border-amber-200 text-amber-700 hover:bg-amber-50">
                  <Camera className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}