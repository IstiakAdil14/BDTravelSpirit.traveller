'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, MapPin, Calendar, Users, Share2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

interface TourHeroProps {
  tour: any;
}

export default function TourHero({ tour }: TourHeroProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Get destination images from populated Asset objects
  const destinationImgs = tour.destinations?.flatMap((d: any) => 
    d.images?.map((img: any) => img.publicUrl).filter(Boolean) || []
  ) || [];
  
  const heroImg = tour.heroImage?.publicUrl;
  
  // Use destination images first, fallback to hero
  const images = destinationImgs.length > 0 ? destinationImgs : (heroImg ? [heroImg] : []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: tour.title,
          text: tour.summary,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Image Carousel */}
      <div className="relative group">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent className="-ml-0">
            {images.length > 0 ? (
              images.map((image: string, index: number) => (
                <CarouselItem key={index} className="pl-0">
                  <div className="relative h-96 md:h-[500px] w-full">
                    <Image
                      src={image}
                      alt={`${tour.title} - Location ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem className="pl-0">
                <div className="w-full h-96 md:h-[500px] bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No image available</span>
                </div>
              </CarouselItem>
            )}
          </CarouselContent>

          {images.length > 1 && (
            <>
              <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white border-0 shadow-lg" />
              <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white border-0 shadow-lg" />
            </>
          )}
        </Carousel>

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
            {current} / {count}
          </div>
        )}

        {/* Action Buttons Overlay */}
        <div className="absolute top-4 right-4 flex space-x-2 z-10">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setIsWishlisted(!isWishlisted)}
            className="bg-white/90 hover:bg-white shadow-sm"
          >
            <Heart className={`h-4 w-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handleShare}
            className="bg-white/90 hover:bg-white shadow-sm"
          >
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Tour Information */}
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            {/* Categories */}
            {tour.categories && tour.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {tour.categories.map((category: string) => (
                  <Badge key={category} variant="secondary" className="capitalize">
                    {category.replace('_', ' ')}
                  </Badge>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {tour.title}
            </h1>

            {/* Rating and Reviews */}
            {tour.ratings && (
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{tour.ratings.average.toFixed(1)}</span>
                  <span className="text-gray-600">({tour.ratings.count} reviews)</span>
                </div>
                {tour.wishlistCount > 0 && (
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{tour.wishlistCount} wishlisted</span>
                  </div>
                )}
              </div>
            )}

            {/* Key Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Location */}
              {tour.mainLocation && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">
                    {tour.mainLocation.address?.city}, {tour.mainLocation.address?.country}
                  </span>
                </div>
              )}

              {/* Duration */}
              {tour.duration && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">
                    {tour.duration.days} days, {tour.duration.nights} nights
                  </span>
                </div>
              )}

              {/* Group Size */}
              {tour.operatingWindows && tour.operatingWindows[0] && (
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">
                    Up to {tour.operatingWindows[0].seatsTotal} travelers
                  </span>
                </div>
              )}
            </div>

            {/* Summary */}
            {tour.summary && (
              <p className="text-gray-700 text-lg leading-relaxed">
                {tour.summary}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="text-right">
            <div className="text-3xl font-bold text-gray-900">
              {tour.basePrice?.currency} {tour.basePrice?.amount?.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">per person</div>

            {/* Discounts */}
            {tour.discounts && tour.discounts.length > 0 && (
              <div className="mt-2">
                {tour.discounts.map((discount: any, index: number) => (
                  <Badge key={index} variant="destructive" className="text-xs">
                    {discount.value}% OFF
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Additional Badges */}
        <div className="flex flex-wrap gap-2 mt-6">
          {tour.isFeatured && (
            <Badge variant="default">Featured</Badge>
          )}
          {tour.difficulty && (
            <Badge variant="outline" className="capitalize">
              {tour.difficulty} difficulty
            </Badge>
          )}
          {tour.bestSeason && tour.bestSeason.length > 0 && (
            <Badge variant="outline">
              Best: {tour.bestSeason.join(', ')}
            </Badge>
          )}
          {tour.accessibility?.wheelchair && (
            <Badge variant="outline">Wheelchair accessible</Badge>
          )}
          {tour.accessibility?.familyFriendly && (
            <Badge variant="outline">Family friendly</Badge>
          )}
        </div>
      </div>
    </div>
  );
}