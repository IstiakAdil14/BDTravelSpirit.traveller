"use client";

import { motion } from "framer-motion";
import { Map, MapPin, Heart, Star, TrendingUp, Calendar, Award, Globe } from "lucide-react";

interface DashboardStatsProps {
  stats: {
    totalTrips: number;
    placesVisited: number;
    wishlistItems: number;
    reviewsWritten: number;
  };
}

export default function DashboardStats({ stats }: DashboardStatsProps) {
  const statsData = [
    {
      title: "Total Trips",
      value: stats.totalTrips.toString(),
      change: "+2 this month",
      changePercent: "+12%",
      icon: Map,
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50",
      shadowColor: "shadow-blue-500/20"
    },
    {
      title: "Places Visited",
      value: stats.placesVisited.toString(),
      change: "+5 new places",
      changePercent: "+25%",
      icon: MapPin,
      color: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
      shadowColor: "shadow-emerald-500/20"
    },
    {
      title: "Wishlist Items",
      value: stats.wishlistItems.toString(),
      change: "3 added recently",
      changePercent: "+8%",
      icon: Heart,
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-50 to-rose-50",
      shadowColor: "shadow-pink-500/20"
    },
    {
      title: "Reviews Written",
      value: stats.reviewsWritten.toString(),
      change: "4.8 avg rating",
      changePercent: "+15%",
      icon: Star,
      color: "from-amber-500 to-orange-500",
      bgColor: "from-amber-50 to-orange-50",
      shadowColor: "shadow-amber-500/20"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group relative"
        >
          <div className={`relative bg-gradient-to-br ${stat.bgColor} rounded-3xl p-6 border border-white/20 shadow-xl ${stat.shadowColor} hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden`}>
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white transform translate-x-16 -translate-y-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full bg-white transform -translate-x-12 translate-y-12"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                  <div className="text-sm font-medium text-gray-600">{stat.title}</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                    <TrendingUp className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-semibold text-green-600">{stat.changePercent}</span>
                  </div>
                </div>
                <div className="text-xs text-gray-500">{stat.change}</div>
              </div>
            </div>
            
            {/* Hover Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/5 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}