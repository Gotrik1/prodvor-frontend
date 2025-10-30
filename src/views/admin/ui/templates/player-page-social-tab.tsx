

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import type { User, Team } from '@/mocks';
import { users, teams } from '@/mocks';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Check, UserPlus, X, Users as UsersIcon, Rss, Heart } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

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
                 <TooltipProvider key={user.id}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/users/${user.id}`} className="group">
                                <Avatar className="h-12 w-12 border-2 border-transparent group-hover:border-primary transition-colors">
                                    <AvatarImage src={user.avatarUrl} alt={user.nickname} />
                                    <AvatarFallback>{user.nickname.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{user.nickname}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    );
};

const TeamList = ({ teamIds, emptyText }: { teamIds: string[], emptyText: string }) => {
    const teamList = teams.filter(t => teamIds.includes(t.id));

    if (teamList.length === 0) {
        return <p className="text-sm text-muted-foreground text-center py-4">{emptyText}</p>;
    }

    return (
         <div className="flex flex-wrap gap-2">
            {teamList.map(team => (
                 <TooltipProvider key={team.id}>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Link href={`/teams/${team.id}`} className="group">
                                <Avatar className="h-12 w-12 border-2 border-transparent group-hover:border-primary transition-colors rounded-md">
                                    <AvatarImage src={team.logoUrl} alt={team.name} />
                                    <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>{team.name}</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            ))}
        </div>
    )
}

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
    
    const tabs = [
        { value: 'friends', icon: UsersIcon, label: `Друзья (${user.friends.length})` },
        { value: 'followers', icon: Rss, label: `Подписчики (${user.followers.length})` },
        { value: 'following', icon: Heart, label: `Подписки (${user.followingUsers.length + user.following.length})` },
    ];
    
    if (isOwnProfile) {
        tabs.splice(2, 0, { value: 'requests', icon: UserPlus, label: 'Заявки' });
    }

    return (
        <Card className="md:shadow-main-sm shadow-none md:bg-card bg-transparent">
            <CardHeader className="hidden md:flex">
                <CardTitle>Социальные связи</CardTitle>
                <CardDescription>Друзья, подписчики и подписки пользователя.</CardDescription>
            </CardHeader>
            <CardContent className="md:p-6">
                <Tabs defaultValue="friends" className="w-full">
                    <TabsList className={cn("grid w-full mb-4", isOwnProfile ? "grid-cols-4" : "grid-cols-3")}>
                        {tabs.map(tab => (
                            <TabsTrigger key={tab.value} value={tab.value}>
                                <div className="relative">
                                    <tab.icon className="h-5 w-5" />
                                    {tab.value === 'requests' && isOwnProfile && mockFriendRequests.length > 0 && (
                                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 w-4 p-0 justify-center text-xs">
                                            {mockFriendRequests.length}
                                        </Badge>
                                    )}
                                </div>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="friends">
                        <UserList userIds={user.friends} emptyText="У этого пользователя пока нет друзей." />
                    </TabsContent>
                    <TabsContent value="followers">
                        <UserList userIds={user.followers} emptyText="На этого пользователя пока никто не подписан." />
                    </TabsContent>
                    {isOwnProfile && (
                        <TabsContent value="requests">
                            <FriendRequests />
                        </TabsContent>
                    )}
                    <TabsContent value="following" className="space-y-4">
                        <div>
                             <h3 className="text-sm font-semibold text-muted-foreground mb-2">Команды ({user.following.length})</h3>
                             <TeamList userIds={user.following} emptyText="Не подписан на команды." />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Игроки ({user.followingUsers.length})</h3>
                            <UserList userIds={user.followingUsers} emptyText="Не подписан на игроков." />
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
