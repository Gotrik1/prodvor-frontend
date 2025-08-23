
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { BarChart, Heart, User as UserIcon, Users2, MapPin, Trophy, BarChart3 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/shared/ui/button';
import { OverviewTab } from './overview-tab';
import { UsersTab } from './users-tab';
import { TeamsTab } from './teams-tab';
import { SponsorsTab } from './sponsors-tab';
import { PlaygroundsTab } from './playgrounds-tab';
import { TournamentsTab } from './tournaments-tab';
import { SportsTab } from './sports-tab';

export function AdminDashboardPage() {
    return (
        <Tabs defaultValue="overview">
            <div className="flex items-center justify-between mb-6">
                 <TabsList>
                    <TabsTrigger value="overview"><BarChart className="mr-2 h-4 w-4" />Обзор</TabsTrigger>
                    <TabsTrigger value="users"><UserIcon className="mr-2 h-4 w-4" />Пользователи</TabsTrigger>
                    <TabsTrigger value="teams"><Users2 className="mr-2 h-4 w-4" />Команды</TabsTrigger>
                    <TabsTrigger value="sponsors"><Heart className="mr-2 h-4 w-4" />Спонсоры</TabsTrigger>
                    <TabsTrigger value="playgrounds"><MapPin className="mr-2 h-4 w-4" />Площадки</TabsTrigger>
                    <TabsTrigger value="tournaments"><Trophy className="mr-2 h-4 w-4" />Турниры</TabsTrigger>
                    <TabsTrigger value="sports"><BarChart3 className="mr-2 h-4 w-4" />Виды спорта</TabsTrigger>
                </TabsList>
            </div>
             <TabsContent value="overview">
                <OverviewTab />
            </TabsContent>
            <TabsContent value="users">
                <UsersTab />
            </TabsContent>
             <TabsContent value="teams">
                <TeamsTab />
            </TabsContent>
             <TabsContent value="sponsors">
                <SponsorsTab />
            </TabsContent>
            <TabsContent value="playgrounds">
                <PlaygroundsTab />
            </TabsContent>
             <TabsContent value="tournaments">
                <TournamentsTab />
            </TabsContent>
            <TabsContent value="sports">
                <SportsTab />
            </TabsContent>
        </Tabs>
    );
}

    