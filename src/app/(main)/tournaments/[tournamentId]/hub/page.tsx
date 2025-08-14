import { TournamentHubPage } from '@/views/tournaments/hub';
import { allTournaments as mockTournaments } from '@/views/tournaments/public-page/ui/mock-data';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { tournamentId: string } }): Promise<Metadata> {
  const tournament = mockTournaments.find(t => t.id === params.tournamentId);
  const title = tournament ? `Хаб: ${tournament.name} | ProDvor` : 'Турнир не найден | ProDvor';
  const description = tournament ? `Вся информация о ходе турнира ${tournament.name}: участники, сетка, расписание.` : 'Запрошенный турнир не найден.';

  return {
    title,
    description,
  };
}

export default function TournamentDetailsPage({ params }: { params: { tournamentId: string } }) {
  const tournament = mockTournaments.find(t => t.id === params.tournamentId);
  
  return <TournamentHubPage tournament={tournament} />;
}
