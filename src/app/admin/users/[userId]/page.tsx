
import type { Metadata } from 'next';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { ArrowLeft, User as UserIcon } from 'lucide-react';
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

export function UserPage({ params }: { params: { userId: string } }) {
  const user = users.find(s => s.id === params.userId);

  if (!user) {
    return (
       <div className="flex flex-col min-h-screen bg-background text-foreground items-center justify-center">
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
    <div className="bg-background min-h-screen">
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                 <Button asChild variant="outline">
                    <Link href="/tournaments/mytourney1/manage">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Назад к турниру
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    <UserIcon className="h-5 w-5 text-muted-foreground" />
                    <h1 className="text-lg font-semibold">{user.firstName} {user.lastName}</h1>
                </div>
            </div>
        </header>
        <main className="p-4 md:p-6 lg:p-8">
            <div className="container mx-auto">
                {renderTemplate()}
            </div>
        </main>
    </div>
  );
}
