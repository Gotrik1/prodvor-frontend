import type { Metadata } from 'next';
import { AdminLayout } from '@/views/admin/pages/layout';
import { AdminDashboardPage } from '@/views/admin/pages/dashboard';
import { AdminStatisticsPage } from '@/views/admin/pages/statistics';
import { AdvertisingPage } from '@/views/admin/advertising';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { UserPage } from '@/views/admin/pages/users';
import { SponsorPage } from '@/views/admin/pages/sponsors';
import { TemplatePreviewPage, templateMap, templateMockData } from '@/views/admin/pages/templates';
import { SimulationPage } from '@/views/admin/pages/simulation';


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
        return <AdvertisingPage />;
      case 'simulation':
        return <SimulationPage />;
      case 'users':
        return <UserPage userId={subpage} />;
      case 'sponsors':
        return <SponsorPage sponsorId={subpage} />;
      case 'templates':
        if (!subpage) return <NotFoundAdminPage />;
        const TemplateComponent = templateMap[subpage as keyof typeof templateMap];
        const mockData = templateMockData[subpage as keyof typeof templateMockData];
        const title = subpage.charAt(0).toUpperCase() + subpage.slice(1);
        return TemplateComponent ? <TemplatePreviewPage title={`Шаблон: ${title}`}><TemplateComponent {...mockData} /></TemplatePreviewPage> : <NotFoundAdminPage />;
      default:
        return <NotFoundAdminPage />;
    }
  };

  return <AdminLayout>{renderPage()}</AdminLayout>;
}
