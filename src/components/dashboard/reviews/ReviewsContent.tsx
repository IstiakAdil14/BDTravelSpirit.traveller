'use client';

import { motion } from 'framer-motion';
import { Star, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ReviewsContentProps {
  userId: string;
}

export default function ReviewsContent({ userId }: ReviewsContentProps) {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
            My Reviews
          </h1>
          <p className="text-gray-600 mt-2">Share your travel experiences and help other travelers</p>
        </div>
        <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
          <Plus className="w-4 h-4 mr-2" />
          Write Review
        </Button>
      </motion.div>
      
      <div className="text-center py-16">
        <p className="text-gray-600">Reviews content for user: {userId}</p>
      </div>
    </div>
  );
}