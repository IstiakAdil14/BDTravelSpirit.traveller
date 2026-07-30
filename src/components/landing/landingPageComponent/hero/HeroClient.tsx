'use client';

import { useState, useEffect, useCallback } from "react";
import HeroUI from './HeroUI';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  alt: string;
  _id?: string;
  isActive?: boolean;
  order?: number;
}

const HeroClient = ({ slides: initialSlides }: { slides: Slide[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [slides, setSlides] = useState<Slide[]>(initialSlides);

  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const defaultSlides: Slide[] = [
    {
      image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?q=80&w=1920",
      title: "Discover The Beauty of Bangladesh",
      subtitle: "Experience ancient temples, pristine beaches, lush tea gardens, and vibrant culture in the land of rivers.",
      alt: "Bangladesh landscape with rivers and greenery"
    },
    {
      image: "https://images.unsplash.com/photo-1629904853716-f0bc54eea481?q=80&w=1920",
      title: "Adventure Awaits You",
      subtitle: "From the Sundarbans to Cox's Bazar, explore nature's wonders and create memories that last a lifetime.",
      alt: "Sundarbans mangrove forest wildlife"
    }
  ];

  const stats = [
    { number: 64, label: "Districts", suffix: "+" },
    { number: 5, label: "UNESCO Sites", suffix: "+" },
    { number: 50, label: "Tour Guides", suffix: "+" },
    { number: 10, label: "Happy Travelers", suffix: "+" },
  ];

  const handleDotClick = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  }, []);

  const displaySlides = slides.length > 0 ? slides : defaultSlides;

  return (
    <HeroUI
      slides={displaySlides}
      stats={stats}
      currentSlide={currentSlide}
      isVisible={isVisible}
      isPaused={isPaused}
      onDotClick={handleDotClick}
    />
  );
};

export default HeroClient;
