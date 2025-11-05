

'use client';

import { users, teams, posts } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Calendar, Flame, Heart, Ticket, Gamepad2, Tv, Camera, User as UserIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useMemo } from "react";
import { getUserDisciplines } from "@/entities/user/lib";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/shared/ui/dialog";
import { AchievementsTab } from "@/views/admin/ui/templates/player-page-achievements-tab";
import { MediaPostDialog } from "@/widgets/media-post-dialog";


const defaultFan: User | undefined = users.find(u => u.role === 'Болельщик');
const upcomingMatches = [
    { team1: teams[0], team2: teams[1], tournament: { name: 'Летний Кубок ProDvor' } },
    { team1: teams[2], team2: teams[3], tournament: { name: 'Летний Кубок ProDvor' } },
];
const mockMedia = [
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Фото с последней игры', dataAiHint: 'soccer game' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Командное фото', dataAiHint: 'team photo' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Тренировка', dataAiHint: 'sports training' },
    { type: 'image', src: 'https://placehold.co/1920x1080.png', title: 'Награждение', dataAiHint: 'award ceremony' },
];


export function FanPageTemplate({ user }: { user?: User }) {
    const fanUser = user || defaultFan;
    
    const fanDisciplines = useMemo(() => {
        if (!fanUser) return [];
        return getUserDisciplines(fanUser);
    }, [fanUser]);
    
    const favoriteTeams = useMemo(() => {
        if (!fanUser) return [];
        return teams.filter(team => fanUser.following.includes(team.id));
    }, [fanUser]);

    const followingUsersCount = fanUser?.followingUsers.length || 0;


    if (!fanUser) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Card className="text-center">
                    <CardHeader>
                        <CardTitle>Ошибка</CardTitle>
                        <CardDescription>Не удалось загрузить данные болельщика.</CardDescription>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <header className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={fanUser.avatarUrl} alt={fanUser.nickname} />
                    <AvatarFallback>{fanUser.nickname.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{fanUser.nickname}</h1>
                    <p className="text-muted-foreground text-lg">Роль: {fanUser.role}</p>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                        <Badge variant="secondary">Уровень поддержки: Легенда</Badge>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <Link href="/teams" className="transition-transform duration-150 active:scale-95 block">
                    <Card className="hover:border-primary h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Любимые команды</CardTitle>
                            <Heart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{favoriteTeams.length}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href={`/users/${fanUser.id}`} className="transition-transform duration-150 active:scale-95 block">
                    <Card className="hover:border-primary h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Отслеживаемые игроки</CardTitle>
                            <UserIcon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{followingUsersCount}</div>
                        </CardContent>
                    </Card>
                </Link>
                <Link href="/competitions" className="transition-transform duration-150 active:scale-95 block">
                    <Card className="hover:border-primary h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Просмотрено матчей</CardTitle>
                            <Ticket className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">78</div>
                        </CardContent>
                    </Card>
                </Link>
                 <Link href="/competitions" className="transition-transform duration-150 active:scale-95 block">
                    <Card className="hover:border-primary h-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Стрик посещений</CardTitle>
                            <Flame className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">12 дней</div>
                        </CardContent>
                    </Card>
                </Link>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <Tabs defaultValue="media">
                             <CardHeader>
                                 <TabsList className="grid w-full grid-cols-2">
                                    <TabsTrigger value="media"><Camera className="md:mr-2 h-4 w-4"/>Медиа</TabsTrigger>
                                    <TabsTrigger value="broadcasts"><Tv className="md:mr-2 h-4 w-4"/>Трансляции</TabsTrigger>
                                </TabsList>
                            </CardHeader>
                             <CardContent>
                                <TabsContent value="media">
                                    <div className="grid grid-cols-2 gap-4">
                                        {posts.slice(0, 4).map((post, index) => (
                                            <Dialog key={post.id}>
                                                <DialogTrigger asChild>
                                                    <div className="relative aspect-video rounded-lg overflow-hidden group cursor-pointer">
                                                        <Image 
                                                            src={mockMedia[index % mockMedia.length].src} 
                                                            alt={post.content} 
                                                            fill 
                                                            className="object-cover group-hover:scale-105 transition-transform"
                                                            data-ai-hint={mockMedia[index % mockMedia.length].dataAiHint}
                                                        />
                                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                                        <div className="absolute bottom-2 left-3 flex items-center gap-1.5 text-white">
                                                            <Heart className="h-4 w-4" />
                                                            <span className="font-semibold text-sm">{post.likes}</span>
                                                        </div>
                                                    </div>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-4xl p-0">
                                                    <MediaPostDialog post={post} />
                                                </DialogContent>
                                            </Dialog>
                                        ))}
                                    </div>
                                </TabsContent>
                                <TabsContent value="broadcasts">
                                     <div className="aspect-video bg-muted rounded-md overflow-hidden border">
                                        <iframe
                                            className="w-full h-full"
                                            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                            title="YouTube video player"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                </TabsContent>
                            </CardContent>
                        </Tabs>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Gamepad2 />Интересы</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-wrap gap-2">
                            {fanDisciplines.length > 0 ? (
                                    fanDisciplines.map(d => <Badge key={d}>{d}</Badge>)
                            ) : (
                                    <p className="text-sm text-muted-foreground">Дисциплины не указаны.</p>
                            )}
                            </div>
                        </CardContent>
                    </Card>
                    <AchievementsTab player={fanUser} />
                    <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5" />
                                Предстоящие матчи
                            </CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-3">
                            {upcomingMatches.map((match, index) => (
                                <div key={index} className="p-3 rounded-lg bg-muted/50">
                                    <p className="text-xs text-muted-foreground">{match.tournament.name}</p>
                                    <div className="flex items-center justify-between mt-1">
                                        <div className="flex items-center gap-2 text-sm font-medium w-2/5">
                                            <Image src={match.team1.logoUrl} alt={match.team1.name} width={24} height={24} className="rounded-sm" data-ai-hint="team logo"/>
                                            <span className="truncate">{match.team1.name}</span>
                                        </div>
                                         <span className="text-xs font-bold text-primary">VS</span>
                                         <div className="flex items-center gap-2 text-sm font-medium w-2/5 justify-end text-right">
                                            <span className="truncate">{match.team2.name}</span>
                                            <Image src={match.team2.logoUrl} alt={match.team2.name} width={24} height={24} className="rounded-sm" data-ai-hint="team logo"/>
                                        </div>
                                    </div>
                                </div>
                            ))}
                         </CardContent>
                    </Card>
                </div>
            </div>

        </div>
    );
}
