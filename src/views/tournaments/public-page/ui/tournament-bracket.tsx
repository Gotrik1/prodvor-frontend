
'use client';

import { registeredTeams } from './mock-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Trophy } from 'lucide-react';

// Pair teams for the first round
const matches = [];
const teamsCopy = [...registeredTeams];
for (let i = 0; i < teamsCopy.length; i += 2) {
    if (teamsCopy[i + 1]) {
        matches.push({
            team1: teamsCopy[i],
            team2: teamsCopy[i + 1],
            score1: Math.floor(Math.random() * 5),
            score2: Math.floor(Math.random() * 5)
        });
    }
}
matches.forEach(match => {
    while(match.score1 === match.score2) {
        match.score2 = Math.floor(Math.random() * 5);
    }
})

export function TournamentBracket() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Ход турнира</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground">1-й Раунд</h3>
                    <div className="space-y-4 max-w-3xl mx-auto">
                        {matches.map((match, index) => {
                            const winner = match.score1 > match.score2 ? 'team1' : 'team2';
                            return (
                                <Card key={index} className="bg-muted/50 overflow-hidden">
                                    <CardContent className="flex items-center justify-between p-4">
                                        {/* Team 1 */}
                                        <div className={`flex items-center gap-3 w-2/5 transition-opacity ${winner !== 'team1' && 'opacity-50'}`}>
                                            <Avatar>
                                                <AvatarImage src={match.team1.logoUrl} alt={match.team1.name} />
                                                <AvatarFallback>{match.team1.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium truncate">{match.team1.name}</span>
                                        </div>

                                        {/* Score */}
                                        <div className="flex items-center gap-3">
                                            <span className={`text-2xl font-bold ${winner === 'team1' ? 'text-primary' : ''}`}>{match.score1}</span>
                                            <span className="text-sm text-muted-foreground">VS</span>
                                            <span className={`text-2xl font-bold ${winner === 'team2' ? 'text-primary' : ''}`}>{match.score2}</span>
                                        </div>

                                        {/* Team 2 */}
                                        <div className={`flex items-center gap-3 w-2/5 justify-end transition-opacity ${winner !== 'team2' && 'opacity-50'}`}>
                                            <span className="font-medium truncate text-right">{match.team2.name}</span>
                                            <Avatar>
                                                <AvatarImage src={match.team2.logoUrl} alt={match.team2.name} />
                                                <AvatarFallback>{match.team2.name.slice(0, 2)}</AvatarFallback>
                                            </Avatar>
                                        </div>
                                    </CardContent>
                                    {winner && (
                                        <div className="bg-card/50 px-4 py-1 text-xs text-center text-muted-foreground flex items-center justify-center gap-2">
                                           <Trophy className="w-3 h-3 text-amber-400" />
                                           Победитель: <span className="font-bold text-foreground">{winner === 'team1' ? match.team1.name : match.team2.name}</span>
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
