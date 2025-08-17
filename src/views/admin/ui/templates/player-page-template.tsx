
'use client';

import { users, teams, playgrounds, posts, allSports } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Briefcase, Dumbbell, Film, History, Mail, MapPin, MessageSquare, Phone, Rss, UserPlus, Users as UsersIcon, Gamepad2, Heart, Activity, TrendingUp, Shield, Star, Trophy } from "lucide-react";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/ui/chart";
import { PolarGrid, PolarAngleAxis, Radar, RadarChart, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from "recharts";


const defaultPlayer = users.find(u => u.role === 'Игрок')!;

const skillData = [
  { subject: 'Атака', A: 86, fullMark: 100 },
  { subject: 'Защита', A: 75, fullMark: 100 },
  { subject: 'Техника', A: 90, fullMark: 100 },
  { subject: 'Скорость', A: 80, fullMark: 100 },
  { subject: 'Пас', A: 82, fullMark: 100 },
];

const eloData = [
  { month: 'Янв', elo: 1420 },
  { month: 'Фев', elo: 1450 },
  { month: 'Мар', elo: 1430 },
  { month: 'Апр', elo: 1480 },
  { month: 'Май', elo: 1510 },
  { month: 'Июн', elo: 1550 },
  { month: 'Июл', elo: 1540 },
  { month: 'Авг', elo: 1590 },
];

const careerStats = {
    '2025': { matches: 52, wins: 38, goals: 41, assists: 15, mvp: 12 },
    '2024': { matches: 68, wins: 41, goals: 35, assists: 22, mvp: 18 },
    'total': { matches: 120, wins: 79, goals: 76, assists: 37, mvp: 30 },
};

const StatRow = ({ label, value }: { label: string, value: string | number }) => (
    <div className="flex justify-between items-center py-2 border-b border-border/50 last:border-b-0">
        <span className="text-sm text-muted-foreground">{label}</span>
        <span className="font-bold text-sm">{value}</span>
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

const FormBadge = ({ result }: { result: 'W' | 'L' | 'D' }) => {
    const baseClasses = "flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs";
    if (result === 'W') return <div className={`${baseClasses} bg-success/80 text-success-foreground border border-success/30`}>W</div>;
    if (result === 'L') return <div className={`${baseClasses} bg-destructive/80 text-destructive-foreground border border-destructive/30`}>L</div>;
    return <div className={`${baseClasses} bg-secondary text-secondary-foreground border border-secondary/30`}>D</div>;
};

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

const TrainingTab = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity /> Тренировочный процесс</CardTitle>
            <CardDescription>Информация о тренировочной активности и предпочтениях игрока.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Специализация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><span className="font-semibold">Основной фокус:</span> Выносливость и скорость</p>
                        <p><span className="font-semibold">Дополнительно:</span> Силовые тренировки</p>
                    </CardContent>
                </Card>
                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Режим</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><span className="font-semibold">Частота:</span> 4-5 раз в неделю</p>
                        <p><span className="font-semibold">Любимое время:</span> Вечер</p>
                    </CardContent>
                </Card>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-2">Предпочитаемые места</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playgrounds.slice(0, 2).map(p => (
                        <Link href={`/playgrounds/${p.id}`} key={p.id} className="block p-3 rounded-md border bg-card hover:border-primary transition-colors">
                            <div className="flex items-center gap-3">
                                <Dumbbell className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-semibold">{p.name}</p>
                                    <p className="text-xs text-muted-foreground">{p.address}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
);

const MediaTab = () => (
    <Card>
        <CardHeader><CardTitle>Медиа</CardTitle></CardHeader>
        <CardContent><p className="text-muted-foreground">Раздел с медиа в разработке.</p></CardContent>
    </Card>
);

export function PlayerPageTemplate({ user: profileUser }: { user?: User }) {
    const player = profileUser || defaultPlayer;
    const { user: currentUser } = useUserStore();
    const playerTeam = teams.find(t => t.members.includes(player.id));

    const isOwnProfile = currentUser?.id === player.id;
    const last5Form: ('W' | 'L' | 'D')[] = ['W', 'L', 'W', 'W', 'W'];

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
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-muted-foreground mt-2 text-sm">
                        {playerTeam && (
                            <div className="flex items-center gap-2">
                                <Briefcase className="h-4 w-4" />
                                <Image src={playerTeam.logoUrl} alt={playerTeam.name} width={16} height={16} className="rounded-sm" data-ai-hint="team logo" />
                                <span>{playerTeam.name}</span>
                            </div>
                        )}
                        {player.city && <div className="flex items-center gap-2"><MapPin className="h-4 w-4"/><span>{player.city}</span></div>}
                        {player.age && <div className="flex items-center gap-2"><span>Возраст: {player.age}</span></div>}
                    </div>
                </div>
                {!isOwnProfile && (
                    <div className="flex items-center gap-2">
                        <Button><UserPlus className="mr-2 h-4 w-4" />Добавить в друзья</Button>
                        <Button variant="secondary"><MessageSquare className="mr-2 h-4 w-4" />Написать</Button>
                    </div>
                )}
            </header>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Left Column for Stats and Graphs */}
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader><CardTitle className="text-base">Форма (5 матчей)</CardTitle></CardHeader>
                        <CardContent className="flex items-center gap-2 justify-center">
                            {last5Form.map((result, index) => <FormBadge key={index} result={result} />)}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Навыки</CardTitle></CardHeader>
                        <CardContent>
                            <ChartContainer config={{}} className="h-52 w-full">
                                <RadarChart data={skillData}>
                                    <ChartTooltipContent />
                                    <PolarAngleAxis dataKey="subject" className="text-xs"/>
                                    <PolarGrid />
                                    <Radar name="Skills" dataKey="A" stroke="hsl(var(--primary))" fill="hsl(var(--primary))" fillOpacity={0.6} />
                                </RadarChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Прогресс ELO</CardTitle></CardHeader>
                        <CardContent>
                            <ChartContainer config={{elo: {label: 'ELO', color: "hsl(var(--primary))"}}} className="h-48 w-full">
                                <LineChart data={eloData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                    <CartesianGrid vertical={false} />
                                    <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} className="text-xs"/>
                                    <YAxis domain={['dataMin - 50', 'dataMax + 50']} hide/>
                                    <RechartsTooltip content={<ChartTooltipContent />}/>
                                    <Line type="monotone" dataKey="elo" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                                </LineChart>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Трофеи</CardTitle></CardHeader>
                        <CardContent className="flex justify-around items-center">
                             <Trophy className="h-12 w-12 text-amber-400" />
                             <Trophy className="h-10 w-10 text-slate-400" />
                             <Trophy className="h-8 w-8 text-amber-600" />
                        </CardContent>
                    </Card>
                </div>
                
                {/* Right Column for Tabs */}
                <div className="lg:col-span-3">
                     <Tabs defaultValue="stats">
                        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                            <TabsTrigger value="stats">Статистика</TabsTrigger>
                            <TabsTrigger value="training">Тренировки</TabsTrigger>
                            <TabsTrigger value="feed">Лента</TabsTrigger>
                            <TabsTrigger value="media">Медиа</TabsTrigger>
                        </TabsList>
                        <TabsContent value="stats" className="mt-6"><StatsTab /></TabsContent>
                        <TabsContent value="training" className="mt-6"><TrainingTab /></TabsContent>
                        <TabsContent value="feed" className="mt-6"><FeedTab player={player} isOwnProfile={isOwnProfile} /></TabsContent>
                        <TabsContent value="media" className="mt-6"><MediaTab /></TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
