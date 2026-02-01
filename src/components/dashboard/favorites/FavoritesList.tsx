'use client';

import { motion } from 'framer-motion';
import { MapPin, Star, Calendar, Heart, ShoppingCart, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const favorites = [
  {
    id: '1',
    name: 'Bandarban Hill Tracts Adventure',
    location: 'Bandarban, Chittagong',
    price: '৳15,000',
    originalPrice: '৳18,000',
    rating: 4.8,
    reviews: 124,
    duration: '4 days',
    category: 'Adventure',
    discount: 17,
    addedDate: '2024-11-01'
  },
  {
    id: '2',
    name: 'Rangamati Lake Cruise',
    location: 'Rangamati, Chittagong',
    price: '৳8,500',
    rating: 4.6,
    reviews: 89,
    duration: '2 days',
    category: 'Nature',
    addedDate: '2024-10-28'
  },
  {
    id: '3',
    name: 'Paharpur Buddhist Monastery',
    location: 'Naogaon, Rajshahi',
    price: '৳12,000',
    rating: 4.7,
    reviews: 67,
    duration: '3 days',
    category: 'Cultural',
    addedDate: '2024-10-25'
  }
];

export default function FavoritesList() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Saved Tours ({favorites.length})</h2>
        <p className="text-sm text-gray-600">Added recently</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {favorites.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
          >
            <Card className="professional-card border-0 overflow-hidden group hover:shadow-professional-lg transition-all duration-300">
              {/* Image */}
              <div className="relative h-48 bg-gradient-to-r from-rose-400 to-pink-500">
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-gray-900 border-0">
                    {item.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                    <Heart className="w-4 h-4 fill-current" />
                  </Button>
                </div>
                {item.discount && (
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-red-500 text-white border-0">
                      {item.discount}% OFF
                    </Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900 group-hover:text-rose-600 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-600 flex items-center gap-1 mt-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-500 fill-current" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({item.reviews} reviews)</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {item.duration}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">{item.price}</span>
                      {item.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">{item.originalPrice}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500">
                      Added {new Date(item.addedDate).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Book Now
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-200 text-gray-600 hover:bg-gray-50">
                      <Trash2 className="w-4 h-4" />
                    </Button>
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