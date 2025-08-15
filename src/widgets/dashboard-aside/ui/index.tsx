import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Bot, Lightbulb, Trophy } from "lucide-react";
import { tournaments } from "@/mocks";
import Link from "next/link";
import { Progress } from "@/shared/ui/progress";
import { Badge } from "@/shared/ui/badge";
import Image from "next/image";

type TournamentStatus = 'АНОНС' | 'ПРЕДРЕГИСТРАЦИЯ' | 'РЕГИСТРАЦИЯ' | 'ИДЕТ' | 'ЗАВЕРШЕН';

const statusColors: Record<TournamentStatus, string> = {
    'АНОНС': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'ПРЕДРЕГИСТРАЦИЯ': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    'РЕГИСТРАЦИЯ': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'ИДЕТ': 'bg-green-500/20 text-green-300 border-green-500/30',
    'ЗАВЕРШЕН': 'bg-muted text-muted-foreground border-border',
};

const activeTournaments = tournaments.filter(t => t.status === 'ИДЕТ' || t.status === 'РЕГИСТРАЦИЯ');

export function DashboardAside() {
  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Trophy /> Активные турниры</CardTitle>
          <CardDescription>Присоединяйтесь к текущим соревнованиям.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {activeTournaments.length > 0 ? (
            activeTournaments.map(tournament => (
              <Link href={`/tournaments/${tournament.id}`} key={tournament.id} className="block group">
                <div className="space-y-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-3">
                     <Image src={tournament.bannerUrl} alt={tournament.name} width={48} height={32} className="rounded-md object-cover" data-ai-hint={tournament.dataAiHint} />
                      <div>
                          <p className="font-semibold leading-tight group-hover:text-primary">{tournament.name}</p>
                          <p className="text-xs text-muted-foreground">{tournament.game}</p>
                      </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <Badge className={`${statusColors[tournament.status as TournamentStatus]}`}>{tournament.status}</Badge>
                      <p className="text-xs font-semibold">{tournament.participants} / {tournament.maxParticipants}</p>
                    </div>
                    <Progress value={(tournament.participants / tournament.maxParticipants) * 100} />
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-sm text-muted-foreground text-center py-4">Сейчас нет активных турниров.</p>
          )}
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
            <CardTitle>Партнерский блок</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-muted rounded-lg border flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Место для баннера</p>
          </div>
        </CardContent>
       </Card>
    </>
  );
}
