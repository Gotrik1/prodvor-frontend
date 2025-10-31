

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { CoachPageTemplate } from '@/views/admin/ui/templates/coach-page-template';
import { FanPageTemplate } from '@/views/admin/ui/templates/fan-page-template';
import { ManagerPageTemplate } from '@/views/admin/ui/templates/manager-page-template';
import { OrganizerPageTemplate } from '@/views/admin/ui/templates/organizer-page-template';
import { RefereePageTemplate } from '@/views/admin/ui/templates/referee-page-template';
import { PlaceholderTemplate } from '@/views/admin/ui/templates/placeholder-template';
import type { User } from '@/mocks';
import { PlayerPageTemplate } from '@/views/admin/ui/templates/player-page-template';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

async function getUser(userId: string): Promise<User | undefined> {
    if (!API_BASE_URL) {
        console.error("API_BASE_URL is not defined");
        return undefined;
    }
    try {
        const response = await fetch(`${API_BASE_URL}/api/v1/users/${userId}`);
        if (!response.ok) {
            console.error(`Failed to fetch user: ${response.status}`);
            return undefined;
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch user:", error);
        return undefined;
    }
}


export async function generateMetadata({ params }: { params: { userId: string } }): Promise<Metadata> {
  const user = await getUser(params.userId);
  const title = user ? `Профиль ${user.nickname} | ProDvor` : 'Пользователь не найден | ProDvor';
  const description = user ? `Публичный профиль пользователя ${user.nickname}.` : 'Запрошенный пользователь не найден.';

  return {
    title,
    description,
  };
}

export default async function UserProfilePage({ params }: { params: { userId: string } }) {
   const user = await getUser(params.userId);

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

  const renderContent = () => {
    switch (user.role) {
      case 'Судья':
      case 'referee':
          return <RefereePageTemplate user={user} />;
      case 'Тренер':
      case 'coach':
          return <CoachPageTemplate user={user} />;
      case 'Менеджер':
          return <ManagerPageTemplate user={user} />;
      case 'Организатор':
          return <OrganizerPageTemplate user={user} />;
      case 'Игрок':
      case 'player':
      case 'Капитан':
          return <PlayerPageTemplate user={user} />;
      case 'Болельщик':
          return <FanPageTemplate user={user} />;
      default:
          return <PlaceholderTemplate roleName={user.role} />;
    }
  }

  return (
    <div className="p-0 md:p-6 lg:p-8">
      {renderContent()}
    </div>
  )
}
