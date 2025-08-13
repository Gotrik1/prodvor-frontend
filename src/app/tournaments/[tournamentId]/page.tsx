import { TournamentPublicPage } from '@/views/tournaments/public-page';
import type { Metadata } from 'next';
import { tournaments } from '@/mocks';

// This is a placeholder. In a real app, you would fetch tournament data.
const myTournaments = [
    {
      id: 'mytourney1',
      name: 'Летний Кубок ProDvor',
      game: 'Дворовый футбол',
      status: 'РЕГИСТРАЦИЯ' as const,
      prizePool: '100 000 руб.',
      participants: 5,
      maxParticipants: 16,
      startDate: '2025-08-01',
      bannerUrl: 'https://placehold.co/1200x300.png',
      dataAiHint: 'soccer street'
    },
    {
      id: 'mytourney2',
      name: 'Осенний марафон по Dota 2',
      game: 'Dota 2',
      status: 'ИДЕТ' as const,
      prizePool: 'Эксклюзивные скины',
      participants: 30,
      maxParticipants: 32,
      startDate: '2025-09-10',
      bannerUrl: 'https://placehold.co/1200x300.png',
      dataAiHint: 'esports dota'
    },
];
const allTournaments = [...tournaments, ...myTournaments];


export async function generateMetadata({ params }: { params: { tournamentId: string } }): Promise<Metadata> {
  const tournament = allTournaments.find(t => t.id === params.tournamentId);
  const title = tournament ? `${tournament.name} | ProDvor` : 'Турнир не найден | ProDvor';
  const description = tournament ? `Присоединяйтесь к турниру ${tournament.name} по ${tournament.game}.` : 'Запрошенный турнир не найден.';

  return {
    title,
    description,
  };
}


export default function TournamentPage({ params }: { params: { tournamentId: string } }) {
  const tournament = allTournaments.find(t => t.id === params.tournamentId);
  
  return <TournamentPublicPage tournament={tournament} />;
}
