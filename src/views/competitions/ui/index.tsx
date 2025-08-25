
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Trophy, BarChart, Swords } from 'lucide-react';
import { TournamentsPage } from '@/views/tournaments';
import { LeaguesPage } from '@/views/leagues';
import { ChallengesPage } from '@/views/challenges';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

const competitionTabs = [
  { value: 'tournaments', label: 'Турниры', icon: Trophy, component: <TournamentsPage /> },
  { value: 'leagues', label: 'Лиги', icon: BarChart, component: <LeaguesPage /> },
  { value: 'challenges', label: 'Вызовы', icon: Swords, component: <ChallengesPage /> },
];

export function CompetitionsPage() {
  const [activeTab, setActiveTab] = useState('tournaments');

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Соревнования</h1>
        <p className="text-muted-foreground mt-1">
          Все соревновательные активности в одном месте.
        </p>
      </div>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Desktop Tabs */}
        <div className="hidden sm:block">
          <TabsList>
            {competitionTabs.map(tab => (
              <TabsTrigger key={tab.value} value={tab.value}>
                <tab.icon className="mr-2 h-4 w-4" />
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        
        {/* Mobile Select */}
        <div className="sm:hidden">
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger>
              <SelectValue placeholder="Выберите раздел..." />
            </SelectTrigger>
            <SelectContent>
              {competitionTabs.map(tab => (
                <SelectItem key={tab.value} value={tab.value}>
                  <div className="flex items-center gap-2">
                    <tab.icon className="h-4 w-4" />
                    {tab.label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {competitionTabs.map(tab => (
          <TabsContent key={tab.value} value={tab.value} className="mt-6">
            {tab.component}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
