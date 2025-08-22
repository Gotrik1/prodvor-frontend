
import type { Metadata } from 'next';
import { AdminLayout } from '@/views/admin/pages/layout';
import { AdminDashboardPage } from '@/views/admin/pages/dashboard';
import { AdvertisingPage } from '@/views/admin/advertising';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { UserPage } from '@/views/admin/pages/users';
import { SponsorPage } from '@/views/admin/pages/sponsors';
import {
  TemplatePreviewPage,
  templateMap,
} from '@/views/admin/pages/templates';
import { SimulationPage } from '@/views/admin/pages/simulation';
import { teams, users } from '@/mocks';
import { TeamPageTemplate } from '@/views/admin/ui/templates/team-page-template';
import { DocsPage } from '@/views/admin/pages/docs';

export const metadata: Metadata = {
  title: 'Администрирование | ProDvor',
  description: 'Панель администратора ProDvor',
};

function NotFoundAdminPage({
  message,
  backLink,
  backLinkText,
}: {
  message: string;
  backLink: string;
  backLinkText: string;
}) {
  return (
    <div className="flex flex-col min-h-[80vh] items-center justify-center">
      <Card className="text-center max-w-md w-full">
        <CardHeader>
          <CardTitle>Ошибка 404</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{message}</p>
          <Button asChild className="mt-6">
            <Link href={backLink}>{backLinkText}</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default function AdminPage({ params }: { params: { slug: string[] } }) {
  const { slug } = params;
  const page = slug?.[0] || 'dashboard';
  const subpage = slug?.[1];

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <AdminDashboardPage />;
      case 'advertising':
        return <AdvertisingPage />;
      case 'simulation':
        return <SimulationPage />;
      case 'docs':
        return <DocsPage />;
      case 'users':
        return <UserPage userId={subpage} />;
      case 'teams':
        const team = teams.find((t) => t.id === subpage);
        if (subpage && !team) {
          return (
            <NotFoundAdminPage
              message={`Команда с ID "${subpage}" не найдена.`}
              backLink="/admin"
              backLinkText="Вернуться в дашборд"
            />
          );
        }
        return <TeamPageTemplate team={team} />;
      case 'sponsors':
        return <SponsorPage sponsorId={subpage} />;
      case 'templates':
        if (!subpage)
          return (
            <NotFoundAdminPage
              message="Страница администрирования не найдена."
              backLink="/admin"
              backLinkText="Вернуться в админ-панель"
            />
          );
        const TemplateComponent =
          templateMap[subpage as keyof typeof templateMap];
        const title = subpage.charAt(0).toUpperCase() + subpage.slice(1);
        const playerUser = users.find((u) => u.role === 'Игрок');

        if (subpage === 'team') {
          return (
            <TemplatePreviewPage title={`Шаблон: Команда`}>
              <TeamPageTemplate team={teams[0]} />
            </TemplatePreviewPage>
          );
        }

        if (subpage === 'player' && playerUser) {
          return (
            <TemplatePreviewPage title={`Шаблон: Игрок`}>
              <templateMap.player user={playerUser} />
            </TemplatePreviewPage>
          );
        }

        if (TemplateComponent) {
          // @ts-ignore
          return (
            <TemplatePreviewPage title={`Шаблон: ${title}`}>
              <TemplateComponent user={playerUser} />
            </TemplatePreviewPage>
          );
        }

        return (
          <NotFoundAdminPage
            message="Страница администрирования не найдена."
            backLink="/admin"
            backLinkText="Вернуться в админ-панель"
          />
        );
      default:
        return (
          <NotFoundAdminPage
            message="Страница администрирования не найдена."
            backLink="/admin"
            backLinkText="Вернуться в админ-панель"
          />
        );
    }
  };

  return <AdminLayout>{renderPage()}</AdminLayout>;
}
