
import { TrainingCenterPage } from '@/views/training-center';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Тренировочный центр | ProDvor',
    description: 'Планируйте свои тренировки, создавайте шаблоны и следите за расписанием.',
};

export default function TrainingCenter() {
  return <TrainingCenterPage />;
}
