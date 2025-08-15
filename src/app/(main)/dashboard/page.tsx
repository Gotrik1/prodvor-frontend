
'use client';

import { users } from '@/mocks';
import { DashboardFeed } from '@/widgets/dashboard-feed';
import { DashboardAside } from '@/widgets/dashboard-aside';
import { PlayerPageTemplate } from '@/views/admin/ui/templates/player-page-template';
import { OrganizerPageTemplate } from '@/views/admin/ui/templates/organizer-page-template';
import { RefereePageTemplate } from '@/views/admin/ui/templates/referee-page-template';
import { CoachPageTemplate } from '@/views/admin/ui/templates/coach-page-template';
import { ManagerPageTemplate } from '@/views/admin/ui/templates/manager-page-template';
import { FanPageTemplate } from '@/views/admin/ui/templates/fan-page-template';
import { PlaceholderTemplate } from '@/views/admin/ui/templates/placeholder-template';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { useEffect } from 'react';

// --- Mock current user ---
// To test different roles, change the ID here to one from `src/mocks/users.ts`
// For example: 'user1' (Игрок), 'staff3' (Организатор), 'staff1' (Судья), etc.
const CURRENT_USER_ID = 'user1'; 
const currentUser = users.find(u => u.id === CURRENT_USER_ID);
// -------------------------

export default function Dashboard() {
  const { setUser } = useUserStore();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    }
  }, [setUser]);


  const renderDashboardByRole = () => {
    if (!currentUser) {
      // Fallback for unknown user
      return <DefaultDashboard />;
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
        return <DashboardContainer><PlaceholderTemplate roleName="Модератор" /></DashboardContainer>;
      default:
        // Default dashboard with feed for roles without a specific template yet
        return <DefaultDashboard />;
    }
  };

  const DefaultDashboard = () => (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <DashboardFeed />
        </div>
        <div className="space-y-6">
          <DashboardAside />
        </div>
      </div>
    </div>
  );

  return renderDashboardByRole();
}
