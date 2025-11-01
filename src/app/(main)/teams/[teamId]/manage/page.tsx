
'use client';

import { TeamManagementPage } from '@/views/teams/manage';
import type { Metadata } from 'next';
import type { Team } from '@/mocks';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '@/shared/ui/skeleton';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

async function getTeam(teamId: string): Promise<Team | undefined> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
    if (!API_BASE_URL) {
        console.error("[ Server ] NEXT_PUBLIC_API_BASE_URL is not defined.");
        return undefined;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/teams/${teamId}`);
        if (!response.ok) return undefined;
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch team:", error);
        return undefined;
    }
}

export default function ManageTeamPage({ params }: { params: { teamId: string } }) {
  const { user: currentUser } = useUserStore();
  const [team, setTeam] = useState<Team | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [isCaptain, setIsCaptain] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const teamData = await getTeam(params.teamId);
      setTeam(teamData);
      if (teamData && currentUser) {
        setIsCaptain(currentUser.id === teamData.captainId);
      }
      setLoading(false);
    }
    fetchData();
  }, [params.teamId, currentUser]);

  if (loading) {
    return (
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-96 w-full" />
      </div>
    );
  }

  if (!team) {
    return (
      <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <CardHeader>
            <CardTitle>Команда не найдена</CardTitle>
          </CardHeader>
          <CardContent>
            <Button asChild className="mt-6">
              <Link href="/teams">К списку команд</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!isCaptain) {
    return (
      <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <CardHeader>
            <CardTitle>Доступ запрещен</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Только капитан может управлять командой.</p>
            <Button asChild className="mt-6">
              <Link href={`/teams/${team.id}`}>Вернуться к команде</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <TeamManagementPage team={team} />;
}
