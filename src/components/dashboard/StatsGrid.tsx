"use client";

import { motion } from "framer-motion";
import { MapPin, Calendar, Heart, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  {
    title: "Total Trips",
    value: "12",
    change: "+2 this month",
    trend: "up",
    icon: MapPin,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-50/50"
  },
  {
    title: "Upcoming",
    value: "3",
    change: "Next: Dec 15",
    trend: "neutral",
    icon: Calendar,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-50/50"
  },
  {
    title: "Wishlist",
    value: "28",
    change: "+5 recently",
    trend: "up",
    icon: Heart,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-50/50"
  },
  {
    title: "Reviews",
    value: "4.9",
    change: "8 reviews",
    trend: "up",
    icon: Star,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-50/50"
  }
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
        >
          <Card className={`${stat.bgColor} border-white/20 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm`}>
            <CardContent className="p-4 lg:p-6">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                {stat.trend === "up" && (
                  <TrendingUp className="w-4 h-4 text-green-500" />
                )}
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl lg:text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs lg:text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}