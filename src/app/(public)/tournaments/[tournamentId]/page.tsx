
'use client';

import { TournamentPublicPage } from '@/views/tournaments/public-page';
import { useParams } from 'next/navigation';

export default function TournamentPage() {
  const params = useParams();
  const tournamentId = typeof params.tournamentId === 'string' ? params.tournamentId : '';
  
  return <TournamentPublicPage tournamentId={tournamentId} />;
}
