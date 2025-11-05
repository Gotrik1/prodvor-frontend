

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Skeleton } from '@/shared/ui/skeleton';
import type { Team } from '@/mocks';
import api from '@/shared/api/axios-instance';

interface SeasonStat {
    season: number;
    leagueRank: string;
    finalElo: number;
    wins: number;
    losses: number;
}

const StatRow = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);

export const TeamStatsWidget = ({ team }: { team?: Team }) => {
    const [stats, setStats] = useState<SeasonStat[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!team?.id) { 
                setIsLoading(false);
                return;
            }
            setIsLoading(true);
            try {
                const response = await api.get(`/api/v1/teams/${team.id}/stats`);
                
                const teamCreationYear = new Date(team.createdAt).getFullYear();
                const filteredStats = (response.data as SeasonStat[]).filter((stat: SeasonStat) => stat.season >= teamCreationYear);
                
                setStats(filteredStats.sort((a: SeasonStat, b: SeasonStat) => b.season - a.season));

            } catch (error) {
                console.error("Failed to fetch team stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, [team]);

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-40 w-full" />
                </CardContent>
            </Card>
        );
    }
    
    if (stats.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Статистика по сезонам</CardTitle>
                    <CardDescription>История выступлений команды в различных сезонах.</CardDescription>
                </CardHeader>
                <CardContent className="text-center text-muted-foreground py-10">
                    <p>Статистика по сезонам еще не доступна.</p>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Статистика по сезонам</CardTitle>
                <CardDescription>История выступлений команды в различных сезонах.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue={stats[0].season.toString()} className="w-full" orientation="vertical">
                    <TabsList>
                        {stats.map(stat => (
                             <TabsTrigger key={stat.season} value={stat.season.toString()}>Сезон {stat.season}</TabsTrigger>
                        ))}
                    </TabsList>
                    {stats.map(stat => (
                        <TabsContent key={stat.season} value={stat.season.toString()} className="ml-4 pl-4 border-l">
                            <StatRow label="Место в лиге" value={stat.leagueRank} />
                            <StatRow label="ELO на конец сезона" value={stat.finalElo} />
                            <StatRow label="Побед / Поражений" value={`${stat.wins} / ${stat.losses}`} />
                        </TabsContent>
                    ))}
                </Tabs>
            </CardContent>
        </Card>
    );
};
