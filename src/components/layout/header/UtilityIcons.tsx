'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/icons';
import { useSession } from 'next-auth/react';

export default function UtilityIcons() {
  const { data: session } = useSession();
  const [wishlistCount, setWishlistCount] = React.useState(0);
  const [notificationCount, setNotificationCount] = React.useState(0);

  React.useEffect(() => {
    if (session?.user?.id) {
      fetch('/api/utility-counts')
        .then(res => res.json())
        .then(data => {
          setWishlistCount(data.wishlistCount || 0);
          setNotificationCount(data.notificationCount || 0);
        })
        .catch(console.error);
    }
  }, [session?.user?.id]);

  return (
    <div className="flex items-center space-x-2">

      {/* Wishlist */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
        aria-label={`Wishlist (${wishlistCount} items)`}
      >
        <Icon name="heart" size={24} className="text-gray-600" />
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
        <Icon name="bell" size={24} className="text-gray-600" />
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
