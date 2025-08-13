
import { TeamsPage } from '@/views/teams';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Команды | ProDvor',
    description: 'Находите команды, вступайте в них или создайте свою собственную.',
};

export default function Teams() {
  return <TeamsPage />;
}
