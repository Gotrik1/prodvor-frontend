import { LeaguesPage } from '@/views/leagues';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Лиги | ProDvor',
    description: 'Соревнуйтесь в лигах и поднимайтесь в рейтинге.',
};

export default function Leagues() {
  return <LeaguesPage />;
}
