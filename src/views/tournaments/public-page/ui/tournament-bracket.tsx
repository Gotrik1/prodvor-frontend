
'use client';

import { registeredTeams } from './mock-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Match {
    id: string;
    team1: (typeof registeredTeams)[0];
    team2: (typeof registeredTeams)[0];
    score1: number;
    score2: number;
}

export function TournamentBracket({ tournamentId }: { tournamentId: string }) {
    const [matches, setMatches] = useState<Match[]>([]);

    useEffect(() => {
        // This logic runs on the client to avoid hydration mismatch
        // Simple pseudo-random generator to ensure same results on client renders
        const createSeededRandom = (seed: number) => () => {
          let t = seed += 0x6D2B79F5;
          t = Math.imul(t ^ t >>> 15, t | 1);
          t ^= t + Math.imul(t ^ t >>> 7, t | 61);
          return ((t ^ t >>> 14) >>> 0) / 4294967296;
        };

        const generatedMatches: Match[] = [];
        const teamsCopy = [...registeredTeams].sort(() => 0.5 - Math.random()); // Shuffle teams

        for (let i = 0; i < teamsCopy.length; i += 2) {
            if (teamsCopy[i + 1]) {
                const seededRandom = createSeededRandom(i); // Use loop index as seed
                const match: Match = {
                    id: `rd1-match${i / 2}`,
                    team1: teamsCopy[i],
                    team2: teamsCopy[i + 1],
                    score1: Math.floor(seededRandom() * 5),
                    score2: Math.floor(seededRandom() * 5)
                };
                // Ensure scores are not equal to have a clear winner
                if (match.score1 === match.score2) {
                    match.score2 = (match.score2 + 1) % 5;
                }
                generatedMatches.push(match);
            }
        }
        setMatches(generatedMatches);
    }, []);
    
    if (matches.length === 0) {
        return (
             <Card>
                <CardHeader>
                    <CardTitle>Ход турнира</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="text-center p-8 text-muted-foreground">
                        Генерация сетки...
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Ход турнира</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground">1-й Раунд</h3>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {matches.map((match) => {
                            const winner = match.score1 > match.score2 ? 'team1' : 'team2';
                            const winnerTeam = winner === 'team1' ? match.team1 : match.team2;
                            return (
                                <Card key={match.id} className="bg-muted/50 overflow-hidden">
                                    <Link href={`/tournaments/${tournamentId}/match/${match.id}`} className="block hover:bg-muted transition-colors">
                                        <CardContent className="flex items-center justify-between p-4">
                                            {/* Team 1 */}
                                            <div className={`flex items-center gap-3 w-2/5 transition-opacity ${winner !== 'team1' && 'opacity-50'}`}>
                                                <div className="flex items-center gap-3 group">
                                                    <Avatar className="group-hover:scale-110 transition-transform">
                                                        <AvatarImage src={match.team1.logoUrl} alt={match.team1.name} />
                                                        <AvatarFallback>{match.team1.name.slice(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                    <span className="font-medium truncate group-hover:text-primary transition-colors">{match.team1.name}</span>
                                                </div>
                                            </div>

                                            {/* Score */}
                                            <div className="flex items-center gap-3">
                                                <span className={`text-2xl font-bold ${winner === 'team1' ? 'text-primary' : ''}`}>{match.score1}</span>
                                                <span className="text-sm text-muted-foreground">VS</span>
                                                <span className={`text-2xl font-bold ${winner === 'team2' ? 'text-primary' : ''}`}>{match.score2}</span>
                                            </div>

                                            {/* Team 2 */}
                                            <div className={`flex items-center gap-3 w-2/5 justify-end transition-opacity ${winner !== 'team2' && 'opacity-50'}`}>
                                                <div className="flex items-center gap-3 group">
                                                    <span className="font-medium truncate text-right group-hover:text-primary transition-colors">{match.team2.name}</span>
                                                    <Avatar className="group-hover:scale-110 transition-transform">
                                                        <AvatarImage src={match.team2.logoUrl} alt={match.team2.name} />
                                                        <AvatarFallback>{match.team2.name.slice(0, 2)}</AvatarFallback>
                                                    </Avatar>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Link>
                                    {winner && (
                                        <div className="bg-card/50 px-4 py-1 text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                                        <Trophy className="w-3 h-3 text-amber-400" />
                                        Победитель: 
                                        <span className="font-bold text-foreground">
                                            {winnerTeam.name}
                                        </span>
                                        </div>
                                    )}
                                </Card>
                            )
                        })}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
