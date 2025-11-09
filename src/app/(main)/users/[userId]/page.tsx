

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { PlayerPage } from '@/views/users/player';
import type { User } from '@/entities/user/types';
import { api } from '@/shared/api/axios-instance';
import axios from 'axios';

async function getUser(userId: string): Promise<User | undefined> {
    if (!userId) {
        return undefined;
    }
    
    try {
        const response = await api.get(`/api/v1/users/${userId}?include_teams=true`);
        // The API returns the user object directly on success.
        // If response.data exists, we have a user.
        if (response.data) {
             return response.data as User;
        }
        return undefined;
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
