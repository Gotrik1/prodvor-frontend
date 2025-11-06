
'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { GanttChart, Bell, CheckSquare, PlusCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Tournament } from "@/mocks";
import { Badge } from "@/shared/ui/badge";
import { Progress } from "@/shared/ui/progress";
import { MyTournamentsEmptyState } from "./my-tournaments-empty-state";
import api from "@/shared/api/axios-instance";
import { useState, useEffect } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { mockMyTournaments } from "@/views/tournaments/public-page/ui/mock-data";


type TournamentStatus = 'АНОНС' | 'ПРЕДРЕГИСТРАЦИЯ' | 'РЕГИСТРАЦИЯ' | 'ИДЕТ' | 'ЗАВЕРШЕН' | 'ПРИОСТАНОВЛЕН' | 'ОТМЕНЕН';

const statusColors: Record<TournamentStatus, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦИЯ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-300/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
    'ПРИОСТАНОВЛЕН': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'ОТМЕНЕН': 'bg-red-500/20 text-red-300 border-red-500/30',
};

const TournamentCardActionButton = ({ id, status }: { id: string, status: TournamentStatus }) => {
    switch(status) {
        case 'АНОНС':
            return <Button asChild className="w-full" variant="outline"><Link href={`/tournaments/${id}`}><Bell className="mr-2 h-4 w-4"/>Уведомить о начале</Link></Button>;
        case 'ПРЕДРЕГИСТРАЦИЯ':
            return <Button asChild className="w-full" variant="secondary"><Link href={`/tournaments/${id}/register`}><CheckSquare className="mr-2 h-4 w-4"/>Принять участие</Link></Button>;
        case 'РЕГИСТРАЦИЯ':
            return <Button asChild className="w-full"><Link href={`/tournaments/${id}/register`}>Подать заявку</Link></Button>;
        default:
             return <Button asChild className="w-full"><Link href={`/tournaments/${id}`}>Подробнее</Link></Button>;
    }
}


export function TournamentsPage() {
    const [allTournaments, setAllTournaments] = useState<Tournament[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchTournaments() {
            setIsLoading(true);
            try {
                const response = await api.get('api//v1/tournaments');
                setAllTournaments(response.data);
            } catch (error) {
                console.error("Failed to fetch tournaments:", error);
            } finally {
                setIsLoading(false);
            }
        }
        fetchTournaments();
    }, []);
    

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold">Мои турниры</h2>
                <Button asChild variant="outline">
                    <Link href="/tournaments/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Создать турнир
                    </Link>
                </Button>
            </div>
            <section>
                {mockMyTournaments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockMyTournaments.map(tournament => (
                        <Card key={tournament.id} className="flex flex-col bg-card/80 border-primary/20 hover:border-primary/50 transition-colors">
                            <CardContent className="p-0">
                                <Link href={`/tournaments/${tournament.id}`}>
                                    <div className="relative h-40 w-full">
                                        <Image
                                            src={tournament.bannerUrl}
                                            alt={tournament.name}
                                            fill
                                            className="object-cover rounded-t-lg"
                                            data-ai-hint={tournament.dataAiHint}
                                        />
                                        <Badge className={`absolute top-2 right-2 ${statusColors[tournament.status]}`}>
                                            {tournament.status}
                                        </Badge>
                                    </div>
                                </Link>
                            </CardContent>
                            <CardHeader>
                                <Link href={`/tournaments/${tournament.id}`}>
                                    <CardTitle className="text-xl hover:text-primary transition-colors">{tournament.name}</CardTitle>
                                </Link>
                                <CardDescription>{tournament.game}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Призовой фонд</p>
                                    <p className="text-lg font-semibold text-primary">{tournament.prizePool}</p>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <p className="text-sm font-medium text-muted-foreground">Участники</p>
                                        <p className="text-sm font-semibold">{tournament.participants} / {tournament.maxParticipants}</p>
                                    </div>
                                    <Progress value={(tournament.participants / tournament.maxParticipants) * 100} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant="secondary" asChild>
                                    <Link href={`/tournaments/${tournament.id}/manage`}>
                                        <GanttChart className="mr-2 h-4 w-4" /> Управлять
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                    </div>
                ) : (
                    <MyTournamentsEmptyState />
                )}
            </section>

            <section>
                <h2 className="text-2xl font-bold mb-4">Все турниры</h2>
                 {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(3)].map((_, i) => (
                            <Card key={i}>
                                <Skeleton className="h-40 w-full" />
                                <CardHeader>
                                    <Skeleton className="h-6 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Skeleton className="h-4 w-1/3" />
                                    <Skeleton className="h-6 w-1/2" />
                                    <Skeleton className="h-4 w-full" />
                                </CardContent>
                                <CardFooter>
                                    <Skeleton className="h-10 w-full" />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allTournaments.map(tournament => (
                            <Card key={tournament.id} className="flex flex-col hover:border-primary/50 transition-colors group">
                                <CardContent className="p-0 pt-0">
                                    <Link href={`/tournaments/${tournament.id}`} className="block">
                                        <div className="relative h-40 w-full group-hover:scale-105 transition-transform duration-300">
                                            <Image
                                                src={tournament.bannerUrl}
                                                alt={tournament.name}
                                                fill
                                                className="object-cover rounded-t-lg"
                                                data-ai-hint={tournament.dataAiHint}
                                            />
                                            <Badge className={`absolute top-2 right-2 ${statusColors[tournament.status]}`}>
                                                {tournament.status}
                                            </Badge>
                                        </div>
                                    </Link>
                                </CardContent>
                                <CardHeader>
                                    <Link href={`/tournaments/${tournament.id}`}>
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{tournament.name}</CardTitle>
                                    </Link>
                                    <CardDescription>{tournament.game}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">Призовой фонд</p>
                                        <p className="text-lg font-semibold text-primary">{tournament.prizePool}</p>
                                    </div>
                                    <div>
                                        <div className="flex justify-between items-center mb-1">
                                        <p className="text-sm font-medium text-muted-foreground">Участники</p>
                                        <p className="text-sm font-semibold">{tournament.participants} / {tournament.maxParticipants}</p>
                                        </div>
                                        <Progress value={(tournament.participants / tournament.maxParticipants) * 100} />
                                    </div>
                                </CardContent>
                                <CardFooter>
                                    <TournamentCardActionButton id={tournament.id} status={tournament.status} />
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
}
