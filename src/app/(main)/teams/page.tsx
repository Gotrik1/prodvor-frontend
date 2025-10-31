
import { TeamsPage } from '@/views/teams';
import type { Metadata } from 'next';
import { teams } from '@/mocks';
import { Suspense } from 'react';
import { TopTeamsWidgetSkeleton } from '@/widgets/top-teams-widget';

export const metadata: Metadata = {
    title: 'Команды | ProDvor',
    description: 'Находите команды, вступайте в них или создайте свою собственную.',
};

// This function will now run on the server
async function getTeamsData() {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!API_BASE_URL) {
        console.error("API_BASE_URL is not defined. Falling back to mock data.");
        return teams;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/teams`, { cache: 'no-store' });
        if (!response.ok) {
            console.error(`Failed to fetch teams: ${response.statusText}. Falling back to mock data.`);
            return teams;
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching teams:", error);
        return teams; // Fallback to mock data on error
    }
}


export default async function Teams() {
  const teamsData = await getTeamsData();
  return (
    <Suspense fallback={<TopTeamsWidgetSkeleton />}>
        <TeamsPage serverTeams={teamsData} />
    </Suspense>
  );
}

// Re-add the TeamsPage component here to pass server data
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

function TeamsPageComponent({ serverTeams }: { serverTeams: Team[] }) {
    const { user: currentUser } = useUserStore();
    const [allTeams, setAllTeams] = useState<Team[]>(serverTeams);
    
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
            
            <TopTeamsWidget />

            <div>
                <h2 className="text-2xl font-bold mb-4">Все команды</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {otherTeams.map(team => (
                        <TeamCard key={team.id} team={team} isMember={false} />
                    ))}
                </div>
            </div>
        </div>
    );
}

// We need to redefine the component that is exported to accept the server-side props
const TeamsPage = ({ serverTeams }: { serverTeams: Team[] }) => {
  return <TeamsPageComponent serverTeams={serverTeams} />;
};
