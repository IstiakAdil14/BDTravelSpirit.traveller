'use client';

import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const collections = [
  { name: 'Beach Destinations', count: 5, color: 'from-blue-500 to-cyan-500' },
  { name: 'Adventure Tours', count: 8, color: 'from-emerald-500 to-teal-500' },
  { name: 'Cultural Sites', count: 3, color: 'from-purple-500 to-violet-500' },
  { name: 'Hill Stations', count: 6, color: 'from-amber-500 to-orange-500' }
];

export default function FavoritesCollections() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <h2 className="text-xl font-bold text-gray-900 mb-4">Collections</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {collections.map((collection, index) => (
          <motion.div
            key={collection.name}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="professional-card border-0 cursor-pointer hover:shadow-professional transition-all duration-300 group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-rose-600 transition-colors">
                      {collection.name}
                    </h3>
                    <p className="text-sm text-gray-600">{collection.count} items</p>
                  </div>
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${collection.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}