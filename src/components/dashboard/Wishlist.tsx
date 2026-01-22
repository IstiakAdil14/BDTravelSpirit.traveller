"use client";

import { motion } from "framer-motion";
import { Mountain, Building, TreePine, Waves, Heart, MapPin, Star, Clock } from "lucide-react";

export default function Wishlist() {
  const wishlistItems = [
    {
      id: 1,
      title: "Rangamati Lake Cruise",
      location: "Rangamati, Chittagong Hill Tracts",
      price: "৳4,500",
      rating: 4.8,
      reviews: 124,
      duration: "2 days",
      icon: Mountain
    },
    {
      id: 2,
      title: "Paharpur Buddhist Monastery",
      location: "Naogaon, Rajshahi",
      price: "৳3,200",
      rating: 4.6,
      reviews: 89,
      duration: "1 day",
      icon: Building
    },
    {
      id: 3,
      title: "Bandarban Hill Adventure",
      location: "Bandarban, Chittagong Hill Tracts",
      price: "৳7,800",
      rating: 4.9,
      reviews: 156,
      duration: "3 days",
      icon: TreePine
    },
    {
      id: 4,
      title: "Kuakata Sea Beach",
      location: "Patuakhali, Barisal",
      price: "৳5,600",
      rating: 4.7,
      reviews: 98,
      duration: "2 days",
      icon: Waves
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">My Wishlist</h2>
        <span className="text-gray-600">{wishlistItems.length} saved tours</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistItems.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <div className="relative">
              <div className="h-48 bg-gradient-to-br from-teal-400 to-emerald-500 flex items-center justify-center">
                <item.icon className="w-16 h-16 text-white" />
              </div>
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-red-500 hover:bg-white transition-colors">
                <Heart className="w-5 h-5 fill-current" />
              </button>
            </div>
            
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2 group-hover:text-teal-600 transition-colors">
                {item.title}
              </h3>
              <p className="text-gray-600 text-sm mb-3 flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {item.location}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-amber-400 fill-current" />
                  <span className="text-sm font-medium">{item.rating}</span>
                  <span className="text-gray-500 text-sm">({item.reviews})</span>
                </div>
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {item.duration}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-teal-600">{item.price}</span>
                <button className="px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-lg hover:shadow-lg transition-all duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}