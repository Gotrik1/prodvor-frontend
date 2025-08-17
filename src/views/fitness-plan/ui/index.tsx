
'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Dumbbell, Save } from 'lucide-react';
import { DragDropContext } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { FitnessPlanCalendar, Day } from './fitness-plan-calendar';
import { ActivityLibrary, Activity, mockTemplates, mockGroupSessions, mockRecovery, mockOther } from './activity-library';

const allActivitiesMap = [
    ...mockTemplates,
    ...mockGroupSessions,
    ...mockRecovery,
    ...mockOther,
].reduce((acc, activity) => {
    acc[activity.id] = activity;
    return acc;
}, {} as Record<string, Activity>);


export function FitnessPlanPage() {
    const [weekSchedule, setWeekSchedule] = useState<Day[]>([
        { id: 'day-1', name: 'Понедельник', activities: [] },
        { id: 'day-2', name: 'Вторник', activities: [] },
        { id: 'day-3', name: 'Среда', activities: [] },
        { id: 'day-4', name: 'Четверг', activities: [] },
        { id: 'day-5', name: 'Пятница', activities: [] },
        { id: 'day-6', name: 'Суббота', activities: [] },
        { id: 'day-7', name: 'Воскресенье', activities: [] },
    ]);
    
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
        setIsClient(true);
    }, []);

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }
        
        const sourceId = source.droppableId;
        const destId = destination.droppableId;

        const newWeekSchedule = [...weekSchedule];
        const sourceDayIndex = newWeekSchedule.findIndex(day => day.id === sourceId);
        const destDayIndex = newWeekSchedule.findIndex(day => day.id === destId);

        // --- Перетаскивание из библиотеки в календарь ---
        if (sourceId.startsWith('library-')) {
            const sourceActivity = allActivitiesMap[result.draggableId];
            if (sourceActivity && destDayIndex !== -1) {
                const destDay = newWeekSchedule[destDayIndex];
                const newActivity = {
                    ...sourceActivity,
                    id: `instance-${Date.now()}-${Math.random()}`, // Create a unique ID for the new instance
                };
                const newActivities = Array.from(destDay.activities);
                newActivities.splice(destination.index, 0, newActivity);
                newWeekSchedule[destDayIndex] = { ...destDay, activities: newActivities };
                setWeekSchedule(newWeekSchedule);
            }
            return;
        }

        // --- Перетаскивание внутри календаря ---
        if (sourceDayIndex !== -1 && destDayIndex !== -1) {
            // Reordering within the same day
            if (sourceId === destId) {
                const day = newWeekSchedule[sourceDayIndex];
                const reorderedActivities = Array.from(day.activities);
                const [removed] = reorderedActivities.splice(source.index, 1);
                reorderedActivities.splice(destination.index, 0, removed);
                newWeekSchedule[sourceDayIndex] = { ...day, activities: reorderedActivities };
            } 
            // Moving from one day to another
            else {
                const sourceDay = newWeekSchedule[sourceDayIndex];
                const destDay = newWeekSchedule[destDayIndex];
                const sourceActivities = Array.from(sourceDay.activities);
                const destActivities = Array.from(destDay.activities);
                const [removed] = sourceActivities.splice(source.index, 1);
                destActivities.splice(destination.index, 0, removed);
                newWeekSchedule[sourceDayIndex] = { ...sourceDay, activities: sourceActivities };
                newWeekSchedule[destDayIndex] = { ...destDay, activities: destActivities };
            }
            setWeekSchedule(newWeekSchedule);
        }
    };


    if (!isClient) {
        return null; // or a loading skeleton
    }
    
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="p-4 md:p-6 lg:p-8 space-y-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                            <Dumbbell className="h-8 w-8" />
                            Конструктор фитнес-плана
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Составьте свою идеальную неделю, перетаскивая активности в календарь.
                        </p>
                    </div>
                    <Button size="lg">
                        <Save className="mr-2 h-4 w-4" />
                        Сохранить план
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    <div className="lg:col-span-2">
                         <FitnessPlanCalendar weekSchedule={weekSchedule} setWeekSchedule={setWeekSchedule} />
                    </div>
                    <div className="lg:sticky top-24">
                        <ActivityLibrary />
                    </div>
                </div>
            </div>
        </DragDropContext>
    );
}
