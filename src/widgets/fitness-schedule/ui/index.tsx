
'use client';

import React, { useState } from 'react';
import { scheduleData, ScheduleEvent } from '../lib/mock-data';
import { Badge } from '@/shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Clock, User, Users } from 'lucide-react';
import Link from 'next/link';
import { Activity, ActivityLibraryDialog } from '@/views/fitness-plan/ui/activity-library';
import { ScheduleActivityDialog, ScheduledActivity } from '@/views/fitness-plan/ui/schedule-activity-dialog';

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

const PersonalEventCard = ({ event }: { event: ScheduledActivity }) => (
    <div className="p-3 rounded-lg bg-card border flex flex-col gap-3">
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
    const [isScheduling, setIsScheduling] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);
    const [personalSchedule, setPersonalSchedule] = useState<Record<string, ScheduledActivity[]>>({
        'Понедельник': [], 'Вторник': [], 'Среда': [], 'Четверг': [], 'Пятница': [], 'Суббота': [], 'Воскресенье': []
    });

    const handleSelectActivity = (activity: Activity) => {
        setSelectedActivity(activity);
        setIsScheduling(true);
    };
    
    const handleCloseScheduler = () => {
        setIsScheduling(false);
        setSelectedActivity(null);
    };

    const handleSchedule = (scheduledActivity: ScheduledActivity) => {
        const dayOfWeek = new Date(scheduledActivity.startDate).toLocaleDateString('ru-RU', { weekday: 'long' });
        const capitalizedDay = dayOfWeek.charAt(0).toUpperCase() + dayOfWeek.slice(1);
        
        setPersonalSchedule(prev => ({
            ...prev,
            [capitalizedDay]: [...prev[capitalizedDay], scheduledActivity].sort((a,b) => a.time.localeCompare(b.time)),
        }));

        handleCloseScheduler();
    };
    
    const handleBookGroupSession = (event: ScheduleEvent, day: string) => {
        const newScheduledActivity: ScheduledActivity = {
            id: `scheduled-${event.id}-${Date.now()}`,
            name: event.title,
            type: 'group',
            startDate: new Date().toISOString(), // This should be calculated based on 'day'
            time: event.startTime,
            repeat: 'none',
            customInterval: 0,
        };
        setPersonalSchedule(prev => ({
            ...prev,
            [day]: [...prev[day], newScheduledActivity].sort((a,b) => a.time.localeCompare(b.time)),
        }));
    };

    return (
        <div className="w-full">
            <div className="grid grid-cols-7 border-t border-l border-border">
                {days.map(day => (
                    <div key={day} className="border-b border-r border-border min-h-[60vh]">
                        <h3 className="font-semibold text-center p-2 border-b border-border bg-muted/50">{day}</h3>
                        <div className="p-2 space-y-2">
                            {personalSchedule[day].map(event => <PersonalEventCard key={event.id} event={event} />)}
                            {!personalOnly && scheduleData[day].map(event => <EventCard key={event.id} event={event} onBook={() => handleBookGroupSession(event, day)} />)}
                            {personalSchedule[day].length === 0 && personalOnly && (
                                <div className="text-center text-muted-foreground pt-10">
                                    <p className="text-xs">Нет активностей</p>
                                </div>
                            )}
                             <ActivityLibraryDialog onSelectActivity={handleSelectActivity} />
                        </div>
                    </div>
                ))}
            </div>
             {selectedActivity && (
                <ScheduleActivityDialog
                    isOpen={isScheduling}
                    onClose={handleCloseScheduler}
                    activity={selectedActivity}
                    onSchedule={handleSchedule}
                />
            )}
        </div>
    );
}
