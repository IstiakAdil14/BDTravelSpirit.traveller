'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Icon } from '@/components/ui/icons';
import { useSession } from 'next-auth/react';
import NotificationsDropdown from './NotificationsDropdown';
import Link from 'next/link';

export default function UtilityIcons() {
  const { data: session } = useSession();
  const [wishlistCount, setWishlistCount] = React.useState(0);
  const [notificationCount, setNotificationCount] = React.useState(0);

  React.useEffect(() => {
    const fetchCounts = () => {
      if (session?.user?.id) {
        fetch('/api/utility-counts')
          .then(res => res.json())
          .then(data => {
            setWishlistCount(data.wishlistCount || 0);
          })
          .catch(console.error);
      }
    };

    fetchCounts();

    window.addEventListener('wishlistUpdated', fetchCounts);
    return () => {
      window.removeEventListener('wishlistUpdated', fetchCounts);
    };
  }, [session?.user?.id]);

  return (
    <div className="flex items-center space-x-2">

      {/* Wishlist */}
      <Link href="/dashboard?page=wishlist">
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
      </Link>

      {/* Notifications Dropdown */}
      <NotificationsDropdown />
    </div>
  );
}
