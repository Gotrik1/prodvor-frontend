import type { Metadata } from 'next';
import { AdminLayout } from '@/views/admin/pages/layout';
import { AdminDashboardPage } from '@/views/admin/pages/dashboard';
import { AdminStatisticsPage } from '@/views/admin/pages/statistics';
import { AdminAdvertisingPage } from '@/views/admin/advertising';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

// --- Template Imports ---
import { CoachPageTemplate } from '@/views/admin/ui/templates/coach-page-template';
import { FanPageTemplate } from '@/views/admin/ui/templates/fan-page-template';
import { ManagerPageTemplate } from '@/views/admin/ui/templates/manager-page-template';
import { PlaceholderTemplate } from '@/views/admin/ui/templates/placeholder-template';
import { OrganizerPageTemplate } from '@/views/admin/ui/templates/organizer-page-template';
import { PlayerPageTemplate } from '@/views/admin/ui/templates/player-page-template';
import { RefereePageTemplate } from '@/views/admin/ui/templates/referee-page-template';
import { SponsorPageTemplate } from '@/views/admin/ui/templates/sponsor-page-template';
import { TeamPageTemplate } from '@/views/admin/ui/templates/team-page-template';
import { UserPage } from '@/app/(admin)/users/[userId]/page';
import { SponsorPage } from '@/app/(admin)/sponsors/[sponsorId]/page';
import { TemplatePreviewPage } from './templates/TemplatePreviewPage';


export const metadata: Metadata = {
    title: 'Администрирование | ProDvor',
    description: 'Панель администратора ProDvor',
};

function NotFoundAdminPage() {
    return (
        <div className="flex flex-col min-h-[80vh] items-center justify-center">
            <Card className="text-center max-w-md w-full">
                <CardHeader>
                    <CardTitle>Ошибка 404</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Страница администрирования не найдена.
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/admin">Вернуться в админ-панель</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

const templateMap = {
    coach: CoachPageTemplate,
    fan: FanPageTemplate,
    manager: ManagerPageTemplate,
    moderator: () => <PlaceholderTemplate roleName="Модератор" />,
    organizer: OrganizerPageTemplate,
    player: PlayerPageTemplate,
    referee: RefereePageTemplate,
    sponsor: SponsorPageTemplate,
    team: TeamPageTemplate,
};

export default function AdminPage({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const page = slug?.[0] || 'dashboard';
  const subpage = slug?.[1];

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <AdminDashboardPage />;
      case 'statistics':
        return <AdminStatisticsPage />;
      case 'advertising':
        return <AdminAdvertisingPage />;
      case 'users':
        return <UserPage params={{ userId: subpage }} />;
      case 'sponsors':
        return <SponsorPage params={{ sponsorId: subpage }} />;
      case 'templates':
        if (!subpage) return <NotFoundAdminPage />;
        const TemplateComponent = templateMap[subpage as keyof typeof templateMap];
        const title = subpage.charAt(0).toUpperCase() + subpage.slice(1);
        return TemplateComponent ? <TemplatePreviewPage title={`Шаблон: ${title}`}><TemplateComponent /></TemplatePreviewPage> : <NotFoundAdminPage />;
      default:
        return <NotFoundAdminPage />;
    }
  };

  return <AdminLayout>{renderPage()}</AdminLayout>;
}
