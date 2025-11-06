

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
    
    // The backend expects a number, but our mock data uses string IDs.
    // We'll pass a number to the SDK call to satisfy typing, but the actual logic
    // might rely on mocks or an updated backend that handles string IDs.
    const idToFetch = parseInt(userId, 10);
    const numericId = isNaN(idToFetch) ? 0 : idToFetch; // Fallback for string IDs like 'user1'

    try {
        // The SDK call requires a number. We pass our parsed/fallback numericId.
        const response = await usersApi.apiV1UsersUserIdGet(numericId, true);
        
        // Let's find the user in our mock data using the original string ID,
        // as the backend might not be fully integrated yet.
        // In a real scenario, the response.data would be the source of truth.
        const allUsersResponse = await usersApi.apiV1UsersGet();
        const allUsers = allUsersResponse.data as unknown as User[];
        const user = allUsers.find(u => u.id === userId);

        return user || response.data as unknown as User;
    } catch (error: any) {
        // Fallback to searching mock data directly if the API call fails
        try {
            const allUsersResponse = await usersApi.apiV1UsersGet();
            const allUsers = allUsersResponse.data as unknown as User[];
            const user = allUsers.find(u => u.id === userId);
            if (user) return user;
        } catch (e) {
             console.error(`[Server] Final fallback failed to fetch users: ${e}`);
        }

        console.error(`[Server] Failed to fetch user: ${error.response?.status || error.message}`);
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
