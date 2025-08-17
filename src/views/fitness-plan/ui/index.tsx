
'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Dumbbell, Save, PlusCircle, Trash2, Calendar, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Activity } from './activity-library';
import { ActivityLibraryDialog } from './activity-library';
import { ScheduleActivityDialog, ScheduledActivity } from './schedule-activity-dialog';

export interface PlanDay {
  id: string;
  name: string;
  activities: ScheduledActivity[];
}

export function FitnessPlanPage() {
    const [planDays, setPlanDays] = useState<PlanDay[]>([
        { id: 'day-1', name: 'День 1', activities: [] },
    ]);
    
    const [isScheduling, setIsScheduling] = useState(false);
    const [activityToSchedule, setActivityToSchedule] = useState<Activity | null>(null);
    const [targetDayId, setTargetDayId] = useState<string | null>(null);

    const handleSelectActivity = (dayId: string, activity: Activity) => {
        setActivityToSchedule(activity);
        setTargetDayId(dayId);
        setIsScheduling(true);
    };
    
    const handleScheduleSubmit = (scheduledActivity: ScheduledActivity) => {
        if (targetDayId) {
             setPlanDays(prevDays =>
                prevDays.map(day => {
                    if (day.id === targetDayId) {
                        return { ...day, activities: [...day.activities, scheduledActivity] };
                    }
                    return day;
                })
            );
        }
        closeScheduler();
    };

    const closeScheduler = () => {
        setIsScheduling(false);
        setActivityToSchedule(null);
        setTargetDayId(null);
    };

    const removeActivityFromDay = (dayId: string, activityId: string) => {
         setPlanDays(prevDays =>
            prevDays.map(day => {
                if (day.id === dayId) {
                    return { ...day, activities: day.activities.filter(a => a.id !== activityId) };
                }
                return day;
            })
        );
    };

    const addDay = () => {
        const nextDayNumber = planDays.length + 1;
        setPlanDays(prev => [
            ...prev,
            { id: `day-${nextDayNumber}`, name: `День ${nextDayNumber}`, activities: [] }
        ]);
    };
    
    const removeDay = (dayId: string) => {
        setPlanDays(prev => prev.filter(day => day.id !== dayId));
    };
    
    const getScheduleText = (activity: ScheduledActivity) => {
        const time = activity.time || 'Время не указано';
        switch (activity.repeat) {
            case 'daily': return `Каждый день в ${time}`;
            case 'weekly': return `Каждую неделю в ${time}`;
            case 'monthly': return `Каждый месяц в ${time}`;
            case 'custom': return `Каждые ${activity.customInterval} дня в ${time}`;
            default: return `Однократно, ${new Date(activity.startDate).toLocaleDateString()} в ${time}`;
        }
    };


    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                        <Dumbbell className="h-8 w-8" />
                        Конструктор фитнес-плана
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        Создайте свой идеальный тренировочный цикл, добавляя и настраивая активности.
                    </p>
                </div>
                <Button size="lg">
                    <Save className="mr-2 h-4 w-4" />
                    Сохранить план
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Тренировочный цикл</CardTitle>
                    <CardDescription>Составьте свой план, добавляя активности на каждый день. Вы можете добавлять столько дней, сколько нужно для вашего цикла.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {planDays.map(day => (
                            <Card key={day.id} className="flex flex-col bg-muted/50">
                                <CardHeader className="flex flex-row items-center justify-between">
                                    <CardTitle className="text-lg">{day.name}</CardTitle>
                                    {planDays.length > 1 && (
                                         <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeDay(day.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive/70" />
                                        </Button>
                                    )}
                                </CardHeader>
                                <CardContent className="flex-grow space-y-2">
                                    {day.activities.map(activity => (
                                        <div key={activity.id} className="flex flex-col p-3 rounded-md border bg-card text-card-foreground shadow-sm">
                                            <div className="flex items-center justify-between">
                                                <p className="font-semibold text-sm">{activity.name}</p>
                                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeActivityFromDay(day.id, activity.id)}>
                                                    <Trash2 className="h-4 w-4 text-destructive/70" />
                                                </Button>
                                            </div>
                                            <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                                                <Calendar className="h-3 w-3" />
                                                <span>{getScheduleText(activity)}</span>
                                            </div>
                                        </div>
                                    ))}
                                     <ActivityLibraryDialog onSelectActivity={(activity) => handleSelectActivity(day.id, activity)} />
                                </CardContent>
                            </Card>
                        ))}
                        <div className="flex items-center justify-center min-h-[200px] border-2 border-dashed rounded-lg">
                             <Button variant="ghost" onClick={addDay} className="flex flex-col h-auto p-4 gap-2">
                                <PlusCircle className="h-8 w-8 text-muted-foreground"/>
                                <span className="text-muted-foreground">Добавить день</span>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            
            {activityToSchedule && (
                 <ScheduleActivityDialog
                    isOpen={isScheduling}
                    onClose={closeScheduler}
                    activity={activityToSchedule}
                    onSchedule={handleScheduleSubmit}
                />
            )}
        </div>
    );
}
