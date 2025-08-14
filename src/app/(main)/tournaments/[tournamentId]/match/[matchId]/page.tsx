import { MatchPage } from '@/views/match';
import { allTournaments as mockTournaments } from '@/views/tournaments/public-page/ui/mock-data';
import type { Metadata } from 'next';

// This function can be used to generate static pages for each match if needed
// export async function generateStaticParams() { ... }

export async function generateMetadata({ params }: { params: { tournamentId: string, matchId: string } }): Promise<Metadata> {
  const tournament = mockTournaments.find(t => t.id === params.tournamentId);
  const title = tournament ? `Матч ${params.matchId} | ${tournament.name}` : 'Протокол матча | ProDvor';
  const description = tournament ? `Детальный протокол матча в рамках турнира ${tournament.name}.` : 'Хронология событий, статистика и составы команд.';

  return {
    title,
    description,
  };
}


export default function TournamentMatchPage({ params }: { params: { tournamentId: string, matchId: string } }) {
  const tournament = mockTournaments.find(t => t.id === params.tournamentId);
  
  // In a real app, you would fetch match data based on matchId
  return <MatchPage tournament={tournament} matchId={params.matchId} />;
}
