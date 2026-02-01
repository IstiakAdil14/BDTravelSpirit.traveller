import FavoritesContent from '@/components/dashboard/favorites/FavoritesContent';
import DashboardLayout from '@/components/layout/DashboardLayout';

export default function FavoritesPage() {
  return (
    <DashboardLayout>
      <FavoritesContent userId="temp" />
    </DashboardLayout>
  );
}