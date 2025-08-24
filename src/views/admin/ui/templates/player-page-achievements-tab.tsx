
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import { allSports, achievementsBySport, Achievement } from '@/mocks';
import { Award, Gem } from "lucide-react";
import { Progress } from "@/shared/ui/progress";
import type { User } from "@/mocks";
import React, { useMemo } from "react";

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | number, icon: React.ElementType }) => (
    <Card className="bg-muted/50 text-center">
        <CardContent className="p-4">
            <Icon className="h-8 w-8 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-muted-foreground">{title}</p>
        </CardContent>
    </Card>
);

export function AchievementsTab({ player }: { player: User }) {
    const allAchievementsFlat: Achievement[] = useMemo(() => Object.values(achievementsBySport).flat(), []);

    const unlockedAchievements = useMemo(() => {
        return allAchievementsFlat.filter(ach => player.unlockedAchievements.includes(ach.id));
    }, [player.unlockedAchievements, allAchievementsFlat]);
    
    const achievementsBySportGroup = useMemo(() => {
        const grouped: Record<string, Achievement[]> = {};
        unlockedAchievements.forEach(ach => {
            for (const sportId in achievementsBySport) {
                if (achievementsBySport[sportId].some(a => a.id === ach.id)) {
                    if (!grouped[sportId]) {
                        grouped[sportId] = [];
                    }
                    grouped[sportId].push(ach);
                    break; 
                }
            }
        });
        return grouped;
    }, [unlockedAchievements]);


    const unlockedCount = unlockedAchievements.length;
    const progressPoints = unlockedCount * 200 + 1750; // Mock calculation
    const currentLevel = Math.floor(progressPoints / 1250);
    const pointsForCurrentLevel = (currentLevel - 1) * 1250;
    const pointsToNextLevel = currentLevel * 1250;
    const levelProgress = ((progressPoints - pointsForCurrentLevel) / (pointsToNextLevel - pointsForCurrentLevel)) * 100;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Прогресс игрока</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <StatCard title="Достижения" value={`${unlockedCount}`} icon={Award} />
                           <StatCard title="Очки Прогресса" value={progressPoints.toLocaleString('ru-RU')} icon={Gem} />
                        </div>
                        <div>
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="font-semibold">Уровень {currentLevel}</span>
                                <span className="text-xs text-muted-foreground">{progressPoints} / {pointsToNextLevel} ОП</span>
                            </div>
                            <Progress value={levelProgress} />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="lg:col-span-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Разблокированные достижения</CardTitle>
                        <CardDescription>Список всех полученных достижений, сгруппированных по видам спорта.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {unlockedAchievements.length > 0 ? (
                            <Accordion type="single" collapsible className="w-full" defaultValue={Object.keys(achievementsBySportGroup)[0]}>
                                {Object.entries(achievementsBySportGroup).map(([sportId, achievements]) => {
                                    const sport = allSports.find(s => s.id === sportId);
                                    if (!sport) return null;
                                    return (
                                        <AccordionItem value={sport.id} key={sport.id}>
                                            <AccordionTrigger>{sport.name}</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="space-y-3">
                                                    {achievements.map(ach => (
                                                        <div key={ach.id} className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50">
                                                            <div className="p-3 rounded-md bg-muted text-primary">
                                                                <ach.icon className="h-6 w-6"/>
                                                            </div>
                                                            <div>
                                                                <p className="font-semibold">{ach.name}</p>
                                                                <p className="text-sm text-muted-foreground">{ach.description}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    )
                                })}
                            </Accordion>
                        ) : (
                             <div className="text-center py-10 text-muted-foreground">
                                <Award className="mx-auto h-12 w-12" />
                                <h3 className="mt-4 font-semibold">Достижений пока нет</h3>
                                <p className="text-sm">Участвуйте в матчах и выполняйте квесты, чтобы их получить.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

    