'use client';

import { Star, ThumbsUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function TourReviews({ tour }: { tour: any }) {
  const reviews = tour.reviews || [];

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
          {reviews.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No reviews yet. Be the first to review this tour!
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review: any) => (
                <div key={review._id} className="border-b pb-4 last:border-b-0">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold">{review.userName || 'Anonymous'}</h4>
                      <div className="flex items-center gap-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < (review.rating || 5) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    {review.createdAt && (
                      <Badge variant="outline">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-700 mb-2">{review.comment}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.helpfulCount || 0} found this helpful</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}