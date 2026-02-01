import PaymentsContent from '@/components/dashboard/payments/PaymentsContent';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface PaymentsPageProps {
  params: {
    userId: string;
  };
}

export default function PaymentsPage({ params }: PaymentsPageProps) {
  return (
    <DashboardLayout>
      <PaymentsContent userId={params.userId} />
    </DashboardLayout>
  );
}