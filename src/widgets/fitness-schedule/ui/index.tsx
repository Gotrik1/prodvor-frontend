
'use client';

import React from 'react';
import { Card, CardContent } from '@/shared/ui/card';
import { scheduleData, ScheduleEvent } from '../lib/mock-data';
import { Badge } from '@/shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { Clock, User, Users } from 'lucide-react';
import Link from 'next/link';

const categoryColors: Record<ScheduleEvent['category'], string> = {
    'Силовая': 'bg-red-500/10 text-red-300 border-red-500/20',
    'Кардио': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    'Mind & Body': 'bg-green-500/10 text-green-300 border-green-500/20',
    'Танцы': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    'Вода': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};


const EventCard = ({ event }: { event: ScheduleEvent }) => {
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
            <Button size="sm" disabled={isFull}>
                {isFull ? 'Группа заполнена' : 'Записаться'}
            </Button>
        </div>
    )
}

export function FitnessSchedule() {
    const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

    return (
        <div className="w-full">
            <div className="grid grid-cols-7 border-t border-l border-border">
                {days.map(day => (
                    <div key={day} className="border-b border-r border-border min-h-[60vh]">
                        <h3 className="font-semibold text-center p-2 border-b border-border bg-muted/50">{day}</h3>
                        <div className="p-2 space-y-2">
                            {scheduleData[day].length > 0 ? (
                                scheduleData[day].map(event => <EventCard key={event.id} event={event} />)
                            ) : (
                                <div className="text-center text-xs text-muted-foreground pt-10">
                                    Нет занятий
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
