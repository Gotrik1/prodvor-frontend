
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Trophy, BarChart, Swords } from 'lucide-react';
import { TournamentsPage } from '@/views/tournaments';
import { LeaguesPage } from '@/views/leagues';
import { ChallengesPage } from '@/views/challenges';

export function CompetitionsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Соревнования</h1>
        <p className="text-muted-foreground mt-1">
          Все соревновательные активности в одном месте.
        </p>
      </div>
      <Tabs defaultValue="tournaments" className="w-full">
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger value="tournaments">
            <Trophy className="mr-2 h-4 w-4" />
            Турниры
          </TabsTrigger>
          <TabsTrigger value="leagues">
            <BarChart className="mr-2 h-4 w-4" />
            Лиги
          </TabsTrigger>
          <TabsTrigger value="challenges">
            <Swords className="mr-2 h-4 w-4" />
            Вызовы
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tournaments" className="mt-6">
          <TournamentsPage />
        </TabsContent>
        <TabsContent value="leagues" className="mt-6">
          <LeaguesPage />
        </TabsContent>
        <TabsContent value="challenges" className="mt-6">
          <ChallengesPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
