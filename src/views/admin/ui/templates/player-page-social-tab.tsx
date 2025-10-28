

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import type { User } from '@/mocks';
import { users } from '@/mocks';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Check, UserPlus, X, Users as UsersIcon, Rss } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';

// Mock friend requests for the current user
const mockFriendRequests = users.slice(10, 13);

const UserList = ({ userIds, emptyText }: { userIds: string[], emptyText: string }) => {
    const userList = users.filter(u => userIds.includes(u.id));
    
    if (userList.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">{emptyText}</p>;
    }

    return (
        <div className="flex flex-wrap gap-2">
            {userList.map(user => (
                <Link href={`/users/${user.id}`} key={user.id} className="group">
                     <Avatar className="h-12 w-12 border-2 border-transparent group-hover:border-primary transition-colors">
                        <AvatarImage src={user.avatarUrl} alt={user.nickname} />
                        <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                    </Avatar>
                </Link>
            ))}
        </div>
    );
};

const FriendRequests = () => {
    const [requests, setRequests] = useState(mockFriendRequests);
    
    const handleRequest = (userId: string) => {
        setRequests(prev => prev.filter(u => u.id !== userId));
    };

    if (requests.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">Нет новых заявок в друзья.</p>;
    }

    return (
        <ul className="space-y-3">
            {requests.map(user => (
                <li key={user.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                    <Link href={`/users/${user.id}`} className="flex items-center gap-3 group">
                        <Avatar>
                            <AvatarImage src={user.avatarUrl} />
                            <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold group-hover:text-primary transition-colors">{user.nickname}</p>
                            <p className="text-xs text-muted-foreground">{user.firstName} {user.lastName}</p>
                        </div>
                    </Link>
                     <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" className="h-8 w-8 bg-green-500/10 hover:bg-green-500/20 text-green-300 border-green-500/20" onClick={() => handleRequest(user.id)}>
                            <Check className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-8 w-8 bg-red-500/10 hover:bg-red-500/20 text-red-300 border-red-500/20" onClick={() => handleRequest(user.id)}>
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </li>
            ))}
        </ul>
    );
}

export function SocialTab({ user, isOwnProfile }: { user: User, isOwnProfile: boolean }) {
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Социальные связи</CardTitle>
                <CardDescription>Друзья, подписчики и подписки пользователя.</CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="friends" className="flex flex-col gap-4">
                    <TabsList className="grid grid-cols-2 md:grid-cols-4 h-auto w-full">
                        <TabsTrigger value="friends" className="w-full justify-center gap-2">
                            <UsersIcon className="h-4 w-4" />
                            <span className="hidden lg:inline">Друзья ({user.friends.length})</span>
                        </TabsTrigger>
                        <TabsTrigger value="followers" className="w-full justify-center gap-2">
                            <Rss className="h-4 w-4" />
                            <span className="hidden lg:inline">Подписчики ({user.followers.length})</span>
                        </TabsTrigger>
                        {isOwnProfile && (
                            <TabsTrigger value="requests" className="w-full justify-center gap-2">
                                <UserPlus className="h-4 w-4" />
                                <span className="hidden lg:inline">Заявки</span>
                                <Badge variant="destructive" className="ml-auto lg:ml-1">{mockFriendRequests.length}</Badge>
                            </TabsTrigger>
                        )}
                        <TabsTrigger value="following" className="w-full justify-center gap-2">
                             <UsersIcon className="h-4 w-4" />
                             <span className="hidden lg:inline">Подписки ({user.followingUsers.length})</span>
                        </TabsTrigger>
                    </TabsList>
                    
                    <div className="w-full">
                        <TabsContent value="friends" className="mt-0">
                            <UserList userIds={user.friends} emptyText="У этого пользователя пока нет друзей." />
                        </TabsContent>
                        <TabsContent value="followers" className="mt-0">
                             <UserList userIds={user.followers} emptyText="На этого пользователя пока никто не подписан." />
                        </TabsContent>
                         {isOwnProfile && (
                            <TabsContent value="requests" className="mt-0">
                                <FriendRequests />
                            </TabsContent>
                         )}
                        <TabsContent value="following" className="mt-0">
                             <UserList userIds={user.followingUsers} emptyText="Этот пользователь ни на кого не подписан." />
                        </TabsContent>
                    </div>
                </Tabs>
            </CardContent>
        </Card>
    );
}
