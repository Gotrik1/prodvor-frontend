
'use client';

import { useState, useEffect, useMemo } from 'react';
import { type Team } from '@/mocks';
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { PlusCircle, UserCheck, Users, BarChart, Wifi, WifiOff } from "lucide-react";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { Separator } from "@/shared/ui/separator";
import { useToast } from '@/shared/hooks/use-toast';
import axios from 'axios';
import { Skeleton } from '@/shared/ui/skeleton';
import { TopTeamsWidget } from '@/widgets/top-teams-widget';

const TeamCard = ({ team, isMember }: { team: Team, isMember: boolean }) => {
    const { user: currentUser } = useUserStore();
    const { toast } = useToast();

    const handleApply = () => {
        if (!currentUser) return;
        
        const userHasDiscipline = currentUser.sports.some(sport => sport.id === team.sportId);
        
        if (userHasDiscipline) {
            // In a real app, this would be a POST request to `/api/v1/teams/${team.id}/apply`
            toast({
                title: "Заявка отправлена!",
                description: `Ваша заявка в команду "${team.name}" отправлена на рассмотрение капитану.`,
            });
        } else {
             toast({
                variant: 'destructive',
                title: 'Неверная дисциплина',
                description: `Вы не можете подать заявку, так как не занимаетесь дисциплиной "${team.game}".`,
            });
        }
    };

    return (
    <Card key={team.id} className="flex flex-col">
        <CardHeader>
            <Link href={`/teams/${team.id}`} className="flex items-center gap-4 group">
                <img src={team.logoUrl || 'https://placehold.co/512x512.png'} alt={`${team.name} logo`} width={64} height={64} className="rounded-lg border object-cover aspect-square" />
                <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{team.name}</CardTitle>
                    <CardDescription>{team.game}</CardDescription>
                </div>
            </Link>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{team.members?.length || 1} игроков</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <BarChart className="h-4 w-4" />
                <span>{team.rank} ELO</span>
            </div>
            <div>
                <Badge variant="secondary">Ищет игроков</Badge>
            </div>
        </CardContent>
        <CardFooter>
            {isMember ? (
                <Button asChild className="w-full" variant="secondary">
                     <Link href={`/teams/${team.id}`}>Перейти в профиль</Link>
                </Button>
            ) : (
                <Button className="w-full" onClick={handleApply}>
                    <UserCheck className="mr-2 h-4 w-4" /> Подать заявку
                </Button>
            )}
        </CardFooter>
    </Card>
    )
};

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function TeamsPage() {
    const { user: currentUser } = useUserStore();
    const [allTeams, setAllTeams] = useState<Team[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTeams() {
            try {
                if (!API_BASE_URL) return;
                const response = await fetch(`${API_BASE_URL}/api/v1/teams`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setAllTeams(data);
            } catch (error) {
                console.error("Failed to fetch teams:", error);
            }
            finally {
                setIsLoading(false);
            }
        }
        fetchTeams();
    }, []);

    const { myTeams, otherTeams } = useMemo(() => {
        if (!currentUser) {
            return { myTeams: [], otherTeams: allTeams };
        }
        // В реальном приложении логика определения "моих" команд может быть на бэкенде
        const myTeams = allTeams.filter(team => team.captainId === currentUser.id);
        const otherTeams = allTeams.filter(team => team.captainId !== currentUser.id);
        return { myTeams, otherTeams };
    }, [currentUser, allTeams]);

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

            <div className="container mx-auto px-4 md:px-0">
                <TopTeamsWidget />
            </div>

            <Separator />

            <div className="container mx-auto px-4 md:px-0 space-y-8">
                {myTeams.length > 0 && (
                    <section>
                        <h2 className="text-2xl font-bold mb-4">Мои команды</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {myTeams.map(team => <TeamCard key={team.id} team={team} isMember={true} />)}
                        </div>
                    </section>
                )}

                {myTeams.length > 0 && <Separator />}

                <div>
                    <h2 className="text-2xl font-bold mb-4">Все команды</h2>
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <Card key={i}>
                                    <CardHeader><Skeleton className="h-16 w-full" /></CardHeader>
                                    <CardContent><Skeleton className="h-8 w-3/4" /></CardContent>
                                    <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
                                </Card>
                            ))}
                        </div>
                    ) : allTeams.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {otherTeams.map(team => (
                                <TeamCard key={team.id} team={team} isMember={false} />
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
        </div>
    );
}
