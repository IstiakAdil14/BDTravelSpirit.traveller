'use client';

import React, { createContext, useContext, useState, useCallback, useRef, ReactNode } from 'react';
import TravelLoader from './TravelLoader';
import { LoaderMetadata } from './types';

type LoaderContextType = {
  isLoading: boolean;
  targetRoute: string | null;
  startLoading: (route: string) => void;
  stopLoading: () => void;
  loaderMetadataOverride: Partial<LoaderMetadata> | null;
  setLoaderMetadataOverride: (data: Partial<LoaderMetadata> | null) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export function LoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [targetRoute, setTargetRoute] = useState<string | null>(null);
  const [loaderMetadataOverride, setLoaderMetadataOverride] = useState<Partial<LoaderMetadata> | null>(null);
  const startTimeRef = useRef<number>(0);

  const startLoading = useCallback((route: string) => {
    setTargetRoute(route);
    setLoaderMetadataOverride(null);
    setIsLoading(true);
    startTimeRef.current = Date.now();
  }, []);

  const stopLoading = useCallback(() => {
    const elapsed = Date.now() - startTimeRef.current;
    const MINIMUM_TIME = 3000;

    const finalizeStop = () => {
      setIsLoading(false);
      setTimeout(() => setTargetRoute(null), 500); // Wait for exit animation
    };

    if (elapsed < MINIMUM_TIME) {
      setTimeout(finalizeStop, MINIMUM_TIME - elapsed);
    } else {
      finalizeStop();
    }
  }, []);

  return (
    <LoaderContext.Provider value={{ 
      isLoading, targetRoute, startLoading, stopLoading, 
      loaderMetadataOverride, setLoaderMetadataOverride 
    }}>
      {children}
      <TravelLoader />
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  const context = useContext(LoaderContext);
  if (context === undefined) {
    throw new Error('useLoader must be used within a LoaderProvider');
  }
  return context;
}
