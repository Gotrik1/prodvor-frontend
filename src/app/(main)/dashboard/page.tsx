
'use client';

import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { PlayerPageTemplate } from '@/views/admin/ui/templates/player-page-template';
import { OrganizerPageTemplate } from '@/views/admin/ui/templates/organizer-page-template';
import { RefereePageTemplate } from '@/views/admin/ui/templates/referee-page-template';
import { CoachPageTemplate } from '@/views/admin/ui/templates/coach-page-template';
import { ManagerPageTemplate } from '@/views/admin/ui/templates/manager-page-template';
import { FanPageTemplate } from '@/views/admin/ui/templates/fan-page-template';
import { PlaceholderTemplate } from '@/views/admin/ui/templates/placeholder-template';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { EyeOff } from 'lucide-react';
import Link from 'next/link';
import { DashboardFeed } from '@/widgets/dashboard-feed';
import { DashboardAside } from '@/widgets/dashboard-aside';

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
        <div className="lg:col-span-3 space-y-6">
            <DashboardFeed />
        </div>
        <aside className="lg:col-span-1 space-y-6 lg:sticky top-24">
            <DashboardAside />
        </aside>
    </div>
  );
}
