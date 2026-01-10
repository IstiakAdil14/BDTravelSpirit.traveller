'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Bell, ShoppingCart } from 'lucide-react';

export default function UtilityIcons() {
  const [wishlistCount] = React.useState(3); // TODO: Connect to wishlist state
  const [cartCount] = React.useState(1); // TODO: Connect to cart state
  const [notificationCount] = React.useState(2); // TODO: Connect to notifications state

  return (
    <div className="flex items-center space-x-2">
      {/* Cart */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
        aria-label={`Cart (${cartCount} items)`}
      >
        <ShoppingCart className="w-6 h-6 text-gray-600" />
        {cartCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
          >
            {cartCount}
          </motion.span>
        )}
      </motion.button>

      {/* Wishlist */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
        aria-label={`Wishlist (${wishlistCount} items)`}
      >
        <Heart className="w-6 h-6 text-gray-600" />
        {wishlistCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-emerald-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
          >
            {wishlistCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notifications */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
        aria-label={`Notifications (${notificationCount} new)`}
      >
        <Bell className="w-6 h-6 text-gray-600" />
        {notificationCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
          >
            {notificationCount}
          </motion.span>
        )}
      </motion.button>
    </div>
  );
}
