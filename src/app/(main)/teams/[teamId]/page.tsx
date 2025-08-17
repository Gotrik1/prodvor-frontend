
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
  
  // Using the unified TeamPageTemplate for public team pages.
  return <TeamPageTemplate team={team} />;
}
