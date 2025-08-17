import { CreateTeamPage } from '@/views/teams/create';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Создание команды | ProDvor',
    description: 'Создайте свою команду, пригласите игроков и начните свой путь к победе на платформе ProDvor.',
};

export default function CreateTeam() {
  return <CreateTeamPage />;
}
