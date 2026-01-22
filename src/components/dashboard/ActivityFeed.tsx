"use client";

import { motion } from "framer-motion";
import { Calendar, Heart, Star, CreditCard, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const activities = [
  {
    id: 1,
    type: "booking",
    title: "Booked Cox's Bazar trip",
    description: "4-day beach vacation package",
    time: "2 hours ago",
    icon: Calendar,
    color: "bg-blue-100 text-blue-600"
  },
  {
    id: 2,
    type: "wishlist",
    title: "Added to wishlist",
    description: "Rangamati Lake Cruise adventure",
    time: "1 day ago",
    icon: Heart,
    color: "bg-pink-100 text-pink-600"
  },
  {
    id: 3,
    type: "review",
    title: "Reviewed Sundarbans tour",
    description: "Gave 5-star rating with photos",
    time: "3 days ago",
    icon: Star,
    color: "bg-amber-100 text-amber-600"
  },
  {
    id: 4,
    type: "payment",
    title: "Payment completed",
    description: "৳6,750 for Sylhet tea garden tour",
    time: "1 week ago",
    icon: CreditCard,
    color: "bg-green-100 text-green-600"
  },
  {
    id: 5,
    type: "exploration",
    title: "Explored new destination",
    description: "Discovered Paharpur Buddhist ruins",
    time: "2 weeks ago",
    icon: MapPin,
    color: "bg-purple-100 text-purple-600"
  }
];

export default function ActivityFeed() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
    >
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-gray-900">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.1, duration: 0.4 }}
              className="flex items-start gap-4 p-3 rounded-xl hover:bg-gray-50/50 transition-colors duration-200"
            >
              <div className={`w-10 h-10 rounded-lg ${activity.color} flex items-center justify-center flex-shrink-0`}>
                <activity.icon className="w-5 h-5" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-gray-900 mb-1">
                  {activity.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">
                  {activity.description}
                </p>
                <span className="text-xs text-gray-500">
                  {activity.time}
                </span>
              </div>
              
              <Avatar className="w-8 h-8 flex-shrink-0">
                <AvatarFallback className="bg-emerald-100 text-emerald-700 text-xs">
                  JD
                </AvatarFallback>
              </Avatar>
            </motion.div>
          ))}
          
          <div className="pt-2 border-t border-gray-100">
            <button className="w-full py-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium transition-colors">
              View All Activity
            </button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}