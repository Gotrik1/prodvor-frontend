
import { TeamManagementPage } from '@/views/teams/manage';
import type { Metadata } from 'next';
import type { Team } from '@/mocks';

async function getTeam(teamId: string): Promise<Team | undefined> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!API_BASE_URL) {
        console.error("[ Server ] NEXT_PUBLIC_API_BASE_URL is not defined.");
        return undefined;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/teams/${teamId}`);
        if (!response.ok) return undefined;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch team:", error);
        return undefined;
    }
}

export async function generateMetadata({ params }: { params: { teamId: string } }): Promise<Metadata> {
  const team = await getTeam(params.teamId);
  const title = team ? `Управление: ${team.name} | ProDvor` : 'Управление командой | ProDvor';
  const description = team ? `Панель управления для капитана команды ${team.name}.` : 'Управление командой.';

  return {
    title,
    description,
  };
}

export default async function ManageTeamPage({ params }: { params: { teamId: string } }) {
  const team = await getTeam(params.teamId);

  return <TeamManagementPage team={team} />;
}
