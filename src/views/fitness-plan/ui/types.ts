
export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

export interface PlanDay {
    name: string;
    exercises: Exercise[];
}

export interface PlanType {
    value: 'full-body' | '2-day-split' | '3-day-split' | '4-day-split';
    label: string;
    days: number;
    description: string;
}

export interface WorkoutPlan {
  id: string;
  name: string;
  type: PlanType;
  days: Record<string, PlanDay>;
}
