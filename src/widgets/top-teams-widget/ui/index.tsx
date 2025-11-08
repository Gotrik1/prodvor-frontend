
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { BarChart, ChevronsRight, Globe, MapPin } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Skeleton } from '@/shared/ui/skeleton';
import type { Team } from '@/mocks';
import { useToast } from '@/shared/hooks/use-toast';
import Image from 'next/image';
import { api } from '@/shared/api/axios-instance';

const TopTeamRow = ({ team, rank }: { team: Team, rank: number }) => (
    <Link href={`/teams/${team.id}`} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 group transition-colors">
        <span className="font-bold text-lg w-6 text-center text-muted-foreground">{rank}</span>
        <Image src={team.logoUrl || 'https://placehold.co/32x32.png'} alt={team.name} width={32} height={32} className="rounded-md object-cover aspect-square" data-ai-hint="team logo"/>
        <div className="flex-grow">
            <p className="font-semibold group-hover:text-primary transition-colors">{team.name}</p>
            <p className="text-xs text-muted-foreground">{team.sport?.name || team.game}</p>
        </div>
        <div className="font-mono text-sm font-semibold">{team.rank ?? 0} ELO</div>
    </Link>
);

const TopTeamsList = ({ title, teams, icon: Icon, isLoading }: { title: string, teams: Team[], icon: React.ElementType, isLoading: boolean }) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Icon className="h-5 w-5 text-primary"/>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-2">
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
                    </div>
                ) : teams.length > 0 ? (
                    <div className="space-y-2">
                        {teams.map((team, index) => (
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
    const { toast } = useToast();
    const [topCityTeams, setTopCityTeams] = useState<Team[]>([]);
    const [topCountryTeams, setTopCountryTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTopTeams = async () => {
            setIsLoading(true);
            try {
                const countryPromise = api.get('/api/v1/teams?sort_by=rank&order=desc&limit=5');
                
                let cityPromise;
                if (currentUser?.city) {
                    cityPromise = api.get(`/api/v1/teams?city=${encodeURIComponent(currentUser.city)}&sort_by=rank&order=desc&limit=5`);
                } else {
                    cityPromise = Promise.resolve({ data: [] });
                }

                const [countryResponse, cityResponse] = await Promise.all([countryPromise, cityPromise]);
                
                setTopCountryTeams(countryResponse.data as Team[]);
                setTopCityTeams(cityResponse.data as Team[]);

            } catch {
                 toast({
                    variant: "destructive",
                    title: "Ошибка загрузки",
                    description: "Не удалось получить список топ-команд.",
                });
            } finally {
                setIsLoading(false);
            }
        };
        fetchTopTeams();
    }, [toast, currentUser]);
    
    if (isLoading && topCityTeams.length === 0 && topCountryTeams.length === 0) {
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
                    isLoading={isLoading}
                />
                <TopTeamsList 
                    title="Топ России" 
                    teams={topCountryTeams}
                    icon={Globe}
                    isLoading={isLoading}
                />
            </div>
        </div>
    )
}
