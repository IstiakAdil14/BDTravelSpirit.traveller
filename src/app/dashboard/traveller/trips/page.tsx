import TripsContent from '@/components/dashboard/trips/TripsContent';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function TripsPage() {
  return (
    <DashboardLayout>
      <TripsContent userId="temp" />
    </DashboardLayout>
  );
}