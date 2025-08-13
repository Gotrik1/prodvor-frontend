
import { ChallengesPage } from '@/views/challenges';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Вызовы | ProDvor',
    description: 'Бросайте вызов другим игрокам и командам.',
};

export default function Challenges() {
  return <ChallengesPage />;
}
