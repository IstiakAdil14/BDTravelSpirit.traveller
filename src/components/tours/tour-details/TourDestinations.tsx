'use client';

import { useState } from 'react';
import { MapPin, Star, Clock, Camera, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

interface TourDestinationsProps {
  tour: any;
}

export default function TourDestinations({ tour }: TourDestinationsProps) {
  const [selectedDestination, setSelectedDestination] = useState(0);
  const destinations = tour.destinations || [];

  if (destinations.length === 0) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Destinations Listed</h3>
          <p className="text-gray-600">Destination details are not yet available for this tour.</p>
        </CardContent>
      </Card>
    );
  }

  const currentDestination = destinations[selectedDestination];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tour Destinations</h2>
        <p className="text-gray-600">
          Explore the amazing places you'll visit on this {destinations.length}-destination journey
        </p>
      </div>

      {/* Destination Navigation */}
      <div className="flex flex-wrap gap-2 justify-center mb-6">
        {destinations.map((dest: any, index: number) => (
          <Button
            key={index}
            variant={selectedDestination === index ? "default" : "outline"}
            onClick={() => setSelectedDestination(index)}
            className="flex items-center gap-2"
          >
            <MapPin className="h-4 w-4" />
            {dest.city || dest.country}
          </Button>
        ))}
      </div>

      {/* Selected Destination Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Destination Header */}
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <MapPin className="h-6 w-6 text-blue-500" />
                    {currentDestination.city && currentDestination.country 
                      ? `${currentDestination.city}, ${currentDestination.country}`
                      : currentDestination.country
                    }
                  </CardTitle>
                  {currentDestination.district && (
                    <p className="text-gray-600 mt-1">{currentDestination.district}</p>
                  )}
                </div>
                {currentDestination.coordinates && (
                  <Badge variant="outline">
                    {currentDestination.coordinates.lat.toFixed(4)}, {currentDestination.coordinates.lng.toFixed(4)}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {currentDestination.description && (
                <p className="text-gray-700 leading-relaxed mb-4">
                  {currentDestination.description}
                </p>
              )}
              
              {/* Content Blocks */}
              {currentDestination.content && currentDestination.content.length > 0 && (
                <div className="prose max-w-none">
                  {currentDestination.content.map((block: any, index: number) => (
                    <div key={index}>
                      {block.type === 'heading' && (
                        <h3 className="text-lg font-semibold text-gray-900 mt-4 mb-2">
                          {block.text}
                        </h3>
                      )}
                      {block.type === 'paragraph' && (
                        <p className="text-gray-700 mb-3">{block.text}</p>
                      )}
                      {block.type === 'link' && (
                        <a 
                          href={block.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 underline inline-flex items-center gap-1"
                        >
                          {block.text}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Highlights */}
          {currentDestination.highlights && currentDestination.highlights.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Destination Highlights</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentDestination.highlights.map((highlight: string, index: number) => (
                    <div key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Attractions */}
          {currentDestination.attractions && currentDestination.attractions.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Top Attractions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {currentDestination.attractions.map((attraction: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-semibold text-gray-900">{attraction.title}</h4>
                        {attraction.coordinates && (
                          <Badge variant="outline" className="text-xs">
                            <MapPin className="h-3 w-3 mr-1" />
                            Location
                          </Badge>
                        )}
                      </div>
                      
                      {attraction.description && (
                        <p className="text-gray-700 mb-3">{attraction.description}</p>
                      )}
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        {attraction.bestFor && (
                          <div>
                            <span className="font-medium text-gray-900">Best for:</span>
                            <span className="text-gray-600 ml-2">{attraction.bestFor}</span>
                          </div>
                        )}
                        {attraction.openingHours && (
                          <div>
                            <span className="font-medium text-gray-900">Hours:</span>
                            <span className="text-gray-600 ml-2">{attraction.openingHours}</span>
                          </div>
                        )}
                      </div>
                      
                      {attraction.insiderTip && (
                        <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <p className="text-sm text-yellow-800">
                            <strong>Insider Tip:</strong> {attraction.insiderTip}
                          </p>
                        </div>
                      )}
                      
                      {attraction.address && (
                        <div className="mt-3 flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span>{attraction.address}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Activities */}
          {currentDestination.activities && currentDestination.activities.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Available Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentDestination.activities.map((activity: any, index: number) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{activity.title}</h4>
                        {activity.duration && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {activity.duration}
                          </Badge>
                        )}
                      </div>
                      
                      {activity.provider && (
                        <p className="text-sm text-gray-600 mb-2">by {activity.provider}</p>
                      )}
                      
                      <div className="flex items-center justify-between">
                        {activity.price && (
                          <span className="text-sm font-medium text-green-600">
                            {activity.price.currency} {activity.price.amount}
                          </span>
                        )}
                        {activity.rating && (
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-sm text-gray-600">{activity.rating}</span>
                          </div>
                        )}
                      </div>
                      
                      {activity.url && (
                        <Button variant="outline" size="sm" className="w-full mt-3" asChild>
                          <a href={activity.url} target="_blank" rel="noopener noreferrer">
                            Learn More
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Destination Images */}
          {currentDestination.images && currentDestination.images.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Photos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-2">
                  {currentDestination.images.slice(0, 4).map((image: any, index: number) => (
                    <div key={index} className="relative h-24 rounded-lg overflow-hidden">
                      <Image
                        src={image.publicUrl}
                        alt={`${currentDestination.city || currentDestination.country} - ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
                {currentDestination.images.length > 4 && (
                  <p className="text-sm text-gray-600 text-center mt-2">
                    +{currentDestination.images.length - 4} more photos
                  </p>
                )}
              </CardContent>
            </Card>
          )}

          {/* Quick Facts */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Facts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-medium">{currentDestination.country}</span>
                </div>
                {currentDestination.region && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Region:</span>
                    <span className="font-medium">{currentDestination.region}</span>
                  </div>
                )}
                {currentDestination.attractions && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Attractions:</span>
                    <span className="font-medium">{currentDestination.attractions.length}</span>
                  </div>
                )}
                {currentDestination.activities && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Activities:</span>
                    <span className="font-medium">{currentDestination.activities.length}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}