'use client';

import { Suspense, useState, useEffect, useMemo } from 'react';
import { teams as mockTeams, type Team } from '@/mocks';
import { TopTeamsWidget, TopTeamsWidgetSkeleton } from '@/widgets/top-teams-widget';
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { PlusCircle, UserCheck, Users, BarChart, Wifi, WifiOff } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { Separator } from "@/shared/ui/separator";
import { useToast } from '@/shared/hooks/use-toast';
import axios from 'axios';
import { Skeleton } from '@/shared/ui/skeleton';

const TeamCard = ({ team, isMember }: { team: Team, isMember: boolean }) => (
    <Card key={team.id} className="flex flex-col">
        <CardHeader>
            <Link href={`/teams/${team.id}`} className="flex items-center gap-4 group">
                <Image src={team.logoUrl} alt={`${team.name} logo`} width={64} height={64} className="rounded-lg border" data-ai-hint={team.dataAiHint} />
                <div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">{team.name}</CardTitle>
                    <CardDescription>{team.game}</CardDescription>
                </div>
            </Link>
        </CardHeader>
        <CardContent className="flex-grow space-y-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>{team.members.length} игроков</span>
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
                <Button className="w-full">
                    <UserCheck className="mr-2 h-4 w-4" /> Подать заявку
                </Button>
            )}
        </CardFooter>
    </Card>
);

export function TeamsPage() {
    const { user: currentUser } = useUserStore();
    const { toast } = useToast();
    const [allTeams, setAllTeams] = useState<Team[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<'unknown' | 'success' | 'failed'>('unknown');
    
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        async function fetchTeams() {
            if (!API_BASE_URL) {
                console.error("API_BASE_URL is not set.");
                setConnectionStatus('failed');
                return;
            }
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/teams`);
                setAllTeams(response.data);
                setConnectionStatus('success');
            } catch (error) {
                console.error("Failed to fetch teams:", error);
                setConnectionStatus('failed');
            }
        }
        fetchTeams();
    }, [API_BASE_URL]);

    const handlePing = async () => {
        if (!API_BASE_URL) {
            toast({
                variant: "destructive",
                title: "Ошибка конфигурации",
                description: "URL бэкенда не установлен. Проверьте файл .env.",
            });
            return;
        }

        toast({
            title: "Проверка связи...",
            description: `Отправляю запрос к ${API_BASE_URL}`,
        });

        try {
            await axios.get(`${API_BASE_URL}/`);
            setConnectionStatus('success');
            toast({
                title: "Связь с бэкендом установлена!",
                description: "Соединение успешно. Теперь данные должны загружаться.",
            });
             // Refetch teams after successful ping
            const response = await axios.get(`${API_BASE_URL}/api/v1/teams`);
            setAllTeams(response.data);

        } catch (error) {
            setConnectionStatus('failed');
            console.error("Ping failed with error:", error);
            toast({
                variant: "destructive",
                title: "Ошибка соединения",
                description: "Не удалось подключиться к бэкенду. Проверьте настройки CORS и доступность сервера.",
            });
        }
    };
    
    const { myTeams, otherTeams } = useMemo(() => {
        if (!currentUser) {
            return { myTeams: [], otherTeams: allTeams };
        }
        const myTeams = allTeams.filter(team => team.members.includes(currentUser.id));
        const otherTeams = allTeams.filter(team => !team.members.includes(currentUser.id));
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
                    <Button variant="outline" onClick={handlePing}>
                        {connectionStatus === 'success' && <Wifi className="mr-2 h-4 w-4 text-green-500" />}
                        {connectionStatus === 'failed' && <WifiOff className="mr-2 h-4 w-4 text-red-500" />}
                        Проверить связь
                    </Button>
                    <Button asChild size="lg">
                        <Link href="/teams/create">
                            <PlusCircle className="mr-2 h-5 w-5" />
                            Создать свою команду
                        </Link>
                    </Button>
                </div>
            </div>
            
            {myTeams.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">Мои команды</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {myTeams.map(team => <TeamCard key={team.id} team={team} isMember={true} />)}
                    </div>
                     <Separator className="my-8"/>
                </section>
            )}
            
            <Suspense fallback={<TopTeamsWidgetSkeleton />}>
                 <TopTeamsWidget />
            </Suspense>

            <div>
                <h2 className="text-2xl font-bold mb-4">Все команды</h2>
                 {connectionStatus === 'success' && allTeams.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {otherTeams.map(team => (
                            <TeamCard key={team.id} team={team} isMember={false} />
                        ))}
                    </div>
                ) : connectionStatus !== 'unknown' ? (
                     <Card className="text-center min-h-[200px] flex flex-col justify-center items-center">
                        <CardHeader>
                            <CardTitle>Не удалось загрузить команды</CardTitle>
                            <CardDescription>Попробуйте проверить связь с бэкендом или обновите страницу.</CardDescription>
                        </CardHeader>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {[...Array(4)].map((_, i) => (
                             <Card key={i}>
                                 <CardHeader><Skeleton className="h-16 w-full" /></CardHeader>
                                 <CardContent><Skeleton className="h-8 w-3/4" /></CardContent>
                                 <CardFooter><Skeleton className="h-10 w-full" /></CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}