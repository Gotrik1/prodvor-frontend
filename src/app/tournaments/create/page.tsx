import { CreateTournamentPage } from '@/views/tournaments/create';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Создание турнира | ProDvor',
    description: 'Создайте свой собственный турнир на платформе ProDvor.',
};

export default function CreateTournament() {
  return <CreateTournamentPage />;
}
