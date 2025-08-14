


import Image from "next/image";
import Link from "next/link";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Award, Calendar, GanttChartIcon, Trophy, Users } from "lucide-react";
import { allTournaments, registeredTeams, sponsors } from './mock-data';
import { Badge } from "@/shared/ui/badge";
import { Separator } from "@/shared/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { TournamentBracket } from "./tournament-bracket";

const Logo = () => (
    <Image 
      src="https://prodvor.website/_next/image?url=%2Fimages%2Fyour-logo.png&w=64&q=75"
      alt="ProDvor Logo" 
      width={40} 
      height={40} 
      className="object-contain"
      data-ai-hint="logo"
    />
);

const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | React.ReactNode, icon: React.ElementType }) => (
    <Card className="text-center">
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

const statusColors: Record<string, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦИЯ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-300/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
};

const ParticipateButton = ({ tournament }: { tournament: (typeof allTournaments)[0] }) => {
    const isRegistrationActive = tournament.status === 'РЕГИСТРАЦИЯ';
    const isPreRegistrationActive = tournament.status === 'ПРЕДРЕГИСТРАЦИЯ';

    if (!isRegistrationActive && !isPreRegistrationActive) {
        return null;
    }

    const buttonText = isRegistrationActive ? "Подать заявку" : "Принять участие";
    const href = isRegistrationActive ? `/tournaments/${tournament.id}/register` : `/tournaments/${tournament.id}/register`;

    return (
        <Button asChild size="lg" className="font-bold text-lg h-14 px-10">
            <Link href={href}>{buttonText}</Link>
        </Button>
    )
}

export function TournamentPublicPage({ tournament }: { tournament: (typeof allTournaments)[0] | undefined}) {
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
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Logo />
                    <span className="font-headline">ProDvor</span>
                </Link>
                <Button asChild>
                    <Link href="/auth">Войти</Link>
                </Button>
                </div>
            </header>

            <main className="flex-1">
                {/* Hero section with banner */}
                <section className="relative w-full h-[40vh] md:h-[50vh]">
                        <Image
                        src={tournament.bannerUrl}
                        alt={tournament.name}
                        fill
                        className="object-cover"
                        priority
                        data-ai-hint={tournament.dataAiHint}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 pb-8 md:pb-12">
                            <div className="container mx-auto px-4 md:px-6 text-center">
                            <div className="flex justify-center items-center gap-4 mb-4">
                                <Badge variant="secondary" className="text-base">{tournament.game}</Badge>
                                <Badge className={`text-base ${statusColors[tournament.status]}`}>{tournament.status}</Badge>
                            </div>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-4 font-headline">
                                {tournament.name}
                            </h1>
                            <div className="max-w-3xl mx-auto">
                                <ParticipateButton tournament={tournament} />
                            </div>
                        </div>
                    </div>
                </section>
                
                {/* Info section */}
                <section className="py-12 md:py-16">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto">
                            <StatCard title="Призовой фонд" value={tournament.prizePool} icon={Award} />
                            <StatCard title="Участники" value={`${tournament.participants} / ${tournament.maxParticipants}`} icon={Users} />
                            <StatCard title="Дата начала" value={new Date(tournament.startDate).toLocaleDateString('ru-RU')} icon={Calendar} />
                            <StatCard title="Формат" value="Single Elimination" icon={GanttChartIcon} />
                        </div>

                        <Separator className="my-12 md:my-16" />

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
                            <div className="lg:col-span-2">
                                {tournament.status === 'ИДЕТ' ? (
                                    <TournamentBracket tournamentId={tournament.id}/>
                                ) : (
                                        <Card>
                                        <CardHeader><CardTitle>Описание турнира</CardTitle></CardHeader>
                                        <CardContent className="prose prose-invert max-w-none text-muted-foreground">
                                            <p>Добро пожаловать на главный турнир этого лета - {tournament.name}! Мы собираем лучшие команды, чтобы выяснить, кто достоин звания чемпиона. Вас ждут напряженные матчи, незабываемые эмоции и, конечно же, ценные призы.</p>
                                            <h4>Правила и регламент:</h4>
                                            <ul>
                                                <li>Формат проведения: Single Elimination (проигрыш в одном матче означает вылет из турнира).</li>
                                                <li>Все матчи до финала играются в формате Best-of-1. Финал - Best-of-3.</li>
                                                <li>Опоздание на матч более 15 минут карается техническим поражением.</li>
                                                <li>Запрещено любое неспортивное поведение и использование стороннего ПО.</li>
                                            </ul>
                                            <p>Готовьтесь к битве! Пусть победит сильнейший!</p>
                                        </CardContent>
                                    </Card>
                                )}
                            </div>
                            <div>
                                <Card>
                                        <CardHeader><CardTitle>Зарегистрированные команды</CardTitle></CardHeader>
                                        <CardContent>
                                        {registeredTeams.length > 0 ? (
                                            <div className="grid grid-cols-4 gap-3">
                                                {registeredTeams.slice(0, 12).map(team => (
                                                    <Link href={`/teams/${team.id}`} key={team.id} className="block group">
                                                            <Avatar className="h-12 w-12 transition-transform group-hover:scale-110">
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
                                    <Card className="mt-6">
                                        <CardHeader><CardTitle>Спонсоры</CardTitle></CardHeader>
                                        <CardContent>
                                        <ul className="space-y-4">
                                            {sponsors.map(sponsor => (
                                                <li key={sponsor.id}>
                                                    <Link href={`/sponsors/${sponsor.id}`} className="flex items-center gap-4 group">
                                                        <Avatar className="h-10 w-10 transition-transform group-hover:scale-110">
                                                            <AvatarImage src={sponsor.logoUrl} alt={sponsor.name}/>
                                                            <AvatarFallback>{sponsor.name.charAt(0)}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium group-hover:text-primary transition-colors">{sponsor.name}</span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 py-6 text-center text-muted-foreground">
                <p>© 2025 ProDvor. Все права защищены.</p>
                </div>
            </footer>
        </div>
    );
}
