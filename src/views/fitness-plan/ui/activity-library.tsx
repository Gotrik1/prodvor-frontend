
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Dumbbell, Users, Sun } from 'lucide-react';

export interface Activity {
    id: string;
    name: string;
    type: 'template' | 'group' | 'other';
}

const mockTemplates: Activity[] = [
    { id: 'template-1', name: 'День ног', type: 'template' },
    { id: 'template-2', name: 'Тренировка груди и трицепса', type: 'template' },
    { id: 'template-3', name: 'Кардио-интенсив', type: 'template' },
];
const mockGroupSessions: Activity[] = [
    { id: 'group-1', name: 'Йога', type: 'group' },
    { id: 'group-2', name: 'Сайкл', type: 'group' },
    { id: 'group-3', name: 'Пилатес', type: 'group' },
];
const mockOther: Activity[] = [
    { id: 'other-1', name: 'Отдых', type: 'other' },
    { id: 'other-2', name: 'СПА / Баня', type: 'other' },
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
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="templates"><Dumbbell className="h-4 w-4" /></TabsTrigger>
                        <TabsTrigger value="group"><Users className="h-4 w-4" /></TabsTrigger>
                        <TabsTrigger value="other"><Sun className="h-4 w-4" /></TabsTrigger>
                    </TabsList>
                    <TabsContent value="templates" className="mt-4">
                        <Droppable droppableId="library-templates" isDropDisabled={true}>
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
                         <Droppable droppableId="library-group" isDropDisabled={true}>
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
                    <TabsContent value="other" className="mt-4">
                         <Droppable droppableId="library-other" isDropDisabled={true}>
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
