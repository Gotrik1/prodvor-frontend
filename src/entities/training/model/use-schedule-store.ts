
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WorkoutPlan, ScheduledActivity } from '@/views/fitness-plan/ui/types';
import { produce } from 'immer';

const initialPersonalSchedule: Record<string, ScheduledActivity[]> = {
    'Понедельник': [
        {
            id: 'mock-team-training-1',
            name: 'Тренировка команды "Ночные Снайперы"',
            type: 'group',
            startDate: new Date().toISOString(),
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
            startDate: new Date().toISOString(),
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
            startDate: new Date().toISOString(),
            time: '20:00',
            repeat: 'weekly',
            customInterval: 0,
        }
    ], 
    'Четверг': [
        {
            id: 'mock-team-training-2',
            name: 'Тренировка команды "Стальные Ястребы"',
            type: 'group',
            startDate: new Date().toISOString(),
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
            startDate: new Date().toISOString(),
            time: '20:00',
            repeat: 'weekly',
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
