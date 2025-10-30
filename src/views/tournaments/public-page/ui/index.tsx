

'use client';

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Award, Calendar, GanttChartIcon, Users, ArrowRight } from "lucide-react";
import { sponsors, Tournament } from "@/mocks";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { useState, useEffect } from 'react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/ui/tooltip";

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | React.ReactNode, icon: React.ElementType }) => (
    <Card className="text-center bg-card/50 backdrop-blur-sm">
        <CardHeader className="pb-2">
            <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-2">
                <Icon className="h-6 w-6" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-2xl font-bold">{value}</p>
        </CardContent>
    </Card>
);
const ParticipateButton = ({ tournament }: { tournament: Tournament }) => {
    const isRegistrationActive = tournament.status === 'РЕГИСТРАЦИЯ';
    const isPreRegistrationActive = tournament.status === 'ПРЕДРЕГИСТРАЦИЯ';
    const canParticipate = isRegistrationActive || isPreRegistrationActive;

    if (!canParticipate) return null;

    return (
        <Button asChild size="lg" className="font-bold text-lg h-14 px-10 mt-6">
            <Link href={`/tournaments/${tournament.id}/register`}>
                {isRegistrationActive ? "Подать заявку" : "Принять участие"}
            </Link>
        </Button>
    )
}

const LOCAL_STORAGE_BANNER_KEY_PREFIX = 'promo-banner-';

export function TournamentPublicPage({ tournament: initialTournament }: { tournament: Tournament | undefined}) {
    const [tournament, setTournament] = useState(initialTournament);

    useEffect(() => {
        if (initialTournament) {
            const storageKey = `${LOCAL_STORAGE_BANNER_KEY_PREFIX}${initialTournament.id}`;
            const savedBanner = localStorage.getItem(storageKey);
            if (savedBanner) {
                setTournament((prev: Tournament | undefined) => prev ? { ...prev, bannerUrl: savedBanner } : undefined);
            } else {
                setTournament(initialTournament);
            }
        }
    }, [initialTournament]);

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
            <main className="flex-1">
                {/* Hero section with banner */}
                <section className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center text-center">
                    <Image
                        src={tournament.bannerUrl}
                        alt={tournament.name}
                        fill
                        className="object-cover"
                        priority
                        data-ai-hint={tournament.dataAiHint}
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="relative z-10 container mx-auto px-4 md:px-6 text-white">
                        <Badge variant="secondary" className="text-base mb-4">{tournament.game}</Badge>
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 font-headline text-shadow-lg">
                            {tournament.name}
                        </h1>
                        <p className="text-lg md:text-xl text-white/80 max-w-3xl mx-auto">
                           {tournament.description}
                        </p>
                         <ParticipateButton tournament={tournament} />
                    </div>
                </section>
                
                {/* Info section */}
                <section className="py-12 md:py-16 bg-muted/30">
                    <div className="container mx-auto px-4 md:px-6">
                         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                            <StatCard title="Призовой фонд" value={tournament.prizePool} icon={Award} />
                            <StatCard title="Участники" value={`${tournament.participants} / ${tournament.maxParticipants}`} icon={Users} />
                            <StatCard title="Дата начала" value={new Date(tournament.startDate).toLocaleDateString('ru-RU')} icon={Calendar} />
                            <StatCard title="Формат" value="Single Elimination" icon={GanttChartIcon} />
                        </div>
                    </div>
                </section>
                
                {/* Sponsors Section */}
                 <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <h2 className="text-3xl font-bold font-headline mb-8">Спонсоры турнира</h2>
                        <div className="flex justify-center items-center flex-wrap gap-8">
                            {sponsors.map(sponsor => (
                                 <Link href={`/admin/sponsors/${sponsor.id}`} key={sponsor.id} className="block group">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Avatar className="h-24 w-24 transition-transform group-hover:scale-110 border-4 border-transparent group-hover:border-primary">
                                                    <AvatarImage src={sponsor.logoUrl} alt={sponsor.name}/>
                                                    <AvatarFallback>{sponsor.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>{sponsor.name}</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                 </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA to Tournament Hub */}
                <section className="py-16 md:py-24 bg-primary/10">
                    <div className="container mx-auto px-4 md:px-6 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold font-headline">Следите за ходом событий</h2>
                        <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
                        Перейдите в хаб турнира, чтобы увидеть сетку, расписание матчей и список всех участников.
                        </p>
                        <Button asChild size="lg" className="mt-8 font-bold">
                            <Link href={`/tournaments/${tournament.id}/hub`}>
                                Перейти в турнир <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </section>
            </main>
        </div>
    );
}
