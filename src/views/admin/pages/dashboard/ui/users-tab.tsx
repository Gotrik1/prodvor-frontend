
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { users, teams, sponsors, User } from '@/mocks';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Copy, ExternalLink, Heart, UserPlus, Rss, Mail, Phone } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { useToast } from '@/shared/hooks/use-toast';
import { useMemo } from 'react';
import Link from 'next/link';
import { getUserDisciplines } from '../lib';
import { DataTable } from './data-table';

export function UsersTab() {
    const { toast } = useToast();

    const userTeamsMap = useMemo(() => {
        const map = new Map<string, typeof teams>();
        users.forEach(user => {
            const userTeams = teams.filter(team => team.members.includes(user.id));
            map.set(user.id, userTeams);
        });
        return map;
    }, []);

    const getTeamForUser = (userId: string): typeof teams => {
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

    return (
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
                        <tr key={user.id}>
                            <td className="p-4 align-top font-mono text-xs whitespace-nowrap">
                                <div className="flex items-center gap-2">
                                    <span>{user.id}</span>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(user.id, 'User')}><Copy className="h-3 w-3"/></Button>
                                </div>
                            </td>
                            <td className="p-4 align-top">
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
                            </td>
                            <td className="p-4 align-top"><Badge variant="outline">{user.role}</Badge></td>
                            <td className="p-4 align-top min-w-[150px] max-w-[200px]">
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
                            </td>
                            <td className="p-4 align-top text-xs whitespace-nowrap">
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-1"><Mail className="h-3 w-3"/>{user.email}</div>
                                    <div className="flex items-center gap-1"><Phone className="h-3 w-3"/>{user.phone}</div>
                                </div>
                            </td>
                             <td className="p-4 align-top">
                                <div className="flex flex-col gap-1 text-xs">
                                   {getTeamForUser(user.id).map(team => (
                                        <Link key={team.id} href={`/admin/teams/${team.id}`} className="text-blue-400 hover:underline whitespace-nowrap">
                                            {team.name} ({team.game})
                                        </Link>
                                   ))}
                                </div>
                            </td>
                            <td className="p-4 align-top">
                                <div className="flex items-center gap-3 text-xs whitespace-nowrap">
                                    <div className="flex items-center gap-1" title="Друзья"><Heart className="h-3 w-3"/>{user.friends.length}</div>
                                    <div className="flex items-center gap-1" title="Подписчики"><UserPlus className="h-3 w-3"/>{user.followers.length}</div>
                                    <div className="flex items-center gap-1" title="Подписки"><Rss className="h-3 w-3"/>{user.followingUsers.length + user.following.length}</div>
                                </div>
                            </td>
                            <td className="p-4 align-top text-xs">
                                {getUserSponsors(user.sponsorIds)}
                            </td>
                            <td className="p-4 align-top text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <Button asChild variant="ghost" size="sm"><Link href={`/admin/users/${user.id}`}>Просмотр</Link></Button>
                                    <Button asChild variant="ghost" size="icon" className="h-8 w-8">
                                        <Link href={`/users/${user.id}`} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="h-4 w-4"/>
                                        </Link>
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    )}}
                />
            </CardContent>
        </Card>
    );
}
