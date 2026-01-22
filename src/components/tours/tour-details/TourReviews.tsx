'use client';

import { Star, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TourReviews({ tour }: { tour: any }) {
  const staticReviews = [
    {
      _id: '1',
      userName: 'Sarah Ahmed',
      rating: 5,
      comment: 'Amazing experience! The beach was pristine and the guide was very knowledgeable.',
      createdAt: '2024-01-15',
      helpfulCount: 12
    },
    {
      _id: '2', 
      userName: 'Mohammad Rahman',
      rating: 4,
      comment: 'Great tour overall. Food was excellent and accommodation was comfortable.',
      createdAt: '2024-01-10',
      helpfulCount: 8
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reviews ({tour.ratings?.count || 0})</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="ml-1 font-semibold">{tour.ratings?.average || 0}</span>
            </div>
            <span className="text-gray-600">out of 5</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {staticReviews.map((review) => (
              <div key={review._id} className="border-b pb-4 last:border-b-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-semibold">{review.userName}</h4>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <Badge variant="outline">{review.createdAt}</Badge>
                </div>
                <p className="text-gray-700 mb-2">{review.comment}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <ThumbsUp className="h-4 w-4" />
                  <span>{review.helpfulCount} found this helpful</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}