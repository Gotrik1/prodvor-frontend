
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

export default function Dashboard() {
  const { user: currentUser } = useUserStore();

  const renderDashboardByRole = () => {
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
                        Чтобы увидеть дашборд, выберите пользователя для симуляции в <a href="/admin/simulation" className="text-primary hover:underline">админ-панели</a>.
                    </p>
                </CardContent>
            </Card>
        </div>
      );
    }

    const userRole = currentUser.role;
    
    // Using a container to maintain consistent padding
    const DashboardContainer = ({ children }: { children: React.ReactNode }) => (
      <div className="p-4 md:p-6 lg:p-8">{children}</div>
    );

    switch (userRole) {
      case 'Игрок':
        return <DashboardContainer><PlayerPageTemplate user={currentUser} /></DashboardContainer>;
      case 'Организатор':
        return <DashboardContainer><OrganizerPageTemplate user={currentUser} /></DashboardContainer>;
      case 'Судья':
        return <DashboardContainer><RefereePageTemplate user={currentUser} /></DashboardContainer>;
      case 'Тренер':
        return <DashboardContainer><CoachPageTemplate user={currentUser} /></DashboardContainer>;
      case 'Менеджер':
        return <DashboardContainer><ManagerPageTemplate user={currentUser} /></DashboardContainer>;
      case 'Болельщик':
        return <DashboardContainer><FanPageTemplate user={currentUser} /></DashboardContainer>;
      case 'Модератор':
      case 'Администратор':
        return <DashboardContainer><PlaceholderTemplate roleName={userRole} /></DashboardContainer>;
      default:
        // Fallback for unknown user or roles without a specific template
        return <DashboardContainer><PlaceholderTemplate roleName={userRole} /></DashboardContainer>;
    }
  };

  return renderDashboardByRole();
}
