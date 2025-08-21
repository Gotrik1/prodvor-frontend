
'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Bot, PlayCircle, StopCircle, Ban, RefreshCw, ExternalLink } from "lucide-react";
import Image from "next/image";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import React from "react";
import type { Tournament } from '@/views/tournaments/public-page/ui/mock-data';
import Link from "next/link";
import { useTournamentCrmContext } from "../../lib/TournamentCrmContext";

const statusColors: Record<string, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦИЯ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-300/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
    'ПРИОСТАНОВЛЕН': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'ОТМЕНЕН': 'bg-red-500/20 text-red-300 border-red-500/30',
}

const statusOptions = ['АНОНС', 'ПРЕДРЕГИСТРАЦИЯ', 'РЕГИСТРАЦИЯ', 'ИДЕТ', 'ЗАВЕРШЕН', 'ПРИОСТАНОВЛЕН', 'ОТМЕНЕН'];

const StatCard = ({ title, value }: { title: string, value: string | React.ReactNode }) => (
    <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center text-center h-full">
        <p className="text-sm text-muted-foreground mb-2">{title}</p>
        <div className="text-2xl font-bold">{value}</div>
    </div>
);

export function OverviewTab() {
    const { tournament, handleTournamentChange, confirmedTeams } = useTournamentCrmContext();

    if (!tournament) return null;

    const onStatusChange = (status: Tournament['status']) => {
        handleTournamentChange({ status });
    };
    
    const getAiAdvice = () => {
        return `AI-Советник временно недоступен.`;
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Обзор турнира</CardTitle>
                        <CardDescription>Ключевая информация о вашем мероприятии.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="relative w-full h-48 md:h-64 rounded-lg overflow-hidden">
                            <Image src={tournament.bannerUrl} alt={tournament.name} layout="fill" objectFit="cover" data-ai-hint={tournament.dataAiHint} />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                           <div className="p-4 bg-muted rounded-lg flex flex-col items-center justify-center text-center h-full">
                                <p className="text-sm text-muted-foreground mb-2">Статус</p>
                                <Select value={tournament.status} onValueChange={(value) => onStatusChange(value as Tournament['status'])}>
                                    <SelectTrigger className={`w-full font-semibold ${statusColors[tournament.status]}`}>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {statusOptions.map(option => (
                                            <SelectItem key={option} value={option}>{option}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <StatCard title="Участники" value={`${confirmedTeams.length}/${tournament.maxParticipants}`} />
                            <StatCard title="Призовой фонд" value={<span className="text-primary">{tournament.prizePool}</span>} />
                            <StatCard title="Дата начала" value={new Date(tournament.startDate).toLocaleDateString('ru-RU')} />
                        </div>
                    </CardContent>
                </Card>
            </div>
             <div className="space-y-6">
                 <Card>
                    <CardHeader>
                      <CardTitle className="text-lg flex items-center gap-2">Быстрые действия</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button asChild className="w-full justify-start" variant="outline">
                        <Link href={`/tournaments/${tournament.id}`}>
                            <ExternalLink className="mr-2 h-4 w-4"/>Перейти на страницу турнира
                        </Link>
                      </Button>
                      <Button className="w-full justify-start" variant="secondary"><PlayCircle className="mr-2 h-4 w-4"/>Начать турнир</Button>
                      <Button className="w-full justify-start" variant="secondary"><StopCircle className="mr-2 h-4 w-4"/>Завершить турнир</Button>
                      <Button className="w-full justify-start" variant="destructive"><Ban className="mr-2 h-4 w-4"/>Отменить турнир</Button>
                    </CardContent>
                 </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-lg flex items-center gap-2"><Bot />AI-Советник</CardTitle>
                      <Button variant="ghost" size="icon" className="h-7 w-7"><RefreshCw className="h-4 w-4"/></Button>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground">{getAiAdvice()}</p>
                    </CardContent>
                 </Card>
            </div>
        </div>
    )
}
