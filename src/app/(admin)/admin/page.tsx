
import { AdminDashboardPage } from '@/views/admin/pages/dashboard';
import { AdminLayout } from '@/views/admin/pages/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Администрирование | ProDvor',
    description: 'Панель администратора ProDvor',
};

export default function Page() {
  return (
    <AdminLayout>
      <AdminDashboardPage />
    </AdminLayout>
  );
}
