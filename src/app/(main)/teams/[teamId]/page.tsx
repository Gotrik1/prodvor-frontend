
'use client';

import { TeamPublicPage } from '@/views/teams/team';
import { useParams } from 'next/navigation';

export default function TeamPage() {
  const params = useParams();
  const teamId = typeof params?.teamId === 'string' ? params.teamId : '';
  
  return (
    <div className="container mx-auto">
        <TeamPublicPage teamId={teamId} />
    </div>
  );
}
