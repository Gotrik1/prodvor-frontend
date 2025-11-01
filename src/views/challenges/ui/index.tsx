
'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Check, X, Send, Swords, Sparkles } from "lucide-react";
import Image from "next/image"; 
import { challenges, TeamChallenge } from '@/mocks/challenges';
import { teams, allSports } from '@/mocks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Separator } from "@/shared/ui/separator";
import { Slider } from '@/shared/ui/slider';
import Link from 'next/link';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import type { Sport } from '@/mocks';

const ChallengeCard = ({ challenge, type }: { challenge: TeamChallenge, type: 'incoming' | 'outgoing' }) => {
    const opponent = type === 'incoming' ? challenge.challenger : challenge.challenged;
    return (
        <Card className="bg-muted/50">
            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Image src={opponent.logoUrl || 'https://placehold.co/512x512.png'} alt={opponent.name} width={48} height={48} className="rounded-md border" data-ai-hint={opponent.dataAiHint} />
                    <div>
                        <p className="font-semibold">{opponent.name}</p>
                        <p className="text-xs text-muted-foreground">{challenge.discipline}</p>
                    </div>
                </div>
                <div className="text-center">
                     <p className="text-xs text-muted-foreground">Дата</p>
                     <p className="font-mono text-sm">{challenge.date}</p>
                </div>
                <div className="flex items-center gap-2">
                    {type === 'incoming' ? (
                        <>
                            <Button size="sm" variant="secondary" className="bg-green-500/10 hover:bg-green-500/20 text-green-300 border-green-500/20">
                                <Check className="mr-2 h-4 w-4" /> Принять
                            </Button>
                            <Button size="sm" variant="destructive" className="bg-red-500/10 hover:bg-red-500/20 text-red-300 border-red-500/20">
                                <X className="mr-2 h-4 w-4" /> Отклонить
                            </Button>
                        </>
                    ) : (
                        <p className="text-sm text-amber-400">Ожидает ответа</p>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}

const RecommendedOpponentCard = ({ team }: { team: typeof teams[0] }) => (
    <Card className="bg-background/50">
        <CardContent className="p-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
                 <Image src={team.logoUrl || 'https://placehold.co/512x512.png'} alt={team.name} width={40} height={40} className="rounded-md" data-ai-hint={team.dataAiHint} />
                 <div>
                    <Link href={`/teams/${team.id}`} className="font-semibold hover:text-primary transition-colors">{team.name}</Link>
                    <p className="text-xs text-muted-foreground">ELO: {team.rank}</p>
                 </div>
            </div>
            <Button size="sm" variant="outline"><Swords className="mr-2 h-4 w-4" />Вызвать</Button>
        </CardContent>
    </Card>
)

export function ChallengesPage() {
    const { user: currentUser } = useUserStore();
    const teamSports = allSports.filter((s: Sport) => s.isTeamSport);

    // Find the first team the user is a captain of
    const myTeam = useMemo(() => teams.find(t => t.captainId === currentUser?.id), [currentUser]);

    const incomingChallenges = useMemo(() => {
        if (!myTeam) return [];
        return challenges.filter(c => c.challenged.id === myTeam.id && c.status === 'pending');
    }, [myTeam]);
    
    // --- Matchmaking Logic ---
    const [eloRange, setEloRange] = useState([-250, 250]);
    const [disciplineFilter, setDisciplineFilter] = useState(myTeam?.game || (teamSports.length > 0 ? teamSports[0].name : ''));

    const recommendedOpponents = useMemo(() => {
        if (!myTeam) return [];
        return teams.filter(team => {
            if (team.id === myTeam.id) return false; // Exclude self
            if (team.game !== disciplineFilter) return false; // Match discipline
            const eloDiff = team.rank - myTeam.rank;
            return eloDiff >= eloRange[0] && eloDiff <= eloRange[1];
        }).sort((a,b) => Math.abs(a.rank - myTeam.rank) - Math.abs(b.rank - myTeam.rank)) // Sort by closest ELO
        .slice(0, 5); // Limit to 5 recommendations
    }, [myTeam, eloRange, disciplineFilter]);

    if (!myTeam) {
        return (
            <Card className="text-center">
                <CardHeader>
                    <CardTitle>Функция для капитанов</CardTitle>
                    <CardDescription>
                        Для управления вызовами вы должны быть капитаном команды.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/teams/create">Создать команду</Link>
                    </Button>
                </CardContent>
            </Card>
        );
    }


    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                 <Card>
                    <CardHeader>
                        <CardTitle>Быстрый вызов</CardTitle>
                        <CardDescription>Бросьте вызов конкретной команде на один матч.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                            <div className="space-y-2 md:col-span-2">
                                <Label htmlFor="opponent">Команда-соперник</Label>
                                <Select>
                                    <SelectTrigger id="opponent">
                                        <SelectValue placeholder="Выберите команду..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {teams.filter(t => t.id !== myTeam.id && t.game === myTeam.game).map(team => (
                                            <SelectItem key={team.id} value={team.id}>
                                                <div className="flex items-center gap-2">
                                                    <Image src={team.logoUrl || 'https://placehold.co/512x512.png'} alt={team.name} width={20} height={20} className="rounded-sm" data-ai-hint={team.dataAiHint}/>
                                                    {team.name}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Дата и время</Label>
                                <Input id="date" type="datetime-local" />
                            </div>
                            <Button className="w-full">
                                <Send className="mr-2 h-4 w-4" /> Отправить
                            </Button>
                        </form>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Sparkles className="text-primary"/>AI-Матчмейкинг</CardTitle>
                        <CardDescription>Подбор команд с близким вам рейтингом ({myTeam.rank} ELO).</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                             <div className="space-y-2">
                                <Label>Дисциплина</Label>
                                <Select value={disciplineFilter} onValueChange={setDisciplineFilter}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        {teamSports.map(sport => <SelectItem key={sport.id} value={sport.name}>{sport.name}</SelectItem>)}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Разница ELO: {eloRange[0]} / +{eloRange[1]}</Label>
                                <Slider value={eloRange} onValueChange={setEloRange} min={-500} max={500} step={50} />
                            </div>
                        </div>
                        <div className="space-y-2">
                             {recommendedOpponents.length > 0 ? (
                                recommendedOpponents.map(team => <RecommendedOpponentCard key={team.id} team={team} />)
                            ) : (
                                <p className="text-sm text-muted-foreground text-center pt-4">Подходящих соперников не найдено. Попробуйте расширить фильтры.</p>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Separator />
            
            <section>
                <h3 className="text-xl font-semibold mb-4">Входящие вызовы ({incomingChallenges.length})</h3>
                <div className="space-y-4">
                    {incomingChallenges.length > 0 ? (
                        incomingChallenges.map(challenge => (
                            <ChallengeCard key={challenge.id} challenge={challenge} type="incoming" />
                        ))
                    ) : (
                        <p className="text-muted-foreground">У вас нет активных вызовов.</p>
                    )}
                </div>
            </section>
        </div>
    );
}
