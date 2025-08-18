import { users } from '@/mocks';
import type { User } from '@/mocks';

export interface ScheduleEvent {
    id: string;
    startTime: string; // "HH:MM"
    endTime: string;   // "HH:MM"
    title: string;
    category: 'Силовая' | 'Кардио' | 'Mind & Body' | 'Танцы' | 'Вода';
    trainer: User;
    slots: number;
    booked: number;
}

const getCoach = (nickname: string) => users.find(u => u.nickname === nickname)!;

export const scheduleData: Record<string, ScheduleEvent[]> = {
    'Понедельник': [
        { id: 'mon-1', startTime: '10:00', endTime: '11:00', title: 'Power Class', category: 'Силовая', trainer: getCoach('CoachViktor'), slots: 15, booked: 12 },
        { id: 'mon-2', startTime: '18:00', endTime: '19:00', title: 'Yoga', category: 'Mind & Body', trainer: getCoach('CoachSveta'), slots: 20, booked: 20 },
        { id: 'mon-3', startTime: '19:00', endTime: '20:00', title: 'Aqua Fitness', category: 'Вода', trainer: getCoach('CoachElena'), slots: 12, booked: 8 },
    ],
    'Вторник': [
        { id: 'tue-1', startTime: '11:00', endTime: '12:00', title: 'Zumba', category: 'Танцы', trainer: getCoach('CoachSveta'), slots: 25, booked: 18 },
        { id: 'tue-2', startTime: '19:00', endTime: '20:00', title: 'Cycle', category: 'Кардио', trainer: getCoach('CoachViktor'), slots: 18, booked: 18 },
    ],
    'Среда': [
        { id: 'wed-1', startTime: '10:00', endTime: '11:00', title: 'Pilates', category: 'Mind & Body', trainer: getCoach('CoachSveta'), slots: 20, booked: 15 },
        { id: 'wed-2', startTime: '18:00', endTime: '19:00', title: 'Body Pump', category: 'Силовая', trainer: getCoach('CoachElena'), slots: 15, booked: 14 },
    ],
    'Четверг': [
        { id: 'thu-1', startTime: '11:00', endTime: '12:00', title: 'Stretching', category: 'Mind & Body', trainer: getCoach('CoachSveta'), slots: 20, booked: 11 },
        { id: 'thu-2', startTime: '19:00', endTime: '20:00', title: 'HIIT', category: 'Кардио', trainer: getCoach('CoachViktor'), slots: 15, booked: 15 },
    ],
    'Пятница': [
        { id: 'fri-1', startTime: '10:00', endTime: '11:00', title: 'Aqua Fitness', category: 'Вода', trainer: getCoach('CoachElena'), slots: 12, booked: 10 },
        { id: 'fri-2', startTime: '18:00', endTime: '19:00', title: 'Functional Training', category: 'Силовая', trainer: getCoach('CoachViktor'), slots: 15, booked: 11 },
    ],
    'Суббота': [
        { id: 'sat-1', startTime: '11:00', endTime: '12:30', title: 'Yoga Marathon', category: 'Mind & Body', trainer: getCoach('CoachSveta'), slots: 20, booked: 19 },
        { id: 'sat-2', startTime: '13:00', endTime: '14:00', title: 'Zumba Party', category: 'Танцы', trainer: getCoach('CoachElena'), slots: 25, booked: 22 },
    ],
    'Воскресенье': [],
};
