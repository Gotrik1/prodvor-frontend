'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { GanttChartIcon, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import React, { useState } from "react";
import { Team, BracketMatch } from '@/views/tournaments/public-page/ui/mock-data';
import Link from "next/link";

export function BracketTab({ confirmedTeams }: { confirmedTeams: Team[] }) {
    const [rounds, setRounds] = useState<BracketMatch[][]>([]);
    const [scores, setScores] = useState<Record<string, { score1: string, score2: string }>>({});
    const [error, setError] = useState<string | null>(null);

    const handleGenerateBracket = () => {
        setError(null);
        if (confirmedTeams.length < 2) {
            setError("Недостаточно подтвержденных команд для генерации сетки.");
            return;
        }
        if (confirmedTeams.length % 2 !== 0) {
            setError("Нечетное количество команд. Пожалуйста, подтвердите или отклоните заявки, чтобы получить четное число участников.");
            return;
        }
        
        const firstRoundMatches: BracketMatch[] = [];
        const shuffledTeams = [...confirmedTeams].sort(() => Math.random() - 0.5);

        for (let i = 0; i < shuffledTeams.length; i += 2) {
            firstRoundMatches.push({
                id: `rd1-match${i / 2}`,
                team1: shuffledTeams[i],
                team2: shuffledTeams[i + 1],
                score1: null,
                score2: null,
            });
        }
        setRounds([firstRoundMatches]);
        setScores({});
    };

    const handleScoreChange = (matchId: string, team: 'team1' | 'team2', value: string) => {
        setScores(prev => ({
            ...prev,
            [matchId]: {
                ...prev[matchId],
                [team === 'team1' ? 'score1' : 'score2']: value,
            }
        }));
    };

    const handleSaveResult = (roundIndex: number, matchIndex: number) => {
        const matchId = rounds[roundIndex][matchIndex].id;
        const matchScores = scores[matchId] || { score1: '0', score2: '0' };
        
        const score1 = parseInt(matchScores.score1, 10);
        const score2 = parseInt(matchScores.score2, 10);
        
        if (isNaN(score1) || isNaN(score2)) return;

        const newRounds = [...rounds];
        newRounds[roundIndex][matchIndex] = {
            ...newRounds[roundIndex][matchIndex],
            score1: score1,
            score2: score2,
        };
        
        const currentRoundFinished = newRounds[roundIndex].every(m => m.score1 !== null && m.score2 !== null);
        
        if (currentRoundFinished) {
            const winners: Team[] = newRounds[roundIndex]
                .map(m => m.score1! > m.score2! ? m.team1 : m.team2)
                .filter((t): t is Team => t !== null);

            if (winners.length >= 2) {
                const nextRoundMatches: BracketMatch[] = [];
                for (let i = 0; i < winners.length; i += 2) {
                    if (winners[i + 1]) {
                        nextRoundMatches.push({
                            id: `rd${roundIndex + 2}-match${i / 2}`,
                            team1: winners[i],
                            team2: winners[i + 1],
                            score1: null,
                            score2: null,
                        });
                    }
                }
                
                if (rounds.length === roundIndex + 1) {
                    newRounds.push(nextRoundMatches);
                } else {
                     newRounds[roundIndex + 1] = nextRoundMatches;
                }
            }
        }

        setRounds(newRounds);
    };

    const getRoundTitle = (index: number) => {
        const totalTeams = rounds.length > 0 ? rounds[0].length * 2 : 0;
        if (totalTeams === 0) return "Сетка";
        const teamsInRound = totalTeams / Math.pow(2, index);
        if (teamsInRound === 2) return "Финал";
        if (teamsInRound === 4) return "Полуфинал";
        if (teamsInRound === 8) return "Четвертьфинал";
        return `1/${teamsInRound / 2} финала`;
    };
    
    // Hardcoded tournament ID for example
    const tournamentId = 'mytourney1';

    return (
        <Card>
            <CardHeader>
                <CardTitle>Турнирная сетка</CardTitle>
                <CardDescription>Сгенерируйте сетку и вводите результаты матчей для автоматического обновления.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
                {rounds.length === 0 ? (
                    <div className="text-center py-10">
                        <p className="text-muted-foreground mb-4">Сетка еще не сгенерирована.</p>
                        <Button onClick={handleGenerateBracket}>
                            <GanttChartIcon className="mr-2 h-4 w-4" />
                            Сгенерировать сетку
                        </Button>
                        {error && (
                            <p className="text-red-500 text-sm mt-4">{error}</p>
                        )}
                    </div>
                ) : (
                    rounds.map((round, roundIndex) => (
                        <div key={roundIndex}>
                            <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground">{getRoundTitle(roundIndex)}</h3>
                            <div className="space-y-4 max-w-2xl mx-auto">
                                {round.map((match, matchIndex) => {
                                    const isFinished = match.score1 !== null && match.score2 !== null;
                                    const winner = isFinished ? (match.score1! > match.score2! ? 'team1' : 'team2') : null;
                                    return (
                                    <Link href={`/tournaments/${tournamentId}/match/${match.id}`} key={match.id} className="block">
                                        <Card className="bg-muted/50 hover:border-primary/50 transition-colors">
                                            <CardContent className="flex items-center justify-between p-4">
                                                <div className={`flex items-center gap-3 w-2/5 transition-opacity ${winner && winner !== 'team1' && 'opacity-50'}`}>
                                                    {match.team1 ? (
                                                        <>
                                                        <Avatar>
                                                            <AvatarImage src={match.team1.logoUrl} alt={match.team1.name} />
                                                            <AvatarFallback>{match.team1.name.slice(0, 2)}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium truncate">{match.team1.name}</span>
                                                        </>
                                                    ) : <span className="text-sm text-muted-foreground">Ожидает...</span>}
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <Input type="number" className="w-12 h-8 text-center" value={scores[match.id]?.score1 ?? ''} onChange={(e) => {e.preventDefault(); handleScoreChange(match.id, 'team1', e.target.value)}} disabled={isFinished} />
                                                    <span className="text-muted-foreground font-bold">VS</span>
                                                    <Input type="number" className="w-12 h-8 text-center" value={scores[match.id]?.score2 ?? ''} onChange={(e) => {e.preventDefault(); handleScoreChange(match.id, 'team2', e.target.value)}} disabled={isFinished} />
                                                </div>

                                                <div className={`flex items-center gap-3 w-2/5 justify-end transition-opacity ${winner && winner !== 'team2' && 'opacity-50'}`}>
                                                    {match.team2 ? (
                                                        <>
                                                        <span className="font-medium truncate text-right">{match.team2.name}</span>
                                                        <Avatar>
                                                            <AvatarImage src={match.team2.logoUrl} alt={match.team2.name} />
                                                            <AvatarFallback>{match.team2.name.slice(0, 2)}</AvatarFallback>
                                                        </Avatar>
                                                        </>
                                                    ) : <span className="text-sm text-muted-foreground">Ожидает...</span>}
                                                </div>
                                            </CardContent>
                                            {!isFinished && match.team1 && match.team2 && (
                                                <div className="px-4 pb-2 text-center">
                                                    <Button size="sm" variant="secondary" onClick={(e) => {e.preventDefault(); handleSaveResult(roundIndex, matchIndex)}}>
                                                        <Save className="mr-2 h-4 w-4"/>Сохранить результат
                                                    </Button>
                                                </div>
                                            )}
                                        </Card>
                                    </Link>
                                )})}
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
