

'use client';

import { useMemo, useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { teams as allTeams } from "@/mocks";
import { BarChart, ChevronsRight, Globe, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Skeleton } from '@/shared/ui/skeleton';

const TopTeamRow = ({ team, rank }: { team: typeof allTeams[0], rank: number }) => (
    <Link href={`/teams/${team.id}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 group transition-colors">
        <span className="font-bold text-lg w-6 text-center text-muted-foreground">{rank}</span>
        <Image src={team.logoUrl} alt={team.name} width={32} height={32} className="rounded-md" data-ai-hint="team logo" />
        <div className="flex-grow">
            <p className="font-semibold group-hover:text-primary transition-colors">{team.name}</p>
            <p className="text-xs text-muted-foreground">{team.game}</p>
        </div>
        <div className="font-mono text-sm font-semibold">{team.rank} ELO</div>
    </Link>
);

const TopTeamsList = ({ title, teams, icon: Icon }: { title: string, teams: typeof allTeams, icon: React.ElementType }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Icon className="h-5 w-5 text-primary"/>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {teams.length > 0 ? (
                    <div className="space-y-2">
                        {teams.slice(0, 5).map((team, index) => (
                            <TopTeamRow key={team.id} team={team} rank={index + 1} />
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-8">Команды в этой категории не найдены.</p>
                )}
            </CardContent>
        </Card>
    )
};


export function TopTeamsWidgetSkeleton() {
    return (
         <div>
            <div className="flex justify-between items-center mb-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-8 w-24" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                    <CardContent className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-2">
                                <Skeleton className="h-8 w-6" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                                <div className="flex-grow space-y-2">
                                    <Skeleton className="h-4 w-4/5" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                                <Skeleton className="h-4 w-12" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
                    <CardContent className="space-y-2">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className="flex items-center gap-3 p-2">
                                <Skeleton className="h-8 w-6" />
                                <Skeleton className="h-8 w-8 rounded-md" />
                                <div className="flex-grow space-y-2">
                                    <Skeleton className="h-4 w-4/5" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                                <Skeleton className="h-4 w-12" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export function TopTeamsWidget() {
    const { user: currentUser } = useUserStore();
    const [isClient, setIsClient] = useState(false);
    
    // This effect runs only on the client, after the initial render.
    useEffect(() => {
        setIsClient(true);
    }, []);

    const { topCityTeams, topCountryTeams } = useMemo(() => {
        const filteredTeams = allTeams.sort((a, b) => b.rank - a.rank);
        
        const topCountryTeams = filteredTeams;
        const topCityTeams = currentUser?.city ? topCountryTeams.filter(team => team.city === currentUser.city) : [];

        return { topCityTeams, topCountryTeams };
    }, [currentUser]);

    // On the server and during initial client render, show a skeleton.
    if (!isClient) {
        return <TopTeamsWidgetSkeleton />;
    }

    return (
        <div>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2"><BarChart /> Топ команд</h2>
                <Button variant="ghost" asChild>
                    <Link href="/competitions?tab=leagues">
                        Все лиги <ChevronsRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TopTeamsList 
                    title={currentUser?.city ? `Топ г. ${currentUser.city}` : "Топ вашего города"} 
                    teams={topCityTeams} 
                    icon={MapPin}
                />
                <TopTeamsList 
                    title="Топ России" 
                    teams={topCountryTeams}
                    icon={Globe}
                />
            </div>
        </div>
    )
}
