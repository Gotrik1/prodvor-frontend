
export interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
  restBetweenSets: string;
  restAfterExercise: string;
}

export interface PlanDay {
    name: string;
    exercises: Exercise[];
}

export interface PlanType {
    value: 'full-body' | '2-day-split' | '3-day-split' | '4-day-split' | '5-day-split' | '2-through-2';
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

// ---- Schedule Types ----
export interface Activity {
    id: string;
    name: string;
    type: 'template' | 'group' | 'recovery' | 'other' | 'match';
}

export interface ScheduledActivity extends Activity {
    startDate: string;
    time: string;
    repeat: 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';
    customInterval: number;
}


// ---- Workout Session Types ----
export interface SetResult {
  completed: boolean;
  actualReps: string;
  actualWeight: string;
}

export interface ExerciseResult {
  exerciseId: string;
  sets: SetResult[];
}

export interface DayResult {
  exercises: ExerciseResult[];
}

export interface WorkoutSession {
  plan: WorkoutPlan;
  startTime: string;
  endTime: string | null;
  dayResults: Record<string, DayResult>;
}
