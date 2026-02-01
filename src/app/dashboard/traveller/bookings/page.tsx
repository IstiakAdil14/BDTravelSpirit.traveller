import BookingsContent from '@/components/dashboard/bookings/BookingsContent';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function BookingsPage() {
  return (
    <DashboardLayout>
      <BookingsContent userId="temp" />
    </DashboardLayout>
  );
}