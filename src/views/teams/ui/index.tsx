
'use client';

import { useState, useEffect, useMemo } from 'react';
import { type Team } from '@/mocks';
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { PlusCircle, UserCheck, Users, BarChart } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { useToast } from '@/shared/hooks/use-toast';
import { Skeleton } from '@/shared/ui/skeleton';
import { TopTeamsWidget } from '@/widgets/top-teams-widget';
import api from '@/shared/api/axios-instance';
import { MyTeamWidget } from '@/widgets/my-team-widget';

const TeamCard = ({ team, onApply, isApplicationSent }: { team: Team, onApply: (teamId: string) => Promise<void>, isApplicationSent: boolean }) => {
    return (
    <Card key={team.id} className="flex flex-col">
        <CardHeader>
            <Link href={`/teams/${team.id}`} className="flex items-center gap-4 group">
                <img src={team.logoUrl || 'https://placehold.co/512x512.png'} alt={`${team.name} logo`} width={64} height={64} className="rounded-lg border object-cover aspect-square" />
                <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{team.name}</CardTitle>
                    <CardDescription>{team.sport?.name || team.game}</CardDescription>
                </div>
            </Link>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{ (team.members?.length || 0)} игроков</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart className="h-4 w-4" />
                <span>{team.rank || 1200} ELO</span>
            </div>
            <div>
                <Badge variant="secondary">Ищет игроков</Badge>
            </div>
        </CardContent>
        <CardFooter>
            <Button className="w-full" onClick={() => onApply(String(team.id))} disabled={isApplicationSent}>
                <UserCheck className="mr-2 h-4 w-4" /> 
                {isApplicationSent ? 'Заявка отправлена' : 'Подать заявку'}
            </Button>
        </CardFooter>
    </Card>
    )
};


export function TeamsPage() {
    const { user: currentUser } = useUserStore();
    const [allTeams, setAllTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sentApplications, setSentApplications] = useState<string[]>([]);
    const { toast } = useToast();

    const handleApply = async (teamId: string) => {
        if (!currentUser) {
             toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: 'Для подачи заявки необходимо авторизоваться.',
            });
            return;
        }
        
        try {
            await api.post(`/api/v1/teams/${teamId}/apply`, {});
            toast({
                title: "Заявка отправлена!",
                description: `Ваша заявка в команду отправлена на рассмотрение капитану.`,
            });
            setSentApplications(prev => [...prev, teamId]);
        } catch (error: any) {
             toast({
                variant: 'destructive',
                title: 'Ошибка',
                description: error.response?.data?.message || 'Не удалось отправить заявку.',
            });
        }
    };


    useEffect(() => {
        async function fetchTeams() {
            setIsLoading(true);
            try {
                const response = await api.get('/api/v1/teams');
                setAllTeams(response.data);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchTeams();
    }, []);

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Команды</h1>
                    <p className="text-muted-foreground mt-1">Найдите команду, присоединитесь к ней или создайте свою.</p>
                </div>
                 <div className="flex items-center gap-2">
                    <Button asChild size="lg">
                        <Link href="/teams/create">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Создать свою команду
                        </Link>
                    </Button>
                </div>
            </div>
            
            <TopTeamsWidget />

            {currentUser && <MyTeamWidget user={currentUser} />}

            <div className="container mx-auto px-0">
                <h2 className="text-2xl font-bold mb-4">Все команды</h2>
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(8)].map((_, i) => (
                            <Card key={i}>
                                <CardHeader><Skeleton className="h-16 w-full" /></CardHeader>
                                <CardContent><Skeleton className="h-8 w-3/4" /></CardContent>
                                <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : allTeams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {allTeams.map(team => (
                            <TeamCard 
                                key={team.id} 
                                team={team} 
                                onApply={handleApply}
                                isApplicationSent={sentApplications.includes(String(team.id))}
                            />
                        ))}
                    </div>
                ) : (
                    <Card className="text-center min-h-[200px] flex flex-col justify-center items-center">
                        <CardHeader>
                            <CardTitle>Не удалось загрузить команды</CardTitle>
                            <CardDescription>Попробуйте проверить связь с бэкендом или обновите страницу.</CardDescription>
                        </CardHeader>
                    </Card>
                )}
            </div>
        </div>
    );
}
