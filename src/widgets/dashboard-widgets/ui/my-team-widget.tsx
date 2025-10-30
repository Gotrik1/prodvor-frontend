
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { teams } from '@/mocks';
import type { User, Team } from "@/mocks";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { ScrollArea, ScrollBar } from "@/shared/ui/scroll-area";

export function MyTeamWidget({ user }: { user: User }) {
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const userTeams = teams.filter(team => team.members.includes(user.id));
    setMyTeams(userTeams);
  }, [user]);

  return (
    <Card className="bg-card shadow-none md:shadow-main-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Users /> Мои команды</CardTitle>
      </CardHeader>
      <CardContent>
        {!isClient ? (
             <div className="space-y-3">
                <div className="flex items-center gap-3"><Skeleton className="h-10 w-10 rounded-md" /><div className="space-y-2"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-16" /></div></div>
                <div className="flex items-center gap-3"><Skeleton className="h-10 w-10 rounded-md" /><div className="space-y-2"><Skeleton className="h-4 w-20" /><Skeleton className="h-3 w-12" /></div></div>
            </div>
        ) : myTeams.length > 0 ? (
            <ScrollArea className="h-60">
                <div className="space-y-3 pr-4">
                    {myTeams.map(team => (
                        <Link href={`/teams/${team.id}`} key={team.id} className="block group">
                             <div className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <Image src={team.logoUrl} alt={team.name} width={40} height={40} className="rounded-md border" data-ai-hint="team logo" />
                                    <div>
                                        <p className="font-semibold leading-tight group-hover:text-primary transition-colors">{team.name}</p>
                                        <p className="text-xs text-muted-foreground">{team.game}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-mono text-sm font-semibold">{team.rank}</p>
                                    <p className="text-xs text-muted-foreground">ELO</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </ScrollArea>
        ) : (
             <div className="text-center">
                <p className="text-sm text-muted-foreground mb-4">Вы еще не состоите в команде.</p>
                <Button asChild variant="secondary">
                    <Link href="/teams">Найти или создать команду</Link>
                </Button>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
