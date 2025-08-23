
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Bell, Brush, Lock, User as UserIcon, Shield } from 'lucide-react';
import { ProfileTab } from './tabs/profile-tab';
import { AccountTab } from './tabs/account-tab';
import { NotificationsTab } from './tabs/notifications-tab';
import { AppearanceTab } from './tabs/appearance-tab';
import { PrivacyTab } from './tabs/privacy-tab';

export function SettingsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Настройки</h1>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile"><UserIcon className="mr-2 h-4 w-4" />Профиль</TabsTrigger>
            <TabsTrigger value="account"><Lock className="mr-2 h-4 w-4" />Аккаунт</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Уведомления</TabsTrigger>
            <TabsTrigger value="appearance"><Brush className="mr-2 h-4 w-4" />Внешний вид</TabsTrigger>
            <TabsTrigger value="privacy"><Shield className="mr-2 h-4 w-4"/>Приватность</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile" className="mt-6">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="account" className="mt-6">
            <AccountTab />
          </TabsContent>

          <TabsContent value="notifications" className="mt-6">
            <NotificationsTab />
          </TabsContent>
          
          <TabsContent value="appearance" className="mt-6">
            <AppearanceTab />
          </TabsContent>
          
          <TabsContent value="privacy" className="mt-6">
            <PrivacyTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
