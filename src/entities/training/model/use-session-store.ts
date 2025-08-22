
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WorkoutPlan, WorkoutSession } from '@/views/fitness-plan/ui/types';
import { produce } from 'immer';

interface SessionState {
  activeSession: WorkoutSession | null;
  startSession: (plan: WorkoutPlan) => void;
  updateSet: (dayKey: string, exerciseId: string, setIndex: number, actualReps: string, actualWeight: string) => void;
  toggleSetComplete: (dayKey: string, exerciseId: string, setIndex: number) => void;
  endSession: () => WorkoutSession | null;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set, get) => ({
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
        produce((draft: SessionState) => {
          if (!draft.activeSession) return;
          const exerciseResult = draft.activeSession.dayResults[dayKey]?.exercises.find(e => e.exerciseId === exerciseId);
          if (exerciseResult && exerciseResult.sets[setIndex]) {
            exerciseResult.sets[setIndex].actualReps = actualReps;
            exerciseResult.sets[setIndex].actualWeight = actualWeight;
          }
        })
      ),
      toggleSetComplete: (dayKey, exerciseId, setIndex) => set(
        produce((draft: SessionState) => {
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
          set({ activeSession: null });
          return finishedSession;
        }
        return null;
      },
    }),
    {
      name: 'prodvor-session-storage',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
