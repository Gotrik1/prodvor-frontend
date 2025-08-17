
import { CompetitionsPage } from '@/views/competitions';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Соревнования | ProDvor',
    description: 'Участвуйте в турнирах, лигах и бросайте вызовы другим командам.',
};

export default function Competitions() {
  return <CompetitionsPage />;
}
