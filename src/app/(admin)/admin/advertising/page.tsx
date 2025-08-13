import { AdvertisingPage } from '@/views/admin/advertising';
import { AdminLayout } from '@/views/admin/pages/layout';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ad-CRM: Управление Рекламой | ProDvor',
    description: 'Управление рекламными кампаниями, аудиториями и анализ доходности.',
};

export default function Page() {
  return (
    <AdminLayout>
      <AdvertisingPage />
    </AdminLayout>
  );
}
