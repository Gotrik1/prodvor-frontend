import { AdminPage } from '@/views/admin';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Администрирование | ProDvor',
    description: 'Панель администратора ProDvor',
};

export default function Admin() {
  return <AdminPage />;
}
