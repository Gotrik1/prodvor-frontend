
'use client';

import React, { useState } from 'react';
import { scheduleData, ScheduleEvent } from '../lib/mock-data';
import { Badge } from '@/shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Clock, User, Users, Trash2, Calendar, Trophy } from 'lucide-react';
import Link from 'next/link';
import { useScheduleStore } from '@/entities/training/model/use-schedule-store';
import type { ScheduledActivity, Activity } from '@/views/fitness-plan/ui/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { allTournaments, registeredTeams } from '@/views/tournaments/public-page/ui/mock-data';

const categoryColors: Record<ScheduleEvent['category'], string> = {
    'Силовая': 'bg-red-500/10 text-red-300 border-red-500/20',
    'Кардио': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    'Mind & Body': 'bg-green-500/10 text-green-300 border-green-500/20',
    'Танцы': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    'Вода': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

const personalActivityColors: Record<Activity['type'] | 'match', string> = {
    'template': 'bg-amber-500/10 text-amber-300 border-amber-500/20',
    'group': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    'recovery': 'bg-green-500/10 text-green-300 border-green-500/20',
    'other': 'bg-gray-500/10 text-gray-300 border-gray-500/20',
    'match': 'bg-primary/10 text-primary border-primary/20',
};

const EventCard = ({ event }: { event: ScheduledActivity }) => (
    <div className="p-3 rounded-lg bg-card border flex flex-col gap-3 group relative">
        <Badge className={`${personalActivityColors[event.type === 'template' ? 'template' : 'match']}`}>
            {event.type === 'template' ? 'Тренировка' : 'Матч'}
        </Badge>
        <h4 className="font-semibold mt-1">{event.name}</h4>
        <div className="text-sm text-muted-foreground space-y-2">
            <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{event.time}</span>
            </div>
        </div>
    </div>
);

export function FitnessSchedule({ showHeader = false }: { showHeader?: boolean }) {
    const days = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    const [selectedDay, setSelectedDay] = useState(days[new Date().getDay() - 1] || days[0]);
    const { personalSchedule } = useScheduleStore();

    // Mock upcoming match for demonstration
    const upcomingMatch = {
        id: 'match-upcoming-1',
        name: `${registeredTeams[0].name} vs ${registeredTeams[1].name}`,
        type: 'match' as const,
        startDate: new Date().toISOString(),
        time: '19:00',
        repeat: 'none',
        customInterval: 0,
    }

    const todaySchedule = personalSchedule[Object.keys(personalSchedule)[new Date().getDay() - 1]] || [];
    // Add the mock match to today's schedule for demonstration
    const eventsForToday = [...todaySchedule, upcomingMatch].sort((a,b) => a.time.localeCompare(b.time));

    return (
        <Card>
            {showHeader && (
                 <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar /> Мой календарь</CardTitle>
                    <CardDescription>Ваши запланированные активности.</CardDescription>
                </CardHeader>
            )}
            <CardContent className={showHeader ? "" : "pt-6"}>
                <div className="flex justify-between items-center mb-4">
                    {days.map(day => (
                        <Button
                            key={day}
                            variant={selectedDay === day ? 'default' : 'ghost'}
                            size="sm"
                            className="w-full"
                            onClick={() => setSelectedDay(day)}
                        >
                            {day}
                        </Button>
                    ))}
                </div>
                <div className="space-y-3 min-h-[150px]">
                    {selectedDay === (days[new Date().getDay() - 1] || days[0]) && eventsForToday.length > 0 ? (
                        eventsForToday.map(event => <EventCard key={event.id} event={event} />)
                    ) : (
                         <div className="text-center text-muted-foreground pt-10">
                            <p className="text-sm">На этот день активностей нет.</p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
