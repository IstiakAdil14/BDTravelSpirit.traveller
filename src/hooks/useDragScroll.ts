import { useRef, useEffect, useState } from 'react';

interface UseDragScrollOptions {
  scrollSpeed?: number;
}

export function useDragScroll(options: UseDragScrollOptions = {}) {
  const { scrollSpeed = 1 } = options;

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;

    e.preventDefault();
    const x = e.pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * scrollSpeed;

    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Touch events for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0));
    setScrollLeft(scrollRef.current?.scrollLeft || 0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;

    const x = e.touches[0].pageX - (scrollRef.current?.offsetLeft || 0);
    const walk = (x - startX) * scrollSpeed;

    if (scrollRef.current) {
      scrollRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!scrollRef.current) return;

    const scrollAmount = 320; // Card width + gap

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        scrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        break;
      case 'ArrowRight':
        e.preventDefault();
        scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        break;
      case 'Home':
        e.preventDefault();
        scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        break;
      case 'End':
        e.preventDefault();
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollWidth, behavior: 'smooth' });
        break;
    }
  };

  // Scroll to specific position
  const scrollToIndex = (index: number, smooth = true) => {
    if (!scrollRef.current) return;

    const cardWidth = 320; // Assuming card width
    const gap = 16; // Assuming gap
    const scrollPosition = index * (cardWidth + gap);

    scrollRef.current.scrollTo({
      left: scrollPosition,
      behavior: smooth ? 'smooth' : 'auto',
    });
  };

  // Get current scroll index
  const getCurrentIndex = (): number => {
    if (!scrollRef.current) return 0;

    const cardWidth = 320;
    const gap = 16;
    const cardWidthWithGap = cardWidth + gap;

    return Math.round(scrollRef.current.scrollLeft / cardWidthWithGap);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mouseup', handleGlobalMouseUp);
      document.addEventListener('mouseleave', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseUp);
    };
  }, [isDragging]);

  return {
    scrollRef,
    isDragging,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleKeyDown,
    scrollToIndex,
    getCurrentIndex,
  };
}
