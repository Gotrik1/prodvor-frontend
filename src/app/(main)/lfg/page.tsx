
import { LfgPage } from '@/views/lfg';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Поиск игры | ProDvor',
    description: 'Находите игроков для совместной игры.',
};

export default function Lfg() {
  return <LfgPage />;
}
