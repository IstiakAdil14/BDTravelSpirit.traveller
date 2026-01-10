'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { encodeTourIdClient } from '@/lib/utils/encodeTourId.client';

// Base destination data
const baseDestinations = [
  {
    id: '1',
    name: 'Cox\'s Bazar',
    country: 'Bangladesh',
    region: 'Chittagong',
    description: 'World\'s longest natural sea beach',
    image: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Cox\'s Bazar beach',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 45,
      avgPrice: 120,
      rating: 4.5,
      reviewCount: 1250,
      popularityScore: 95,
    },
    season: {
      bestSeason: 'November to February',
      months: ['11', '12', '01', '02'],
    },
    tags: ['beach', 'sea', 'sunset'],
    category: 'beach',
    featured: true,
    coordinates: { lat: 21.4272, lng: 92.0058 },
  },
  {
    id: '2',
    name: 'Saint Martin\'s Island',
    country: 'Bangladesh',
    region: 'Cox\'s Bazar',
    description: 'Small coral island with pristine beaches and clear waters',
    image: {
      src: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
      alt: 'Saint Martin\'s Island beach',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 15,
      avgPrice: 95,
      rating: 4.4,
      reviewCount: 720,
      popularityScore: 90,
    },
    season: {
      bestSeason: 'October to March',
      months: ['10', '11', '12', '01', '02', '03'],
    },
    tags: ['beach', 'island', 'coral'],
    category: 'beach',
    featured: true,
    coordinates: { lat: 20.6225, lng: 92.3208 },
  },
  {
    id: '3',
    name: 'Dhaka',
    country: 'Bangladesh',
    region: 'Dhaka',
    description: 'Capital city with rich history and culture',
    image: {
      src: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop',
      alt: 'Dhaka cityscape',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 78,
      avgPrice: 150,
      rating: 4.2,
      reviewCount: 2100,
      popularityScore: 92,
    },
    season: {
      bestSeason: 'November to February',
      months: ['11', '12', '01', '02'],
    },
    tags: ['city', 'culture', 'history'],
    category: 'urban',
    featured: true,
    coordinates: { lat: 23.8103, lng: 90.4125 },
  },
  {
    id: '4',
    name: 'Sajek Valley',
    country: 'Bangladesh',
    region: 'Rangamati',
    description: 'Cloud-kissed valley with breathtaking mountain views',
    image: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Sajek Valley mountains',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 20,
      avgPrice: 100,
      rating: 4.6,
      reviewCount: 850,
      popularityScore: 88,
    },
    season: {
      bestSeason: 'October to March',
      months: ['10', '11', '12', '01', '02', '03'],
    },
    tags: ['mountains', 'valley', 'clouds'],
    category: 'nature',
    featured: true,
    coordinates: { lat: 23.3833, lng: 92.2833 },
  },
  {
    id: '5',
    name: 'Sundarbans',
    country: 'Bangladesh',
    region: 'Khulna',
    description: 'UNESCO World Heritage mangrove forest and wildlife sanctuary',
    image: {
      src: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop',
      alt: 'Sundarbans mangrove',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 25,
      avgPrice: 80,
      rating: 4.1,
      reviewCount: 480,
      popularityScore: 82,
    },
    season: {
      bestSeason: 'October to March',
      months: ['10', '11', '12', '01', '02', '03'],
    },
    tags: ['mangrove', 'wildlife', 'boat'],
    category: 'nature',
    featured: true,
    coordinates: { lat: 21.9497, lng: 89.1833 },
  },
  {
    id: '6',
    name: 'Bandarban',
    country: 'Bangladesh',
    region: 'Bandarban',
    description: 'Hill district with tribal culture and scenic landscapes',
    image: {
      src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      alt: 'Bandarban hills',
      width: 800,
      height: 600,
    },
    stats: {
      hotelCount: 18,
      avgPrice: 85,
      rating: 4.3,
      reviewCount: 620,
      popularityScore: 86,
    },
    season: {
      bestSeason: 'November to February',
      months: ['11', '12', '01', '02'],
    },
    tags: ['hills', 'tribal', 'culture'],
    category: 'nature',
    featured: true,
    coordinates: { lat: 22.1953, lng: 92.2189 },
  },
];

export default function PopularDestinationsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % baseDestinations.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + baseDestinations.length) % baseDestinations.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleDestinationClick = useCallback((destinationId: string) => {
    // Use destination ID directly as tour ID
    const encodedTourId = encodeTourIdClient(destinationId);
    router.push(`/tours/${encodedTourId}`);
  }, [router]);

  useEffect(() => {
    const interval = setInterval(nextSlide, 4000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  const getCardTransform = (index: number) => {
    let offset = index - currentIndex;

    // Handle wrapping for smooth circular movement
    if (offset > baseDestinations.length / 2) {
      offset -= baseDestinations.length;
    } else if (offset < -baseDestinations.length / 2) {
      offset += baseDestinations.length;
    }

    const absOffset = Math.abs(offset);

    if (absOffset === 0) {
      return 'translateX(0) rotateY(0deg) scale(1) translateZ(0px)';
    } else if (absOffset === 1) {
      const rotate = offset > 0 ? -15 : 15;
      return `translateX(${offset * 340}px) rotateY(${rotate}deg) scale(0.9) translateZ(-30px)`;
    } else if (absOffset === 2) {
      const rotate = offset > 0 ? -25 : 25;
      return `translateX(${offset * 340}px) rotateY(${rotate}deg) scale(0.8) translateZ(-60px)`;
    } else {
      const rotate = offset > 0 ? -35 : 35;
      return `translateX(${offset * 340}px) rotateY(${rotate}deg) scale(0.7) translateZ(-90px)`;
    }
  };

  const getCardZIndex = (index: number) => {
    let offset = index - currentIndex;
    if (offset > baseDestinations.length / 2) {
      offset -= baseDestinations.length;
    } else if (offset < -baseDestinations.length / 2) {
      offset += baseDestinations.length;
    }
    return 10 - Math.abs(offset);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      {/* Carousel Container */}
      <div
        className="relative h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {baseDestinations.map((destination, index) => (
          <div
            key={destination.id}
            className="absolute w-80 h-96 rounded-3xl shadow-xl overflow-hidden transition-all duration-700 ease-in-out cursor-pointer hover:shadow-2xl"
            style={{
              transform: getCardTransform(index),
              zIndex: getCardZIndex(index),
              transformStyle: 'preserve-3d',
            }}
            onClick={() => handleDestinationClick(destination.id)}
          >
            <Image
              src={destination.image.src}
              alt={destination.image.alt}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-2xl font-bold mb-1">{destination.name}</h3>
              <p className="text-sm opacity-90 mb-2">{destination.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span>★ {destination.stats.rating}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        suppressHydrationWarning={true}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20"
        onClick={prevSlide}
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>
      <button
        suppressHydrationWarning={true}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-lg transition-all hover:scale-110 z-20"
        onClick={nextSlide}
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Dot Indicators */}
      <div className="flex justify-center mt-8 space-x-2">
        {baseDestinations.map((_, index) => (
          <button
            suppressHydrationWarning={true}
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-400'
              }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}