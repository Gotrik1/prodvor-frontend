
'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Clock, Trash2, Calendar, Trophy, Dumbbell } from 'lucide-react';
import { useScheduleStore } from '@/entities/training/model/use-schedule-store';
import type { ScheduledActivity, Activity } from '@/views/fitness-plan/ui/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ActivityLibraryDialog } from '@/views/fitness-plan/ui/activity-library';
import { registeredTeams } from '@/views/tournaments/public-page/ui/mock-data';
import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/ui/skeleton';

const personalActivityColors: Record<Activity['type'] | 'match', string> = {
    'template': 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    'group': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    'recovery': 'bg-green-500/10 text-green-300 border-green-500/20',
    'other': 'bg-gray-500/10 text-gray-300 border-gray-500/20',
    'match': 'bg-primary/10 text-primary border-primary/20',
};

const EventCard = ({ event, onRemove }: { event: ScheduledActivity; onRemove: (id: string) => void }) => {
    const isMatch = event.type === 'match';
    const Icon = isMatch ? Trophy : Dumbbell;
    const badgeText = isMatch ? 'Матч' : 'Тренировка';

    return (
        <div className="p-4 rounded-lg bg-card border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group relative">
            <div className="flex items-start gap-4 w-full">
                <Icon className={cn("h-8 w-8 mt-1 shrink-0", isMatch ? "text-primary" : "text-amber-400")} />
                <div className="flex-grow overflow-hidden">
                    <Badge className={cn("mb-1", personalActivityColors[event.type])}>{badgeText}</Badge>
                    <h4 className="font-semibold truncate">{event.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                    </div>
                </div>
            </div>
             <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 sm:static"
                onClick={() => onRemove(event.id)}
            >
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
        </div>
    );
};


export function FitnessSchedule({ showHeader = false }: { showHeader?: boolean }) {
    const daysOfWeek = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
    const shortDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    
    const { personalSchedule, removeScheduledActivity, addScheduledActivity } = useScheduleStore();

    useEffect(() => {
        // This effect runs only on the client, after initial render, preventing hydration mismatch.
        const todayIndex = (new Date().getDay() + 6) % 7;
        setSelectedDay(daysOfWeek[todayIndex]);
    }, []); // Empty dependency array ensures this runs only once on mount

    const upcomingMatch: ScheduledActivity = {
        id: 'match-upcoming-1',
        name: `${registeredTeams[0].name} vs ${registeredTeams[1].name}`,
        type: 'match',
        startDate: new Date().toISOString(),
        time: '19:00',
        repeat: 'none',
        customInterval: 0,
    };

    const eventsForSelectedDay = selectedDay ? personalSchedule[selectedDay] || [] : [];
    
    if (selectedDay === daysOfWeek[(new Date().getDay() + 6) % 7]) {
        if (!eventsForSelectedDay.find(e => e.id === 'match-upcoming-1')) {
            eventsForSelectedDay.push(upcomingMatch);
        }
    }
    eventsForSelectedDay.sort((a,b) => a.time.localeCompare(b.time));

    const handleSelectActivity = (activity: Activity) => {
        const newActivity: ScheduledActivity = {
            ...activity,
            id: `scheduled-${activity.id}-${Date.now()}`,
            startDate: new Date().toISOString(),
            time: "12:00",
            repeat: 'none',
            customInterval: 0,
        };
        addScheduledActivity(newActivity);
    };

    return (
        <Card>
            {showHeader && (
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar /> Мой календарь</CardTitle>
                    <CardDescription>Ваши запланированные активности.</CardDescription>
                </CardHeader>
            )}
            <CardContent className={showHeader ? "" : "pt-6"}>
                <div className="grid grid-cols-7 gap-1 mb-4">
                    {shortDays.map((day, index) => (
                        <Button
                            key={day}
                            variant={selectedDay === daysOfWeek[index] ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => setSelectedDay(daysOfWeek[index])}
                            disabled={!selectedDay}
                        >
                            {day}
                        </Button>
                    ))}
                </div>
                <div className="space-y-3 min-h-[150px]">
                    {!selectedDay ? (
                        <>
                            <Skeleton className="h-24 w-full" />
                            <Skeleton className="h-12 w-full" />
                        </>
                    ) : eventsForSelectedDay.length > 0 ? (
                        eventsForSelectedDay.map(event => <EventCard key={event.id} event={event} onRemove={removeScheduledActivity} />)
                    ) : (
                         <div className="text-center text-muted-foreground pt-10">
                            <p className="text-sm">На этот день активностей нет.</p>
                        </div>
                    )}
                    {!showHeader && <ActivityLibraryDialog onSelectActivity={handleSelectActivity}/>}
                </div>
            </CardContent>
        </Card>
    );
}
