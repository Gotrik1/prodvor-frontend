
import { MatchPage } from '@/views/tournaments/match';
import { allTournaments as mockTournaments, registeredTeams } from '@/views/tournaments/public-page/ui/mock-data';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { tournamentId: string, matchId: string } }): Promise<Metadata> {
  const tournament = mockTournaments.find(t => t.id === params.tournamentId);
  // In a real app, you would fetch match details
  const team1 = registeredTeams[0]?.name || 'Команда 1';
  const team2 = registeredTeams[1]?.name || 'Команда 2';
  
  const title = tournament ? `Матч: ${team1} vs ${team2} | ${tournament.name}` : 'Страница матча | ProDvor';
  const description = tournament ? `Следите за ходом матча между ${team1} и ${team2} в рамках турнира ${tournament.name}.` : 'Прямая трансляция матча.';

  return {
    title,
    description,
  };
}

export default function TournamentMatchPage({ params }: { params: { tournamentId: string, matchId: string } }) {
  const tournament = mockTournaments.find(t => t.id === params.tournamentId);
  // In a real app, you would fetch match details based on matchId
  const match = {
    id: params.matchId,
    team1: registeredTeams[0],
    team2: registeredTeams[1],
    score1: 2,
    score2: 1,
  };
  
  return <MatchPage tournament={tournament} match={match} />;
}
