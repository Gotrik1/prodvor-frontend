
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { GripVertical, Trash2 } from 'lucide-react';
import type { Activity } from './activity-library';
import { Button } from '@/shared/ui/button';

export interface Day {
  id: string;
  name: string;
  activities: Activity[];
}

interface FitnessPlanCalendarProps {
    weekSchedule: Day[];
    setWeekSchedule: React.Dispatch<React.SetStateAction<Day[]>>;
}

const ActivityCard = ({ activity, index, dayId, onRemove }: { activity: Activity, index: number, dayId: string, onRemove: (dayId: string, activityId: string) => void }) => {
    return (
        <Draggable draggableId={activity.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="p-2 mb-2 rounded-md border bg-card text-card-foreground shadow-sm flex items-center justify-between"
                >
                    <div className="flex items-center gap-2">
                        <div {...provided.dragHandleProps}>
                            <GripVertical className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{activity.name}</p>
                            <p className="text-xs text-muted-foreground">{activity.type === 'template' ? 'Шаблон' : 'Групповое'}</p>
                        </div>
                    </div>
                     <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => onRemove(dayId, activity.id)}>
                        <Trash2 className="h-4 w-4 text-destructive/70" />
                    </Button>
                </div>
            )}
        </Draggable>
    );
};

export function FitnessPlanCalendar({ weekSchedule, setWeekSchedule }: FitnessPlanCalendarProps) {

    const removeActivity = (dayId: string, activityId: string) => {
        setWeekSchedule(prev => prev.map(day => {
            if (day.id === dayId) {
                return {
                    ...day,
                    activities: day.activities.filter(act => act.id !== activityId),
                };
            }
            return day;
        }));
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>План на неделю</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
                    {weekSchedule.map((day) => (
                        <div key={day.id}>
                            <h3 className="font-semibold text-center mb-2">{day.name}</h3>
                            <Droppable droppableId={day.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`p-2 rounded-lg bg-muted/50 min-h-[200px] transition-colors ${
                                            snapshot.isDraggingOver ? 'bg-primary/10' : ''
                                        }`}
                                    >
                                        {day.activities.map((activity, index) => (
                                            <ActivityCard key={activity.id} activity={activity} index={index} dayId={day.id} onRemove={removeActivity} />
                                        ))}
                                        {provided.placeholder}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
