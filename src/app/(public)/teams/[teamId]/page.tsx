
'use client';

import { TeamPublicPage } from '@/views/teams/team';
import MainLayout from '@/app/(main)/layout';
import { useParams } from 'next/navigation';

export default function TeamPage() {
  const params = useParams();
  const teamId = typeof params.teamId === 'string' ? params.teamId : '';
  
  return (
    <MainLayout>
        <TeamPublicPage teamId={teamId} />
    </MainLayout>
  );
}
