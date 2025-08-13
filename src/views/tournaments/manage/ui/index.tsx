import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";
import { tournaments } from '@/mocks';

const myTournaments = [
    {
      id: 'mytourney1',
      name: 'Летний Кубок ProDvor',
      game: 'Дворовый футбол',
      status: 'РЕГИСТРАЦИЯ' as const,
      prizePool: '100 000 руб.',
      participants: 5,
      maxParticipants: 16,
      startDate: '2025-08-01',
      bannerUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'soccer street'
    },
    {
      id: 'mytourney2',
      name: 'Осенний марафон по Dota 2',
      game: 'Dota 2',
      status: 'ИДЕТ' as const,
      prizePool: 'Эксклюзивные скины',
      participants: 30,
      maxParticipants: 32,
      startDate: '2025-09-10',
      bannerUrl: 'https://placehold.co/600x400.png',
      dataAiHint: 'esports dota'
    },
];

const allTournaments = [...tournaments, ...myTournaments];


export function TournamentManagementPage({ tournamentId }: { tournamentId: string }) {
    const tournament = allTournaments.find(t => t.id === tournamentId);

    if (!tournament) {
        return (
             <div className="flex flex-col min-h-screen bg-background text-foreground">
                <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                    <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                        <Button asChild variant="outline">
                            <Link href="/tournaments">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Назад к турнирам
                            </Link>
                        </Button>
                        <h1 className="text-lg font-semibold">Турнир не найден</h1>
                    </div>
                </header>
                 <main className="flex-1 p-4 md:p-6 lg:p-8 flex items-center justify-center">
                     <Card className="text-center max-w-md w-full">
                        <CardHeader>
                            <CardTitle>Ошибка</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Турнир с таким ID не был найден.
                            </p>
                        </CardContent>
                    </Card>
                </main>
            </div>
        )
    }

    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Button asChild variant="outline">
                        <Link href="/tournaments">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Назад к турнирам
                        </Link>
                    </Button>
                    <h1 className="text-lg font-semibold truncate">Управление: {tournament.name}</h1>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto">
                    <Card>
                        <CardHeader>
                            <CardTitle>Панель управления турниром</CardTitle>
                            <CardDescription>
                                Здесь будут инструменты для управления турнирной сеткой, участниками, расписанием и другими аспектами вашего мероприятия.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center text-center min-h-[50vh]">
                            <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                                <Construction className="h-12 w-12" />
                            </div>
                            <h3 className="mt-4 text-2xl font-headline">CRM-система в разработке</h3>
                            <p className="text-muted-foreground mt-2 max-w-md">
                                Этот раздел станет вашим центром управления турниром. Функционал скоро появится.
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </main>
        </div>
    );
}
