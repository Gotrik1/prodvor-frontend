
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WorkoutPlan, PlanType, WorkoutSession, ScheduledActivity } from '@/views/fitness-plan/ui/types';
import { produce } from 'immer';

const mockPlan: WorkoutPlan = {
    id: 'plan-mock-1',
    name: 'Силовая программа SportWiki (4 дня)',
    type: {
        value: '4-day-split',
        label: 'Сплит на 4 дня',
        days: 4,
        description: 'Для более продвинутых атлетов с фокусом на отдельные группы мышц.'
    },
    days: {
        day1: {
            name: 'Спина, трицепс',
            exercises: [
                { id: 'ex-1-1', name: 'Тяга штанги к поясу в наклоне', sets: '4', reps: '8-10', weight: '60 кг', restBetweenSets: '90', restAfterExercise: '120' },
                { id: 'ex-1-2', name: 'Подтягивания к груди', sets: '4', reps: '10', weight: 'Свой вес', restBetweenSets: '90', restAfterExercise: '120' },
                { id: 'ex-1-3', name: 'Жим лежа узким хватом', sets: '3', reps: '8-10', weight: '50 кг', restBetweenSets: '60', restAfterExercise: '120' },
                { id: 'ex-1-4', name: 'Разгибания рук на верхнем блоке', sets: '3', reps: '10-12', weight: '25 кг', restBetweenSets: '60', restAfterExercise: '120' },
            ],
        },
        day2: {
            name: 'Ноги',
            exercises: [
                { id: 'ex-2-1', name: 'Приседания со штангой', sets: '3', reps: '8-10', weight: '80 кг', restBetweenSets: '120', restAfterExercise: '120' },
                { id: 'ex-2-2', name: 'Жим платформы ногами', sets: '3', reps: '10-12', weight: '150 кг', restBetweenSets: '90', restAfterExercise: '120' },
                { id: 'ex-2-3', name: 'Разгибания ног в станке', sets: '3', reps: '12', weight: '40 кг', restBetweenSets: '60', restAfterExercise: '120' },
                { id: 'ex-2-4', name: 'Сгибания ног в станке', sets: '3', reps: '12', weight: '35 кг', restBetweenSets: '60', restAfterExercise: '120' },
            ],
        },
        day3: {
            name: 'Грудь, бицепс',
            exercises: [
                { id: 'ex-3-1', name: 'Жим штанги на наклонной скамье', sets: '4', reps: '8-10', weight: '70 кг', restBetweenSets: '90', restAfterExercise: '120' },
                { id: 'ex-3-2', name: 'Разведения с гантелями', sets: '4', reps: '10-12', weight: '12 кг', restBetweenSets: '60', restAfterExercise: '120' },
                { id: 'ex-3-3', name: 'Подъем штанги на бицепс', sets: '3', reps: '10', weight: '30 кг', restBetweenSets: '60', restAfterExercise: '120' },
                { id: 'ex-3-4', name: 'Сгибания рук с гантелями (супинация)', sets: '3', reps: '10-12', weight: '10 кг', restBetweenSets: '60', restAfterExercise: '120' },
            ],
        },
        day4: {
            name: 'Дельты',
            exercises: [
                { id: 'ex-4-1', name: 'Жимы штанги вверх сидя', sets: '3', reps: '8-10', weight: '40 кг', restBetweenSets: '90', restAfterExercise: '120' },
                { id: 'ex-4-2', name: 'Махи гантелями через стороны', sets: '3', reps: '12-15', weight: '8 кг', restBetweenSets: '60', restAfterExercise: '120' },
                { id: 'ex-4-3', name: 'Махи гантелями в наклоне', sets: '3', reps: '12-15', weight: '6 кг', restBetweenSets: '60', restAfterExercise: '120' },
            ],
        },
    },
};

const initialPersonalSchedule = {
    'Понедельник': [], 'Вторник': [], 'Среда': [], 'Четверг': [], 'Пятница': [], 'Суббота': [], 'Воскресенье': []
};

interface WorkoutState {
  plans: WorkoutPlan[];
  addPlan: (plan: WorkoutPlan) => void;
  isPlanFormOpen: boolean;
  setIsPlanFormOpen: (isOpen: boolean) => void;
  selectedPlanType: PlanType | null;
  setSelectedPlanType: (type: PlanType | null) => void;
  
  // Schedule State
  personalSchedule: Record<string, ScheduledActivity[]>;
  addScheduledActivity: (activity: ScheduledActivity) => void;
  addScheduledPlan: (plan: WorkoutPlan, startDate: Date, time: string, restDays: number) => void;
  removeScheduledActivity: (activityId: string) => void;


  // Session State
  activeSession: WorkoutSession | null;
  startSession: (plan: WorkoutPlan) => void;
  updateSet: (dayKey: string, exerciseId: string, setIndex: number, actualReps: string, actualWeight: string) => void;
  toggleSetComplete: (dayKey: string, exerciseId: string, setIndex: number) => void;
  endSession: () => WorkoutSession | null;
}

const getDayOfWeek = (date: Date): string => {
    const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'long' });
    return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
};


export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      plans: [mockPlan],
      addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),
      isPlanFormOpen: false,
      setIsPlanFormOpen: (isOpen) => set({ isPlanFormOpen: isOpen }),
      selectedPlanType: null,
      setSelectedPlanType: (type) => set({ selectedPlanType: type }),

      // Schedule State
      personalSchedule: initialPersonalSchedule,
      addScheduledActivity: (activity) => set(produce((draft: WorkoutState) => {
        const dayOfWeek = getDayOfWeek(new Date(activity.startDate));
        
        if (draft.personalSchedule[dayOfWeek]) {
            draft.personalSchedule[dayOfWeek].push(activity);
            draft.personalSchedule[dayOfWeek].sort((a, b) => a.time.localeCompare(b.time));
        }
      })),
      addScheduledPlan: (plan, startDate, time, restDays) => {
          let currentDate = new Date(startDate);
          const planDays = Object.values(plan.days);
          
          planDays.forEach((planDay, index) => {
              if (index > 0) {
                  // Add rest days + 1 day for the next training
                  currentDate.setDate(currentDate.getDate() + restDays + 1);
              }
              const activity: ScheduledActivity = {
                  id: `scheduled-${plan.id}-${planDay.name}-${Date.now()}-${Math.random()}`,
                  name: `${plan.name}: ${planDay.name}`,
                  type: 'template',
                  startDate: currentDate.toISOString(),
                  time,
                  repeat: 'none',
                  customInterval: 0
              };
              get().addScheduledActivity(activity);
          });
      },
      removeScheduledActivity: (activityId) => set(produce((draft: WorkoutState) => {
        for (const day in draft.personalSchedule) {
            draft.personalSchedule[day] = draft.personalSchedule[day].filter(activity => activity.id !== activityId);
        }
      })),


      // Session State Logic
      activeSession: null,
      startSession: (plan) => {
        const session: WorkoutSession = {
          plan,
          startTime: new Date().toISOString(),
          endTime: null,
          dayResults: Object.entries(plan.days).reduce((acc, [dayKey, dayData]) => {
            acc[dayKey] = {
              exercises: dayData.exercises.map(ex => ({
                exerciseId: ex.id,
                sets: Array.from({ length: Number(ex.sets) || 0 }, () => ({
                  completed: false,
                  actualReps: '',
                  actualWeight: '',
                })),
              })),
            };
            return acc;
          }, {} as WorkoutSession['dayResults']),
        };
        set({ activeSession: session });
      },
      updateSet: (dayKey, exerciseId, setIndex, actualReps, actualWeight) => set(
        produce((draft: WorkoutState) => {
          if (!draft.activeSession) return;
          const exerciseResult = draft.activeSession.dayResults[dayKey]?.exercises.find(e => e.exerciseId === exerciseId);
          if (exerciseResult && exerciseResult.sets[setIndex]) {
            exerciseResult.sets[setIndex].actualReps = actualReps;
            exerciseResult.sets[setIndex].actualWeight = actualWeight;
          }
        })
      ),
      toggleSetComplete: (dayKey, exerciseId, setIndex) => set(
        produce((draft: WorkoutState) => {
          if (!draft.activeSession) return;
          const exerciseResult = draft.activeSession.dayResults[dayKey]?.exercises.find(e => e.exerciseId === exerciseId);
          if (exerciseResult && exerciseResult.sets[setIndex]) {
            exerciseResult.sets[setIndex].completed = !exerciseResult.sets[setIndex].completed;
          }
        })
      ),
      endSession: () => {
        const session = get().activeSession;
        if (session) {
          const finishedSession = { ...session, endTime: new Date().toISOString() };
          // Here you would typically save the finishedSession to a database
          set({ activeSession: null });
          return finishedSession;
        }
        return null;
      },
    }),
    {
      name: 'prodvor-workout-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
