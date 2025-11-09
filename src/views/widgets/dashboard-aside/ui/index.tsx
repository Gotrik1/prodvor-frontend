

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Trophy, Megaphone } from "lucide-react";
import type { Tournament } from "@/mocks";
import Link from "next/link";
import { Progress } from "@/shared/ui/progress";
import { Badge } from "@/shared/ui/badge";
import Image from "next/image";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import React, { useMemo, useState, useEffect } from "react";
import { api } from '@/shared/api/axios-instance';

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


const AdBannerPlaceholder = () => (
    <Card className="bg-muted/30 border-dashed">
        <CardContent className="p-4 text-center text-muted-foreground text-sm flex items-center justify-center h-48">
            <div>
                <Megaphone className="mx-auto h-8 w-8 mb-2" />
                <p>Рекламное место</p>
            </div>
        </CardContent>
    </Card>
)


export function DashboardAside() {
  const { user } = useUserStore();
  const [tournaments, setTournaments] = useState<Tournament[]>([]);

  useEffect(() => {
    const fetchTournaments = async () => {
        try {
            const response = await api.get('/api/v1/tournaments');
            setTournaments(response.data.data);
        } catch (error) {
            console.error("Failed to fetch tournaments for aside widget:", error);
        }
    };
    fetchTournaments();
  }, []);

  const activeTournaments = useMemo(() => {
    return tournaments.filter((t: Tournament) => {
      const isActiveStatus = t.status === 'ИДЕТ' || t.status === 'РЕГИСТРАЦИЯ';
      if (!isActiveStatus) return false;

      // Show all federal tournaments
      if (t.level === 'Федеральный') return true;
      
      // Show regional/city tournaments if user's city matches
      if ((t.level === 'Региональный' || t.level === 'Городской') && user?.city === t.location) {
          return true;
      }

      return false;
    });
  }, [user, tournaments]);
  
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
            <p className="text-sm text-muted-foreground text-center py-4">Сейчас нет активных турниров для вашего региона.</p>
          )}
        </CardContent>
      </Card>
      <AdBannerPlaceholder />
    </>
  );
}
