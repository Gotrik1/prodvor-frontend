

import { TeamPageTemplate } from '@/views/admin/ui/templates/team-page-template';
import { teams as mockTeams } from '@/mocks';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { teamId: string } }): Promise<Metadata> {
  const team = mockTeams.find(t => t.id === params.teamId);
  const title = team ? `${team.name} | ProDvor` : 'Команда не найдена | ProDvor';
  const description = team ? `Публичная страница команды ${team.name}. Состав, матчи и статистика.` : 'Запрошенная команда не найдена.';

  return {
    title,
    description,
  };
}

export default function TeamPage({ params }: { params: { teamId: string } }) {
  const team = mockTeams.find(t => t.id === params.teamId);
  
  if (!team) {
    // Optionally return a not-found component or handle it within the template
    return <TeamPageTemplate team={undefined} />;
  }
  
  return <TeamPageTemplate team={team} />;
}
