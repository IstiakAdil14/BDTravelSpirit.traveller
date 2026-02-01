import ReviewsContent from '@/components/dashboard/reviews/ReviewsContent';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface ReviewsPageProps {
  params: {
    userId: string;
  };
}

export default function ReviewsPage({ params }: ReviewsPageProps) {
  return (
    <DashboardLayout>
      <ReviewsContent userId={params.userId} />
    </DashboardLayout>
  );
}