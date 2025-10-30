
'use client';

import React, { useState, useEffect } from 'react';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Clock, Trash2, Trophy, Dumbbell } from 'lucide-react';
import { useScheduleStore } from '@/entities/training/model/use-schedule-store';
import type { ScheduledActivity, Activity } from '@/views/fitness-plan/ui/types';
import { ActivityLibraryDialog } from '@/views/fitness-plan/ui/activity-library';
import { registeredTeams } from '@/views/tournaments/public-page/ui/mock-data';
import { cn } from '@/shared/lib/utils';
import { Calendar } from '@/shared/ui/calendar';
import { publicHolidays2025 } from '@/shared/lib/holidays';

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
        <div className="p-4 rounded-lg bg-card border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 group relative shadow-main-sm">
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
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2 z-10"
                onClick={() => onRemove(event.id)}
            >
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
        </div>
    );
};


export function FitnessSchedule({ showHeader = false }: { showHeader?: boolean }) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    
    const { personalSchedule, removeScheduledActivity, addScheduledActivity } = useScheduleStore();

    const getDayOfWeekString = (date: Date): string => {
        return date.toLocaleDateString('ru-RU', { weekday: 'long' });
    };

    const upcomingMatch: ScheduledActivity = {
        id: 'match-upcoming-1',
        name: `${registeredTeams[0].name} vs ${registeredTeams[1].name}`,
        type: 'match',
        startDate: new Date().toISOString(),
        time: '19:00',
        repeat: 'none',
        customInterval: 0,
    };

    const allEventsByDate = useMemo(() => {
        const eventsMap = new Map<string, ScheduledActivity[]>();
        Object.entries(personalSchedule).forEach(([day, activities]) => {
            // This is a simplified logic. A real implementation would map day names to actual dates.
            // For now, we'll just use this to find which dates have *any* events.
             if (activities.length > 0) {
                 // Mocking event dates for demonstration
                 const mockDate = new Date();
                 mockDate.setDate(mockDate.getDate() + (Object.keys(personalSchedule).indexOf(day) % 5));
                 eventsMap.set(mockDate.toDateString(), activities);
             }
        });
        // Add the mock match for today
        eventsMap.set(new Date().toDateString(), [upcomingMatch]);
        return eventsMap;
    }, [personalSchedule, upcomingMatch]);

    const eventsForSelectedDay = React.useMemo(() => {
        if (!selectedDate) return [];
        const dateKey = selectedDate.toDateString();
        return allEventsByDate.get(dateKey) || [];
    }, [selectedDate, allEventsByDate]);

    const handleSelectActivity = (activity: Activity) => {
        if (!selectedDate) return;
        const newActivity: ScheduledActivity = {
            ...activity,
            id: `scheduled-${activity.id}-${Date.now()}`,
            startDate: selectedDate.toISOString(),
            time: "12:00",
            repeat: 'none',
            customInterval: 0,
        };
        addScheduledActivity(newActivity);
    };
    
    const daysWithEvents = Array.from(allEventsByDate.keys()).map(dateString => new Date(dateString));

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
             <div className="flex justify-center">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="rounded-md border shadow-main-sm"
                    modifiers={{ 
                        weekend: { dayOfWeek: [0, 6] },
                        holiday: publicHolidays2025,
                        withEvent: daysWithEvents,
                    }}
                    modifiersClassNames={{
                        weekend: 'day-weekend',
                        holiday: 'day-holiday',
                        withEvent: 'day-with-event'
                    }}
                />
            </div>
            <div className="space-y-3 min-h-[350px]">
                <h3 className="text-lg font-semibold text-center lg:text-left">
                    {selectedDate ? selectedDate.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Выберите дату'}
                </h3>
                {selectedDate ? (
                    eventsForSelectedDay.length > 0 ? (
                        eventsForSelectedDay.map(event => <EventCard key={event.id} event={event} onRemove={removeScheduledActivity} />)
                    ) : (
                         <div className="text-center text-muted-foreground pt-10">
                            <p className="text-sm">На этот день активностей нет.</p>
                        </div>
                    )
                ) : null }
                {!showHeader && <ActivityLibraryDialog onSelectActivity={handleSelectActivity}/>}
            </div>
        </div>
    );
}
