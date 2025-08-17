
'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Dumbbell, PlusCircle, Save } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import type { DropResult } from 'react-beautiful-dnd';
import { FitnessPlanCalendar, Day } from './fitness-plan-calendar';
import { ActivityLibrary, Activity } from './activity-library';

// Helper to move items between lists
const move = (source: Activity[], destination: Activity[], droppableSource: any, droppableDestination: any): { [key: string]: Activity[] } => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result: { [key: string]: Activity[] } = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

// Helper to reorder items in the same list
const reorder = (list: Activity[], startIndex: number, endIndex: number): Activity[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};


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

        // Dropped outside the list
        if (!destination) {
            return;
        }
        
        const sourceId = source.droppableId;
        const destId = destination.droppableId;

        // Reordering within the same day
        if (sourceId === destId) {
            const dayIndex = weekSchedule.findIndex(day => day.id === sourceId);
            if (dayIndex !== -1) {
                const reorderedActivities = reorder(
                    weekSchedule[dayIndex].activities,
                    source.index,
                    destination.index
                );
                const newWeekSchedule = [...weekSchedule];
                newWeekSchedule[dayIndex].activities = reorderedActivities;
                setWeekSchedule(newWeekSchedule);
            }
        }
        
        // Moving from library to a day
        if (sourceId.startsWith('library-') && destId.startsWith('day-')) {
             const dayIndex = weekSchedule.findIndex(day => day.id === destId);
             if (dayIndex !== -1) {
                const destActivities = Array.from(weekSchedule[dayIndex].activities);
                // This is a simplified version. A real one would need access to library state.
                // For now, we'll just mock adding a new item.
                const newActivity: Activity = {
                    id: `clone-${Date.now()}`,
                    name: `Активность ${source.index + 1}`,
                    type: 'template', // This should be dynamic
                };

                destActivities.splice(destination.index, 0, newActivity);

                const newWeekSchedule = [...weekSchedule];
                newWeekSchedule[dayIndex].activities = destActivities;
                setWeekSchedule(newWeekSchedule);
             }
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
