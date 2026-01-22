'use client';

import { motion } from 'framer-motion';
import { Heart, MapPin, DollarSign, Eye, ShoppingCart, Star } from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  location: string;
  price: string;
  image?: string;
}

interface WishlistSectionProps {
  wishlistItems: WishlistItem[];
}

export default function WishlistSection({ wishlistItems }: WishlistSectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      className="bg-white/60 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-xl"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 flex items-center justify-center">
            <Heart className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">My Wishlist</h3>
            <p className="text-sm text-gray-500">{wishlistItems.length} saved destinations</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-sm text-rose-600 hover:text-rose-700 font-medium"
        >
          View All
        </motion.button>
      </div>
      
      <div className="space-y-4">
        {wishlistItems.slice(0, 3).map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            className="group flex items-center space-x-4 p-3 hover:bg-white/60 rounded-xl transition-all duration-300 cursor-pointer"
          >
            <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 shadow-md">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
                  }}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-lg">
                  🏞️
                </div>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <Eye className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 truncate group-hover:text-emerald-600 transition-colors">
                {item.name}
              </h4>
              <div className="flex items-center space-x-1 text-xs text-gray-500 mb-1">
                <MapPin className="w-3 h-3 text-emerald-500" />
                <span>{item.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm font-bold text-emerald-600">
                  <DollarSign className="w-3 h-3" />
                  <span>{item.price}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 text-gray-400 hover:text-emerald-500 transition-colors"
                  >
                    <ShoppingCart className="w-3 h-3" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-1 text-rose-500 hover:text-rose-600 transition-colors"
                  >
                    <Heart className="w-3 h-3 fill-current" />
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {wishlistItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-8"
        >
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
            <Heart className="w-8 h-8 text-rose-400" />
          </div>
          <h4 className="text-sm font-semibold text-gray-700 mb-2">No saved destinations</h4>
          <p className="text-xs text-gray-500 mb-4">Start building your dream trip list!</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white rounded-xl text-sm font-medium hover:shadow-lg transition-all duration-300"
          >
            Explore Destinations
          </motion.button>
        </motion.div>
      )}
      
      {wishlistItems.length > 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="pt-4 border-t border-gray-200"
        >
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 text-center text-sm font-medium text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all duration-300"
          >
            View {wishlistItems.length - 3} more destinations
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}