
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import type { User } from '@/mocks';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Copy, ExternalLink, Heart, UserPlus, Rss, Mail, Phone } from 'lucide-react';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/shared/ui/tooltip';
import { useToast } from '@/shared/hooks/use-toast';
import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { DataTable } from './data-table';
import { TableCell, TableRow } from '@/shared/ui/table';
import { getUserDisciplines } from '@/entities/user/lib';
import { UsersApi } from '@/shared/api/sdk';
import { Skeleton } from '@/shared/ui/skeleton';
import { api } from '@/shared/api/axios-instance';

const usersApi = new UsersApi(undefined, process.env.NEXT_PUBLIC_API_BASE_URL, api);

export function UsersTab() {
    const { toast } = useToast();
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            setIsLoading(true);
            try {
                const response = await usersApi.getAllUsers();
                setUsers((response.data as any).data || []);
            } catch (error) {
                console.error("Failed to fetch users:", error);
                toast({
                    variant: 'destructive',
                    title: 'Ошибка',
                    description: 'Не удалось загрузить список пользователей.'
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, [toast]);


    const copyToClipboard = async (text: string, entity: string) => {
        try {
            await navigator.clipboard.writeText(text);
            toast({ title: `Скопировано!`, description: `${entity} ID ${text} скопирован в буфер обмена.` });
        } catch (err) {
            console.error('Failed to copy: ', err);
            toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: 'Не удалось скопировать в буфер обмена.',
            });
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Список пользователей ({users.length})</CardTitle>
                <CardDescription>Полный список всех зарегистрированных пользователей на платформе.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                           <Skeleton key={i} className="h-14 w-full" />
                        ))}
                    </div>
                ) : (
                    <DataTable 
                        headers={['ID', 'Пользователь', 'Роль', 'Дисциплины', 'Контакты', 'Команды', 'Соц. связи', 'Спонсоры', '']}
                        data={users}
                        renderRow={(user: User) => {
                            const userDisciplines = getUserDisciplines(user as any); // Cast because SDK type might differ slightly from mock
                            return (
                            <TableRow key={user.id}>
                                <TableCell className="align-top font-mono text-xs whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        <span>{user.id}</span>
                                        <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => copyToClipboard(user.id, 'User')}><Copy className="h-3 w-3"/></Button>
                                    </div>
                                </TableCell>
                                <TableCell className="align-top">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={(user as any).avatarUrl} />
                                            <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <p className="font-medium whitespace-nowrap">{(user as any).firstName} {(user as any).lastName}</p>
                                            <p className="text-xs text-muted-foreground">@{user.nickname}</p>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell className="align-top"><Badge variant="outline">{(user as any).role}</Badge></TableCell>
                                <TableCell className="align-top min-w-[150px] max-w-[200px]">
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
                                <TableCell className="align-top text-xs whitespace-nowrap">
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-center gap-1"><Mail className="h-3 w-3"/>{user.email}</div>
                                        {(user as any).phone && <div className="flex items-center gap-1"><Phone className="h-3 w-3"/>{(user as any).phone}</div>}
                                    </div>
                                </TableCell>
                                <TableCell className="align-top">
                                    {/* Team info needs to be fetched or included in user data */}
                                </TableCell>
                                <TableCell className="align-top">
                                    <div className="flex items-center gap-3 text-xs whitespace-nowrap">
                                        <div className="flex items-center gap-1" title="Друзья"><Heart className="h-3 w-3"/>{((user as any).friends || []).length}</div>
                                        <div className="flex items-center gap-1" title="Подписчики"><UserPlus className="h-3 w-3"/>{((user as any).followers || []).length}</div>
                                        <div className="flex items-center gap-1" title="Подписки"><Rss className="h-3 w-3"/>{((user as any).followingUsers || []).length + ((user as any).following || []).length}</div>
                                    </div>
                                </TableCell>
                                <TableCell className="align-top text-xs">
                                     {/* Sponsor info needs to be fetched or included */}
                                </TableCell>
                                <TableCell className="align-top text-right">
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
                )}
            </CardContent>
        </Card>
    );
}
