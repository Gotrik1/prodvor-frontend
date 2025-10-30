

import { TournamentPublicPage } from '@/views/tournaments/public-page';
import type { Metadata } from 'next';
import { tournaments, type Tournament } from '@/mocks';


export async function generateMetadata({ params }: { params: { tournamentId: string } }): Promise<Metadata> {
  const tournament: Tournament | undefined = tournaments.find((t: Tournament) => t.id === params.tournamentId);
  const title = tournament ? `${tournament.name} | ProDvor` : 'Турнир не найден | ProDvor';
  const description = tournament ? `Присоединяйтесь к турниру ${tournament.name} по ${tournament.game}.` : 'Запрошенный турнир не найден.';

  return {
    title,
    description,
  };
}


export default function TournamentPage({ params }: { params: { tournamentId: string } }) {
  const tournament: Tournament | undefined = tournaments.find((t: Tournament) => t.id === params.tournamentId);
  
  return <TournamentPublicPage tournament={tournament} />;
}
