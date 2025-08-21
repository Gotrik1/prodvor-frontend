
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WorkoutPlan, PlanType } from '@/views/fitness-plan/ui/types';

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


interface PlanState {
  plans: WorkoutPlan[];
  addPlan: (plan: WorkoutPlan) => void;
  isPlanFormOpen: boolean;
  setIsPlanFormOpen: (isOpen: boolean) => void;
  selectedPlanType: PlanType | null;
  setSelectedPlanType: (type: PlanType | null) => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      plans: [mockPlan],
      addPlan: (plan) => set((state) => ({ plans: [...state.plans, plan] })),
      isPlanFormOpen: false,
      setIsPlanFormOpen: (isOpen) => set({ isPlanFormOpen: isOpen }),
      selectedPlanType: null,
      setSelectedPlanType: (type) => set({ selectedPlanType: type }),
    }),
    {
      name: 'prodvor-plan-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
