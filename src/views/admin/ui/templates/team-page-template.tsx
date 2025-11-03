'use client';

import React from 'react';
import type { Team, User } from "@/mocks";
import { Skeleton } from '@/shared/ui/skeleton';
import { TeamPublicPage } from '@/views/teams/team/ui';

interface TeamPageTemplateProps {
  team?: Team;
  teamMembers?: User[];
  isLoading?: boolean;
  teamId?: string; // Add teamId to fetch data if not provided initially
}

export function TeamPageTemplate({
  teamId,
}: TeamPageTemplateProps) {

  // If teamId is provided, let the TeamPublicPage handle its own data fetching.
  if (teamId) {
    return <TeamPublicPage teamId={teamId} />;
  }
  
  // Fallback for when no teamId is provided (e.g., initial admin page state)
  return (
      <div className="p-4 md:p-6 lg:p-8 space-y-6">
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-64 w-full" />
      </div>
  );
}
