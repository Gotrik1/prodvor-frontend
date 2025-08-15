
'use client';

import { users, teams } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { BarChart, Calendar, ClipboardList, Dumbbell, Shield, Star, Swords, Trophy, Users, Whistle } from "lucide-react";
import Image from 'next/image';
import { Button } from "@/shared/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/shared/ui/chart";
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis, CartesianGrid } from "recharts";

const defaultCoach = users.find(u => u.role === 'Тренер')!;
const coachTeam = teams[0];
const teamMembers = users.filter(u => coachTeam.members.includes(u.id));

const chartData = [
  { month: "Январь", winrate: 65 },
  { month: "Февраль", winrate: 70 },
  { month: "Март", winrate: 72 },
  { month: "Апрель", winrate: 68 },
  { month: "Май", winrate: 75 },
  { month: "Июнь", winrate: 80 },
];

const chartConfig = {
  winrate: {
    label: "Процент побед",
    color: "hsl(var(--primary))",
  },
};

export function CoachPageTemplate({ user }: { user?: User }) {
    const coach = user || defaultCoach;
    
    return (
        <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-muted/20">
            <header className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={coach.avatarUrl} alt={`${coach.firstName} ${coach.lastName}`} />
                    <AvatarFallback>{coach.firstName.charAt(0)}{coach.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{coach.firstName} "{coach.nickname}" {coach.lastName}</h1>
                    <p className="text-muted-foreground text-lg">Роль: {coach.role}, <span className="font-semibold text-foreground">{coachTeam.name}</span></p>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                        <Badge variant="secondary">Специализация: Тактика</Badge>
                        <Badge variant="outline">Опыт: 8 лет</Badge>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Команд в управлении</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Процент побед (сезон)</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-400">78%</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ближайшая тренировка</CardTitle>
                        <Dumbbell className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">Завтра, 18:00</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Лицензия</CardTitle>
                        <Shield className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">PRO-1583</div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                 <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart className="h-5 w-5" />
                            Динамика побед команды
                        </CardTitle>
                        <CardDescription>Процент побед за последние 6 месяцев.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       <ChartContainer config={chartConfig} className="h-64 w-full">
                            <RechartsBarChart data={chartData} accessibilityLayer>
                                <CartesianGrid vertical={false} />
                                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={false} />
                                <YAxis />
                                <ChartTooltip content={<ChartTooltipContent />} />
                                <ChartLegend content={<ChartLegendContent />} />
                                <Bar dataKey="winrate" fill="var(--color-winrate)" radius={4} />
                            </RechartsBarChart>
                        </ChartContainer>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Calendar className="h-5 w-5" />
                            Расписание тренировок
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                         <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                            <div>
                                <p className="font-semibold">Тактическая подготовка</p>
                                <p className="text-xs text-muted-foreground">Завтра, 18:00 - 20:00</p>
                            </div>
                            <Badge variant="outline">Запланировано</Badge>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                            <div>
                                <p className="font-semibold">Силовая тренировка</p>
                                <p className="text-xs text-muted-foreground">15.08.2025, 19:00 - 20:30</p>
                            </div>
                             <Badge variant="outline">Запланировано</Badge>
                        </div>
                         <Button className="w-full mt-2">Управлять расписанием</Button>
                    </CardContent>
                </Card>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle>Состав команды: {coachTeam.name}</CardTitle>
                    <CardDescription>Обзор и статистика игроков.</CardDescription>
                </CardHeader>
                <CardContent>
                   <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Игрок</TableHead>
                                <TableHead>Роль в команде</TableHead>
                                <TableHead className="text-center">Матчей</TableHead>
                                <TableHead className="text-center">Форма</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {teamMembers.map(member => (
                                <TableRow key={member.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={member.avatarUrl} data-ai-hint={member.gender === 'мужской' ? 'male' : 'female'} />
                                                <AvatarFallback>{member.firstName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{member.nickname}</p>
                                                <p className="text-xs text-muted-foreground">{member.firstName} {member.lastName}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={member.id === coachTeam.captainId ? "default" : "secondary"}>
                                            {member.id === coachTeam.captainId ? "Капитан" : "Игрок"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">58</TableCell>
                                    <TableCell className="text-center">
                                         <Badge variant="success">Отличная</Badge>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

        </div>
    );
}
