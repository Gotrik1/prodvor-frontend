
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Dumbbell, Users, HeartPulse, Sun } from 'lucide-react';

export interface Activity {
    id: string;
    name: string;
    type: 'template' | 'group' | 'recovery' | 'other';
}

export const mockTemplates: Activity[] = [
    { id: 'template-1', name: 'День ног', type: 'template' },
    { id: 'template-2', name: 'Грудь и трицепс', type: 'template' },
    { id: 'template-3', name: 'Кардио-интенсив', type: 'template' },
    { id: 'template-4', name: 'Full-body тренировка', type: 'template' },
    { id: 'template-5', name: 'Персональный тренинг', type: 'template' },
];

export const mockGroupSessions: Activity[] = [
    { id: 'group-1', name: 'Силовой и функциональный', type: 'group' },
    { id: 'group-2', name: 'Водные программы', type: 'group' },
    { id: 'group-3', name: 'Танцевальные программы', type: 'group' },
    { id: 'group-4', name: 'Mind & Body (Йога/Пилатес)', type: 'group' },
    { id: 'group-5', name: 'Боевые искусства', type: 'group' },
    { id: 'group-6', name: 'Игровые программы', type: 'group' },
    { id: 'group-7', name: 'Программы Outdoor', type: 'group' },
];

export const mockRecovery: Activity[] = [
    { id: 'recovery-1', name: 'Отдых', type: 'recovery' },
    { id: 'recovery-2', name: 'SPA / Баня', type: 'recovery' },
    { id: 'recovery-3', name: 'Массаж', type: 'recovery' },
    { id: 'recovery-4', name: 'Медицинское фитнес-тестирование', type: 'recovery' },
];

export const mockOther: Activity[] = [
    { id: 'other-1', name: 'Детский фитнес', type: 'other' },
    { id: 'other-2', name: 'Специальные программы', type: 'other' },
];

const ActivityItem = ({ activity, index }: { activity: Activity; index: number }) => (
    <Draggable draggableId={activity.id} index={index}>
        {(provided) => (
            <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                className="p-3 mb-2 rounded-md border bg-card text-card-foreground shadow-sm hover:bg-accent hover:text-accent-foreground cursor-grab"
            >
                <p className="font-semibold text-sm">{activity.name}</p>
            </div>
        )}
    </Draggable>
);

export function ActivityLibrary() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Библиотека активностей</CardTitle>
                <CardDescription>Перетащите элементы в календарь.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="templates">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="templates"><Dumbbell className="h-4 w-4" /></TabsTrigger>
                        <TabsTrigger value="group"><Users className="h-4 w-4" /></TabsTrigger>
                        <TabsTrigger value="recovery"><HeartPulse className="h-4 w-4" /></TabsTrigger>
                        <TabsTrigger value="other"><Sun className="h-4 w-4" /></TabsTrigger>
                    </TabsList>
                    <TabsContent value="templates" className="mt-4">
                        <Droppable droppableId="library-templates" isDropDisabled={true} isCombineEnabled={false}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {mockTemplates.map((item, index) => (
                                        <ActivityItem key={item.id} activity={item} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </TabsContent>
                    <TabsContent value="group" className="mt-4">
                         <Droppable droppableId="library-group" isDropDisabled={true} isCombineEnabled={false}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {mockGroupSessions.map((item, index) => (
                                        <ActivityItem key={item.id} activity={item} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </TabsContent>
                    <TabsContent value="recovery" className="mt-4">
                         <Droppable droppableId="library-recovery" isDropDisabled={true} isCombineEnabled={false}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {mockRecovery.map((item, index) => (
                                        <ActivityItem key={item.id} activity={item} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </TabsContent>
                    <TabsContent value="other" className="mt-4">
                         <Droppable droppableId="library-other" isDropDisabled={true} isCombineEnabled={false}>
                            {(provided) => (
                                <div ref={provided.innerRef} {...provided.droppableProps}>
                                    {mockOther.map((item, index) => (
                                        <ActivityItem key={item.id} activity={item} index={index} />
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
