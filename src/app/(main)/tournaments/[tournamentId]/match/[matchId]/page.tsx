
'use client';

import { MatchPage } from '@/views/tournaments/match';
import { allTournaments as mockTournaments, registeredTeams } from '@/views/tournaments/public-page/ui/mock-data';
import { useProtocol } from '@/widgets/protocol-editor/lib/use-protocol';
import { useEffect } from 'react';
import type { BracketMatch } from '@/views/tournaments/public-page/ui/mock-data';
import { users } from '@/mocks';

// This is a client component, so we can't export metadata directly.
// We'll manage the title dynamically if needed.

export default function TournamentMatchPage({ params }: { params: { tournamentId: string, matchId: string } }) {
  const { setActiveMatch } = useProtocol();
  const tournament = mockTournaments.find(t => t.id === params.tournamentId);
  
  // In a real app, you would fetch match details based on matchId
  // For this mock, we'll find the match in our generated bracket if it exists
  const match: BracketMatch = {
    id: params.matchId,
    team1: registeredTeams[0],
    team2: registeredTeams[1],
    score1: null, // Let the protocol state handle the score
    score2: null,
  };

  useEffect(() => {
    // When the component mounts, set this match as the active one in our global state.
    // This simulates navigating to a specific match page.
    if (match) {
        setActiveMatch(match);
    }
  }, [match, setActiveMatch]);
  
  return <MatchPage tournament={tournament} />;
}
