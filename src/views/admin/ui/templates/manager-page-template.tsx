
'use client';

import { teams, users, allSports } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { BarChart, Briefcase, DollarSign, ExternalLink, Trophy, Users, Gamepad2, Activity } from "lucide-react";
import Link from "next/link";
import Image from 'next/image';

const defaultManager = users.find(u => u.role === 'Менеджер')!;

const managedTeams = teams.slice(0, 3);

const getUserDisciplines = (user: User): string[] => {
    const personalDisciplines = user.disciplines
        .map(id => allSports.find(s => s.id === id)?.name)
        .filter((name): name is string => !!name);
    
    const teamDisciplines = teams
        .filter(team => team.members.includes(user.id))
        .map(team => team.game);
        
    const allDisciplinesSet = new Set([...personalDisciplines, ...teamDisciplines]);
    return Array.from(allDisciplinesSet);
};

export function ManagerPageTemplate({ user }: { user?: User }) {
    const manager = user || defaultManager;
    const managerDisciplines = getUserDisciplines(manager);

    return (
        <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-muted/20">
            <header className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={manager.avatarUrl} alt={`${manager.firstName} ${manager.lastName}`} />
                    <AvatarFallback>{manager.firstName.charAt(0)}{manager.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{manager.firstName} {manager.lastName}</h1>
                    <p className="text-muted-foreground text-lg">Роль: {manager.role}</p>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                        <Badge variant="secondary">Агентство: Pro-Players Management</Badge>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <Card className="md:col-span-2 lg:col-span-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Gamepad2 />Дисциплины</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                           {managerDisciplines.length > 0 ? (
                                managerDisciplines.map(d => <Badge key={d}>{d}</Badge>)
                           ) : (
                                <p className="text-sm text-muted-foreground">Дисциплины не указаны.</p>
                           )}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Команд под управлением</CardTitle>
                        <Briefcase className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{managedTeams.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Всего игроков</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">28</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Общий призовой фонд</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,250,000₽</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Win Rate (средний)</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">68%</div>
                    </CardContent>
                </Card>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Управляемые команды</CardTitle>
                        <CardDescription>Обзор производительности команд, находящихся под вашим управлением.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="border rounded-lg">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Команда</TableHead>
                                        <TableHead>Дисциплина</TableHead>
                                        <TableHead className="text-center">Рейтинг ELO</TableHead>
                                        <TableHead className="text-center">Игроков</TableHead>
                                        <TableHead className="text-right">Действия</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {managedTeams.map((team) => (
                                        <TableRow key={team.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-3">
                                                    <Image src={team.logoUrl} alt={team.name} width={32} height={32} className="rounded-sm" data-ai-hint="team logo" />
                                                    <span>{team.name}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{team.game}</TableCell>
                                            <TableCell className="text-center font-mono">{team.rank}</TableCell>
                                            <TableCell className="text-center">{team.members.length}</TableCell>
                                            <TableCell className="text-right">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={`/teams/${team.id}`}>
                                                        Профиль <ExternalLink className="ml-2 h-3 w-3" />
                                                    </Link>
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Activity /> Тренировочный процесс</CardTitle>
                        <CardDescription>Анализ и планирование тренировок команд.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Раздел в разработке. Здесь будет отображаться сводная информация о тренировках всех команд, анализ эффективности и инструменты планирования.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
