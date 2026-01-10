import { useRef, useEffect, useState } from "react";

export const useTestimonialsScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Drag-to-scroll functionality
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const handlePointerDown = (e: PointerEvent) => {
      setIsDragging(true);
      setStartX(e.pageX - scrollElement.offsetLeft);
      setScrollLeft(scrollElement.scrollLeft);
      scrollElement.classList.add('dragging');
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const x = e.pageX - scrollElement.offsetLeft;
      const walk = (x - startX) * 2; // Scroll speed multiplier
      scrollElement.scrollLeft = scrollLeft - walk;
    };

    const handlePointerUp = () => {
      setIsDragging(false);
      if (scrollElement) {
        scrollElement.classList.remove('dragging');
      }
    };

    scrollElement.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);

    return () => {
      scrollElement.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isDragging, startX, scrollLeft]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollRef.current) return;
      const scrollElement = scrollRef.current;
      const cardWidth = 320 + 24; // w-80 (320px) + gap (24px)

      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        scrollElement.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        scrollElement.scrollBy({ left: cardWidth, behavior: 'smooth' });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Scroll progress indicator
  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    const updateProgress = () => {
      const { scrollLeft, scrollWidth, clientWidth } = scrollElement;
      const progress = (scrollLeft / (scrollWidth - clientWidth)) * 100;
      setScrollProgress(progress);
    };

    scrollElement.addEventListener('scroll', updateProgress);
    updateProgress(); // Initial call

    return () => scrollElement.removeEventListener('scroll', updateProgress);
  }, []);

  // Scroll controls
  const scrollLeftControl = () => {
    if (scrollRef.current) {
      const cardWidth = 320 + 24;
      scrollRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  const scrollRightControl = () => {
    if (scrollRef.current) {
      const cardWidth = 320 + 24;
      scrollRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  return {
    scrollRef,
    scrollProgress,
    scrollLeftControl,
    scrollRightControl,
  };
};
