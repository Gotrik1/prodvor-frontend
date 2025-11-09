
'use client';

import type { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { PlayerPage } from '@/views/users/player';
import type { User } from '@/entities/user/types';
import { api } from '@/shared/api/axios-instance';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from '@/shared/ui/skeleton';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

function UserProfileSkeleton() {
    return (
        <div className="p-0 md:p-6 lg:p-8">
            <Card className="shadow-none md:shadow-main-sm">
                <div className="p-0 md:p-6 md:pb-6">
                    <div className="relative h-48 md:h-64 w-full bg-muted">
                        <Skeleton className="w-full h-full" />
                    </div>
                     <div className="bg-card px-0 md:px-6 pb-4">
                        <div className="flex flex-col sm:flex-row sm:items-end gap-4">
                             <div className="w-full flex justify-center sm:w-auto sm:justify-start -mt-16 sm:-mt-20 shrink-0">
                                <Skeleton className="h-32 w-32 rounded-full border-4 border-card" />
                            </div>
                            <div className="flex-grow text-center sm:text-left pt-2 space-y-2">
                                <Skeleton className="h-8 w-3/4 mx-auto sm:mx-0" />
                                <Skeleton className="h-4 w-full max-w-md mx-auto sm:mx-0" />
                                <Skeleton className="h-4 w-1/2 mx-auto sm:mx-0" />
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default function UserProfilePage() {
   const params = useParams();
   const router = useRouter();
   const userId = params?.userId as string;
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const { accessToken, isHydrated, signOut } = useUserStore();

   useEffect(() => {
    async function getUser() {
        if (!userId) {
            setError("User ID is missing.");
            setIsLoading(false);
            return;
        }

        // Wait for hydration and token availability
        if (!isHydrated) {
            return; // Wait for the store to rehydrate from localStorage
        }
        if (!accessToken) {
            // If hydrated but no token, means user is not logged in.
            signOut();
            router.push('/auth');
            return;
        }
        
        setIsLoading(true);
        setError(null);
        
        try {
            const response = await api.get(`/api/v1/users/${userId}?include_teams=true`);
            if (response.data) {
                setUser(response.data as User);
            } else {
                setError("User not found.");
            }
        } catch (err: any) {
            if (axios.isAxiosError(err) && err.response?.status === 404) {
                setError("User not found.");
            } else if (axios.isAxiosError(err) && err.response?.status === 401) {
                // This could happen if token expires between checks, interceptor should handle it,
                // but if it fails, we log out.
                await signOut();
                router.push('/auth');
            } else {
                console.error(`[Client] Failed to fetch user data for ID ${userId}:`, err.message || err);
                setError("Failed to fetch user data.");
            }
        } finally {
            setIsLoading(false);
        }
    }
    
    getUser();
   }, [userId, accessToken, isHydrated, router, signOut]);


   if (isLoading) {
       return <UserProfileSkeleton />
   }

   if (error || !user) {
    return (
       <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
        <Card className="text-center max-w-md w-full">
          <CardHeader>
            <CardTitle>Ошибка 404</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{error || "Пользователь не найден."}</p>
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
