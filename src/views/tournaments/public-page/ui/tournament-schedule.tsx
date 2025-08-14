
'use client';

import { registeredTeams } from './mock-data';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Calendar, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { allTournaments } from './mock-data';
import type { Playground } from '@/mocks';
import Link from 'next/link';

interface Match {
    id: string;
    team1: (typeof registeredTeams)[0];
    team2: (typeof registeredTeams)[0];
    date: string;
    time: string;
    venue: Playground;
}

export function TournamentSchedule({ tournamentId }: { tournamentId: string }) {
    const [schedule, setSchedule] = useState<Match[]>([]);

    useEffect(() => {
        const tournament = allTournaments.find(t => t.id === tournamentId);
        if (!tournament) return;

        // Mock schedule generation
        const generateSchedule = () => {
            const matches: Match[] = [];
            const teamsCopy = [...registeredTeams]; 
            const venues = tournament.playgrounds;
            let date = new Date(tournament.startDate);

            for (let i = 0; i < teamsCopy.length; i += 2) {
                if (teamsCopy[i + 1]) {
                    date.setDate(date.getDate() + (i > 0 ? 1 : 0) );
                    matches.push({
                        id: `rd1-match${i/2}`,
                        team1: teamsCopy[i],
                        team2: teamsCopy[i + 1],
                        date: date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' }),
                        time: `${18 + Math.floor(i/4)}:00`,
                        venue: venues.length > 0 ? venues[i/2 % venues.length] : { id: 'unknown', name: "Площадка не назначена", address: '', type: 'Открытая площадка', surface: 'Асфальт', imageUrl: '', dataAiHint: '' }
                    });
                }
            }
            return matches;
        }
        setSchedule(generateSchedule());
    }, [tournamentId]);

    if (schedule.length === 0) {
        return null;
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Calendar /> Расписание и площадки</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {schedule.map(match => (
                        <Card key={match.id} className="bg-muted/50">
                            <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                                <div className="flex-1 flex items-center justify-between sm:justify-center gap-4">
                                     <div className="flex items-center gap-2 w-2/5">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src={match.team1.logoUrl} data-ai-hint="team logo" />
                                            <AvatarFallback>{match.team1.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium truncate">{match.team1.name}</span>
                                    </div>
                                    <span className="text-muted-foreground font-bold">VS</span>
                                    <div className="flex items-center gap-2 w-2/5 justify-end">
                                        <span className="font-medium truncate text-right">{match.team2.name}</span>
                                         <Avatar className="h-8 w-8">
                                            <AvatarImage src={match.team2.logoUrl} data-ai-hint="team logo" />
                                            <AvatarFallback>{match.team2.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                    </div>
                                </div>
                                <div className="flex-1 text-center border-y sm:border-y-0 sm:border-x py-2 sm:py-0 px-4">
                                    <p className="font-semibold">{match.date}, {match.time}</p>
                                    <Link href={`/playgrounds/${match.venue.id}`} className="text-xs text-muted-foreground flex items-center justify-center gap-1 hover:text-primary transition-colors">
                                        <MapPin className="h-3 w-3" /> 
                                        {match.venue.name}
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
