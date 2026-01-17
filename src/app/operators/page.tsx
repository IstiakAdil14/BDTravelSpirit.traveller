import { Suspense } from 'react';
import OperatorsContent from '@/components/operators/OperatorsContent';
import OperatorsSkeleton from '@/components/operators/OperatorsSkeleton';

export const metadata = {
  title: 'All Tour Operators | BD Travel Spirit',
  description: 'Explore trusted and verified tour operators across Bangladesh. Find the perfect operator for your next adventure.',
};

export default function OperatorsPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Suspense fallback={<OperatorsSkeleton />}>
        <OperatorsContent />
      </Suspense>
    </main>
  );
}