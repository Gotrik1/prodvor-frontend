

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Eye, Server, Link as LinkIcon, AlertTriangle } from 'lucide-react';
import { ChartContainer, ChartTooltipContent } from "@/shared/ui/chart";
import { Bar as RechartsBar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts";
import { users, teams, tournaments, Tournament } from '@/mocks';
import Link from 'next/link';
import { TeamStatCard } from '@/entities/team/ui/stat-card';
import React from 'react';
import { useToast } from '@/shared/hooks/use-toast';
import { Badge } from '@/shared/ui/badge';


const userRegistrationData: any[] = [];

const topSportsData: any[] = [];

const chartConfig = {
    registrations: { label: "Регистрации", color: "hsl(var(--primary))" },
    teams: { label: "Команды", color: "hsl(var(--primary))" },
}

const HealthCheckCard = () => {
    const [status, setStatus] = React.useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = React.useState('');
    const { toast } = useToast();

    const handleCheck = async () => {
        setStatus('loading');
        try {
            const response = await fetch('/api/v1/health-check');
            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                setMessage(data.message || 'Бэкенд доступен.');
                toast({ title: 'Успех!', description: 'Связь с бэкендом установлена.' });
            } else {
                throw new Error(data.error || 'Неизвестная ошибка бэкенда.');
            }
        } catch (error: any) {
            setStatus('error');
            setMessage(error.message || 'Не удалось подключиться. Проверьте, запущен ли бэкенд и правильный ли URL.');
            toast({ variant: 'destructive', title: 'Ошибка!', description: error.message });
        }
    };

    const getStatusInfo = () => {
        switch (status) {
            case 'success':
                return { color: 'text-green-500', icon: <LinkIcon className="h-4 w-4" /> };
            case 'error':
                return { color: 'text-destructive', icon: <AlertTriangle className="h-4 w-4" /> };
            default:
                return { color: 'text-muted-foreground', icon: <Server className="h-4 w-4" /> };
        }
    };

    const { color, icon } = getStatusInfo();


    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Server />Связь с бэкендом</CardTitle>
                <CardDescription>Проверка доступности Python-сервера.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className={`flex items-center gap-2 font-semibold text-sm ${color}`}>
                        {icon}
                        <span>Статус: </span>
                        {status === 'idle' && 'Неизвестно'}
                        {status === 'loading' && 'Проверка...'}
                        {status === 'success' && 'Доступен'}
                        {status === 'error' && 'Ошибка'}
                    </div>
                    <Button onClick={handleCheck} disabled={status === 'loading'}>Проверить</Button>
                </div>
                {message && (
                    <Badge variant={status === 'error' ? 'destructive' : 'secondary'} className="whitespace-normal">
                       {message}
                    </Badge>
                )}
            </CardContent>
        </Card>
    )
}

export function OverviewTab() {
  return (
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <TeamStatCard 
                title="Всего пользователей" 
                value={users.length.toString()} 
                description="+0 с прошлого месяца" 
            />
            <TeamStatCard 
                title="Активных команд" 
                value={teams.length.toString()}
                description="+0 с прошлого месяца"
            />
             <TeamStatCard 
                title="Текущие турниры" 
                value={tournaments.filter((t: Tournament) => t.status === 'ИДЕТ').length.toString()}
                description="+0 новых на этой неделе"
            />
        </div>
         <HealthCheckCard />
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
                            <ChartTooltipContent />
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
                            <ChartTooltipContent />
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
