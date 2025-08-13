
import type { Metadata } from 'next';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { users } from '@/mocks';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { PlaceholderTemplate } from '@/views/admin/ui/templates/placeholder-template';
import { RefereePageTemplate } from '@/views/admin/ui/templates/referee-page-template';
import { CoachPageTemplate } from '@/views/admin/ui/templates/coach-page-template';
import { ManagerPageTemplate } from '@/views/admin/ui/templates/manager-page-template';
import { OrganizerPageTemplate } from '@/views/admin/ui/templates/organizer-page-template';
import { PlayerPageTemplate } from '@/views/admin/ui/templates/player-page-template';
import { FanPageTemplate } from '@/views/admin/ui/templates/fan-page-template';

export async function generateMetadata({ params }: { params: { userId: string } }): Promise<Metadata> {
  const user = users.find(s => s.id === params.userId);
  const title = user ? `${user.firstName} ${user.lastName} (${user.role}) | ProDvor` : 'Пользователь не найден | ProDvor';
  const description = user ? `Персональная страница пользователя ${user.firstName} ${user.lastName}.` : 'Запрошенный пользователь не найден.';

  return {
    title,
    description,
  };
}

export default function UserPage({ params }: { params: { userId: string } }) {
  const user = users.find(s => s.id === params.userId);

  if (!user) {
    return (
       <div className="flex flex-col min-h-screen items-center justify-center">
        <Card className="text-center max-w-md w-full">
          <CardHeader>
            <CardTitle>Ошибка 404</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Пользователь не найден.</p>
            <Button asChild className="mt-6">
              <Link href="/dashboard">Вернуться на платформу</Link>
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
            return <PlayerPageTemplate user={user} />;
        case 'Болельщик':
            return <FanPageTemplate user={user} />;
        default:
            return <PlaceholderTemplate roleName={user.role} />;
    }
  }

  return (
    <div className="p-4 md:p-6 lg:p-8">
        <div className="container mx-auto">
            {renderTemplate()}
        </div>
    </div>
  );
}
