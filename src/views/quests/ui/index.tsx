
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { CheckCircle, Gem, Puzzle, Swords, MessageSquare, Dumbbell, Repeat, Trophy, Users, CalendarCheck, MapPin, Ticket, Heart, Tv, Gavel, BookOpen, GraduationCap, ClipboardPlus, Bot, CalendarPlus, UserPlus } from "lucide-react";
import { questsByRole, eventQuests, Quest } from '../lib/mock-data';
import { Progress } from '@/shared/ui/progress';
import { Button } from '@/shared/ui/button';
import { useToast } from '@/shared/hooks/use-toast';
import { cn } from '@/shared/lib/utils';
import type { LucideProps } from 'lucide-react';
import React from 'react';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

const iconMap: Record<string, React.FC<LucideProps>> = {
  Swords, MessageSquare, Dumbbell, Repeat, Trophy, Users, CalendarCheck, MapPin, Puzzle,
  Ticket, Heart, Tv, Gavel, BookOpen, GraduationCap, ClipboardPlus, Bot, CalendarPlus, UserPlus
};

const QuestIcon = ({ name, ...props }: { name: string } & LucideProps) => {
  const Icon = iconMap[name] || Puzzle;
  return <Icon {...props} />;
};

const QuestCard = ({ quest: initialQuest, onClaim }: { quest: Quest; onClaim: (questId: string) => void; }) => {
    const isCompleted = initialQuest.progress >= initialQuest.target;
    
    return (
        <Card className={cn("flex flex-col transition-all", isCompleted && !initialQuest.claimed && "border-primary shadow-primary/20", initialQuest.claimed && "opacity-60 bg-muted/50")}>
            <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className="p-3 rounded-lg bg-muted text-primary">
                    <QuestIcon name={initialQuest.icon} className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle>{initialQuest.name}</CardTitle>
                    <CardDescription>{initialQuest.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-medium">Прогресс</span>
                        <span className="text-muted-foreground">{initialQuest.progress} / {initialQuest.target}</span>
                    </div>
                    <Progress value={(initialQuest.progress / initialQuest.target) * 100} />
                </div>
                <div className="flex items-center justify-center gap-4 text-center pt-2">
                    <div>
                        <p className="font-bold text-lg">{initialQuest.rewards.xp}</p>
                        <p className="text-xs text-muted-foreground">Очки прогресса</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-lg text-primary">
                        <Gem className="h-5 w-5" />
                        <span>{initialQuest.rewards.pd_coins}</span>
                    </div>
                </div>
            </CardContent>
            <CardContent>
                 <Button 
                    className="w-full" 
                    disabled={!isCompleted || initialQuest.claimed}
                    onClick={() => onClaim(initialQuest.id)}
                >
                    {initialQuest.claimed ? (
                        <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Награда получена
                        </>
                    ) : isCompleted ? (
                        "Забрать награду"
                    ) : (
                        "В процессе"
                    )}
                </Button>
            </CardContent>
        </Card>
    );
};

const QuestTabContent = ({ quests, type }: { quests: Quest[]; type: 'daily' | 'weekly' | 'event' }) => {
    const { toast } = useToast();
    const [questState, setQuestState] = useState(quests);

    const handleClaimReward = (questId: string) => {
        const quest = questState.find(q => q.id === questId);
        if (!quest) return;

        setQuestState(prevState => 
            prevState.map(q => q.id === questId ? { ...q, claimed: true } : q)
        );
        toast({
            title: "Награда получена!",
            description: `Вы получили ${quest.rewards.xp} ОП и ${quest.rewards.pd_coins} PD Coins.`,
        });
    };
    
    return (
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questState.map(quest => (
                <QuestCard key={quest.id} quest={quest} onClaim={handleClaimReward} />
            ))}
        </div>
    );
}

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
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                    <Puzzle className="h-8 w-8" />
                    Квесты
                </h1>
                <p className="text-muted-foreground mt-1">
                    Выполняйте задания, чтобы получать награды и ускорять свой прогресс.
                </p>
            </div>
            
            <Tabs defaultValue="daily" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="daily">Ежедневные</TabsTrigger>
                    <TabsTrigger value="weekly">Еженедельные</TabsTrigger>
                    <TabsTrigger value="event">Событийные</TabsTrigger>
                </TabsList>
                <TabsContent value="daily" className="mt-6">
                    <QuestTabContent quests={userQuests.daily} type="daily" />
                </TabsContent>
                <TabsContent value="weekly" className="mt-6">
                    <QuestTabContent quests={userQuests.weekly} type="weekly" />
                </TabsContent>
                <TabsContent value="event" className="mt-6">
                    <QuestTabContent quests={eventQuests} type="event" />
                </TabsContent>
            </Tabs>
        </div>
    );
}
