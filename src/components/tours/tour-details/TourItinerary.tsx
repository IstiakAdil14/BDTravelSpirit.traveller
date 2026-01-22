'use client';

import { Calendar, MapPin, Clock, Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

interface TourItineraryProps {
  tour: any;
}

export default function TourItinerary({ tour }: TourItineraryProps) {
  const itinerary = tour.itinerary || [];

  if (itinerary.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Itinerary Available</h3>
          <p className="text-gray-600">The detailed itinerary for this tour is not yet available.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tour Itinerary</h2>
        <p className="text-gray-600">
          Detailed day-by-day breakdown of your {tour.duration?.days || itinerary.length} day adventure
        </p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-8">
          {itinerary.map((day: any, index: number) => (
            <div key={day.dayNumber || index} className="relative">
              {/* Timeline Dot */}
              <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-sm" />

              {/* Day Content */}
              <div className="ml-16">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Badge variant="default" className="text-sm">
                          Day {day.dayNumber}
                        </Badge>
                        {day.title && (
                          <CardTitle className="text-xl">{day.title}</CardTitle>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>Full Day</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent>
                    {/* Day Images */}
                    {day.images && day.images.length > 0 && (
                      <div className="mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {day.images.slice(0, 3).map((image: any, imgIndex: number) => (
                            <div key={imgIndex} className="relative h-48 rounded-lg overflow-hidden">
                              <Image
                                src={image.publicUrl}
                                alt={`Day ${day.dayNumber} - Image ${imgIndex + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                              />
                              {day.images.length > 3 && imgIndex === 2 && (
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                  <div className="text-white text-center">
                                    <Camera className="h-6 w-6 mx-auto mb-1" />
                                    <span className="text-sm">+{day.images.length - 3} more</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Day Description */}
                    {day.description && (
                      <div className="prose max-w-none">
                        <p className="text-gray-700 leading-relaxed">
                          {day.description}
                        </p>
                      </div>
                    )}

                    {/* Activities for this day (if available from destinations) */}
                    {tour.destinations && (
                      <div className="mt-6">
                        {tour.destinations
                          .filter((dest: any) => dest.activities && dest.activities.length > 0)
                          .slice(index, index + 1)
                          .map((dest: any, destIndex: number) => (
                            <div key={destIndex}>
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-gray-400" />
                                Activities in {dest.city || dest.country}
                              </h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {dest.activities.slice(0, 4).map((activity: any, actIndex: number) => (
                                  <div key={actIndex} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between mb-2">
                                      <h5 className="font-medium text-gray-900">{activity.title}</h5>
                                      {activity.duration && (
                                        <Badge variant="outline" className="text-xs">
                                          {activity.duration}
                                        </Badge>
                                      )}
                                    </div>
                                    {activity.provider && (
                                      <p className="text-sm text-gray-600 mb-2">
                                        by {activity.provider}
                                      </p>
                                    )}
                                    {activity.price && (
                                      <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-green-600">
                                          {activity.price.currency} {activity.price.amount}
                                        </span>
                                        {activity.rating && (
                                          <div className="flex items-center gap-1">
                                            <span className="text-sm text-gray-600">
                                              ⭐ {activity.rating}
                                            </span>
                                          </div>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Card */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="py-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-blue-900 mb-2">
              Your {tour.duration?.days || itinerary.length} Day Adventure Awaits!
            </h3>
            <p className="text-blue-700">
              This carefully crafted itinerary ensures you experience the best of each destination 
              while maintaining a comfortable pace throughout your journey.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}