import { TournamentsPage } from '@/views/tournaments';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Турниры | ProDvor',
    description: 'Участвуйте в турнирах и побеждайте.',
};

export default function Tournaments() {
  return <TournamentsPage />;
}
