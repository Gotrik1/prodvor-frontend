
'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { GanttChartIcon, Save } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import React, { useState, useEffect } from "react";
import type { Team, BracketMatch } from '@/views/tournaments/public-page/ui/mock-data';
import { useProtocol } from "@/widgets/protocol-editor/lib/use-protocol";
import { useTournamentCrmContext } from "../../lib/TournamentCrmContext";
import { updateRatings } from "@/shared/lib/rating";
import { GameplayEvent, awardProgressPoints } from "@/shared/lib/gamification";

export function BracketTab() {
    const { confirmedTeams, generatedBracket } = useTournamentCrmContext();
    const { setActiveMatch, activeMatch } = useProtocol();
    const [rounds, setRounds] = useState<BracketMatch[][]>(generatedBracket);
    const [scores, setScores] = useState<Record<string, { score1: string, score2: string }>>({});
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setRounds(generatedBracket);
    }, [generatedBracket]);


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
                ...(prev[matchId] || { score1: '', score2: '' }),
                [team === 'team1' ? 'score1' : 'score2']: value,
            }
        }));
    };

    const handleSaveResult = (roundIndex: number, matchIndex: number) => {
        const match = rounds[roundIndex][matchIndex];
        const matchScores = scores[match.id] || { score1: '0', score2: '0' };
        
        const score1 = parseInt(matchScores.score1, 10);
        const score2 = parseInt(matchScores.score2, 10);
        
        if (isNaN(score1) || isNaN(score2)) return;

        // --- ELO Calculation Step & Gamification---
        if (match.team1 && match.team2) {
            const scoreA: 1 | 0.5 | 0 = score1 > score2 ? 1 : score1 < score2 ? 0 : 0.5;
            const { newRatingA, newRatingB } = updateRatings(match.team1.rank, match.team2.rank, scoreA);
            
            console.log(`[ELO Update] Match: ${match.team1.name} vs ${match.team2.name}`);
            console.log(`[ELO Update] ${match.team1.name}: ${match.team1.rank} -> ${newRatingA}`);
            console.log(`[ELO Update] ${match.team2.name}: ${match.team2.rank} -> ${newRatingB}`);
            
            // Award points for participation
            const allParticipants = [...match.team1.members, ...match.team2.members];
            allParticipants.forEach(memberId => {
                 awardProgressPoints(GameplayEvent.MATCH_PARTICIPATION, { userId: memberId, teamId: match.team1?.members.includes(memberId) ? match.team1.id : match.team2?.id, entityId: match.id });
            });
            
            // Award points for winning
            const winner = score1 > score2 ? match.team1 : (score2 > score1 ? match.team2 : null);
            if (winner) {
                winner.members.forEach(memberId => {
                    awardProgressPoints(GameplayEvent.MATCH_WIN, { userId: memberId, teamId: winner.id, entityId: match.id });
                });
            }
        }
        // --- End ELO & Gamification ---

        const newRounds = JSON.parse(JSON.stringify(rounds)); // Deep copy
        const updatedMatch = {
            ...newRounds[roundIndex][matchIndex],
            score1: score1,
            score2: score2,
        };
        newRounds[roundIndex][matchIndex] = updatedMatch;
        
        if (activeMatch?.id === updatedMatch.id) {
            setActiveMatch(updatedMatch);
        }

        const currentRoundFinished = newRounds[roundIndex].every((m: BracketMatch) => m.score1 !== null && m.score2 !== null);
        
        if (currentRoundFinished) {
            const winners: (Team | null)[] = newRounds[roundIndex]
                .map((m: BracketMatch) => {
                    if (m.score1 === null || m.score2 === null) return null;
                    return m.score1 > m.score2 ? m.team1 : m.team2
                });

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
                
                if (newRounds.length === roundIndex + 1) {
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
        if (teamsInRound <= 1) return "Чемпион";
        if (teamsInRound === 2) return "Финал";
        if (teamsInRound === 4) return "Полуфинал";
        if (teamsInRound === 8) return "Четвертьфинал";
        return `1/${teamsInRound / 2} финала`;
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle>Турнирная сетка</CardTitle>
                <CardDescription>Сгенерируйте сетку и вводите результаты матчей для автоматического обновления. Нажмите на матч для ведения протокола.</CardDescription>
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
                                    <Card key={match.id} className={`bg-muted/50 transition-all ${activeMatch?.id === match.id ? 'border-primary' : 'hover:border-primary/50'}`}>
                                        <div className="cursor-pointer" onClick={() => setActiveMatch(match)}>
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

                                                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                                                    <Input type="number" className="w-12 h-8 text-center" value={scores[match.id]?.score1 ?? match.score1 ?? ''} onChange={(e) => handleScoreChange(match.id, 'team1', e.target.value)} disabled={isFinished} />
                                                    <span className="text-muted-foreground font-bold">VS</span>
                                                    <Input type="number" className="w-12 h-8 text-center" value={scores[match.id]?.score2 ?? match.score2 ?? ''} onChange={(e) => handleScoreChange(match.id, 'team2', e.target.value)} disabled={isFinished} />
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
                                        </div>
                                        {!isFinished && match.team1 && match.team2 && (
                                            <div className="px-4 pb-2 text-center">
                                                <Button size="sm" variant="secondary" onClick={(e) => {e.stopPropagation(); handleSaveResult(roundIndex, matchIndex)}}>
                                                    <Save className="mr-2 h-4 w-4"/>Сохранить результат
                                                </Button>
                                            </div>
                                        )}
                                    </Card>
                                )})}
                            </div>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}
