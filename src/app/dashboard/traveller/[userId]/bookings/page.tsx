import BookingsContent from '@/components/dashboard/bookings/BookingsContent';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface BookingsPageProps {
  params: {
    userId: string;
  };
}

export default function BookingsPage({ params }: BookingsPageProps) {
  return (
    <DashboardLayout>
      <BookingsContent userId={params.userId} />
    </DashboardLayout>
  );
}