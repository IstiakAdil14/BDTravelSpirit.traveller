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
      <div className="text-center py-20">
        <div className="w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Calendar className="h-10 w-10 text-purple-500" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No Itinerary Available</h3>
        <p className="text-gray-600 max-w-md mx-auto">The detailed itinerary for this tour is not yet available. Contact us for more information.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 px-6 py-3 rounded-full mb-6">
          <span className="text-2xl">🗺️</span>
          <span className="font-bold text-gray-700">Detailed Itinerary</span>
        </div>
        <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 via-purple-900 to-pink-900 bg-clip-text text-transparent mb-4">
          Your Journey Unfolds
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Experience every moment of your {tour.duration?.days || itinerary.length} day adventure with our carefully crafted itinerary
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-60" />
        <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-pink-400 rounded-full animate-pulse" />

        <div className="space-y-10">
          {itinerary.map((day: any, index: number) => {
            const gradients = [
              'from-blue-500 to-cyan-500',
              'from-purple-500 to-pink-500', 
              'from-green-500 to-emerald-500',
              'from-orange-500 to-red-500',
              'from-indigo-500 to-purple-500',
              'from-teal-500 to-cyan-500'
            ];
            const gradient = gradients[index % gradients.length];
            
            return (
              <div key={day.dayNumber || index} className="relative group">
                <div className={`absolute left-6 w-6 h-6 bg-gradient-to-r ${gradient} rounded-full border-4 border-white shadow-xl z-10 group-hover:scale-125 transition-transform duration-300`}>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-white/30 to-transparent" />
                </div>

                <div className="ml-20">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    <div className="relative bg-white/95 backdrop-blur-sm border border-white/50 rounded-2xl shadow-xl overflow-hidden">
                      <div className={`bg-gradient-to-r ${gradient} p-6 text-white`}>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full font-bold text-lg">
                              Day {day.dayNumber}
                            </div>
                            {day.title && (
                              <h3 className="text-2xl font-bold">{day.title}</h3>
                            )}
                          </div>
                          <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            <Clock className="h-4 w-4" />
                            <span className="text-sm font-medium">Full Day Experience</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-6">
                        {day.images && day.images.length > 0 && (
                          <div className="mb-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {day.images.slice(0, 3).map((image: any, imgIndex: number) => (
                                <div key={imgIndex} className="relative h-48 rounded-xl overflow-hidden">
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

                        {day.description && (
                          <div className="prose max-w-none">
                            <p className="text-gray-700 leading-relaxed text-lg">
                              {day.description}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative">
        <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/20 via-purple-400/20 to-pink-400/20 rounded-2xl blur"></div>
        <div className="relative bg-gradient-to-br from-blue-50 via-purple-50/30 to-pink-50/30 backdrop-blur-sm border border-blue-200/50 rounded-2xl p-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-2xl">🎯</span>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
              Your {tour.duration?.days || itinerary.length} Day Adventure Awaits!
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto text-lg">
              This carefully crafted itinerary ensures you experience the best of each destination 
              while maintaining a comfortable pace throughout your journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}