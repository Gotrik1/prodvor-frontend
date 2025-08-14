

import { TournamentPublicPage } from '@/views/tournaments/public-page';
import type { Metadata } from 'next';
import { allTournaments as mockTournaments } from '@/views/tournaments/public-page/ui/mock-data';


export async function generateMetadata({ params }: { params: { tournamentId: string } }): Promise<Metadata> {
  const tournament = mockTournaments.find(t => t.id === params.tournamentId);
  const title = tournament ? `${tournament.name} | ProDvor` : 'Турнир не найден | ProDvor';
  const description = tournament ? `Присоединяйтесь к турниру ${tournament.name} по ${tournament.game}.` : 'Запрошенный турнир не найден.';

  return {
    title,
    description,
  };
}


export default function TournamentPage({ params }: { params: { tournamentId: string } }) {
  const tournament = mockTournaments.find(t => t.id === params.tournamentId);
  
  return <TournamentPublicPage tournament={tournament} />;
}
