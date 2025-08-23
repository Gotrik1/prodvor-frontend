
import { WorkoutSessionPage } from '@/views/training-center/session';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Тренировка | ProDvor',
    description: 'Активная тренировочная сессия.',
};

export default function WorkoutSession({ params }: { params: { planId: string } }) {
  return <WorkoutSessionPage planId={params.planId} />;
}
