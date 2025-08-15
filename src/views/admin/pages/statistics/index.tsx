

'use client';

import { users, teams, sponsors, playgrounds, Team } from '@/mocks';
import { allTournaments as tournaments } from '@/views/tournaments/public-page/ui/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Copy, ExternalLink, Home, Crown, GanttChart, Eye, Database } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from '@/shared/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';

const statusColors: Record<string, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦИЯ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-300/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
};

// Helper to find a team for a user
const findUserTeam = (userId: string): Team | undefined => {
    return teams.find(team => team.members.includes(userId));
};


export function AdminStatisticsPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center gap-4">
                <div className="p-3 rounded-md bg-primary/10 text-primary">
                    <Database className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-3xl font-bold font-headline">База данных</h1>
                    <p className="text-muted-foreground">Имитация базы данных с моковыми сущностями и связями для разработки.</p>
                </div>
            </div>
             <Tabs defaultValue="users" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="users">Пользователи ({users.length})</TabsTrigger>
                    <TabsTrigger value="teams">Команды ({teams.length})</TabsTrigger>
                    <TabsTrigger value="tournaments">Турниры ({tournaments.length})</TabsTrigger>
                    <TabsTrigger value="playgrounds">Площадки ({playgrounds.length})</TabsTrigger>
                    <TabsTrigger value="sponsors">Спонсоры ({sponsors.length})</TabsTrigger>
                </TabsList>
                
                <TabsContent value="users">
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Таблица: Users</CardTitle>
                            <CardDescription>Список всех зарегистрированных пользователей на платформе.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID (Primary Key)</TableHead>
                                            <TableHead>Пользователь</TableHead>
                                            <TableHead>Роль</TableHead>
                                            <TableHead>Команда (FK)</TableHead>
                                            <TableHead className="text-right">Просмотр</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {users.map((user) => {
                                            const team = findUserTeam(user.id);
                                            return (
                                                <TableRow key={user.id}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 font-mono text-xs">
                                                            <span>{user.id}</span>
                                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => navigator.clipboard.writeText(user.id)}>
                                                                <Copy className="h-3 w-3" />
                                                            </Button>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-3">
                                                            <Avatar className="h-9 w-9">
                                                                <AvatarImage src={user.avatarUrl} alt={user.nickname} />
                                                                <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                                                            </Avatar>
                                                            <div>
                                                                <p>{user.firstName} {user.lastName}</p>
                                                                <p className="text-xs text-muted-foreground">@{user.nickname}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell><Badge variant="secondary">{user.role}</Badge></TableCell>
                                                    <TableCell>
                                                        {team ? (
                                                            <Link href={`/admin/teams/${team.id}`} className="text-primary hover:underline text-sm">{team.name}</Link>
                                                        ) : (
                                                            <span className="text-xs text-muted-foreground">N/A</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={`/users/${user.id}`}><ExternalLink className="mr-2 h-3 w-3" />Профиль</Link>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="teams">
                     <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Таблица: Teams</CardTitle>
                            <CardDescription>Список всех команд.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID (PK)</TableHead>
                                            <TableHead>Команда</TableHead>
                                            <TableHead>Капитан (FK)</TableHead>
                                            <TableHead>Дом. площадка (FK)</TableHead>
                                            <TableHead className="text-right">Просмотр</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {teams.map((team) => {
                                             const captain = users.find(u => u.id === team.captainId);
                                             const playground = playgrounds.find(p => p.id === team.homePlaygroundId);
                                             return (
                                                <TableRow key={team.id}>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 font-mono text-xs"><span>{team.id}</span></div>
                                                    </TableCell>
                                                    <TableCell className="font-medium">
                                                        <div className="flex items-center gap-3">
                                                            <Image src={team.logoUrl} alt={team.name} width={36} height={36} className="rounded-md" data-ai-hint={team.dataAiHint} />
                                                            <span>{team.name}</span>
                                                        </div>
                                                    </TableCell>
                                                     <TableCell>
                                                        {captain ? (
                                                            <Link href={`/users/${captain.id}`} className="text-primary hover:underline text-sm flex items-center gap-1">
                                                                <Crown className="h-3 w-3 text-amber-400" /> {captain.nickname}
                                                            </Link>
                                                        ) : <span className="text-xs text-muted-foreground">N/A</span>}
                                                    </TableCell>
                                                    <TableCell>
                                                         {playground ? (
                                                            <Link href={`/playgrounds/${playground.id}`} className="text-primary hover:underline text-sm flex items-center gap-1">
                                                                <Home className="h-3 w-3" /> {playground.name}
                                                            </Link>
                                                        ) : <span className="text-xs text-muted-foreground">N/A</span>}
                                                    </TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="outline" size="sm" asChild>
                                                            <Link href={`/teams/${team.id}`}><ExternalLink className="mr-2 h-3 w-3" />Профиль</Link>
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                 <TabsContent value="tournaments">
                     <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Таблица: Tournaments</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID (PK)</TableHead>
                                            <TableHead>Турнир</TableHead>
                                            <TableHead>Участники</TableHead>
                                            <TableHead>Статус</TableHead>
                                            <TableHead className="text-right">Действия</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {tournaments.map((tournament) => (
                                            <TableRow key={tournament.id}>
                                                <TableCell><div className="font-mono text-xs">{tournament.id}</div></TableCell>
                                                <TableCell className="font-medium">{tournament.name}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Progress value={(tournament.participants / tournament.maxParticipants) * 100} className="w-16" />
                                                        <span>{tournament.participants}/{tournament.maxParticipants}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge className={statusColors[tournament.status]}>{tournament.status}</Badge>
                                                </TableCell>
                                                <TableCell className="text-right space-x-2">
                                                    <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/tournaments/${tournament.id}`}><Eye className="mr-2 h-3 w-3" />Промо</Link>
                                                    </Button>
                                                     <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/tournaments/${tournament.id}/manage`}><GanttChart className="mr-2 h-3 w-3" />CRM</Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                 <TabsContent value="playgrounds">
                    <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Таблица: Playgrounds</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID (PK)</TableHead>
                                            <TableHead>Название</TableHead>
                                            <TableHead>Адрес</TableHead>
                                            <TableHead>Тип</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {playgrounds.map((playground) => (
                                            <TableRow key={playground.id}>
                                                <TableCell><div className="font-mono text-xs">{playground.id}</div></TableCell>
                                                <TableCell className="font-medium">{playground.name}</TableCell>
                                                <TableCell>{playground.address}</TableCell>
                                                <TableCell><Badge variant="outline">{playground.type}</Badge></TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="sponsors">
                     <Card className="mt-4">
                        <CardHeader>
                            <CardTitle>Таблица: Sponsors</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="border rounded-lg">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>ID (PK)</TableHead>
                                            <TableHead>Спонсор</TableHead>
                                            <TableHead>Вклад</TableHead>
                                            <TableHead className="text-right">Просмотр</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {sponsors.map((sponsor) => (
                                            <TableRow key={sponsor.id}>
                                                 <TableCell><div className="font-mono text-xs">{sponsor.id}</div></TableCell>
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-3">
                                                        <Image src={sponsor.logoUrl} alt={sponsor.name} width={36} height={36} className="rounded-md" data-ai-hint={sponsor.dataAiHint} />
                                                        <span>{sponsor.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{sponsor.contribution}</TableCell>
                                                <TableCell className="text-right">
                                                     <Button variant="outline" size="sm" asChild>
                                                        <Link href={`/admin/sponsors/${sponsor.id}`}><ExternalLink className="mr-2 h-3 w-3" />Профиль</Link>
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
