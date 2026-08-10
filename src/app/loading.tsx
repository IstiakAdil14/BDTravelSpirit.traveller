import { RouteAwareLoader } from '@/components/loaders';
import { Suspense } from 'react';

export default function Loading() {
  return (
    <Suspense fallback={null}>
      <RouteAwareLoader />
    </Suspense>
  );
}
