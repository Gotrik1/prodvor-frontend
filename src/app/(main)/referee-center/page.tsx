
import { RefereeCenterPage } from '@/views/referee-center';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Центр судей | ProDvor',
    description: 'Курсы повышения квалификации, правила и аттестация для судей.',
};

export default function RefereeCenter() {
  return <RefereeCenterPage />;
}
