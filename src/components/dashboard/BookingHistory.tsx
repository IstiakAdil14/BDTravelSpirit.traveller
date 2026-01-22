"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, DollarSign, Image, Star, ArrowRight, Plane, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface Booking {
  id: string;
  title: string;
  location: string;
  date: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  price: string;
  duration: string;
}

interface BookingHistoryProps {
  bookings: Booking[];
}

export default function BookingHistory({ bookings }: BookingHistoryProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case "upcoming": 
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: AlertCircle,
          iconColor: "text-blue-600"
        };
      case "completed": 
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: CheckCircle,
          iconColor: "text-green-600"
        };
      case "cancelled": 
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: XCircle,
          iconColor: "text-red-600"
        };
      default: 
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: AlertCircle,
          iconColor: "text-gray-600"
        };
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
            <Plane className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">My Trips</h2>
            <p className="text-gray-600">Manage your travel experiences</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 flex items-center space-x-2 font-medium"
        >
          <Plane className="w-4 h-4" />
          <span>Book New Trip</span>
        </motion.button>
      </div>

      <div className="space-y-4">
        {bookings.map((booking, index) => {
          const statusConfig = getStatusConfig(booking.status);
          const StatusIcon = statusConfig.icon;
          
          return (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] overflow-hidden relative"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 transform translate-x-20 -translate-y-20"></div>
              </div>
              
              <div className="relative z-10 flex items-center gap-6">
                <div className="relative w-28 h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
                  <div className="w-full h-full bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-500 flex items-center justify-center text-white">
                    <Image className="w-10 h-10" />
                  </div>
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                        {booking.title}
                      </h3>
                      <p className="text-gray-600 flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-emerald-500" />
                        <span className="font-medium">{booking.location}</span>
                      </p>
                    </div>
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${statusConfig.color}`}>
                      <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
                      <span className="capitalize">{booking.status}</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl px-3 py-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="font-medium">{booking.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 rounded-xl px-3 py-2">
                      <Clock className="w-4 h-4 text-purple-500" />
                      <span className="font-medium">{booking.duration}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-bold text-emerald-600 bg-emerald-50 rounded-xl px-3 py-2">
                      <DollarSign className="w-4 h-4" />
                      <span>{booking.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                  >
                    View Details
                  </motion.button>
                  {booking.status === "completed" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium flex items-center gap-2"
                    >
                      <Star className="w-4 h-4" />
                      <span>Review</span>
                    </motion.button>
                  )}
                  {booking.status === "upcoming" && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                    >
                      Manage
                    </motion.button>
                  )}
                </div>
              </div>
              
              {/* Hover Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/0 via-emerald-500/5 to-emerald-500/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            </motion.div>
          );
        })}
      </div>
      
      {bookings.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white/60 backdrop-blur-xl rounded-3xl border border-white/20"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <Plane className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No trips booked yet</h3>
          <p className="text-gray-500 mb-6">Start your adventure by booking your first trip!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl hover:shadow-lg transition-all duration-300 font-medium"
          >
            Explore Destinations
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}