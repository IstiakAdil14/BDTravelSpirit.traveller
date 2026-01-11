'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { encodeTourIdClient } from '@/lib/utils/encodeTourId.client';

export default function PopularDestinationsCarousel() {
  const [destinations, setDestinations] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/popular-destinations')
      .then(res => res.json())
      .then(data => setDestinations(data.data || []));
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % destinations.length);
  }, [destinations.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + destinations.length) % destinations.length);
  }, [destinations.length]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleDestinationClick = useCallback((destinationId: string) => {
    const encodedTourId = encodeTourIdClient(destinationId);
    router.push(`/tours/${encodedTourId}`);
  }, [router]);

  useEffect(() => {
    if (destinations.length > 0) {
      const interval = setInterval(nextSlide, 4000);
      return () => clearInterval(interval);
    }
  }, [nextSlide, destinations.length]);

  if (destinations.length === 0) {
    return <div className="text-center py-8">Loading destinations...</div>;
  }

  const getCardTransform = (index: number) => {
    let offset = index - currentIndex;

    if (offset > destinations.length / 2) {
      offset -= destinations.length;
    } else if (offset < -destinations.length / 2) {
      offset += destinations.length;
    }

    const absOffset = Math.abs(offset);

    if (absOffset === 0) {
      return 'translateX(0) rotateY(0deg) scale(1) translateZ(0px)';
    } else if (absOffset === 1) {
      const rotate = offset > 0 ? -15 : 15;
      return `translateX(${offset * 340}px) rotateY(${rotate}deg) scale(0.9) translateZ(-30px)`;
    } else {
      const rotate = offset > 0 ? -35 : 35;
      return `translateX(${offset * 340}px) rotateY(${rotate}deg) scale(0.7) translateZ(-90px)`;
    }
  };

  const getCardZIndex = (index: number) => {
    let offset = index - currentIndex;
    if (offset > destinations.length / 2) {
      offset -= destinations.length;
    } else if (offset < -destinations.length / 2) {
      offset += destinations.length;
    }
    return 10 - Math.abs(offset);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8">
      <div
        className="relative h-96 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden"
        style={{ perspective: '1000px' }}
      >
        {destinations.map((destination: any, index: number) => (
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

      <div className="flex justify-center mt-8 space-x-2">
        {destinations.map((_, index) => (
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

