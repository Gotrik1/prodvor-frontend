
import { TeamPageTemplate } from '@/views/admin/ui/templates/team-page-template';
import { teams } from '@/mocks';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { AdminLayout } from '@/views/admin/pages/layout';

export default function AdminTeamPage({ params }: { params: { teamId: string } }) {
  const { teamId } = params;
  const team = teams.find(t => t.id === teamId);

  if (!team) {
    return (
      <AdminLayout>
        <div className="flex flex-col min-h-[80vh] items-center justify-center">
            <Card className="text-center max-w-md w-full">
                <CardHeader>
                    <CardTitle>Ошибка 404</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Команда с ID "{teamId}" не найдена.
                    </p>
                    <Button asChild className="mt-6">
                        <Link href="/admin/statistics">Вернуться к списку</Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
        <TeamPageTemplate team={team} />
    </AdminLayout>
  );
}
