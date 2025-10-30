

'use client';

import { Card, CardContent, CardHeader } from "@/shared/ui/card";
import { formatDistanceToNow } from 'date-fns';
import { ru } from 'date-fns/locale';
import Link from 'next/link';
import Image from "next/image";
import { useState, useEffect } from "react";
import type { FeedEvent } from '@/mocks/feed-events';
import { users, teams, achievementsBySport } from '@/mocks';
import { Award, UserPlus, Trophy } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const eventTypeConfig: Record<FeedEvent['type'], { icon: LucideIcon, verb: string }> = {
    'team_join': { icon: UserPlus, verb: 'присоединился к команде' },
    'match_win': { icon: Trophy, verb: 'одержал победу в матче' },
    'achievement_unlocked': { icon: Award, verb: 'получил достижение' },
}

export function EventCard({ event }: { event: FeedEvent }) {
  const [timeAgo, setTimeAgo] = useState('');

  useEffect(() => {
    const postDate = new Date(event.timestamp);
    setTimeAgo(formatDistanceToNow(postDate, { addSuffix: true, locale: ru }));
  }, [event.timestamp]);

  const mainUser = users.find(u => u.id === event.userIds[0]);
  const mainTeam = teams.find(t => t.id === event.teamIds[0]);

  if (!mainUser && !mainTeam) return null;

  const config = eventTypeConfig[event.type];

  const renderTitle = () => (
    <div className="flex flex-wrap items-center gap-1.5 text-sm">
        <Link href={`/users/${mainUser?.id}`} className="font-bold hover:underline">{mainUser?.nickname}</Link>
        <span className="text-muted-foreground">{config.verb}</span>
        {mainTeam && <Link href={`/teams/${mainTeam?.id}`} className="font-bold hover:underline flex items-center gap-1.5">
            <Image src={mainTeam.logoUrl} width={16} height={16} alt={mainTeam.name} data-ai-hint="team logo" className="rounded-sm" />
            {mainTeam.name}
        </Link>}
    </div>
  );
  
  const renderContent = () => {
      switch(event.type) {
        case 'match_win': {
            const team1 = mainTeam;
            const team2 = teams.find(t => t.id === event.teamIds[1]);
            if (!team1 || !team2) return null;
            return (
                <div className="flex items-center justify-between p-3 rounded-md bg-muted/50">
                    <div className="flex items-center gap-2 font-semibold">
                         <Image src={team1.logoUrl} width={24} height={24} alt={team1.name} data-ai-hint="team logo" className="rounded-md" />
                         {team1.name}
                    </div>
                    <div className="font-bold text-lg">{event.details.score1} : {event.details.score2}</div>
                    <div className="flex items-center gap-2 font-semibold justify-end">
                         {team2.name}
                         <Image src={team2.logoUrl} width={24} height={24} alt={team2.name} data-ai-hint="team logo" className="rounded-md" />
                    </div>
                </div>
            )
        }
        case 'achievement_unlocked': {
            const achievement = Object.values(achievementsBySport).flat().find(a => a.id === event.details.achievementId);
            if (!achievement) return null;
            return (
                <div className="flex items-center gap-3 p-3 rounded-md bg-muted/50">
                    <achievement.icon className="h-8 w-8 text-amber-400" />
                    <div>
                        <p className="font-semibold">{achievement.name}</p>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                    </div>
                </div>
            )
        }
        default:
            return null;
      }
  }

  return (
    <Card className="bg-card">
      <CardHeader className="flex flex-row items-start gap-4 p-4 pb-2">
        <div className="p-2 rounded-full bg-primary/10 text-primary mt-1">
          <config.icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          {renderTitle()}
          <p className="text-xs text-muted-foreground">{timeAgo || '...'}</p>
        </div>
      </CardHeader>
      {renderContent() && (
        <CardContent className="px-4 pb-4">
            {renderContent()}
        </CardContent>
      )}
    </Card>
  );
}
