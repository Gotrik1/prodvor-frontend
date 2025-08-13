
import { QuestsPage } from '@/views/quests';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Квесты | ProDvor',
    description: 'Выполняйте квесты и получайте награды.',
};

export default function Quests() {
  return <QuestsPage />;
}
