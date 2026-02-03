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

  const destinationImgs = tour.destinations?.flatMap((d: any) => 
    d.images?.map((img: any) => img.publicUrl).filter(Boolean) || []
  ) || [];
  
  const heroImg = tour.seo?.ogImage || tour.heroImage?.publicUrl;
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
    <div className="relative group">
      <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-all duration-1000"></div>
      
      <div className="relative bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl shadow-blue-500/10 overflow-hidden">
        <div className="relative group/carousel">
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent className="-ml-0">
              {images.length > 0 ? (
                images.map((image: string, index: number) => (
                  <CarouselItem key={index} className="pl-0">
                    <div className="relative h-96 md:h-[500px] w-full overflow-hidden">
                      <Image
                        src={image}
                        alt={`${tour.title} - Location ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover/carousel:scale-110"
                        priority={index === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10" />
                      
                      <div className="absolute inset-0 opacity-30">
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping delay-0"></div>
                        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-white rounded-full animate-ping delay-1000"></div>
                        <div className="absolute bottom-1/3 left-2/3 w-1.5 h-1.5 bg-white rounded-full animate-ping delay-2000"></div>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <CarouselItem className="pl-0">
                  <div className="w-full h-96 md:h-[500px] bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0">
                      <div className="absolute top-10 left-10 w-20 h-20 bg-blue-200/30 rounded-full blur-xl animate-pulse"></div>
                      <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-200/30 rounded-full blur-xl animate-pulse delay-1000"></div>
                    </div>
                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-3xl">🏞️</span>
                      </div>
                      <span className="text-gray-600 font-semibold text-lg">Stunning visuals coming soon</span>
                      <p className="text-gray-500 text-sm mt-2">Experience awaits</p>
                    </div>
                  </div>
                </CarouselItem>
              )}
            </CarouselContent>

            {images.length > 1 && (
              <>
                <CarouselPrevious className="left-6 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-md hover:bg-white border-0 shadow-2xl shadow-black/20 w-12 h-12 hover:scale-110" />
                <CarouselNext className="right-6 opacity-0 group-hover/carousel:opacity-100 transition-all duration-300 bg-white/90 backdrop-blur-md hover:bg-white border-0 shadow-2xl shadow-black/20 w-12 h-12 hover:scale-110" />
              </>
            )}
          </Carousel>

          {images.length > 1 && (
            <div className="absolute bottom-6 left-6">
              <div className="bg-black/60 backdrop-blur-xl text-white px-4 py-2 rounded-full text-sm font-semibold border border-white/20 shadow-2xl">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  <span>📷 {current} / {count}</span>
                </div>
              </div>
            </div>
          )}

          <div className="absolute top-6 right-6 flex space-x-3 z-10">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="bg-white/90 backdrop-blur-xl hover:bg-white shadow-2xl border-0 transition-all duration-300 hover:scale-110 w-12 h-12 p-0 rounded-full group"
            >
              <Heart className={`h-5 w-5 transition-all duration-300 ${
                isWishlisted 
                  ? 'fill-red-500 text-red-500 scale-110' 
                  : 'text-gray-600 group-hover:text-red-400 group-hover:scale-110'
              }`} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleShare}
              className="bg-white/90 backdrop-blur-xl hover:bg-white shadow-2xl border-0 transition-all duration-300 hover:scale-110 w-12 h-12 p-0 rounded-full group"
            >
              <Share2 className="h-5 w-5 text-gray-600 group-hover:text-blue-500 transition-all duration-300 group-hover:scale-110" />
            </Button>
          </div>
        </div>

        <div className="p-10 relative">
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500 to-transparent rounded-full blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-8">
              <div className="flex-1 min-w-0">
                {tour.categories && tour.categories.length > 0 && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {tour.categories.map((category: string) => (
                      <Badge key={category} className="capitalize bg-gradient-to-r from-blue-500/10 to-purple-500/10 text-blue-700 border-blue-200/50 hover:from-blue-500/20 hover:to-purple-500/20 transition-all duration-300 px-4 py-1.5 text-sm font-semibold backdrop-blur-sm">
                        {category.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                )}

                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-8 leading-tight">
                  {tour.title}
                </h1>

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

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {tour.mainLocation && (
                    <div className="flex items-center gap-2">
                      <MapPin className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">
                        {tour.mainLocation.address?.city}, {tour.mainLocation.address?.country}
                      </span>
                    </div>
                  )}

                  {tour.duration && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">
                        {tour.duration.days} days, {tour.duration.nights} nights
                      </span>
                    </div>
                  )}

                  {tour.operatingWindows && tour.operatingWindows[0] && (
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-700">
                        Up to {tour.operatingWindows[0].seatsTotal} travelers
                      </span>
                    </div>
                  )}
                </div>

                {tour.summary && (
                  <p className="text-gray-700 text-lg leading-relaxed">
                    {tour.summary}
                  </p>
                )}
              </div>

              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 rounded-2xl blur opacity-20 animate-pulse"></div>
                <div className="relative bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-8 rounded-2xl border border-green-200/50 backdrop-blur-sm shadow-xl shadow-green-500/10">
                  <div className="text-center">
                    <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-2">
                      {tour.basePrice?.currency} {tour.basePrice?.amount?.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 font-semibold mb-4">per person</div>
                    
                    <div className="flex items-center justify-center gap-2 text-xs text-green-700 mb-4">
                      <span className="bg-green-100 px-2 py-1 rounded-full">✨ Best Value</span>
                      <span className="bg-emerald-100 px-2 py-1 rounded-full">🔥 Popular</span>
                    </div>

                    {tour.discounts && tour.discounts.length > 0 && (
                      <div className="space-y-2">
                        {tour.discounts.map((discount: any, index: number) => (
                          <Badge key={index} className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2">
                            🎉 Save {discount.value}% - Limited Time!
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-10 pt-8 border-t border-gray-200">
              {tour.isFeatured && (
                <Badge className="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-2 text-sm font-semibold">
                  ✨ Featured Experience
                </Badge>
              )}
              {tour.difficulty && (
                <Badge className="bg-gradient-to-r from-orange-100 to-red-100 border-orange-200 text-orange-800 hover:from-orange-200 hover:to-red-200 transition-all duration-300 px-4 py-2">
                  🏔️ {tour.difficulty} difficulty
                </Badge>
              )}
              {tour.bestSeason && tour.bestSeason.length > 0 && (
                <Badge className="bg-gradient-to-r from-green-100 to-emerald-100 border-green-200 text-green-800 hover:from-green-200 hover:to-emerald-200 transition-all duration-300 px-4 py-2">
                  🌿 Best: {tour.bestSeason.join(', ')}
                </Badge>
              )}
              {tour.accessibility?.wheelchair && (
                <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-200 text-blue-800 hover:from-blue-200 hover:to-cyan-200 transition-all duration-300 px-4 py-2">
                  ♿ Wheelchair accessible
                </Badge>
              )}
              {tour.accessibility?.familyFriendly && (
                <Badge className="bg-gradient-to-r from-pink-100 to-purple-100 border-pink-200 text-pink-800 hover:from-pink-200 hover:to-purple-200 transition-all duration-300 px-4 py-2">
                  👨👩👧👦 Family friendly
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}