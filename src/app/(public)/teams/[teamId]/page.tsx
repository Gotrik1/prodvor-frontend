
import { TeamPublicPage } from '@/views/teams/team';
import type { Metadata } from 'next';
import MainLayout from '@/app/(main)/layout';
import type { Team } from '@/mocks';

async function getTeam(teamId: string): Promise<Team | undefined> {
    try {
        const response = await fetch(`/api/v1/teams/${teamId}`);
        if (!response.ok) return undefined;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch team:", error);
        return undefined;
    }
}

export async function generateMetadata({ params }: { params: { teamId: string } }): Promise<Metadata> {
  const team = await getTeam(params.teamId);
  const title = team ? `${team.name} | ProDvor` : 'Команда не найдена | ProDvor';
  const description = team ? `Публичная страница команды ${team.name}. Состав, матчи и статистика.` : 'Запрошенная команда не найдена.';

  return {
    title,
    description,
  };
}

export default async function TeamPage({ params }: { params: { teamId: string } }) {
  const team = await getTeam(params.teamId);
  
  return (
    <MainLayout>
        <TeamPublicPage team={team} />
    </MainLayout>
  );
}
