
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { teams, users as allUsers } from '@/mocks';
import type { User } from "@/mocks";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";

export function MyTeamWidget({ user }: { user: User }) {
  const myTeam = teams.find(team => team.members.includes(user.id));

  if (!myTeam) {
    return (
        <Card className="bg-card">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> Моя команда</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
                 <p className="text-sm text-muted-foreground mb-4">Вы еще не состоите в команде.</p>
                 <Button asChild variant="secondary">
                     <Link href="/teams">Найти или создать команду</Link>
                 </Button>
            </CardContent>
        </Card>
    );
  }

  const teamMembers = allUsers.filter(u => myTeam.members.includes(u.id));

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Users /> Моя команда</CardTitle>
         <Link href={`/teams/${myTeam.id}`} className="block group">
            <div className="flex items-center gap-3 pt-2">
                <Image src={myTeam.logoUrl} alt={myTeam.name} width={48} height={48} className="rounded-lg border" data-ai-hint="team logo" />
                <div>
                    <p className="font-bold text-lg group-hover:text-primary transition-colors">{myTeam.name}</p>
                    <p className="text-xs text-muted-foreground">{myTeam.game}</p>
                </div>
            </div>
        </Link>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-around text-center">
            <div>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-muted-foreground">Побед</p>
            </div>
             <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-xs text-muted-foreground">Поражений</p>
            </div>
             <div>
                <p className="text-2xl font-bold text-green-400">79%</p>
                <p className="text-xs text-muted-foreground">Win Rate</p>
            </div>
        </div>
         <div>
            <h4 className="text-sm font-semibold mb-2">Состав:</h4>
            <div className="flex -space-x-2">
                {teamMembers.slice(0, 5).map(member => (
                    <Avatar key={member.id} className="border-2 border-background">
                        <AvatarImage src={member.avatarUrl} alt={member.nickname} />
                        <AvatarFallback>{member.nickname.charAt(0)}</AvatarFallback>
                    </Avatar>
                ))}
            </div>
        </div>
        <Button asChild variant="secondary" size="sm" className="w-full">
            <Link href={`/teams/${myTeam.id}`}>
                Перейти в профиль команды <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
