
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { teams as allTeams, teamSports } from '@/mocks';
import { Crown, Trophy, Shield, Star } from "lucide-react";
import Image from 'next/image';
import { Badge } from '@/shared/ui/badge';
import Link from 'next/link';
import { useState, useMemo } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel } from '@/shared/ui/select';
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";

const rankColors = [
    'border-amber-400 shadow-amber-400/20', // 1st
    'border-slate-400 shadow-slate-400/20', // 2nd
    'border-amber-600 shadow-amber-600/20'  // 3rd
];

const LegendCard = ({ team, rank }: { team: typeof allTeams[0], rank: number }) => {
    const Icon = rank === 1 ? Crown : rank === 2 ? Star : Shield;
    const color = rank === 1 ? 'text-amber-400' : rank === 2 ? 'text-slate-400' : 'text-amber-600';
    return (
         <Card className={`w-full bg-card/50 shadow-lg ${rankColors[rank - 1]}`}>
             <CardContent className="p-0">
                <div className="p-4 flex flex-col items-center text-center">
                    <div className="relative mb-3">
                        <Icon className={`absolute -top-2 -left-2 h-6 w-6 ${color}`} />
                        <Image src={team.logoUrl} alt={team.name} width={64} height={64} className="rounded-lg border-2" data-ai-hint={team.dataAiHint}/>
                    </div>
                    <Link href={`/teams/${team.id}`} className="font-bold text-lg hover:text-primary transition-colors">{team.name}</Link>
                    <p className="text-sm text-muted-foreground">{team.rank} ELO</p>
                </div>
             </CardContent>
        </Card>
    );
}

export function LeaguesPage() {
    const [selectedDiscipline, setSelectedDiscipline] = useState('all');

    const filteredAndSortedTeams = useMemo(() => {
        return allTeams
            .filter(team => selectedDiscipline === 'all' || team.game === selectedDiscipline)
            .sort((a, b) => b.rank - a.rank);
    }, [selectedDiscipline]);

    const legendDivision = filteredAndSortedTeams.slice(0, 3);
    const mainLeague = filteredAndSortedTeams.slice(3);


    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-2xl flex items-center gap-2"><Trophy /> Рейтинговые лиги</CardTitle>
                            <CardDescription>Отслеживайте свое место среди лучших команд платформы. Лучшие из лучших попадают в Дивизион Легенд.</CardDescription>
                        </div>
                        <div className="mt-4 sm:mt-0">
                             <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
                                <SelectTrigger className="w-full sm:w-[280px]">
                                    <SelectValue placeholder="Фильтр по дисциплине" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все дисциплины</SelectItem>
                                     <SelectGroup>
                                        <SelectLabel>Командные виды спорта</SelectLabel>
                                        {teamSports.map((sport) => (
                                            <SelectItem key={sport.id} value={sport.name}>
                                                {sport.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <section>
                <h3 className="text-xl font-bold text-center mb-4 text-amber-400">Дивизион Легенд</h3>
                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                    {legendDivision.map((team, index) => (
                        <LegendCard key={team.id} team={team} rank={index + 1} />
                    ))}
                </div>
            </section>

            <section>
                 <h3 className="text-xl font-bold mb-4">Основная Лига (Топ 50)</h3>
                 <Card>
                    <CardContent className="p-0">
                        <ScrollArea className="w-full whitespace-nowrap rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="w-16 text-center">Ранг</TableHead>
                                        <TableHead>Команда</TableHead>
                                        <TableHead>Дисциплина</TableHead>
                                        <TableHead className="text-right">Рейтинг (ELO)</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mainLeague.slice(0, 47).map((team, index) => (
                                        <TableRow key={team.id}>
                                            <TableCell className="text-center font-bold text-lg">
                                                <span>{index + 4}</span>
                                            </TableCell>
                                            <TableCell>
                                                <Link href={`/teams/${team.id}`} className="flex items-center gap-3 group">
                                                    <Image src={team.logoUrl} alt={team.name} width={40} height={40} className="rounded-md" data-ai-hint={team.dataAiHint}/>
                                                    <span className="font-medium group-hover:text-primary transition-colors whitespace-normal">{team.name}</span>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">{team.game}</Badge>
                                            </TableCell>
                                            <TableCell className="text-right font-mono text-lg font-semibold">{team.rank}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </CardContent>
                 </Card>
            </section>
        </div>
    );
}
