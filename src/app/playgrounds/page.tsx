import { PlaygroundsPage } from '@/views/playgrounds';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Площадки | ProDvor',
    description: 'Находите и оценивайте спортивные площадки.',
};

export default function Playgrounds() {
  return <PlaygroundsPage />;
}
