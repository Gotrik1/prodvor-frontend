
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Eye, Users as UsersIconComponent, TrendingUp, Trophy } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import { Bar as RechartsBar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts";
import { users, teams, allSports } from '@/mocks';
import { allTournaments as tournaments } from '@/views/tournaments/public-page/ui/mock-data';
import Link from 'next/link';


const userRegistrationData = [
  { month: "Янв", registrations: 186 },
  { month: "Фев", registrations: 305 },
  { month: "Мар", registrations: 237 },
  { month: "Апр", registrations: 173 },
  { month: "Май", registrations: 209 },
  { month: "Июн", registrations: 250 },
];

const topSportsData = allSports.filter(s => s.isTeamSport).slice(0, 5).map(s => ({
    sport: s.name,
    teams: teams.filter(t => t.game === s.name).length
}));

const chartConfig = {
    registrations: { label: "Регистрации", color: "hsl(var(--primary))" },
    teams: { label: "Команды", color: "hsl(var(--primary))" },
}

export function OverviewTab() {
  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><UsersIconComponent className="h-5 w-5"/>Всего пользователей</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{users.length}</p>
                    <p className="text-sm text-muted-foreground">+20.1% с прошлого месяца</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5"/>Активных команд</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{teams.length}</p>
                    <p className="text-sm text-muted-foreground">+18.3% с прошлого месяца</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Trophy className="h-5 w-5"/>Текущие турниры</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-4xl font-bold">{tournaments.filter(t => t.status === 'ИДЕТ').length}</p>
                    <p className="text-sm text-muted-foreground">+2 новых на этой неделе</p>
                </CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                 <CardHeader>
                    <CardTitle>Динамика регистраций</CardTitle>
                    <CardDescription>Новые пользователи за последние 6 месяцев.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ChartContainer config={chartConfig} className="h-64 w-full">
                        <RechartsBarChart data={userRegistrationData} accessibilityLayer>
                            <XAxis dataKey="month" tickLine={false} axisLine={false} />
                            <YAxis tickLine={false} axisLine={false} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <RechartsBar dataKey="registrations" fill="var(--color-registrations)" radius={4} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Топ-5 дисциплин</CardTitle>
                    <CardDescription>По количеству созданных команд.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ChartContainer config={chartConfig} className="h-64 w-full">
                        <RechartsBarChart data={topSportsData} layout="vertical" accessibilityLayer>
                            <XAxis type="number" hide />
                            <YAxis dataKey="sport" type="category" tickLine={false} axisLine={false} width={80} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <RechartsBar dataKey="teams" fill="var(--color-teams)" radius={4} />
                        </RechartsBarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Быстрый доступ к шаблонам</CardTitle>
                <CardDescription>
                Предпросмотр страниц для различных ролей и сущностей с использованием моковых данных.
                </CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex flex-wrap gap-4">
                    <Button asChild variant="outline"><Link href="/admin/templates/player"><Eye className="mr-2 h-4 w-4"/>Игрок</Link></Button>
                    <Button asChild variant="outline"><Link href="/admin/templates/team"><Eye className="mr-2 h-4 w-4"/>Команда</Link></Button>
                    <Button asChild variant="outline"><Link href="/admin/templates/coach"><Eye className="mr-2 h-4 w-4"/>Тренер</Link></Button>
                    <Button asChild variant="outline"><Link href="/admin/templates/referee"><Eye className="mr-2 h-4 w-4"/>Судья</Link></Button>
                    <Button asChild variant="outline"><Link href="/admin/templates/manager"><Eye className="mr-2 h-4 w-4"/>Менеджер</Link></Button>
                    <Button asChild variant="outline"><Link href="/admin/templates/organizer"><Eye className="mr-2 h-4 w-4"/>Организатор</Link></Button>
                    <Button asChild variant="outline"><Link href="/admin/templates/sponsor"><Eye className="mr-2 h-4 w-4"/>Спонсор</Link></Button>
                    <Button asChild variant="outline"><Link href="/admin/templates/fan"><Eye className="mr-2 h-4 w-4"/>Болельщик</Link></Button>
                </div>
            </CardContent>
        </Card>
    </div>
  );
}
