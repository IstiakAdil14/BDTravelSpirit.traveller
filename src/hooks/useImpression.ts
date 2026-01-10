import { useEffect, useRef } from 'react';
import { AnalyticsEvent } from '@/types/destination';

interface UseImpressionOptions {
  threshold?: number;
  rootMargin?: string;
  variant: string;
  destinationId: string;
  index: number;
  onImpression?: (event: AnalyticsEvent) => void;
}

export function useImpression({
  threshold = 0.5,
  rootMargin = '0px',
  variant,
  destinationId,
  index,
  onImpression,
}: UseImpressionOptions) {
  const elementRef = useRef<HTMLElement>(null);
  const hasImpressed = useRef(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasImpressed.current) {
            hasImpressed.current = true;

            const event: AnalyticsEvent = {
              event: 'impression',
              variant,
              destinationId,
              index,
              timestamp: Date.now(),
            };

            // Log to console in development
            if (process.env.NODE_ENV === 'development') {
              console.log('Analytics Event:', event);
            }

            // Call the callback if provided
            onImpression?.(event);

            // Disconnect observer after first impression
            observer.disconnect();
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, variant, destinationId, index, onImpression]);

  return elementRef;
}
