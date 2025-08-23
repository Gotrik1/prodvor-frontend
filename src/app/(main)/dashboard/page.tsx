
'use client';

import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { EyeOff } from 'lucide-react';
import Link from 'next/link';
import { DashboardFeed } from '@/widgets/dashboard-feed';
import { DashboardAside } from '@/widgets/dashboard-aside';
import { PlayerStatsWidget } from '@/widgets/dashboard-widgets/ui/player-stats-widget';
import { MyTeamWidget } from '@/widgets/dashboard-widgets/ui/my-team-widget';
import { ActiveQuestsWidget } from '@/widgets/dashboard-widgets/ui/active-quests-widget';
import { UpcomingEventsWidget } from '@/widgets/dashboard-widgets/ui/upcoming-events-widget';

export default function Dashboard() {
  const { user: currentUser } = useUserStore();

  if (!currentUser) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-4">
           <Card className="text-center max-w-md w-full">
              <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                    <EyeOff className="h-12 w-12" />
                  </div>
                  <CardTitle className="mt-4 text-2xl font-headline">Пользователь не выбран</CardTitle>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground">
                      Чтобы увидеть дашборд, выберите пользователя для симуляции в <Link href="/admin/simulation" className="text-primary hover:underline">админ-панели</Link>.
                  </p>
              </CardContent>
          </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 p-4 md:p-6 lg:p-8 items-start">
        <aside className="hidden lg:block lg:col-span-1 space-y-6 lg:sticky top-24">
            <PlayerStatsWidget user={currentUser} />
            <MyTeamWidget user={currentUser} />
            <ActiveQuestsWidget />
        </aside>
        <div className="lg:col-span-2 space-y-6">
            <DashboardFeed />
        </div>
        <aside className="lg:col-span-1 space-y-6 lg:sticky top-24">
            <UpcomingEventsWidget />
            <DashboardAside />
        </aside>
    </div>
  );
}
