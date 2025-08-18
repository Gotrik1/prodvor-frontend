
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WorkoutPlan, PlanType, WorkoutSession } from '@/views/fitness-plan/ui/types';
import { produce } from 'immer';

interface WorkoutState {
  plans: WorkoutPlan[];
  addPlan: (plan: WorkoutPlan) => void;
  isPlanFormOpen: boolean;
  setIsPlanFormOpen: (isOpen: boolean) => void;
  selectedPlanType: PlanType | null;
  setSelectedPlanType: (type: PlanType | null) => void;
  
  // Session State
  activeSession: WorkoutSession | null;
  startSession: (plan: WorkoutPlan) => void;
  updateSet: (dayKey: string, exerciseId: string, setIndex: number, actualReps: string, actualWeight: string) => void;
  toggleSetComplete: (dayKey: string, exerciseId: string, setIndex: number) => void;
  endSession: () => WorkoutSession | null;
}

export const useWorkoutStore = create<WorkoutState>()(
  persist(
    (set, get) => ({
      plans: [],
      addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),
      isPlanFormOpen: false,
      setIsPlanFormOpen: (isOpen) => set({ isPlanFormOpen: isOpen }),
      selectedPlanType: null,
      setSelectedPlanType: (type) => set({ selectedPlanType: type }),

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
