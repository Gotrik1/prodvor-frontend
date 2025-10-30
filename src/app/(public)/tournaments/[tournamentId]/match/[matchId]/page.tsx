

'use client';

import { MatchPage } from '@/views/tournaments/match';
import { tournaments } from '@/mocks';
import { useProtocol } from '@/features/protocol-editor';
import { useEffect, useMemo } from 'react';
import type { BracketMatch, Team } from '@/mocks';

// This is a client component, so we can't export metadata directly.
// We'll manage the title dynamically if needed.

export default function TournamentMatchPage({ params }: { params: { tournamentId: string, matchId: string } }) {
  const { setActiveMatch, activeMatch } = useProtocol();
  const tournament = useMemo(() => tournaments.find((t: typeof tournaments[0]) => t.id === params.tournamentId), [params.tournamentId]);
  
  // In a real app, you would fetch match details based on matchId
  // For this mock, we'll find the match in our generated bracket if it exists
  const match: BracketMatch | undefined = useMemo(() => {
    if (!tournament || !tournament.bracket) return undefined;

    // A more robust way to find a match in a multi-round bracket
    for (const round of (tournament.bracket || [])) {
        const found = round.matches.find((m: BracketMatch) => m.id === params.matchId);
        if (found) return found;
    }
    
    // Fallback for demo purposes if not found in bracket
    return {
        id: params.matchId,
        team1: { id: 'team1', name: 'Команда 1', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user1', members: [], game: 'Футбол', rank: 1500 } as Team,
        team2: { id: 'team2', name: 'Команда 2', logoUrl: 'https://placehold.co/100x100.png', captainId: 'user2', members: [], game: 'Футбол', rank: 1450 } as Team,
        score1: null,
        score2: null,
      };
  }, [params.matchId, tournament]);

  useEffect(() => {
    // When the component mounts, set this match as the active one in our global state.
    // This simulates navigating to a specific match page.
    if (match) {
        setActiveMatch(match);
    }
  }, [match, setActiveMatch]);

  // If the active match is updated (e.g., scores change), reflect it.
  const displayMatch = activeMatch?.id === params.matchId ? activeMatch : match;
  
  return <MatchPage tournament={tournament} match={displayMatch} />;
}
