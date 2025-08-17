

'use client';

import { users, teams, sponsors, playgrounds, allSports, Team } from '@/mocks';
import { allTournaments as tournaments } from '@/views/tournaments/public-page/ui/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Copy, ExternalLink, Heart, UserPlus, Rss, BarChart3, Users2, MapPin, User as UserIcon, Phone, Mail, Trophy, Home, BarChart, TrendingUp, Users as UsersIconComponent, Eye } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from '@/shared/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { useToast } from '@/shared/hooks/use-toast';
import { useEffect, useState, useMemo } from 'react';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import type { User } from '@/mocks/users';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import { Bar as RechartsBar, BarChart as RechartsBarChart, XAxis, YAxis, ResponsiveContainer } from "recharts";

const statusColors: Record<string, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦИЯ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
};

// Create a flat list of all sports including subdisciplines for easy lookup
const allSportsFlat = allSports.reduce((acc, sport) => {
    acc.push({ id: sport.id, name: sport.name });
    if (sport.subdisciplines) {
        sport.subdisciplines.forEach(sub => {
            acc.push({ id: sub.id, name: sub.name });
        });
    }
    return acc;
}, [] as { id: string, name: string }[]);

// Centralized function to get all disciplines for a user
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


const DataTable = ({ headers, data, renderRow }: { headers: string[], data: any[], renderRow: (item: any, index: number) => React.ReactNode }) => (
    <div className="border rounded-lg overflow-x-auto">
        <Table>
            <TableHeader><TableRow>{headers.map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
            <TableBody>{data.map((item, index) => renderRow(item, index))}</TableBody>
        </Table>
    </div>
);

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
    count: { label: "Кол-во", color: "hsl(var(--primary))" },
    teams: { label: "Команды", color: "hsl(var(--primary))" },
}

export function AdminDashboardPage() {
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    // Memoize the calculation of user's teams to avoid re-computation on every render
    const userTeamsMap = useMemo(() => {
        const map = new Map<string, Team[]>();
        users.forEach(user => {
            const userTeams = teams.filter(team => team.members.includes(user.id));
            map.set(user.id, userTeams);
        });
        return map;
    }, []);

    const getTeamForUser = (userId: string): Team[] => {
       return userTeamsMap.get(userId) || [];
    };

    const copyToClipboard = (text: string, entity: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: `Скопировано!`, description: `${entity} ID ${text} скопирован в буфер обмена.` });
    };
    
    const getUserSponsors = (sponsorIds?: string[]) => {
        if (!sponsorIds || sponsorIds.length === 0) return 'Нет';
        return sponsorIds.map(id => sponsors.find(s => s.id === id)?.name).filter(Boolean).join(', ');
    };
    
    const getTeamSponsors = (sponsorIds?: string[]) => {
        if (!sponsorIds || sponsorIds.length === 0) return 'Нет';
        return sponsorIds.map(id => sponsors.find(s => s.id === id)?.name).filter(Boolean).join(', ');
    }

    const getTeamPlaygrounds = (playgroundIds?: string[]) => {
        if (!playgroundIds || playgroundIds.length === 0) return 'Нет';
        return playgroundIds.map(id => playgrounds.find(p => p.id === id)?.name).filter(Boolean).join(', ');
    }

    if (!isClient) {
        return null; // or a loading skeleton
    }
    
    return (
        <Tabs defaultValue="overview">
            <div className="flex items-center justify-between mb-6">
                 <TabsList>
                    <TabsTrigger value="overview"><BarChart className="mr-2 h-4 w-4" />Обзор</TabsTrigger>
                    <TabsTrigger value="users"><UserIcon className="mr-2 h-4 w-4" />Пользователи</TabsTrigger>
                    <TabsTrigger value="teams"><Users2 className="mr-2 h-4 w-4" />Команды</TabsTrigger>
                    <TabsTrigger value="sponsors"><Heart className="mr-2 h-4 w-4" />Спонсоры</TabsTrigger>
                    <TabsTrigger value="playgrounds"><MapPin className="mr-2 h-4 w-4" />Площадки</TabsTrigger>
                    <TabsTrigger value="tournaments"><Trophy className="mr-2 h-4 w-4" />Турниры</TabsTrigger>
                    <TabsTrigger value="sports"><BarChart3 className="mr-2 h-4 w-4" />Виды спорта</TabsTrigger>
                </TabsList>
            </div>
             <TabsContent value="overview">
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
            </TabsContent>
            <TabsContent value="users">
                <Card>
                    <CardHeader>
                        <CardTitle>Список пользователей ({users.length})</CardTitle>
                        <CardDescription>Полный список всех зарегистрированных пользователей на платформе.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable 
                            headers={['ID', 'Пользователь', 'Роль', 'Дисциплины', 'Контакты', 'Команды', 'Соц. связи', 'Спонсоры', '']}
                            data={users}
                            renderRow={(user: User) => {
                                const userDisciplines = getUserDisciplines(user);
                                return (
                                <TableRow key={user.id}>
                                    <TableCell className="font-mono text-xs whitespace-nowrap align-top">
                                        <div className="flex items-center gap-2">
                                            <span>{user.id}</span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(user.id, 'User')}><Copy className="h-3 w-3"/></Button>
                                        </div>
                                    </TableCell>
                                    <TableCell className="align-top">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={user.avatarUrl} />
                                                <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium whitespace-nowrap">{user.firstName} {user.lastName}</p>
                                                <p className="text-xs text-muted-foreground">@{user.nickname}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="align-top"><Badge variant="outline">{user.role}</Badge></TableCell>
                                    <TableCell className="min-w-[150px] max-w-[200px] align-top">
                                         <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <p className="text-xs break-words line-clamp-3">
                                                        {userDisciplines.join(', ')}
                                                    </p>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="max-w-xs break-words">
                                                         {userDisciplines.join(', ')}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell className="text-xs whitespace-nowrap align-top">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-1"><Mail className="h-3 w-3"/>{user.email}</div>
                                            <div className="flex items-center gap-1"><Phone className="h-3 w-3"/>{user.phone}</div>
                                        </div>
                                    </TableCell>
                                     <TableCell className="align-top">
                                        <div className="flex flex-col gap-1 text-xs">
                                           {getTeamForUser(user.id).map(team => (
                                                <Link key={team.id} href={`/admin/teams/${team.id}`} className="text-blue-400 hover:underline whitespace-nowrap">
                                                    {team.name} ({team.game})
                                                </Link>
                                           ))}
                                        </div>
                                    </TableCell>
                                    <TableCell className="align-top">
                                        <div className="flex items-center gap-3 text-xs whitespace-nowrap">
                                            <div className="flex items-center gap-1" title="Друзья"><Heart className="h-3 w-3"/>{user.friends.length}</div>
                                            <div className="flex items-center gap-1" title="Подписчики"><UserPlus className="h-3 w-3"/>{user.followers.length}</div>
                                            <div className="flex items-center gap-1" title="Подписки"><Rss className="h-3 w-3"/>{user.followingUsers.length + user.following.length}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-xs align-top">
                                        {getUserSponsors(user.sponsorIds)}
                                    </TableCell>
                                    <TableCell className="text-right align-top">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button asChild variant="ghost" size="sm"><Link href={`/admin/users/${user.id}`}>Просмотр</Link></Button>
                                            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                                                <Link href={`/users/${user.id}`} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4"/>
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}}
                        />
                    </CardContent>
                </Card>
            </TabsContent>

             <TabsContent value="teams">
                <Card>
                    <CardHeader>
                        <CardTitle>Список команд ({teams.length})</CardTitle>
                        <CardDescription>Все команды, зарегистрированные на платформе.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable 
                            headers={['ID', 'Команда', 'Дисциплина', 'Капитан', 'Игроков', 'Рейтинг', 'Спонсоры', 'Домашние площадки', '']}
                            data={teams}
                            renderRow={(team) => (
                                <TableRow key={team.id}>
                                    <TableCell className="font-mono text-xs">{team.id}</TableCell>
                                    <TableCell>
                                        <Link href={`/admin/teams/${team.id}`} className="flex items-center gap-3 group">
                                            <Image src={team.logoUrl} alt={team.name} width={32} height={32} className="rounded-md" data-ai-hint={team.dataAiHint}/>
                                            <span className="font-medium group-hover:text-primary transition-colors">{team.name}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell><Badge variant="secondary">{team.game}</Badge></TableCell>
                                    <TableCell className="text-xs">{users.find(u => u.id === team.captainId)?.nickname || 'N/A'}</TableCell>
                                    <TableCell>{team.members.length}</TableCell>
                                    <TableCell className="font-mono">{team.rank}</TableCell>
                                    <TableCell className="text-xs">{getTeamSponsors(team.sponsorIds)}</TableCell>
                                    <TableCell className="text-xs">{getTeamPlaygrounds(team.homePlaygroundIds)}</TableCell>
                                     <TableCell className="text-right align-top">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button asChild variant="ghost" size="sm"><Link href={`/admin/teams/${team.id}`}>Просмотр</Link></Button>
                                            <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                                                <Link href={`/teams/${team.id}`} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4"/>
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        />
                    </CardContent>
                </Card>
            </TabsContent>

             <TabsContent value="sponsors">
                <Card>
                    <CardHeader>
                        <CardTitle>Список спонсоров ({sponsors.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable 
                            headers={['ID', 'Спонсор', 'Вклад', '']}
                            data={sponsors}
                            renderRow={(sponsor) => (
                                <TableRow key={sponsor.id}>
                                    <TableCell className="font-mono text-xs">{sponsor.id}</TableCell>
                                    <TableCell>
                                         <Link href={`/admin/sponsors/${sponsor.id}`} className="flex items-center gap-3 group">
                                            <Image src={sponsor.logoUrl} alt={sponsor.name} width={32} height={32} className="rounded-md" data-ai-hint={sponsor.dataAiHint}/>
                                            <span className="font-medium group-hover:text-primary transition-colors">{sponsor.name}</span>
                                        </Link>
                                    </TableCell>
                                    <TableCell>{sponsor.contribution}</TableCell>
                                    <TableCell className="text-right align-top">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button asChild variant="ghost" size="sm"><Link href={`/admin/sponsors/${sponsor.id}`}>Просмотр</Link></Button>
                                             <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                                                <Link href={`/sponsors/${sponsor.id}`} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="h-4 w-4"/>
                                                </Link>
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        />
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="playgrounds">
                <Card>
                     <CardHeader>
                        <CardTitle>Список площадок ({playgrounds.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <DataTable 
                            headers={['ID', 'Название', 'Адрес', 'Тип', 'Покрытие', 'Виды спорта']}
                            data={playgrounds}
                            renderRow={(p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                                    <TableCell className="font-medium">
                                        <Link href={`/playgrounds/${p.id}`} className="hover:text-primary transition-colors">
                                            {p.name}
                                        </Link>
                                    </TableCell>
                                    <TableCell>{p.address}</TableCell>
                                    <TableCell><Badge variant="outline">{p.type}</Badge></TableCell>
                                    <TableCell>{p.surface}</TableCell>
                                    <TableCell className="text-xs">{p.sportIds.map((id: string) => allSportsFlat.find(s => s.id === id)?.name).filter(Boolean).join(', ')}</TableCell>
                                </TableRow>
                            )}
                        />
                    </CardContent>
                </Card>
            </TabsContent>

             <TabsContent value="tournaments">
                <Card>
                    <CardHeader>
                        <CardTitle>Список турниров ({tournaments.length})</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <DataTable 
                            headers={['ID', 'Название', 'Дисциплина', 'Участники', 'Статус']}
                            data={tournaments}
                            renderRow={(t) => (
                                <TableRow key={t.id}>
                                    <TableCell className="font-mono text-xs">{t.id}</TableCell>
                                    <TableCell className="font-medium">{t.name}</TableCell>
                                    <TableCell>{t.game}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Progress value={(t.participants / t.maxParticipants) * 100} className="w-20" />
                                            <span>{t.participants}/{t.maxParticipants}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge className={statusColors[t.status]}>{t.status}</Badge>
                                    </TableCell>
                                </TableRow>
                            )}
                        />
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="sports">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card>
                        <CardHeader><CardTitle>Командные виды спорта</CardTitle></CardHeader>
                        <CardContent>
                             <DataTable 
                                headers={['ID', 'Название', 'Поддисциплины']}
                                data={allSports.filter(s => s.isTeamSport)}
                                renderRow={(sport) => (
                                    <TableRow key={sport.id}>
                                        <TableCell className="font-mono text-xs">{sport.id}</TableCell>
                                        <TableCell className="font-medium">{sport.name}</TableCell>
                                        <TableCell className="text-xs">{sport.subdisciplines?.map(s => s.name).join(', ')}</TableCell>
                                    </TableRow>
                                )}
                            />
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle>Некомандные виды спорта</CardTitle></CardHeader>
                        <CardContent>
                             <DataTable 
                                headers={['ID', 'Название', 'Поддисциплины']}
                                data={allSports.filter(s => !s.isTeamSport)}
                                renderRow={(sport) => (
                                    <TableRow key={sport.id}>
                                        <TableCell className="font-mono text-xs">{sport.id}</TableCell>
                                        <TableCell className="font-medium">{sport.name}</TableCell>
                                        <TableCell className="text-xs">{sport.subdisciplines?.map(s => s.name).join(', ')}</TableCell>
                                    </TableRow>
                                )}
                            />
                        </CardContent>
                    </Card>
                </div>
            </TabsContent>

        </Tabs>
    );
}
