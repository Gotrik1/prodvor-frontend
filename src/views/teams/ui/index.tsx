

'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { PlusCircle, UserCheck, Users, BarChart, Wifi, WifiOff } from "lucide-react";
import Image from "next/image";
import type { Team } from "@/mocks";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { TopTeamsWidget } from "@/widgets/top-teams-widget";
import { Separator } from "@/shared/ui/separator";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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
    const [disciplineFilter] = useState('all');
    const [allTeams, setAllTeams] = useState<Team[]>([]);
    const [pingStatus, setPingStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handlePing = async () => {
        if (!API_BASE_URL) {
            console.error("Ping failed: NEXT_PUBLIC_API_BASE_URL is not set.");
            setPingStatus('error');
            return;
        }
        console.log(`Pinging backend at: ${API_BASE_URL}/api/v1/teams`);
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/teams`);
            if (response.ok) {
                console.log("Ping successful! Status:", response.status);
                setPingStatus('success');
            } else {
                console.error("Ping failed with status:", response.status, response.statusText);
                setPingStatus('error');
            }
        } catch (error) {
            console.error("Ping failed with error:", error);
            setPingStatus('error');
        }
    };


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
        }
        fetchTeams();
    }, []);


    const { myTeams, otherTeams } = useMemo(() => {
        if (!currentUser || !allTeams) {
            return { myTeams: [], otherTeams: allTeams || [] };
        }
        const myTeams = allTeams.filter(team => team.members.includes(currentUser.id));
        const otherTeams = allTeams.filter(team => !team.members.includes(currentUser.id));
        return { myTeams, otherTeams };
    }, [currentUser, allTeams]);

    const filteredOtherTeams = useMemo(() => {
        if (disciplineFilter === 'all') return otherTeams;
        return otherTeams.filter(team => team.game === disciplineFilter);
    }, [disciplineFilter, otherTeams]);

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline">Команды</h1>
                    <p className="text-muted-foreground mt-1">Найдите команду, присоединитесь к ней или создайте свою.</p>
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handlePing}>
                        {pingStatus === 'success' ? <Wifi className="mr-2 h-4 w-4 text-green-500" /> : <WifiOff className="mr-2 h-4 w-4" />}
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
            {pingStatus === 'error' && (
                <Card className="bg-destructive/10 border-destructive/50">
                    <CardContent className="p-4 text-destructive">
                       <p className="font-semibold">Не удалось подключиться к бэкенду.</p>
                       <p className="text-xs mt-1">Проверьте, что бэкенд-сервер запущен, доступен по URL, и настройки CORS верны. Откройте консоль разработчика (F12) для деталей.</p>
                    </CardContent>
                </Card>
            )}
             {pingStatus === 'success' && (
                <Card className="bg-green-500/10 border-green-500/50">
                    <CardContent className="p-4 text-green-300">
                       <p className="font-semibold">Связь с бэкендом установлена успешно!</p>
                    </CardContent>
                </Card>
            )}
            
            {myTeams.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">Мои команды</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {myTeams.map(team => <TeamCard key={team.id} team={team} isMember={true} />)}
                    </div>
                     <Separator className="my-8"/>
                </section>
            )}
            
            <TopTeamsWidget 
                userCity={currentUser?.city} 
                selectedDiscipline={disciplineFilter} 
            />

            <div>
                <h2 className="text-2xl font-bold mb-4">Все команды</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredOtherTeams.map(team => (
                        <TeamCard key={team.id} team={team} isMember={false} />
                    ))}
                </div>
            </div>
        </div>
    );
}
