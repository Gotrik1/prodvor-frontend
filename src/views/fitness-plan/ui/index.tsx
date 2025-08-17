
'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Dumbbell, Save, PlusCircle, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Activity, mockTemplates, mockGroupSessions, mockRecovery, mockOther } from './activity-library';
import { ActivityLibraryDialog } from './activity-library';

export interface PlanDay {
  id: string;
  name: string;
  activities: Activity[];
}

export function FitnessPlanPage() {
    const [planDays, setPlanDays] = useState<PlanDay[]>([
        { id: 'day-1', name: 'День 1', activities: [] },
        { id: 'day-2', name: 'День 2', activities: [] },
        { id: 'day-3', name: 'День 3', activities: [] },
        { id: 'day-4', name: 'День 4', activities: [] },
    ]);

    const addActivityToDay = (dayId: string, activity: Activity) => {
        setPlanDays(prevDays =>
            prevDays.map(day => {
                if (day.id === dayId) {
                    // Create a new unique ID for the activity instance in the plan
                    const newActivityInstance = { ...activity, id: `inst-${Date.now()}`};
                    return { ...day, activities: [...day.activities, newActivityInstance] };
                }
                return day;
            })
        );
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
        setPlanDays(prev => [
            ...prev,
            { id: `day-${prev.length + 1}`, name: `День ${prev.length + 1}`, activities: [] }
        ]);
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
                        Создайте свой идеальный тренировочный цикл.
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
                    <CardDescription>Составьте свой план, добавляя активности на каждый день.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {planDays.map(day => (
                            <Card key={day.id} className="flex flex-col bg-muted/50">
                                <CardHeader>
                                    <CardTitle className="text-lg">{day.name}</CardTitle>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-2">
                                    {day.activities.map(activity => (
                                        <div key={activity.id} className="flex items-center justify-between p-2 rounded-md border bg-card text-card-foreground shadow-sm">
                                            <p className="font-semibold text-sm">{activity.name}</p>
                                            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => removeActivityFromDay(day.id, activity.id)}>
                                                <Trash2 className="h-4 w-4 text-destructive/70" />
                                            </Button>
                                        </div>
                                    ))}
                                     <ActivityLibraryDialog onSelectActivity={(activity) => addActivityToDay(day.id, activity)} />
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
        </div>
    );
}
