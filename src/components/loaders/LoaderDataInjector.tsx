'use client';

import { useEffect } from 'react';
import { useLoader } from './LoaderProvider';
import { LoaderMetadata } from './types';

export default function LoaderDataInjector({ metadata }: { metadata: Partial<LoaderMetadata> }) {
  const { setLoaderMetadataOverride, stopLoading } = useLoader();

  useEffect(() => {
    if (metadata) {
      setLoaderMetadataOverride(metadata);
      
      // We can confidently stop the loader now to transition to the actual page.
      // We add a 3 second delay here so the user has time to appreciate the gorgeous dynamic data!
      const timer = setTimeout(() => {
        stopLoading();
      }, 2000);

      return () => clearTimeout(timer);
    }
    
    // Cleanup override when unmounting if navigating away
    return () => {
      // Actually we don't need to clean up here, startLoading clears it.
    };
  }, [metadata, setLoaderMetadataOverride, stopLoading]);

  return null;
}
