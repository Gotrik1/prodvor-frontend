
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WorkoutPlan, ScheduledActivity } from '@/views/fitness-plan/ui/types';
import { produce } from 'immer';

// Helper function to create a date in October 2025
const createOct2025Date = (day: number) => {
    return new Date(2025, 9, day).toISOString(); // Month is 0-indexed, so 9 is October
}

const initialPersonalSchedule: Record<string, ScheduledActivity[]> = {
    'Понедельник': [
        {
            id: 'mock-team-training-1',
            name: 'Тренировка команды "Ночные Снайперы"',
            type: 'group',
            startDate: createOct2025Date(6), // A Monday in Oct 2025
            time: '19:00',
            repeat: 'weekly',
            customInterval: 0,
        }
    ], 
    'Вторник': [
        {
            id: 'mock-personal-training-2',
            name: 'Персональная тренировка: Клиент "Valkyrie"',
            type: 'template',
            startDate: createOct2025Date(14), // A Tuesday in Oct 2025
            time: '18:00',
            repeat: 'weekly',
            customInterval: 0,
        }
    ], 
    'Среда': [
         {
            id: 'mock-personal-training-1',
            name: 'Силовая программа (День 1)',
            type: 'template',
            startDate: createOct2025Date(1), // A Wednesday in Oct 2025
            time: '20:00',
            repeat: 'weekly',
            customInterval: 0,
        },
        {
            id: 'mock-recovery-1',
            name: 'Восстановление: Массаж',
            type: 'recovery',
            startDate: createOct2025Date(22), // A Wednesday in Oct 2025
            time: '15:00',
            repeat: 'none',
            customInterval: 0,
        }
    ], 
    'Четверг': [
        {
            id: 'mock-team-training-2',
            name: 'Тренировка команды "Стальные Ястребы"',
            type: 'group',
            startDate: createOct2025Date(9), // A Thursday in Oct 2025
            time: '19:30',
            repeat: 'weekly',
            customInterval: 0,
        }
    ], 
    'Пятница': [
        {
            id: 'mock-personal-training-3',
            name: 'Силовая программа (День 2)',
            type: 'template',
            startDate: createOct2025Date(3), // A Friday in Oct 2025
            time: '20:00',
            repeat: 'weekly',
            customInterval: 0,
        },
        {
            id: 'mock-match-1',
            name: 'Матч: Ночные Снайперы vs Стальные Ястребы',
            type: 'match',
            startDate: createOct2025Date(17), // A Friday in Oct 2025
            time: '20:00',
            repeat: 'none',
            customInterval: 0,
        }
    ], 
    'Суббота': [], 
    'Воскресенье': []
};

interface ScheduleState {
  personalSchedule: Record<string, ScheduledActivity[]>;
  addScheduledActivity: (activity: ScheduledActivity) => void;
  addScheduledPlan: (plan: WorkoutPlan, startDate: Date, time: string, restDays: number) => void;
  removeScheduledActivity: (activityId: string) => void;
}

const getDayOfWeek = (date: Date): string => {
    const dayOfWeek = date.toLocaleDateString('ru-RU', { weekday: 'long' });
    return dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
};

export const useScheduleStore = create<ScheduleState>()(
  persist(
    (set, get) => ({
      personalSchedule: initialPersonalSchedule,
      addScheduledActivity: (activity) => set(produce((draft: ScheduleState) => {
        const dayOfWeek = getDayOfWeek(new Date(activity.startDate));
        
        if (draft.personalSchedule[dayOfWeek]) {
            draft.personalSchedule[dayOfWeek].push(activity);
            draft.personalSchedule[dayOfWeek].sort((a, b) => a.time.localeCompare(b.time));
        }
      })),
      addScheduledPlan: (plan, startDate, time, restDays) => {
          const firstActivityDate = new Date(startDate);
          const planDays = Object.values(plan.days);
          
          planDays.forEach((planDay, index) => {
              const activityDate = new Date(firstActivityDate);
              if (index > 0) {
 activityDate.setDate(activityDate.getDate() + index * (restDays + 1));
              }
              const activity: ScheduledActivity = {
                  id: `scheduled-${plan.id}-${planDay.name}-${Date.now()}-${Math.random()}`,
                  name: `${plan.name}: ${planDay.name}`,
                  type: 'template',
                  startDate: firstActivityDate.toISOString(),
                  time,
                  repeat: 'none',
                  customInterval: 0
              };
              get().addScheduledActivity(activity);
          });
      },
      removeScheduledActivity: (activityId) => set(produce((draft: ScheduleState) => {
        for (const day in draft.personalSchedule) {
            draft.personalSchedule[day] = draft.personalSchedule[day].filter(activity => activity.id !== activityId);
        }
      })),
    }),
    {
      name: 'prodvor-schedule-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
