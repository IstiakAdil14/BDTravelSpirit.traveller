import TripsContent from '@/components/dashboard/trips/TripsContent';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface TripsPageProps {
  params: {
    userId: string;
  };
}

export default function TripsPage({ params }: TripsPageProps) {
  return (
    <DashboardLayout>
      <TripsContent userId={params.userId} />
    </DashboardLayout>
  );
}