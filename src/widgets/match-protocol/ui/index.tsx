
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { users } from '@/mocks';
import Image from "next/image";
import { MatchTimeline } from "./match-timeline";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Crown } from "lucide-react";
import Link from "next/link";
import { useProtocol } from "@/widgets/protocol-editor/lib/use-protocol";
import type { BracketMatch, Tournament } from "@/views/tournaments/public-page/ui/mock-data";

export function MatchProtocol({ tournament, match }: { tournament: Tournament, match: BracketMatch }) {
    const { events } = useProtocol();
    
    const { team1, team2, score1, score2 } = match;

    if (!team1 || !team2) {
        // This case should ideally not happen if a match is active
        return <p>Команды не определены.</p>;
    }

    const team1Members = users.filter(u => team1.members.includes(u.id));
    const team2Members = users.filter(u => team2.members.includes(u.id));


    return (
        <Card className="border-none shadow-none">
            <CardHeader>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <Link href={`/teams/${team1.id}`} className="flex items-center gap-4 group">
                        <Image src={team1.logoUrl} alt={team1.name} width={64} height={64} className="rounded-lg group-hover:scale-105 transition-transform" data-ai-hint="team logo" />
                        <h2 className="text-2xl font-bold group-hover:text-primary transition-colors">{team1.name}</h2>
                    </Link>
                    <div className="text-center">
                        <p className="text-4xl font-black tracking-tighter">{score1 ?? 0} - {score2 ?? 0}</p>
                        <p className="text-sm text-muted-foreground">Текущий счет</p>
                    </div>
                     <Link href={`/teams/${team2.id}`} className="flex items-center gap-4 group">
                        <h2 className="text-2xl font-bold text-right group-hover:text-primary transition-colors">{team2.name}</h2>
                        <Image src={team2.logoUrl} alt={team2.name} width={64} height={64} className="rounded-lg group-hover:scale-105 transition-transform" data-ai-hint="team logo" />
                    </Link>
                </div>
                 <CardDescription className="text-center pt-4">
                    {tournament.name} | {new Date(tournament.startDate).toLocaleDateString('ru-RU')}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="protocol">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="protocol">Протокол</TabsTrigger>
                        <TabsTrigger value="lineups">Составы</TabsTrigger>
                    </TabsList>
                    <TabsContent value="protocol" className="mt-6">
                        <MatchTimeline events={events} />
                    </TabsContent>
                    <TabsContent value="lineups" className="mt-6">
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
                                       <li key={player.id} className="flex items-center gap-3 justify-start md:justify-end">
                                            {player.id === team2.captainId && <Crown className="h-4 w-4 text-amber-400 order-last md:order-first" />}
                                           <span className="font-medium order-last md:order-first">{player.nickname}</span>
                                           <Avatar className="h-8 w-8 order-first md:order-last">
                                               <AvatarImage src={player.avatarUrl} />
                                               <AvatarFallback>{player.nickname.charAt(0)}</AvatarFallback>
                                           </Avatar>
                                       </li>
                                   ))}
                               </ul>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
}
