

'use client';

import { users, teams, sponsors, playgrounds, allSports, Team } from '@/mocks';
import { allTournaments as tournaments } from '@/views/tournaments/public-page/ui/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Copy, ExternalLink, Home, Crown, GanttChart, Eye, Database, Key, ListOrdered, Mail, MapPin, User as UserIcon, Phone, Heart, UserPlus, Rss, Dumbbell, BarChart3, Users2, Trophy } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Progress } from '@/shared/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { useToast } from '@/shared/hooks/use-toast';
import { useEffect, useState } from 'react';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';

const statusColors: Record<string, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
};


const DataTable = ({ headers, data, renderRow }: { headers: string[], data: any[], renderRow: (item: any, index: number) => React.ReactNode }) => (
    <div className="border rounded-lg">
        <Table>
            <TableHeader><TableRow>{headers.map(h => <TableHead key={h}>{h}</TableHead>)}</TableRow></TableHeader>
            <TableBody>{data.map((item, index) => renderRow(item, index))}</TableBody>
        </Table>
    </div>
);


export function AdminStatisticsPage() {
    const { toast } = useToast();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const copyToClipboard = (text: string, entity: string) => {
        navigator.clipboard.writeText(text);
        toast({ title: `Скопировано!`, description: `${entity} ID ${text} скопирован в буфер обмена.` });
    };

    const getTeamForUser = (userId: string): (Team | undefined)[] => {
       return teams.filter(team => team.members.includes(userId));
    };

    if (!isClient) {
        return null; // or a loading skeleton
    }
    
    return (
        <Tabs defaultValue="users">
            <div className="flex items-center justify-between mb-6">
                 <TabsList>
                    <TabsTrigger value="users"><UserIcon className="mr-2 h-4 w-4" />Пользователи</TabsTrigger>
                    <TabsTrigger value="teams"><Users2 className="mr-2 h-4 w-4" />Команды</TabsTrigger>
                    <TabsTrigger value="sponsors"><Heart className="mr-2 h-4 w-4" />Спонсоры</TabsTrigger>
                    <TabsTrigger value="playgrounds"><MapPin className="mr-2 h-4 w-4" />Площадки</TabsTrigger>
                    <TabsTrigger value="tournaments"><Trophy className="mr-2 h-4 w-4" />Турниры</TabsTrigger>
                    <TabsTrigger value="sports"><BarChart3 className="mr-2 h-4 w-4" />Виды спорта</TabsTrigger>
                </TabsList>
            </div>
            
            <TabsContent value="users">
                <Card>
                    <CardHeader>
                        <CardTitle>Список пользователей ({users.length})</CardTitle>
                        <CardDescription>Полный список всех зарегистрированных пользователей на платформе.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <DataTable 
                            headers={['ID', 'Пользователь', 'Роль', 'Дисциплины', 'Контакты', 'Команды', 'Соц. связи', '']}
                            data={users}
                            renderRow={(user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-mono text-xs">
                                        <div className="flex items-center gap-2">
                                            <span>{user.id}</span>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(user.id, 'User')}><Copy className="h-3 w-3"/></Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={user.avatarUrl} />
                                                <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{user.firstName} {user.lastName}</p>
                                                <p className="text-xs text-muted-foreground">@{user.nickname}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell><Badge variant="outline">{user.role}</Badge></TableCell>
                                    <TableCell className="max-w-[200px]">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger>
                                                    <p className="truncate text-xs">
                                                        {user.disciplines.map(id => allSports.find(s => s.id === id)?.name).join(', ')}
                                                    </p>
                                                </TooltipTrigger>
                                                <TooltipContent>
                                                    <p className="max-w-xs break-words">
                                                         {user.disciplines.map(id => allSports.find(s => s.id === id)?.name).join(', ')}
                                                    </p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </TableCell>
                                    <TableCell className="text-xs">
                                        <div className="flex items-center gap-1"><Mail className="h-3 w-3"/>{user.email}</div>
                                        <div className="flex items-center gap-1"><Phone className="h-3 w-3"/>{user.phone}</div>
                                    </TableCell>
                                     <TableCell>
                                        <div className="flex flex-col gap-1 text-xs">
                                           {getTeamForUser(user.id).map(team => (
                                                <Link key={team?.id} href={`/admin/templates/team`} className="text-blue-400 hover:underline">{team?.name} {team?.subdiscipline ? `(${team.subdiscipline})`: ''}</Link>
                                           ))}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3 text-xs">
                                            <div className="flex items-center gap-1" title="Друзья"><Heart className="h-3 w-3"/>{user.friends.length}</div>
                                            <div className="flex items-center gap-1" title="Подписчики"><UserPlus className="h-3 w-3"/>{user.followers.length}</div>
                                            <div className="flex items-center gap-1" title="Подписки"><Rss className="h-3 w-3"/>{user.followingUsers.length + user.followingTeams.length}</div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button asChild variant="ghost" size="sm"><Link href={`/admin/users/${user.id}`}><Eye className="mr-2 h-4 w-4"/>Просмотр</Link></Button>
                                    </TableCell>
                                </TableRow>
                            )}
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
                            headers={['ID', 'Команда', 'Дисциплина', 'Капитан', 'Игроков', 'Рейтинг']}
                            data={teams}
                            renderRow={(team) => (
                                <TableRow key={team.id}>
                                    <TableCell className="font-mono text-xs">{team.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Image src={team.logoUrl} alt={team.name} width={32} height={32} className="rounded-md" data-ai-hint={team.dataAiHint}/>
                                            <span className="font-medium">{team.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell><Badge variant="secondary">{team.game} {team.subdiscipline ? `(${team.subdiscipline})` : ''}</Badge></TableCell>
                                    <TableCell className="text-xs">{users.find(u => u.id === team.captainId)?.nickname || 'N/A'}</TableCell>
                                    <TableCell>{team.members.length}</TableCell>
                                    <TableCell className="font-mono">{team.rank}</TableCell>
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
                            headers={['ID', 'Спонсор', 'Вклад']}
                            data={sponsors}
                            renderRow={(sponsor) => (
                                <TableRow key={sponsor.id}>
                                    <TableCell className="font-mono text-xs">{sponsor.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Image src={sponsor.logoUrl} alt={sponsor.name} width={32} height={32} className="rounded-md" data-ai-hint={sponsor.dataAiHint}/>
                                            <span className="font-medium">{sponsor.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{sponsor.contribution}</TableCell>
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
                            headers={['ID', 'Название', 'Адрес', 'Тип', 'Покрытие']}
                            data={playgrounds}
                            renderRow={(p) => (
                                <TableRow key={p.id}>
                                    <TableCell className="font-mono text-xs">{p.id}</TableCell>
                                    <TableCell className="font-medium">{p.name}</TableCell>
                                    <TableCell>{p.address}</TableCell>
                                    <TableCell><Badge variant="outline">{p.type}</Badge></TableCell>
                                    <TableCell>{p.surface}</TableCell>
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
