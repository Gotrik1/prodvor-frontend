import { WorkoutResultsPage } from '@/views/training-center/session/results';

export default function WorkoutResults({ params }: { params: { planId: string } }) {
  return <WorkoutResultsPage planId={params.planId} />;
}
