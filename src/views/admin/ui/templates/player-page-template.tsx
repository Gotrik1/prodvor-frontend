
'use client';

import { users, teams, playgrounds, posts, allSports } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Briefcase, Dumbbell, Film, History, Mail, MapPin, MessageSquare, Phone, Rss, UserPlus, Users as UsersIcon, Gamepad2 } from "lucide-react";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;

const careerStats = {
    '2025': { matches: 52, wins: 38, goals: 41, assists: 15, mvp: 12 },
    '2024': { matches: 68, wins: 41, goals: 35, assists: 22, mvp: 18 },
    'total': { matches: 120, wins: 79, goals: 76, assists: 37, mvp: 30 },
};

const StatRow = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-bold">{value}</span>
    </div>
);

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

const OverviewTab = ({ player, playerDisciplines }: { player: User, playerDisciplines: string[] }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="lg:col-span-2">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><Gamepad2 />Дисциплины</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {playerDisciplines.length > 0 ? (
                        playerDisciplines.map(d => <Badge key={d}>{d}</Badge>)
                    ) : (
                        <p className="text-sm text-muted-foreground">Дисциплины не указаны.</p>
                    )}
                </div>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Ключевые показатели</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
                <StatRow label="Матчей сыграно" value={152} />
                <StatRow label="Побед" value="101 (66%)" />
                <StatRow label="MVP" value="34 раза" />
                <StatRow label="Надежность" value="98%" />
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Достижения</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
                <Badge>Ветеран</Badge>
                <Badge>Снайпер</Badge>
                <Badge>Мастер камбэков</Badge>
                <Badge variant="destructive">Горячая голова</Badge>
            </CardContent>
        </Card>
        <Card className="lg:col-span-2">
            <CardHeader><CardTitle>Любимые площадки</CardTitle></CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {playgrounds.slice(0, 2).map(p => (
                    <div key={p.id} className="flex items-center gap-3 p-3 rounded-md border bg-muted/50">
                        <Dumbbell className="h-5 w-5 text-primary" />
                        <div>
                            <p className="font-semibold">{p.name}</p>
                            <p className="text-xs text-muted-foreground">{p.address}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
);

const StatsTab = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><History className="h-5 w-5" /> Карьерная статистика</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="2025" orientation="vertical">
                <TabsList>
                    <TabsTrigger value="2025">Сезон 2025</TabsTrigger>
                    <TabsTrigger value="2024">Сезон 2024</TabsTrigger>
                    <TabsTrigger value="total">Всего</TabsTrigger>
                </TabsList>
                <TabsContent value="2025" className="ml-4 pl-4 border-l">
                    <StatRow label="Матчи" value={careerStats['2025'].matches} />
                    <StatRow label="Победы" value={`${careerStats['2025'].wins} (${Math.round(careerStats['2025'].wins / careerStats['2025'].matches * 100)}%)`} />
                    <StatRow label="Голы" value={careerStats['2025'].goals} />
                    <StatRow label="Ассисты" value={careerStats['2025'].assists} />
                    <StatRow label="MVP" value={careerStats['2025'].mvp} />
                </TabsContent>
                <TabsContent value="2024" className="ml-4 pl-4 border-l">
                    <StatRow label="Матчи" value={careerStats['2024'].matches} />
                    <StatRow label="Победы" value={`${careerStats['2024'].wins} (${Math.round(careerStats['2024'].wins / careerStats['2024'].matches * 100)}%)`} />
                    <StatRow label="Голы" value={careerStats['2024'].goals} />
                    <StatRow label="Ассисты" value={careerStats['2024'].assists} />
                    <StatRow label="MVP" value={careerStats['2024'].mvp} />
                </TabsContent>
                <TabsContent value="total" className="ml-4 pl-4 border-l">
                    <StatRow label="Матчи" value={careerStats['total'].matches} />
                    <StatRow label="Победы" value={`${careerStats['total'].wins} (${Math.round(careerStats['total'].wins / careerStats['total'].matches * 100)}%)`} />
                    <StatRow label="Голы" value={careerStats['total'].goals} />
                    <StatRow label="Ассисты" value={careerStats['total'].assists} />
                    <StatRow label="MVP" value={careerStats['total'].mvp} />
                </TabsContent>
            </Tabs>
        </CardContent>
    </Card>
);

const FeedTab = ({ player, isOwnProfile }: { player: User; isOwnProfile: boolean }) => {
    const playerPosts = posts.filter(p => p.author.id === player.id);
    return (
        <div className="space-y-4">
            {isOwnProfile && <CreatePost user={player} />}
            {playerPosts.length > 0 ? (
                 <p>Компонент ленты будет здесь.</p>
            ) : (
                <Card className="flex items-center justify-center min-h-[200px]">
                    <p className="text-muted-foreground">У игрока пока нет записей.</p>
                </Card>
            )}
        </div>
    )
};

const MediaTab = () => (
    <Card>
        <CardHeader><CardTitle>Медиа</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Раздел с медиа в разработке.</p></CardContent>
    </Card>
);

const FollowersCard = ({ user }: { user: User }) => (
    <Card>
        <CardHeader>
            <CardTitle>Подписчики ({user.followers.length})</CardTitle>
        </CardHeader>
        <CardContent>
            <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-4 gap-3">
                {users.filter(u => user.followers.includes(u.id)).slice(0, 12).map(follower => (
                    <Link href={`/users/${follower.id}`} key={follower.id}>
                        <Avatar className="h-12 w-12 border-2 border-transparent hover:border-primary transition-colors">
                            <AvatarImage src={follower.avatarUrl} alt={follower.nickname} />
                            <AvatarFallback>{follower.nickname.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>
                ))}
            </div>
        </CardContent>
    </Card>
);

const FollowingCard = ({ user }: { user: User }) => (
    <Card>
         <CardHeader>
             <CardTitle>Подписки ({user.followingUsers.length + user.following.length})</CardTitle>
        </CardHeader>
         <CardContent>
            <div className="flex flex-wrap gap-3">
                {users.filter(u => user.followingUsers.includes(u.id)).map(followedUser => (
                    <Link href={`/users/${followedUser.id}`} key={followedUser.id}>
                        <Avatar className="h-12 w-12 border-2 border-transparent hover:border-primary transition-colors">
                            <AvatarImage src={followedUser.avatarUrl} alt={followedUser.nickname} />
                            <AvatarFallback>{followedUser.nickname.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>
                ))}
                 {teams.filter(t => user.following.includes(t.id)).map(team => (
                    <Link href={`/teams/${team.id}`} key={team.id}>
                         <Avatar className="h-12 w-12 border-2 border-transparent hover:border-primary transition-colors rounded-md">
                            <AvatarImage src={team.logoUrl} alt={team.name} className="p-1" />
                            <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                    </Link>
                ))}
            </div>
        </CardContent>
    </Card>
);


export function PlayerPageTemplate({ user: profileUser }: { user?: User }) {
    const player = profileUser || defaultPlayer;
    const { user: currentUser } = useUserStore();
    const playerDisciplines = getUserDisciplines(player);
    const playerTeam = teams.find(t => t.members.includes(player.id));

    const isOwnProfile = currentUser?.id === player.id;

    return (
        <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-muted/20">
            <header className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={player.avatarUrl} alt={player.nickname} />
                    <AvatarFallback>{player.firstName.charAt(0)}{player.lastName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left flex-grow">
                    <h1 className="text-3xl font-bold font-headline">{player.firstName} "{player.nickname}" {player.lastName}</h1>
                    <p className="text-muted-foreground text-lg mt-1">Роль: {player.role}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-muted-foreground mt-2">
                        {playerTeam && (
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <Image src={playerTeam.logoUrl} alt={playerTeam.name} width={16} height={16} className="rounded-sm" data-ai-hint="team logo" />
                                <span>{playerTeam.name}</span>
                            </div>
                        )}
                        {player.city && <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>{player.city}</span></div>}
                        {player.age && <div className="flex items-center gap-2"><span>Возраст: {player.age}</span></div>}
                        {player.email && <div className="flex items-center gap-2"><Mail className="h-4 w-4"/><span>{player.email}</span></div>}
                        {player.phone && <div className="flex items-center gap-2"><Phone className="h-4 w-4"/><span>{player.phone}</span></div>}
                    </div>
                </div>
                {!isOwnProfile && (
                    <div className="flex items-center gap-2">
                        <Button><UserPlus className="mr-2 h-4 w-4" />Добавить в друзья</Button>
                        <Button variant="secondary"><MessageSquare className="mr-2 h-4 w-4" />Написать</Button>
                    </div>
                )}
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Tabs defaultValue="overview">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                            <TabsTrigger value="overview">Обзор</TabsTrigger>
                            <TabsTrigger value="stats">Статистика</TabsTrigger>
                            <TabsTrigger value="feed">Лента</TabsTrigger>
                            <TabsTrigger value="media">Медиа</TabsTrigger>
                        </TabsList>
                        <TabsContent value="overview" className="mt-6"><OverviewTab player={player} playerDisciplines={playerDisciplines} /></TabsContent>
                        <TabsContent value="stats" className="mt-6"><StatsTab /></TabsContent>
                        <TabsContent value="feed" className="mt-6"><FeedTab player={player} isOwnProfile={isOwnProfile} /></TabsContent>
                        <TabsContent value="media" className="mt-6"><MediaTab /></TabsContent>
                    </Tabs>
                </div>
                 <div className="lg:col-span-1 space-y-6">
                    <FollowersCard user={player} />
                    <FollowingCard user={player} />
                </div>
            </div>
        </div>
    )
}
