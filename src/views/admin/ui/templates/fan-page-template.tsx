import { users, teams, tournaments } from "@/mocks";
import type { User } from "@/mocks/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Bell, Calendar, Flame, Heart, Rss, Star, Ticket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";

const fanUser: User = users[3]; // 'Amazonka'
const favoriteTeams = teams.slice(0, 4);
const upcomingMatches = [
    { team1: teams[0], team2: teams[1], tournament: tournaments[0] },
    { team1: teams[2], team2: teams[3], tournament: tournaments[0] },
];

export function FanPageTemplate() {

    return (
        <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-muted/20">
            <header className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary">
                    <AvatarImage src={fanUser.avatarUrl} alt={fanUser.nickname} />
                    <AvatarFallback>{fanUser.nickname.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{fanUser.nickname}</h1>
                    <p className="text-muted-foreground text-lg">Роль: Болельщик</p>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                        <Badge variant="secondary">Уровень поддержки: Легенда</Badge>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Любимые команды</CardTitle>
                        <Heart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{favoriteTeams.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Просмотрено матчей</CardTitle>
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">78</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Стрик посещений</CardTitle>
                        <Flame className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12 дней</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Достижения</CardTitle>
                        <Star className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">15</div>
                    </CardContent>
                </Card>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <CreatePost />
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Rss className="h-5 w-5" />
                                Лента новостей
                            </CardTitle>
                            <CardDescription>
                                Последние события от команд и игроков, на которых вы подписаны.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-center text-muted-foreground py-8">
                                <p>Лента новостей в разработке.</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Heart className="h-5 w-5" />
                                Мои команды
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {favoriteTeams.map(team => (
                                <Link href={`/teams/${team.id}`} key={team.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors group">
                                    <div className="flex items-center gap-3">
                                        <Image src={team.logoUrl} alt={team.name} width={32} height={32} className="rounded-sm" data-ai-hint="team logo" />
                                        <span className="font-medium group-hover:text-primary">{team.name}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-50 group-hover:opacity-100">
                                        <Bell className="h-4 w-4"/>
                                    </Button>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>
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
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <Image src={match.team1.logoUrl} alt={match.team1.name} width={20} height={20} className="rounded-sm" data-ai-hint="team logo"/>
                                            {match.team1.name}
                                        </div>
                                         <span className="text-xs font-bold text-primary">VS</span>
                                         <div className="flex items-center gap-2 text-sm font-medium">
                                            {match.team2.name}
                                            <Image src={match.team2.logoUrl} alt={match.team2.name} width={20} height={20} className="rounded-sm" data-ai-hint="team logo"/>
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
