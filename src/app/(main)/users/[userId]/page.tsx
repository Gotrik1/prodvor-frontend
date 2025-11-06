

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
import type { User, Team } from '@/mocks';
import { PlayerPageTemplate } from '@/views/admin/ui/templates/player-page-template';
import { UsersApi } from '@/shared/api';
import { apiConfig } from '@/shared/api/axios-instance';

const usersApi = new UsersApi(apiConfig);

async function getUser(userId: string): Promise<(User & { teams?: Team[] }) | undefined> {
    if (!userId) return undefined;
    
    try {
        // First, try to fetch all users and find the one we need. This is more reliable with mock data.
        const allUsersResponse = await usersApi.apiV1UsersGet();
        const allUsers = allUsersResponse.data as unknown as User[];
        const user = allUsers.find(u => u.id === userId);

        if (user) {
            // If user is found in the list, just return it. No need for another specific fetch
            // that might fail with non-numeric IDs. This is the fix.
            return user;
        }

        // If not found in the list, try a direct fetch (for numeric IDs that might exist on backend but not in mock list)
        const numericId = parseInt(userId, 10);
        if (!isNaN(numericId)) {
            const response = await usersApi.apiV1UsersUserIdGet(numericId, true);
            return response.data as unknown as User;
        }

        return undefined;

    } catch (error: any) {
        console.error(`[Server] Failed to fetch user data for ID ${userId}:`, error.message);
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
          return <PlaceholderTemplate roleName={user.role || 'Неизвестная роль'} />;
    }
  }

  return (
    <div className="p-0 md:p-6 lg:p-8">
      {renderContent()}
    </div>
  )
}
