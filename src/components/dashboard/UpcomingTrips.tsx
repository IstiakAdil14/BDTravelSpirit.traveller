"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, DollarSign, Star, TreePine, Leaf, Mountain } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const upcomingTrips = [
  {
    id: 1,
    title: "Sundarbans Mangrove Adventure",
    location: "Sundarbans, Khulna",
    date: "Jan 20-22, 2025",
    price: "৳8,900",
    rating: 4.8,
    icon: TreePine,
    status: "confirmed"
  },
  {
    id: 2,
    title: "Sylhet Tea Garden Tour",
    location: "Sylhet Division",
    date: "Feb 10-12, 2025",
    price: "৳6,750",
    rating: 4.6,
    icon: Leaf,
    status: "pending"
  },
  {
    id: 3,
    title: "Rangamati Lake Cruise",
    location: "Rangamati, CHT",
    date: "Mar 5-7, 2025",
    price: "৳4,500",
    rating: 4.9,
    icon: Mountain,
    status: "confirmed"
  }
];

export default function UpcomingTrips() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Upcoming Trips</h3>
        <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
          View All
        </button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {upcomingTrips.map((trip, index) => (
          <motion.div
            key={trip.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            className="flex-shrink-0 w-72"
          >
            <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-0">
                {/* Image */}
                <div className="h-32 bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center relative">
                  <trip.icon className="w-12 h-12 text-white" />
                  <Badge 
                    className={`absolute top-3 right-3 ${
                      trip.status === 'confirmed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {trip.status}
                  </Badge>
                </div>

                {/* Content */}
                <div className="p-4 space-y-3">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{trip.title}</h4>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {trip.location}
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="w-3 h-3" />
                      {trip.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-current" />
                      <span className="text-gray-600">{trip.rating}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 font-semibold text-emerald-600">
                      <DollarSign className="w-4 h-4" />
                      {trip.price}
                    </div>
                    <button className="text-sm text-emerald-600 hover:text-emerald-700 font-medium">
                      View Details
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}