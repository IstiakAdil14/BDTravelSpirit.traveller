"use client";

import { motion } from "framer-motion";
import { Plane, Heart, Star, Settings, CreditCard } from "lucide-react";

export default function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "booking",
      title: "Booked Cox's Bazar Beach Paradise",
      description: "4-day beach vacation package",
      time: "2 hours ago",
      icon: Plane,
      color: "bg-blue-100 text-blue-600"
    },
    {
      id: 2,
      type: "wishlist",
      title: "Added Rangamati Lake Cruise to wishlist",
      description: "2-day lake adventure tour",
      time: "1 day ago",
      icon: Heart,
      color: "bg-pink-100 text-pink-600"
    },
    {
      id: 3,
      type: "review",
      title: "Reviewed Sundarbans Mangrove Adventure",
      description: "Gave 5-star rating with photos",
      time: "3 days ago",
      icon: Star,
      color: "bg-amber-100 text-amber-600"
    },
    {
      id: 4,
      type: "profile",
      title: "Updated travel preferences",
      description: "Added adventure and nature categories",
      time: "1 week ago",
      icon: Settings,
      color: "bg-gray-100 text-gray-600"
    },
    {
      id: 5,
      type: "payment",
      title: "Payment successful for Sylhet tour",
      description: "৳6,750 paid via bKash",
      time: "2 weeks ago",
      icon: CreditCard,
      color: "bg-green-100 text-green-600"
    }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800">Recent Activity</h3>
        <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
          View All
        </button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
          >
            <div className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
              <activity.icon className="w-5 h-5" />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-800 mb-1">
                {activity.title}
              </h4>
              <p className="text-sm text-gray-600 mb-1">
                {activity.description}
              </p>
              <span className="text-xs text-gray-500">
                {activity.time}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full py-2 text-teal-600 hover:text-teal-700 font-medium text-sm transition-colors">
          Load More Activities
        </button>
      </div>
    </div>
  );
}