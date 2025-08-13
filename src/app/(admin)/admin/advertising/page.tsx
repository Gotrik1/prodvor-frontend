import { AdvertisingPage } from '@/views/admin/advertising';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ad-CRM: Управление Рекламой | ProDvor',
    description: 'Управление рекламными кампаниями, аудиториями и анализ доходности.',
};

export default function AdminAdvertisingPage() {
  return <AdvertisingPage />;
}
