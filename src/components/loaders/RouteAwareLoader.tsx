'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoader } from './LoaderProvider';

export default function RouteAwareLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { startLoading, stopLoading } = useLoader();
  const previousRoute = useRef<string | null>(null);

  useEffect(() => {
    const currentRoute = `${pathname}${searchParams ? `?${searchParams.toString()}` : ''}`;
    
    // Skip loader for auth routes
    if (pathname?.startsWith('/auth')) {
      previousRoute.current = currentRoute;
      return;
    }

    // Only trigger if we actually changed routes (prevent initial load trigger if not desired)
    if (previousRoute.current && previousRoute.current !== currentRoute) {
      startLoading(currentRoute);
      
      // We rely on the target page explicitly calling stopLoading() when its data finishes fetching.
      // E.g. via <LoaderDataInjector /> or inside ToursContent.tsx.
      // This is a safety fallback just in case a page forgets to call it.
      const timer = setTimeout(() => {
        stopLoading();
      }, 8000);

      return () => clearTimeout(timer);
    }

    previousRoute.current = currentRoute;
  }, [pathname, searchParams, startLoading, stopLoading]);

  return null; // This component just handles logic, no UI
}
