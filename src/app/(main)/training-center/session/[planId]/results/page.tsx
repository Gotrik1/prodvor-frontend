
import { WorkoutResultsPage } from '@/views/training-center/session/results';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Результаты тренировки | ProDvor',
    description: 'Сводка по завершенной тренировке.',
};

export default function WorkoutResults({ params }: { params: { planId: string } }) {
  return <WorkoutResultsPage planId={params.planId} />;
}
