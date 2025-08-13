
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table';
import { teams as allTeams, sportCategories } from '@/mocks';
import { Crown, Trophy } from "lucide-react";
import Image from 'next/image';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Badge } from '@/shared/ui/badge';
import Link from 'next/link';

const rankColors = [
    'text-amber-400', // 1st
    'text-slate-400', // 2nd
    'text-amber-600'  // 3rd
];

const allDisciplines = [...new Set(allTeams.map(team => team.game))];

export function LeaguesPage() {
    const [selectedDiscipline, setSelectedDiscipline] = useState('all');

    const filteredAndSortedTeams = allTeams
        .filter(team => selectedDiscipline === 'all' || team.game === selectedDiscipline)
        .sort((a, b) => b.rank - a.rank);

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <CardTitle className="text-2xl flex items-center gap-2"><Trophy /> Рейтинговые таблицы</CardTitle>
                            <CardDescription>Отслеживайте свое место среди лучших команд платформы.</CardDescription>
                        </div>
                        <div className="mt-4 sm:mt-0">
                             <Select value={selectedDiscipline} onValueChange={setSelectedDiscipline}>
                                <SelectTrigger className="w-full sm:w-[280px]">
                                    <SelectValue placeholder="Фильтр по дисциплине" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Все дисциплины</SelectItem>
                                    {allDisciplines.map(discipline => (
                                        <SelectItem key={discipline} value={discipline}>{discipline}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="border rounded-lg">
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
                                {filteredAndSortedTeams.map((team, index) => (
                                    <TableRow key={team.id}>
                                        <TableCell className="text-center font-bold text-lg">
                                            <span className={rankColors[index] || ''}>{index + 1}</span>
                                        </TableCell>
                                        <TableCell>
                                            <Link href={`/teams/${team.id}`} className="flex items-center gap-3 group">
                                                <Image src={team.logoUrl} alt={team.name} width={40} height={40} className="rounded-md" data-ai-hint="team logo"/>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-medium group-hover:text-primary transition-colors">{team.name}</span>
                                                    {index === 0 && <Crown className="h-4 w-4 text-amber-400" />}
                                                </div>
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
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
