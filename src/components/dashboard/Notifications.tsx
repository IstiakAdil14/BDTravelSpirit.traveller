"use client";

import { motion } from "framer-motion";
import { CheckCircle, PartyPopper, Clock, Star, Sun, Bell } from "lucide-react";

export default function Notifications() {
  const notifications = [
    {
      id: 1,
      type: "booking",
      title: "Trip Confirmation",
      message: "Your Cox's Bazar trip has been confirmed for Dec 15-18, 2024",
      time: "2 hours ago",
      isRead: false,
      icon: CheckCircle,
      color: "bg-green-100 text-green-800"
    },
    {
      id: 2,
      type: "promotion",
      title: "Special Offer",
      message: "Get 20% off on Sylhet tea garden tours this winter season",
      time: "1 day ago",
      isRead: false,
      icon: PartyPopper,
      color: "bg-purple-100 text-purple-800"
    },
    {
      id: 3,
      type: "reminder",
      title: "Trip Reminder",
      message: "Your Sundarbans trip starts in 3 days. Don't forget to pack!",
      time: "2 days ago",
      isRead: true,
      icon: Clock,
      color: "bg-blue-100 text-blue-800"
    },
    {
      id: 4,
      type: "review",
      title: "Review Request",
      message: "How was your recent trip to Sylhet? Share your experience!",
      time: "1 week ago",
      isRead: true,
      icon: Star,
      color: "bg-amber-100 text-amber-800"
    },
    {
      id: 5,
      type: "weather",
      title: "Weather Update",
      message: "Perfect weather expected for your upcoming Cox's Bazar trip",
      time: "1 week ago",
      isRead: true,
      icon: Sun,
      color: "bg-cyan-100 text-cyan-800"
    }
  ];

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-bold text-gray-800">Notifications</h2>
          {unreadCount > 0 && (
            <span className="px-3 py-1 bg-red-500 text-white text-sm rounded-full">
              {unreadCount} new
            </span>
          )}
        </div>
        <button className="text-teal-600 hover:text-teal-700 font-medium">
          Mark all as read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-lg border transition-all duration-300 hover:shadow-xl ${
              notification.isRead 
                ? "border-white/20 opacity-75" 
                : "border-teal-200 shadow-teal-100"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl ${notification.color} flex items-center justify-center flex-shrink-0`}>
                <notification.icon className="w-6 h-6" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <h3 className={`font-semibold ${notification.isRead ? "text-gray-600" : "text-gray-800"}`}>
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                    {notification.time}
                  </span>
                </div>
                <p className={`text-sm ${notification.isRead ? "text-gray-500" : "text-gray-700"}`}>
                  {notification.message}
                </p>
              </div>
              
              {!notification.isRead && (
                <div className="w-3 h-3 bg-teal-500 rounded-full flex-shrink-0 mt-2"></div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No notifications yet</h3>
          <p className="text-gray-500">We'll notify you about important updates and offers</p>
        </div>
      )}
    </div>
  );
}