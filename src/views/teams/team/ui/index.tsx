'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { useTeam, isTeamExpanded } from '@/entities/team/lib/use-team';
import type { User } from '@/mocks';
import Link from 'next/link';

// Карточка для отображения участника команды
const MemberCard = ({ member }: { member: User }) => (
  <Card>
    <CardContent className="p-4 flex items-center gap-3">
      <img
        src={member.avatarUrl}
        alt={member.nickname}
        className="h-10 w-10 rounded-full"
      />
      <div>
        <p className="font-semibold">{member.nickname}</p>
        <p className="text-xs text-muted-foreground">{member.firstName} {member.lastName}</p>
      </div>
    </CardContent>
  </Card>
);

export function TeamPublicPage({ teamId }: { teamId: string }) {
  const [expand, setExpand] = useState(false);
  const numericTeamId = parseInt(teamId, 10);
  
  // 4. Используем наш новый хук
  const { team, count, isLoading, error } = useTeam(numericTeamId, expand);

  const handleShowMembers = () => {
    setExpand(true);
  };
  
  if (isLoading && !team) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-4">
        <Skeleton className="h-12 w-1/2" />
        <Skeleton className="h-8 w-1/4" />
        <Skeleton className="h-24 w-full" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-destructive">{error}</p>
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <CardHeader><CardTitle>Ошибка 404</CardTitle></CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Команда не найдена.</p>
            <Button asChild className="mt-6">
              <Link href="/teams">К списку команд</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-6">
      <h1 className="text-4xl font-bold">{team.name}</h1>
      <p className="text-lg text-muted-foreground">Дисциплина: {team.sport.name}</p>
      
      <Card>
        <CardHeader>
          <CardTitle>Состав команды</CardTitle>
          <CardContent className="p-4">
            <p>Всего участников: <span className="font-bold">{count}</span></p>

            {isTeamExpanded(team) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                {team.members.map(member => (
                  <MemberCard key={member.id} member={member} />
                ))}
              </div>
            ) : (
              <Button onClick={handleShowMembers} className="mt-4" disabled={isLoading}>
                {isLoading ? 'Загрузка...' : 'Показать участников'}
              </Button>
            )}
          </CardContent>
        </CardHeader>
      </Card>
    </div>
  );
}
