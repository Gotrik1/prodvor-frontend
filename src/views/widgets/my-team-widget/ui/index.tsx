

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import type { User, Team } from "@/entities/user/types";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/shared/ui/skeleton";
import { ScrollArea } from "@/shared/ui/scroll-area";
import { MyTeamsEmptyState } from "@/views/teams/ui/my-teams-empty-state";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:6000";

export function MyTeamWidget({ user }: { user: User }) {
  const [myTeams, setMyTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { accessToken } = useUserStore();

  useEffect(() => {
    const fetchUserTeams = async () => {
        if (!user || !accessToken) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const response = await axios.get(`${BASE_URL}/api/v1/users/me?include_teams=true`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const userWithTeams = response.data as User & { teams?: Team[] };
            setMyTeams(userWithTeams.teams || []);
        } catch (error) {
            console.error("Failed to fetch user's teams for widget:", error);
            setMyTeams([]);
        } finally {
            setIsLoading(false);
        }
    };
    
    fetchUserTeams();
  }, [user, accessToken]);

  if (isLoading) {
    return (
        <Card className="bg-card shadow-none md:shadow-main-sm">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users /> Мои команды</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <Skeleton className="h-10 w-10 rounded-md" />
                            <div className="space-y-2 flex-grow">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
  }

  if (myTeams.length === 0) {
      return <MyTeamsEmptyState />
  }

  return (
    <Card className="bg-card shadow-none md:shadow-main-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Users /> Мои команды</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-auto max-h-60">
            <div className="space-y-3 pr-4">
                {myTeams.map(team => (
                    <Link href={`/teams/${team.id}`} key={team.id} className="block group">
                        <div className="flex items-center justify-between gap-3 p-2 rounded-md hover:bg-muted/50 transition-colors">
                            <div className="flex items-center gap-3">
                                <Image src={team.logoUrl || 'https://placehold.co/512x512.png'} alt={team.name || 'Team Logo'} width={40} height={40} sizes="40px" className="rounded-md border aspect-square object-cover" data-ai-hint="team logo" />
                                <div>
                                    <p className="font-semibold leading-tight group-hover:text-primary transition-colors">{team.name}</p>
                                    <p className="text-xs text-muted-foreground">{team.sport?.name || ''}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
