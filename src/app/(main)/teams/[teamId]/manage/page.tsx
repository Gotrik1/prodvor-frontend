import { TeamManagementPage } from '@/views/teams/manage';
import type { Metadata } from 'next';
import { teams as mockTeams } from '@/mocks';

export async function generateMetadata({ params }: { params: { teamId: string } }): Promise<Metadata> {
  const team = mockTeams.find(t => t.id === params.teamId);
  const title = team ? `Управление: ${team.name} | ProDvor` : 'Управление командой | ProDvor';
  const description = team ? `Панель управления для капитана команды ${team.name}.` : 'Управление командой.';

  return {
    title,
    description,
  };
}

export default function ManageTeamPage({ params }: { params: { teamId: string } }) {
  const team = mockTeams.find(t => t.id === params.teamId);

  return <TeamManagementPage team={team} />;
}
