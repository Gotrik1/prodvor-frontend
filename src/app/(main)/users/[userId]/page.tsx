
import { users } from '@/mocks';
import { PlayerPageTemplate } from '@/views/admin/ui/templates/player-page-template';
import type { Metadata } from 'next';
import { CoachPageTemplate } from '@/views/admin/ui/templates/coach-page-template';
import { FanPageTemplate } from '@/views/admin/ui/templates/fan-page-template';
import { ManagerPageTemplate } from '@/views/admin/ui/templates/manager-page-template';
import { OrganizerPageTemplate } from '@/views/admin/ui/templates/organizer-page-template';
import { RefereePageTemplate } from '@/views/admin/ui/templates/referee-page-template';
import { PlaceholderTemplate } from '@/views/admin/ui/templates/placeholder-template';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';

export async function generateMetadata({ params }: { params: { userId: string } }): Promise<Metadata> {
  const user = users.find(u => u.id === params.userId);
  const title = user ? `Профиль ${user.nickname} | ProDvor` : 'Пользователь не найден | ProDvor';
  const description = user ? `Публичный профиль пользователя ${user.firstName} ${user.lastName} (${user.nickname}).` : 'Запрошенный пользователь не найден.';

  return {
    title,
    description,
  };
}


export default function UserProfilePage({ params }: { params: { userId: string } }) {
   const user = users.find(s => s.id === params.userId);

   if (!user) {
    return (
       <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <CardHeader>
            <CardTitle>Ошибка 404</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Пользователь не найден.</p>
            <Button asChild className="mt-6">
              <Link href="/dashboard">Вернуться в дашборд</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderTemplate = () => {
    switch (user.role) {
      case 'Судья':
          return <RefereePageTemplate user={user} />;
      case 'Тренер':
          return <CoachPageTemplate user={user} />;
      case 'Менеджер':
          return <ManagerPageTemplate user={user} />;
      case 'Организатор':
          return <OrganizerPageTemplate user={user} />;
      case 'Игрок':
      case 'Капитан':
          return <PlayerPageTemplate user={user} />;
      case 'Болельщик':
          return <FanPageTemplate user={user} />;
      default:
          return <PlaceholderTemplate roleName={user.role} />;
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      {renderTemplate()}
    </div>
  )
}
