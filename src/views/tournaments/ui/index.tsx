

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { PlusCircle, Trophy, GanttChart, Bell, CheckSquare } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { allTournaments } from "../public-page/ui/mock-data";
import { Badge } from "@/shared/ui/badge";
import { Progress } from "@/shared/ui/progress";
import { MyTournamentsEmptyState } from "./my-tournaments-empty-state";


type TournamentStatus = 'АНОНС' | 'ПРЕДРЕГИСТРАЦИЯ' | 'РЕГИСТРАЦИЯ' | 'ИДЕТ' | 'ЗАВЕРШЕН';

const statusColors: Record<TournamentStatus, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦИЯ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-300/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
};


const mockMyTournaments = [
    // Empty for demonstration purposes. In a real app, this would be a user's data.
];

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
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-12">
            <section>
                <h2 className="text-2xl font-bold mb-4">Мои турниры</h2>
                {mockMyTournaments.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {mockMyTournaments.map(tournament => (
                        <Card key={tournament.id} className="flex flex-col bg-card/80 border-primary/20 hover:border-primary/50 transition-colors">
                            <CardHeader className="p-0">
                                <Link href={`/tournaments/${tournament.id}`} className="flex flex-col flex-grow">
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
                                    <div className="p-6 overflow-hidden">
                                        <CardTitle className="text-xl group-hover:text-primary transition-colors">{tournament.name}</CardTitle>
                                        <CardDescription>{tournament.game}</CardDescription>
                                    </div>
                                </Link>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allTournaments.map(tournament => (
                        <Card key={tournament.id} className="flex flex-col hover:border-primary/50 transition-colors group">
                            <Link href={`/tournaments/${tournament.id}`} className="flex flex-col flex-grow">
                                <div className="relative h-40 w-full">
                                    <Image
                                        src={tournament.bannerUrl}
                                        alt={tournament.name}
                                        fill
                                        className="object-cover rounded-t-lg group-hover:scale-105 transition-transform"
                                        data-ai-hint={tournament.dataAiHint}
                                    />
                                    <Badge className={`absolute top-2 right-2 ${statusColors[tournament.status]}`}>
                                        {tournament.status}
                                    </Badge>
                                </div>
                                <div className="p-6 overflow-hidden">
                                <CardTitle className="text-xl group-hover:text-primary transition-colors">{tournament.name}</CardTitle>
                                <CardDescription>{tournament.game}</CardDescription>
                                </div>
                            </Link>
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
            </section>
        </div>
    );
}
