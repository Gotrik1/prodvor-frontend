
import { LfgPage } from '@/views/lfg';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Хаб сообщества | ProDvor',
    description: 'Находите игроков для своей команды или команду для себя.',
};

export default function Lfg() {
  return <LfgPage />;
}
