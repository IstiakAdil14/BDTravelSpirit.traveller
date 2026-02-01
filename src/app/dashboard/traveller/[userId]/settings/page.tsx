import SettingsContent from '@/components/dashboard/settings/SettingsContent';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface SettingsPageProps {
  params: {
    userId: string;
  };
}

export default function SettingsPage({ params }: SettingsPageProps) {
  return (
    <DashboardLayout>
      <SettingsContent userId={params.userId} />
    </DashboardLayout>
  );
}