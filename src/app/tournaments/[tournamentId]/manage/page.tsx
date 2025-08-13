import { TournamentManagementPage } from '@/views/tournaments/manage';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Управление турниром | ProDvor',
    description: 'Панель управления для организатора турнира.',
};

export default function ManageTournament({ params }: { params: { tournamentId: string } }) {
  return <TournamentManagementPage tournamentId={params.tournamentId} />;
}
