'use client';

import { useState, useEffect, useCallback } from "react";
import HeroUI from './HeroUI';

const HeroClient = ({ slides: initialSlides }: { slides: any[] }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [slides] = useState<any[]>(initialSlides);


  useEffect(() => {
    if (isPaused || slides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length, isPaused]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  if (slides.length === 0) return null;

  return (
    <HeroUI
      slides={slides}
      stats={stats}
      currentSlide={currentSlide}
      isVisible={isVisible}
      isPaused={isPaused}
      onDotClick={handleDotClick}
    />
  );
};

export default HeroClient;
