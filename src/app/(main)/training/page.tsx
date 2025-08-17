
import { TrainingPage } from '@/views/training';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Мои тренировки | ProDvor',
    description: 'Планируйте и отслеживайте свои тренировки.',
};

export default function Training() {
  return <TrainingPage />;
}
