'use client';

import { useState, useEffect, useCallback } from "react";
import HeroUI from './HeroUI';

const HeroClient = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const slides = [
    {
      image: "/images/hero_img/hero_img_1.jpg",
      title: "Discover Bangladesh",
      subtitle: "Authentic experiences await",
      alt: "Scenic view of Bangladesh landscape"
    },
    {
      image: "/images/hero_img/hero_img_2.png",
      title: "Heritage & Adventure",
      subtitle: "Explore the heart of Bengal",
      alt: "Cultural heritage sites of Bangladesh"
    },
    {
      image: "/images/hero_img/hero_img_3.png",
      title: "Sustainable & Tourism",
      subtitle: "Travel responsibly, experience deeply",
      alt: "Sustainable tourism in Bangladesh"
    },
  ];

  useEffect(() => {
    if (isPaused) return;

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
    { number: 15, label: "UNESCO Sites", suffix: "+" },
    { number: 500, label: "Tour Guides", suffix: "+" },
    { number: 10000, label: "Happy Travelers", suffix: "+" },
  ];

  const handleDotClick = useCallback((index: number) => {
    setCurrentSlide(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), 3000);
  }, []);

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
