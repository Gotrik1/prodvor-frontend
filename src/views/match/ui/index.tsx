import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { MatchProtocol } from "@/widgets/match-protocol";
import { allTournaments } from '@/views/tournaments/public-page/ui/mock-data';

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
        <div className="p-4 md:p-6 lg:p-8">
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
        </div>
    );
}
