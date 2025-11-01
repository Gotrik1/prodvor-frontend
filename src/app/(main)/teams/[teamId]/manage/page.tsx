
'use client';

import { TeamManagementPage } from '@/views/teams/manage';
import { useParams } from 'next/navigation';

export default function ManageTeamPage() {
  const params = useParams();
  const teamId = typeof params.teamId === 'string' ? params.teamId : '';

  return <TeamManagementPage teamId={teamId} />;
}
