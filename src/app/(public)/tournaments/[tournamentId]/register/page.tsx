

import { TournamentRegisterPage } from '@/views/tournaments/register';
import type { Metadata } from 'next';
import { allTournaments } from '@/mocks';


export async function generateMetadata({ params }: { params: { tournamentId: string } }): Promise<Metadata> {
  const tournament = allTournaments.find(t => t.id === params.tournamentId);
  const title = tournament ? `Регистрация на ${tournament.name} | ProDvor` : 'Турнир не найден | ProDvor';
  const description = tournament ? `Подача заявки на участие в турнире ${tournament.name} по ${tournament.game}.` : 'Запрошенный турнир не найден.';

  return {
    title,
    description,
  };
}


export default function RegisterForTournamentPage({ params }: { params: { tournamentId: string } }) {
  const tournament = allTournaments.find(t => t.id === params.tournamentId);
  
  return <TournamentRegisterPage tournament={tournament} />;
}
