import FavoritesContent from '@/components/dashboard/favorites/FavoritesContent';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface FavoritesPageProps {
  params: {
    userId: string;
  };
}

export default function FavoritesPage({ params }: FavoritesPageProps) {
  return (
    <DashboardLayout>
      <FavoritesContent userId={params.userId} />
    </DashboardLayout>
  );
}