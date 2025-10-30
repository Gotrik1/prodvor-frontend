

'use client';

import { useMemo } from 'react';
import { Card, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { QuestCard } from './quest-card';
import { questsByRole, eventQuests } from '../lib/mock-data';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Puzzle } from 'lucide-react';

export function QuestsPage() {
    const { user } = useUserStore();

    const userQuests = useMemo(() => {
        if (!user || !user.role) {
            // Default to player quests if user is not defined
            return questsByRole['Игрок'] || { daily: [], weekly: [] };
        }
        return questsByRole[user.role] || questsByRole['Игрок'] || { daily: [], weekly: [] };
    }, [user]);


    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <header>
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="p-3 bg-primary/10 text-primary rounded-md">
                                <Puzzle className="h-8 w-8" />
                            </div>
                            <div>
                                <CardTitle className="text-3xl font-bold font-headline">Квесты</CardTitle>
                                <p className="text-muted-foreground mt-1">
                                    Выполняйте задания, чтобы получать награды и ускорять свой прогресс.
                                </p>
                            </div>
                        </div>
                    </CardHeader>
                </Card>
            </header>
            
            <Tabs defaultValue="daily" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="daily">Ежедневные</TabsTrigger>
                    <TabsTrigger value="weekly">Еженедельные</TabsTrigger>
                    <TabsTrigger value="event">Событийные</TabsTrigger>
                </TabsList>
                <TabsContent value="daily" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userQuests.daily.map(quest => (
                            <QuestCard key={quest.id} quest={quest} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="weekly" className="mt-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userQuests.weekly.map(quest => (
                            <QuestCard key={quest.id} quest={quest} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="event" className="mt-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventQuests.map(quest => (
                            <QuestCard key={quest.id} quest={quest} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
