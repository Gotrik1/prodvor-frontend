
import { AdvertisingPage } from '@/views/admin/advertising';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ad-CRM: Управление Рекламой | ProDvor',
    description: 'CRM-система для управления рекламой, аналитики и прогнозирования.',
};

export default function Advertising() {
  return <AdvertisingPage />;
}
