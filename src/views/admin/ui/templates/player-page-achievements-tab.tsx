
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { allSports, achievementsBySport, type User } from "@/mocks";
import { Award, Gem } from "lucide-react";
import { Progress } from "@/shared/ui/progress";

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
    const totalAchievements = Object.values(achievementsBySport).flat().length;
    // Mock player progress
    const unlockedCount = 28; 
    const progressPoints = 3750;
    const currentLevel = 18;
    const pointsToNextLevel = 5000;
    const levelProgress = (progressPoints / pointsToNextLevel) * 100;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Прогресс игрока</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                           <StatCard title="Достижения" value={`${unlockedCount} / ${totalAchievements}`} icon={Award} />
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
                        <CardTitle>Все достижения</CardTitle>
                        <CardDescription>Список всех возможных достижений, сгруппированных по видам спорта.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {allSports.map(sport => {
                                const sportAchievements = achievementsBySport[sport.id] || achievementsBySport['default'];
                                return (
                                <AccordionItem value={sport.id} key={sport.id}>
                                    <AccordionTrigger>{sport.name}</AccordionTrigger>
                                    <AccordionContent>
                                        <div className="space-y-3">
                                            {sportAchievements.map(ach => (
                                                <div key={ach.id} className="flex items-start gap-4 p-3 rounded-md hover:bg-muted/50 opacity-50 data-[unlocked=true]:opacity-100" data-unlocked={Math.random() > 0.5}>
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
                            )})}
                        </Accordion>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}

    