

'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { BarChart, Heart, User as UserIcon, Users2, MapPin, Trophy, BarChart3 } from 'lucide-react';
import { OverviewTab } from './overview-tab';
import { UsersTab } from './users-tab';
import { TeamsTab } from './teams-tab';
import { SponsorsTab } from './sponsors-tab';
import { PlaygroundsTab } from './playgrounds-tab';
import { TournamentsTab } from './tournaments-tab';
import { SportsTab } from './sports-tab';
import { useSearchParams } from 'next/navigation';

export function AdminDashboardPage() {
    const searchParams = useSearchParams();
    const defaultTab = searchParams?.get('tab') || 'overview';

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold font-headline">Управление данными</h1>
                <p className="text-muted-foreground mt-1">Просмотр и управление всеми сущностями платформы.</p>
            </div>
            <Tabs defaultValue={defaultTab}>
                <div className="flex items-center justify-between">
                    <TabsList className="flex flex-wrap h-auto">
                        <TabsTrigger value="overview"><BarChart className="mr-2 h-4 w-4" />Обзор</TabsTrigger>
                        <TabsTrigger value="users"><UserIcon className="mr-2 h-4 w-4" />Пользователи</TabsTrigger>
                        <TabsTrigger value="teams"><Users2 className="mr-2 h-4 w-4" />Команды</TabsTrigger>
                        <TabsTrigger value="sponsors"><Heart className="mr-2 h-4 w-4" />Спонсоры</TabsTrigger>
                        <TabsTrigger value="playgrounds"><MapPin className="mr-2 h-4 w-4" />Площадки</TabsTrigger>
                        <TabsTrigger value="tournaments"><Trophy className="mr-2 h-4 w-4" />Турниры</TabsTrigger>
                        <TabsTrigger value="sports"><BarChart3 className="mr-2 h-4 w-4" />Виды спорта</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="overview" className="mt-6">
                    <OverviewTab />
                </TabsContent>
                <TabsContent value="users" className="mt-6">
                    <UsersTab />
                </TabsContent>
                <TabsContent value="teams" className="mt-6">
                    <TeamsTab />
                </TabsContent>
                <TabsContent value="sponsors" className="mt-6">
                    <SponsorsTab />
                </TabsContent>
                <TabsContent value="playgrounds" className="mt-6">
                    <PlaygroundsTab />
                </TabsContent>
                <TabsContent value="tournaments" className="mt-6">
                    <TournamentsTab />
                </TabsContent>
                <TabsContent value="sports" className="mt-6">
                    <SportsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
