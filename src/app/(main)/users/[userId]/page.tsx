

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { PlayerPage } from '@/views/users/player';
import type { User } from '@/entities/user/types';
import { UsersApi } from '@/shared/api';
import { apiConfig } from '@/shared/api/axios-instance';
import axios from 'axios';

const usersApi = new UsersApi(apiConfig);

async function getUser(userId: string): Promise<User | undefined> {
    if (!userId) {
        return undefined;
    }
    
    try {
        // The generated API client expects a number for the user ID.
        // We will parse it from the string. A more robust solution
        // might use a different ID scheme or handle non-numeric IDs.
        const numericUserId = parseInt(userId, 10);
        if (isNaN(numericUserId)) {
            // If the userId is not a number (e.g. a UUID as in the error), 
            // we can't call the current API. We'll log this and return undefined.
            console.warn(`[Server] User ID "${userId}" is not a valid number for the API.`);
            return undefined;
        }

        const response = await usersApi.apiV1UsersUserIdGet(numericUserId, true);
        return response.data as User;
    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
            console.log(`[Server] User with ID ${userId} not found on the backend.`);
        } else {
            console.error(`[Server] Failed to fetch user data for ID ${userId}:`, error.message || error);
        }
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

  // For now, we assume all non-found roles are Player for template rendering.
  // In a real app, you'd have templates for each role.
  return (
    <div className="p-0 md:p-6 lg:p-8">
      <PlayerPage user={user} />
    </div>
  )
}
