
import { SupportPage } from '@/views/support';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Поддержка | ProDvor',
    description: 'Центр поддержки пользователей.',
};

export default function Support() {
  return <SupportPage />;
}
