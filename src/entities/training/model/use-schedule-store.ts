
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { WorkoutPlan, ScheduledActivity } from '@/views/fitness-plan/ui/types';
import { produce } from 'immer';

const initialPersonalSchedule = {
    'Понедельник': [], 'Вторник': [], 'Среда': [], 'Четверг': [], 'Пятница': [], 'Суббота': [], 'Воскресенье': []
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
