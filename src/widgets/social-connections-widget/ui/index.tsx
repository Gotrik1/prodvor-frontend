'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import type { User, Team } from '@/entities/user/types';
import { users, teams } from '@/mocks';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { Check, UserPlus, X, Users as UsersIcon, Rss, Heart } from 'lucide-react';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';
import { Skeleton } from '@/shared/ui/skeleton';
import { api } from '@/shared/api/axios-instance';


const UserList = ({ userIds, emptyText, isLoading }: { userIds: string[], emptyText: string, isLoading: boolean }) => {
    
    if (isLoading) {
        return (
            <div className="flex flex-wrap gap-2">
                {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-12 rounded-full" />)}
            </div>
        )
    }

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

const TeamList = ({ teamIds, emptyText, isLoading }: { teamIds: string[], emptyText: string, isLoading: boolean }) => {

     if (isLoading) {
        return (
            <div className="flex flex-wrap gap-2">
                {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-12 rounded-md" />)}
            </div>
        )
    }

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
    const [requests, setRequests] = useState<User[]>([]);
    
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

export function SocialConnectionsWidget({ user, isOwnProfile }: { user: User, isOwnProfile: boolean }) {
    const [activeTab, setActiveTab] = useState('friends');
    const [isLoading, setIsLoading] = useState(false);
    const [friends, setFriends] = useState<string[]>([]);
    const [followers, setFollowers] = useState<string[]>([]);
    const [followingUsers, setFollowingUsers] = useState<string[]>([]);
    const [followingTeams, setFollowingTeams] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchData = async (tab: string) => {
            if (!user) return;
            setIsLoading(true);

            try {
                switch(tab) {
                    case 'friends':
                        const friendsRes = await api.get(`/api/v1/users/${user.id}/friends`);
                        setFriends(friendsRes.data.map((u: User) => u.id));
                        break;
                    case 'followers':
                        const followersRes = await api.get(`/api/v1/users/${user.id}/followers`);
                        setFollowers(followersRes.data.map((u: User) => u.id));
                        break;
                    case 'following':
                        const followingRes = await api.get(`/api/v1/users/${user.id}/following`);
                        setFollowingUsers(followingRes.data.users.map((u: User) => u.id));
                        setFollowingTeams(followingRes.data.teams.map((t: Team) => t.id));
                        break;
                }
            } catch (error) {
                console.error(`Failed to fetch data for tab ${tab}:`, error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData(activeTab);

    }, [activeTab, user]);
    
    if (!user) {
        return (
            <Card className="md:shadow-main-sm shadow-none md:bg-card bg-transparent">
                <CardHeader className="hidden md:flex">
                    <CardTitle>Социальные связи</CardTitle>
                </CardHeader>
                <CardContent className="md:p-6">
                    <p className="text-sm text-muted-foreground text-center">Загрузка...</p>
                </CardContent>
            </Card>
        )
    }

    const tabs = [
        { value: 'friends', icon: UsersIcon, label: `Друзья (${user.friends?.length || 0})` },
        { value: 'followers', icon: Rss, label: `Подписчики (${user.followers?.length || 0})` },
        { value: 'following', icon: Heart, label: `Подписки (${(user.followingUsers?.length || 0) + (user.following?.length || 0)})` },
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
                <Tabs defaultValue="friends" className="w-full" onValueChange={setActiveTab}>
                    <TabsList className={cn("grid w-full mb-4", isOwnProfile ? "grid-cols-4" : "grid-cols-3")}>
                        {tabs.map(tab => (
                            <TabsTrigger key={tab.value} value={tab.value}>
                                <div className="relative">
                                    <tab.icon className="h-5 w-5" />
                                    {tab.value === 'requests' && isOwnProfile && 0 > 0 && (
                                        <Badge variant="destructive" className="absolute -top-2 -right-2 h-4 w-4 p-0 justify-center text-xs">
                                            {0}
                                        </Badge>
                                    )}
                                </div>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    <TabsContent value="friends">
                        <UserList userIds={friends} emptyText="У этого пользователя пока нет друзей." isLoading={isLoading} />
                    </TabsContent>
                    <TabsContent value="followers">
                        <UserList userIds={followers} emptyText="На этого пользователя пока никто не подписан." isLoading={isLoading} />
                    </TabsContent>
                    {isOwnProfile && (
                        <TabsContent value="requests">
                            <FriendRequests />
                        </TabsContent>
                    )}
                    <TabsContent value="following" className="space-y-4">
                        <div>
                             <h3 className="text-sm font-semibold text-muted-foreground mb-2">Команды ({followingTeams.length})</h3>
                             <TeamList teamIds={followingTeams} emptyText="Не подписан на команды." isLoading={isLoading} />
                        </div>
                        <div>
                            <h3 className="text-sm font-semibold text-muted-foreground mb-2">Игроки ({followingUsers.length})</h3>
                            <UserList userIds={followingUsers} emptyText="Не подписан на игроков." isLoading={isLoading} />
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
