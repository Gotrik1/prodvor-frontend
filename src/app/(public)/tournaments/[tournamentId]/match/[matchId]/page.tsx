


'use client';

import { MatchPage } from '@/views/tournaments/match';
import { tournaments, Team, BracketMatch, Tournament } from '@/mocks';
import { useProtocol } from '@/features/protocol-editor';
import { useEffect, useMemo } from 'react';

// This is a client component, so we can't export metadata directly.
// We'll manage the title dynamically if needed.

export default function TournamentMatchPage({ params }: { params: { tournamentId: string, matchId: string } }) {
  const { setActiveMatch, activeMatch } = useProtocol();
  const tournament: Tournament | undefined = useMemo(() => tournaments.find((t: Tournament) => t.id === params.tournamentId), [params.tournamentId]);
  
  // In a real app, you would fetch match details based on matchId
  // For this mock, we'll find the match in our generated bracket if it exists
  const match: BracketMatch | undefined = useMemo(() => {
    if (!tournament || !tournament.bracket) return undefined;

    // A more robust way to find a match in a multi-round bracket
    for (const round of (tournament.bracket || [])) {
        const found = round.find((m: any) => m.id === params.matchId);
        if (found) return found as BracketMatch;
    }
    
    // Fallback for demo purposes if not found in bracket
    return {
        id: params.matchId,
        team1: teams[0],
        team2: teams[1],
        score1: null,
        score2: null,
      };
  }, [params.matchId, tournament]);

  useEffect(() => {
    // When the component mounts, set this match as the active one in our global state.
    // This simulates navigating to a specific match page.
    if (match) {
        setActiveMatch(match as any);
    }
  }, [match, setActiveMatch]);

  // If the active match is updated (e.g., scores change), reflect it.
  const displayMatch = activeMatch?.id === params.matchId ? activeMatch : match;
  
  return <MatchPage tournament={tournament} match={displayMatch as any} />;
}
