
import { FitnessPlanPage } from '@/views/fitness-plan';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Мой фитнес-план | ProDvor',
    description: 'Создавайте и управляйте своими планами тренировок.',
};

export default function FitnessPlan() {
  return <FitnessPlanPage />;
}
