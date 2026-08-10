import { RouteAwareLoader } from '@/components/loaders';

export default function Loading() {
  return <RouteAwareLoader simulateProgress={true} />;
}
