import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MatchProtocol } from "@/widgets/match-protocol";
import { allTournaments } from '@/views/tournaments/public-page/ui/mock-data';
import Image from "next/image";

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

export function MatchPage({ tournament, matchId }: { tournament: (typeof allTournaments)[0] | undefined, matchId: string }) {
     if (!tournament) {
        return (
            <div className="flex flex-col min-h-screen items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Турнир не найден.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/tournaments">К списку турниров</Link>
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
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-6">
                        <Button asChild variant="outline">
                            <Link href={`/tournaments/${tournament.id}`}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Назад к турниру
                            </Link>
                        </Button>
                    </div>
                    <MatchProtocol tournament={tournament} matchId={matchId} />
                </div>
            </main>
             <footer className="border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 py-6 text-center text-muted-foreground">
                <p>© 2025 ProDvor. Все права защищены.</p>
                </div>
            </footer>
        </div>
    );
}
