
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { registeredTeams, users } from '@/views/tournaments/public-page/ui/mock-data';
import Image from "next/image";
import { MatchTimeline, matchEvents } from "./match-timeline";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Crown } from "lucide-react";
import Link from "next/link";

const team1 = registeredTeams[0];
const team2 = registeredTeams[1];
const team1Members = users.filter(u => team1.members.includes(u.id));
const team2Members = users.filter(u => team2.members.includes(u.id));


export function MatchProtocol({ tournament, matchId }: { tournament: any, matchId: string }) {

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href={`/teams/${team1.id}`} className="flex items-center gap-4 group">
                        <Image src={team1.logoUrl} alt={team1.name} width={64} height={64} className="rounded-lg group-hover:scale-105 transition-transform" data-ai-hint="team logo" />
                        <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{team1.name}</h2>
                    </Link>
                    <div className="text-center">
                        <p className="text-4xl font-black tracking-tighter">5 - 3</p>
                        <p className="text-sm text-muted-foreground">Финальный счет</p>
                    </div>
                     <Link href={`/teams/${team2.id}`} className="flex items-center gap-4 group">
                        <h2 className="text-2xl font-bold text-right group-hover:text-primary transition-colors">{team2.name}</h2>
                        <Image src={team2.logoUrl} alt={team2.name} width={64} height={64} className="rounded-lg group-hover:scale-105 transition-transform" data-ai-hint="team logo" />
                    </Link>
                </div>
                 <CardDescription className="text-center pt-4">
                    {tournament.name} | Финал | {new Date(tournament.startDate).toLocaleDateString('ru-RU')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="protocol">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="protocol">Протокол</TabsTrigger>
                        <TabsTrigger value="online">Онлайн</TabsTrigger>
                        <TabsTrigger value="photo">Фото</TabsTrigger>
                        <TabsTrigger value="history">История</TabsTrigger>
                    </TabsList>
                    <TabsContent value="protocol" className="mt-6">
                        <MatchTimeline events={matchEvents} />
                        <div className="mt-12">
                            <h3 className="text-xl font-bold text-center mb-6">Составы команд</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                               <ul className="space-y-3">
                                   {team1Members.map(player => (
                                       <li key={player.id} className="flex items-center gap-3">
                                           <Avatar className="h-8 w-8">
                                               <AvatarImage src={player.avatarUrl} />
                                               <AvatarFallback>{player.nickname.charAt(0)}</AvatarFallback>
                                           </Avatar>
                                           <span className="font-medium">{player.nickname}</span>
                                           {player.id === team1.captainId && <Crown className="h-4 w-4 text-amber-400" />}
                                       </li>
                                   ))}
                               </ul>
                               <ul className="space-y-3">
                                    {team2Members.map(player => (
                                       <li key={player.id} className="flex items-center gap-3 justify-end md:justify-start">
                                           <Avatar className="h-8 w-8">
                                               <AvatarImage src={player.avatarUrl} />
                                               <AvatarFallback>{player.nickname.charAt(0)}</AvatarFallback>
                                           </Avatar>
                                           <span className="font-medium">{player.nickname}</span>
                                           {player.id === team2.captainId && <Crown className="h-4 w-4 text-amber-400" />}
                                       </li>
                                   ))}
                               </ul>
                            </div>
                        </div>
                    </TabsContent>
                    {/* Other tabs can be implemented here */}
                </Tabs>
            </CardContent>
        </Card>
    );
}
