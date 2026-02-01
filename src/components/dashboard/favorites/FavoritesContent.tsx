'use client';

import { motion } from 'framer-motion';
import { Heart, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FavoritesCollections from './FavoritesCollections';
import FavoritesList from './FavoritesList';

interface FavoritesContentProps {
  userId: string;
}

export default function FavoritesContent({ userId }: FavoritesContentProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
            My Favorites
          </h1>
          <p className="text-gray-600 mt-2">Your saved destinations and tours</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
            <Heart className="w-4 h-4 mr-2" />
            Browse Tours
          </Button>
        </div>
      </motion.div>

      <FavoritesCollections />
      <FavoritesList />
    </div>
  );
}