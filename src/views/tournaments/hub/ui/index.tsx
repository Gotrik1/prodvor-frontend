


import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ArrowLeft, Users, Trophy } from "lucide-react";
import { allTournaments, registeredTeams } from '@/views/tournaments/public-page/ui/mock-data';
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { TournamentBracket } from "@/views/tournaments/public-page/ui/tournament-bracket";
import { TournamentSchedule } from "@/views/tournaments/public-page/ui/tournament-schedule";
import { DashboardHeader } from "@/widgets/dashboard-header";

export function TournamentHubPage({ tournament }: { tournament: (typeof allTournaments)[0] | undefined}) {
     if (!tournament) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Турнир не найден. Возможно, он был удален или ссылка неверна.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/dashboard">Вернуться на платформу</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto">
                    <div className="mb-6 flex items-center justify-between">
                         <Button asChild variant="outline">
                            <Link href={`/tournaments/${tournament.id}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Назад на промо-страницу
                            </Link>
                        </Button>
                        <div className="text-right">
                             <h1 className="text-2xl font-bold font-headline">{tournament.name}</h1>
                             <p className="text-muted-foreground">Турнирный хаб</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                        <div className="lg:col-span-2 space-y-8">
                            <TournamentSchedule tournamentId={tournament.id} />
                            <TournamentBracket tournamentId={tournament.id}/>
                        </div>
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Users />Участники</CardTitle>
                                </CardHeader>
                                <CardContent>
                                {registeredTeams.length > 0 ? (
                                    <div className="grid grid-cols-5 gap-3">
                                        {registeredTeams.map(team => (
                                            <Link href={`/teams/${team.id}`} key={team.id} className="block group">
                                                    <Avatar className="h-14 w-14 transition-transform group-hover:scale-110">
                                                    <AvatarImage src={team.logoUrl} alt={team.name} />
                                                    <AvatarFallback>{team.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground">Регистрация еще не началась.</p>
                                )}
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                     <CardTitle className="flex items-center gap-2"><Trophy />Призовые места</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">Информация о победителях появится здесь после завершения турнира.</p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
