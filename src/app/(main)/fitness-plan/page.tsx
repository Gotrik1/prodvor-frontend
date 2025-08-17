
import { FitnessPlanPage } from '@/views/fitness-plan';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Конструктор фитнес-плана | ProDvor',
    description: 'Создавайте личные шаблоны тренировок и управляйте своим расписанием.',
};

export default function FitnessPlan() {
  return <FitnessPlanPage />;
}
