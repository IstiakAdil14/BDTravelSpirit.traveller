'use client';

import { MapPin, Clock, Users, Star, Shield, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TourOverviewProps {
  tour: any;
}

export default function TourOverview({ tour }: TourOverviewProps) {
  const highlights = tour.destinations?.flatMap((dest: any) => dest.highlights || []) || [];
  
  return (
    <div className="space-y-8">
      {/* Quick Facts */}
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-2xl blur opacity-20"></div>
        <div className="relative bg-white/90 backdrop-blur-sm border border-white/50 rounded-2xl p-6 shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">⚡</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent">Quick Facts</h3>
              <p className="text-gray-600 text-sm">Essential tour information at a glance</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Duration */}
            {tour.duration && (
              <div className="group flex items-center gap-4 p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100 hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Duration</div>
                  <div className="text-sm text-blue-700 font-medium">
                    {tour.duration.days} days, {tour.duration.nights} nights
                  </div>
                </div>
              </div>
            )}

            {/* Group Size */}
            {tour.operatingWindows?.[0] && (
              <div className="group flex items-center gap-4 p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100 hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Group Size</div>
                  <div className="text-sm text-green-700 font-medium">
                    Up to {tour.operatingWindows[0].seatsTotal} people
                  </div>
                </div>
              </div>
            )}

            {/* Rating */}
            {tour.ratings && (
              <div className="group flex items-center gap-4 p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl border border-yellow-100 hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Rating</div>
                  <div className="text-sm text-yellow-700 font-medium">
                    {tour.ratings.average.toFixed(1)}/5 ({tour.ratings.count} reviews)
                  </div>
                </div>
              </div>
            )}

            {/* Difficulty */}
            {tour.difficulty && (
              <div className="group flex items-center gap-4 p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100 hover:shadow-lg transition-all duration-300">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="font-bold text-gray-900">Difficulty</div>
                  <div className="text-sm text-purple-700 font-medium capitalize">
                    {tour.difficulty}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Highlights */}
      {highlights.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tour Highlights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {highlights.slice(0, 8).map((highlight: string, index: number) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Description */}
      <Card>
        <CardHeader>
          <CardTitle>About This Tour</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <p className="text-gray-700 leading-relaxed">
              {tour.summary}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Audience & Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Perfect For */}
        {tour.audience && tour.audience.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Perfect For</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tour.audience.map((type: string) => (
                  <Badge key={type} variant="secondary" className="capitalize">
                    {type.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Categories */}
        {tour.categories && tour.categories.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Tour Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tour.categories.map((category: string) => (
                  <Badge key={category} variant="outline" className="capitalize">
                    {category.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Transport & Meeting Point */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Transportation */}
        {tour.transportModes && tour.transportModes.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Transportation</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {tour.transportModes.map((mode: string) => (
                  <div key={mode} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="capitalize">{mode.replace('_', ' ')}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Meeting Point */}
        {tour.meetingPoint && (
          <Card>
            <CardHeader>
              <CardTitle>Meeting Point</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <span className="text-gray-700">{tour.meetingPoint}</span>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Age & Accessibility */}
      <Card>
        <CardHeader>
          <CardTitle>Accessibility & Requirements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">Age Suitability</h4>
              <p className="text-gray-700 capitalize">
                {tour.ageSuitability || 'All ages welcome'}
              </p>
            </div>
            
            {tour.accessibility && (
              <div>
                <h4 className="font-semibold mb-2">Accessibility Features</h4>
                <div className="space-y-1">
                  {tour.accessibility.wheelchair && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">Wheelchair accessible</span>
                    </div>
                  )}
                  {tour.accessibility.familyFriendly && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">Family friendly</span>
                    </div>
                  )}
                  {tour.accessibility.petFriendly && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span className="text-sm">Pet friendly</span>
                    </div>
                  )}
                  {tour.accessibility.notes && (
                    <p className="text-sm text-gray-600 mt-2">
                      {tour.accessibility.notes}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}