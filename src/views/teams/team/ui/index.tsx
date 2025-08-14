import { teams, users, playgrounds, challenges, posts } from "@/mocks";
import type { User } from "@/mocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Crown, Home, Swords, Trophy, UserPlus, Check, X, TrendingUp, TrendingDown, Minus, Rss, Film, Star, Shield } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { TeamFeedTab } from "./team-feed-tab";
import { TeamMediaTab } from "./team-media-tab";

const TeamRoster = ({ teamMembers, captainId }: { teamMembers: User[], captainId: string }) => (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {teamMembers.map(member => (
            <div key={member.id} className="flex flex-col items-center text-center gap-2">
                <Avatar className="h-16 w-16">
                    <AvatarImage src={member.avatarUrl} alt={member.nickname} />
                    <AvatarFallback>{member.firstName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold">{member.nickname}</p>
                    <p className="text-xs text-muted-foreground">{member.firstName} {member.lastName}</p>
                    {member.id === captainId && (
                        <Badge variant="secondary" className="mt-1">
                            <Crown className="h-3 w-3 mr-1" />
                            Капитан
                        </Badge>
                    )}
                </div>
            </div>
        ))}
    </div>
);

const TeamMatches = () => (
     <ul className="space-y-2">
        <li className="flex justify-between items-center p-3 rounded-md hover:bg-muted/50">
            <div className="flex items-center gap-3">
                <Image src={teams[1].logoUrl} alt={teams[1].name} width={32} height={32} className="rounded-md" data-ai-hint="team logo" />
                <span className="font-medium">vs {teams[1].name}</span>
            </div>
            <p className="text-sm text-muted-foreground">Летний Кубок ProDvor</p>
            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Победа 5:3</Badge>
        </li>
        <li className="flex justify-between items-center p-3 rounded-md hover:bg-muted/50">
            <div className="flex items-center gap-3">
                <Image src={teams[2].logoUrl} alt={teams[2].name} width={32} height={32} className="rounded-md" data-ai-hint="team logo" />
                <span className="font-medium">vs {teams[2].name}</span>
            </div>
            <p className="text-sm text-muted-foreground">Товарищеский матч</p>
             <Badge variant="destructive">Поражение 1:2</Badge>
        </li>
    </ul>
);

const TeamChallenges = ({ teamId }: { teamId: string }) => {
    const incomingChallenges = challenges.filter(c => c.challenged.id === teamId && c.status === 'pending');
    const outgoingChallenges = challenges.filter(c => c.challenger.id === teamId && c.status === 'pending');

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="font-semibold mb-3">Входящие вызовы ({incomingChallenges.length})</h3>
                <div className="space-y-3">
                    {incomingChallenges.map(challenge => (
                        <Card key={challenge.id} className="bg-muted/50">
                            <CardContent className="p-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Image src={challenge.challenger.logoUrl} alt={challenge.challenger.name} width={32} height={32} className="rounded-md" data-ai-hint="team logo" />
                                    <span className="font-medium">{challenge.challenger.name}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline" className="bg-green-500/10 text-green-300 border-green-500/20 hover:bg-green-500/20"><Check className="h-4 w-4" /></Button>
                                    <Button size="sm" variant="outline" className="bg-red-500/10 text-red-300 border-red-500/20 hover:bg-red-500/20"><X className="h-4 w-4" /></Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {incomingChallenges.length === 0 && <p className="text-sm text-muted-foreground">Нет входящих вызовов.</p>}
                </div>
            </div>
             <div>
                <h3 className="font-semibold mb-3">Исходящие вызовы ({outgoingChallenges.length})</h3>
                <div className="space-y-3">
                    {outgoingChallenges.map(challenge => (
                        <Card key={challenge.id} className="bg-muted/50">
                            <CardContent className="p-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Image src={challenge.challenged.logoUrl} alt={challenge.challenged.name} width={32} height={32} className="rounded-md" data-ai-hint="team logo" />
                                    <span className="font-medium">{challenge.challenged.name}</span>
                                </div>
                                <Badge variant="secondary">{challenge.status === 'pending' ? 'Ожидание' : 'Принят'}</Badge>
                            </CardContent>
                        </Card>
                    ))}
                    {outgoingChallenges.length === 0 && <p className="text-sm text-muted-foreground">Нет исходящих вызовов.</p>}
                </div>
            </div>
        </div>
    )
};

const FormBadge = ({ result }: { result: 'W' | 'L' | 'D' }) => {
    const baseClasses = "flex items-center justify-center w-8 h-8 rounded-md font-bold";
    if (result === 'W') return <div className={`${baseClasses} bg-green-500/20 text-green-300 border border-green-500/30`}>W</div>;
    if (result === 'L') return <div className={`${baseClasses} bg-red-500/20 text-red-300 border border-red-500/30`}>L</div>;
    return <div className={`${baseClasses} bg-gray-500/20 text-gray-300 border border-gray-500/30`}>D</div>;
};

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string, icon: React.ElementType }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

export function TeamPublicPage({ team }: { team: (typeof teams)[0] | undefined}) {

    if (!team) {
       return (
            <div className="flex flex-col min-h-[80vh] items-center justify-center">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Команда не найдена.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/dashboard">Вернуться на платформу</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const teamMembers = users.filter(u => team.members.includes(u.id));
    const captain = users.find(u => u.id === team.captainId);
    const homePlayground = playgrounds.find(p => p.id === team.homePlaygroundId);
    const teamPosts = posts.filter(p => p.team?.id === team.id);

    // Mock statistics
    const wins = 45;
    const losses = 12;
    const winrate = Math.round((wins / (wins + losses)) * 100);
    const currentStreak = { type: 'W', count: 3 };
    const last5Form: ('W' | 'L' | 'D')[] = ['W', 'L', 'W', 'W', 'W'];
    const mvp = teamMembers[0];
    const topScorer = teamMembers[1];

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-card">
                <header className="flex flex-col md:flex-row items-center gap-6">
                    <Image src={team.logoUrl} alt={team.name} width={96} height={96} className="rounded-lg border-4 border-primary" data-ai-hint="team logo"/>
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold font-headline">{team.name}</h1>
                        <p className="text-muted-foreground text-lg">Дисциплина: {team.game}</p>
                         {homePlayground && (
                            <Link href={`/playgrounds/${homePlayground.id}`} className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 mt-1 justify-center md:justify-start">
                                <Home className="h-4 w-4" />
                                <span>{homePlayground.name}</span>
                            </Link>
                        )}
                    </div>
                    <div className="md:ml-auto flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                        <Button className="w-full">
                            <Swords className="mr-2 h-4 w-4" /> Бросить вызов
                        </Button>
                         <Button variant="outline" className="w-full">
                            <Rss className="mr-2 h-4 w-4" /> Подписаться
                        </Button>
                    </div>
                </header>

                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 md:grid-cols-6">
                        <TabsTrigger value="overview">Обзор</TabsTrigger>
                        <TabsTrigger value="roster">Состав</TabsTrigger>
                        <TabsTrigger value="matches">Матчи</TabsTrigger>
                        <TabsTrigger value="challenges">Вызовы</TabsTrigger>
                        <TabsTrigger value="feed"><Rss className="md:mr-2 h-4 w-4" /><span className="hidden md:inline">Лента</span></TabsTrigger>
                        <TabsTrigger value="media"><Film className="md:mr-2 h-4 w-4" /><span className="hidden md:inline">Медиа</span></TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                            <Card>
                                <CardHeader><CardTitle>Побед / Поражений</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{wins} / {losses}</p>
                                    <p className="text-sm text-muted-foreground">Процент побед: <span className="text-green-400 font-semibold">{winrate}%</span></p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle>Рейтинг ELO</CardTitle></CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{team.rank}</p>
                                    <p className="text-sm text-muted-foreground">Место в лиге: <span className="text-primary font-semibold">3-е</span></p>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader><CardTitle>Текущая серия</CardTitle></CardHeader>
                                <CardContent>
                                    <div className="flex items-center gap-2">
                                        {currentStreak.type === 'W' ? <TrendingUp className="h-8 w-8 text-green-500" /> : <TrendingDown className="h-8 w-8 text-red-500" />}
                                        <p className="text-3xl font-bold">{currentStreak.count} {currentStreak.type === 'W' ? 'W' : 'L'}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground">Побед подряд</p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader><CardTitle>Форма (5 матчей)</CardTitle></CardHeader>
                                <CardContent className="flex items-center gap-2">
                                    {last5Form.map((result, index) => <FormBadge key={index} result={result} />)}
                                </CardContent>
                            </Card>
                        </div>
                         <Card>
                            <CardHeader>
                                <CardTitle>Ключевые показатели</CardTitle>
                            </CardHeader>
                            <CardContent className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <StatCard title="MVP команды" value={mvp.nickname} icon={Star} />
                                <StatCard title="Лучший бомбардир" value={topScorer.nickname} icon={Trophy} />
                                <StatCard title="Сухие матчи" value="12" icon={Shield} />
                                <StatCard title="Средний рейтинг" value="1520" icon={Crown} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="roster" className="mt-6">
                         <Card>
                            <CardHeader>
                                <CardTitle>Состав команды ({teamMembers.length})</CardTitle>
                                 <CardDescription>
                                    Игроки, представляющие команду в текущем сезоне.
                                    <Button variant="outline" size="sm" className="ml-4"><UserPlus className="mr-2 h-4 w-4" /> Подать заявку</Button>
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <TeamRoster teamMembers={teamMembers} captainId={team.captainId} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="matches" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>История матчей</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <TeamMatches />
                            </CardContent>
                        </Card>
                    </TabsContent>
                     <TabsContent value="challenges" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Вызовы</CardTitle>
                                <CardDescription>Управляйте вызовами или бросайте их другим командам.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <TeamChallenges teamId={team.id} />
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="feed" className="mt-6">
                       <TeamFeedTab posts={teamPosts} team={team} />
                    </TabsContent>
                     <TabsContent value="media" className="mt-6">
                        <TeamMediaTab team={team} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
