

'use client';

import React, { useState } from 'react';
import { scheduleData, ScheduleEvent } from '../lib/mock-data';
import { Badge } from '@/shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Clock, User, Users, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { ActivityLibraryDialog } from '@/views/fitness-plan/ui/activity-library';
import { ScheduleActivityDialog } from '@/views/fitness-plan/ui/schedule-activity-dialog';
import { useScheduleStore } from '@/entities/training/model/use-schedule-store';
import type { ScheduledActivity, Activity } from '@/views/fitness-plan/ui/types';


const categoryColors: Record<ScheduleEvent['category'], string> = {
    'Силовая': 'bg-red-500/10 text-red-300 border-red-500/20',
    'Кардио': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    'Mind & Body': 'bg-green-500/10 text-green-300 border-green-500/20',
    'Танцы': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    'Вода': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

const personalActivityColors: Record<Activity['type'], string> = {
    'template': 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    'group': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    'recovery': 'bg-green-500/10 text-green-300 border-green-500/20',
    'other': 'bg-gray-500/10 text-gray-300 border-gray-500/20',
};

const EventCard = ({ event, onBook }: { event: ScheduleEvent, onBook: (event: ScheduleEvent) => void }) => {
    const isFull = event.booked >= event.slots;
    return (
        <div className="p-3 rounded-lg bg-card border flex flex-col gap-3">
            <div>
                 <Badge className={`${categoryColors[event.category]}`}>{event.category}</Badge>
                 <h4 className="font-semibold mt-2">{event.title}</h4>
            </div>
            <div className="text-sm text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{event.startTime} - {event.endTime}</span>
                </div>
                 <Link href={`/users/${event.trainer.id}`} className="flex items-center gap-2 group">
                    <Avatar className="h-6 w-6">
                        <AvatarImage src={event.trainer.avatarUrl} />
                        <AvatarFallback>{event.trainer.nickname.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="group-hover:text-primary transition-colors">{event.trainer.nickname}</span>
                 </Link>
                <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{event.booked} / {event.slots} мест</span>
                </div>
            </div>
            <Button size="sm" disabled={isFull} onClick={() => onBook(event)}>
                {isFull ? 'Группа заполнена' : 'Записаться'}
            </Button>
        </div>
    )
};

const PersonalEventCard = ({ event, onRemove }: { event: ScheduledActivity, onRemove: (id: string) => void }) => (
    <div className="p-3 rounded-lg bg-card border flex flex-col gap-3 group relative">
        <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-1 right-1 h-6 w-6 text-muted-foreground hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => onRemove(event.id)}
        >
            <Trash2 className="h-4 w-4" />
        </Button>
         <div>
            <Badge className={`${personalActivityColors[event.type]}`}>{event.type === 'group' ? 'Групповое' : event.type === 'recovery' ? 'Восстановление' : 'Тренировка'}</Badge>
            <h4 className="font-semibold mt-2">{event.name}</h4>
        </div>
        <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
            </div>
        </div>
    </div>
);

export function FitnessSchedule({ personalOnly = false }: { personalOnly?: boolean }) {
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const { personalSchedule, addScheduledActivity, removeScheduledActivity } = useScheduleStore();

    const handleBookGroupSession = (event: ScheduleEvent, day: string) => {
        const date = new Date();
        const currentDay = date.getDay(); // Sunday - 0, Monday - 1, etc.
        const targetDay = days.indexOf(day) + 1; // Our array: Mon - 0
        const dayDiff = (targetDay - (currentDay === 0 ? 7 : currentDay) + 7) % 7;
        date.setDate(date.getDate() + dayDiff);

        const newScheduledActivity: ScheduledActivity = {
            id: `scheduled-${event.id}-${Date.now()}`,
            name: event.title,
            type: 'group',
            startDate: date.toISOString(),
            time: event.startTime,
            repeat: 'none',
            customInterval: 0,
        };
        addScheduledActivity(newScheduledActivity);
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-7 border-t border-l border-border">
                {days.map(day => (
                    <div key={day} className="border-b border-r border-border min-h-[60vh]">
                        <h3 className="font-semibold text-center p-2 border-b border-border bg-muted/50">{day}</h3>
                        <div className="p-2 space-y-2">
                            {personalSchedule[day]?.map(event => <PersonalEventCard key={event.id} event={event} onRemove={removeScheduledActivity} />)}
                            {!personalOnly && scheduleData[day].map(event => <EventCard key={event.id} event={event} onBook={() => handleBookGroupSession(event, day)} />)}
                            {(!personalSchedule[day] || personalSchedule[day].length === 0) && personalOnly && (
                                <div className="text-center text-muted-foreground pt-10">
                                    <p className="text-xs">Нет активностей</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
