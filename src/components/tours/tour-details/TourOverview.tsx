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
      <Card>
        <CardHeader>
          <CardTitle>Quick Facts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Duration */}
            {tour.duration && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold">Duration</div>
                  <div className="text-sm text-gray-600">
                    {tour.duration.days} days, {tour.duration.nights} nights
                  </div>
                </div>
              </div>
            )}

            {/* Group Size */}
            {tour.operatingWindows?.[0] && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="font-semibold">Group Size</div>
                  <div className="text-sm text-gray-600">
                    Up to {tour.operatingWindows[0].seatsTotal} people
                  </div>
                </div>
              </div>
            )}

            {/* Rating */}
            {tour.ratings && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Star className="h-5 w-5 text-yellow-600" />
                </div>
                <div>
                  <div className="font-semibold">Rating</div>
                  <div className="text-sm text-gray-600">
                    {tour.ratings.average.toFixed(1)}/5 ({tour.ratings.count} reviews)
                  </div>
                </div>
              </div>
            )}

            {/* Difficulty */}
            {tour.difficulty && (
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Shield className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="font-semibold">Difficulty</div>
                  <div className="text-sm text-gray-600 capitalize">
                    {tour.difficulty}
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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