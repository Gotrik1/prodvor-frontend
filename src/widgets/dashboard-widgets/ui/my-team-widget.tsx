
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { teams } from '@/mocks';
import type { User } from "@/mocks";

export function MyTeamWidget({ user }: { user: User }) {
  const myTeams = teams.filter(team => team.members.includes(user.id));

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Users /> Мои команды</CardTitle>
      </CardHeader>
      <CardContent>
        {myTeams.length > 0 ? (
            <div className="space-y-3">
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
