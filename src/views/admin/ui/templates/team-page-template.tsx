import { teams, users } from "@/mocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Crown, Swords, Trophy, UserPlus } from "lucide-react";
import Image from 'next/image';

const team = teams[0];
const teamMembers = users.filter(u => team.members.includes(u.id));
const captain = users.find(u => u.id === team.captainId);

export function TeamPageTemplate() {
    return (
        <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-muted/20">
             <header className="flex flex-col md:flex-row items-center gap-6">
                <Image src={team.logoUrl} alt={team.name} width={96} height={96} className="rounded-lg border-4 border-primary" data-ai-hint="team logo"/>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{team.name}</h1>
                    <p className="text-muted-foreground text-lg">Дисциплина: Дворовый футбол</p>
                </div>
                <div className="md:ml-auto flex gap-4">
                    <Button>
                       <Swords className="mr-2 h-4 w-4" /> Бросить вызов
                    </Button>
                     <Button variant="outline">
                       <UserPlus className="mr-2 h-4 w-4" /> Вступить в команду
                    </Button>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Побед / Поражений</CardTitle>
                        <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">45 / 12</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Место в лиге</CardTitle>
                         <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3-е</div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Рейтинг</CardTitle>
                         <Trophy className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1480 ELO</div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Состав команды ({teamMembers.length})</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {teamMembers.map(member => (
                            <div key={member.id} className="flex flex-col items-center text-center gap-2">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={member.avatarUrl} alt={member.nickname} />
                                    <AvatarFallback>{member.firstName.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{member.nickname}</p>
                                    <p className="text-xs text-muted-foreground">{member.firstName} {member.lastName}</p>
                                    {member.id === captain?.id && (
                                         <Badge variant="secondary" className="mt-1">
                                            <Crown className="h-3 w-3 mr-1" />
                                            Капитан
                                        </Badge>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Последние матчи</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2">
                        <li className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50">
                            <span>vs Короли Асфальта</span>
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Победа 5:3</Badge>
                        </li>
                        <li className="flex justify-between items-center p-2 rounded-md hover:bg-muted/50">
                            <span>vs Дрим-Тим</span>
                             <Badge variant="destructive">Поражение 1:2</Badge>
                        </li>
                    </ul>
                </CardContent>
            </Card>

        </div>
    )
}
