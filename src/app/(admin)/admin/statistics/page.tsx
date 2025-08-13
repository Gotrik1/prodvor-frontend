
import { StatisticsPage } from '@/views/admin/statistics';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Статистика | ProDvor',
    description: 'Статистика пользователей, команд и спонсоров.',
};

export default function Statistics() {
  return <StatisticsPage />;
}
