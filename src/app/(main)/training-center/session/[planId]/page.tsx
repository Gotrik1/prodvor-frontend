import { WorkoutSessionPage } from '@/views/training-center/session';

export default function WorkoutSession({ params }: { params: { planId: string } }) {
  return <WorkoutSessionPage planId={params.planId} />;
}
