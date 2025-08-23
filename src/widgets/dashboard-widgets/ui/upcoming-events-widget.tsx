
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useScheduleStore } from '@/entities/training/model/use-schedule-store';
import { useMemo } from 'react';
import { Dumbbell, Trophy } from "lucide-react";

export function UpcomingEventsWidget() {
    const { personalSchedule } = useScheduleStore();

    const upcomingEvents = useMemo(() => {
        const today = new Date();
        const dayOfWeek = (today.getDay() + 6) % 7; // Monday is 0
        const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];
        
        const todayStr = days[dayOfWeek];
        const tomorrowStr = days[(dayOfWeek + 1) % 7];

        const todayEvents = personalSchedule[todayStr] || [];
        const tomorrowEvents = personalSchedule[tomorrowStr] || [];

        return [...todayEvents, ...tomorrowEvents].slice(0, 3); // Get next 3 events
    }, [personalSchedule]);

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Calendar /> Ближайшие события</CardTitle>
        <CardDescription>Ваши запланированные матчи и тренировки.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {upcomingEvents.length > 0 ? (
            upcomingEvents.map(event => (
                <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                    <div className="p-2 bg-background rounded-md">
                        {event.type === 'template' ? <Dumbbell className="h-5 w-5 text-primary" /> : <Trophy className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                        <p className="font-semibold leading-tight">{event.name}</p>
                        <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-sm text-center text-muted-foreground py-4">Нет запланированных событий.</p>
        )}
        <Button asChild variant="secondary" size="sm" className="w-full mt-2">
            <Link href="/training-center">
                Все расписание <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
