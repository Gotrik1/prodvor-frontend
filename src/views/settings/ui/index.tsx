
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Bell, Brush, Lock, User as UserIcon, Shield } from 'lucide-react';
import { ProfileTab } from './tabs/profile-tab';
import { AccountTab } from './tabs/account-tab';
import { NotificationsTab } from './tabs/notifications-tab';
import { AppearanceTab } from './tabs/appearance-tab';
import { PrivacyTab } from './tabs/privacy-tab';
import { cn } from '@/shared/lib/utils';

export function SettingsPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Настройки</h1>
        <Tabs defaultValue="profile" className="w-full flex flex-col md:flex-row gap-6">
          <TabsList className="flex flex-row md:flex-col md:w-auto h-auto md:h-full flex-wrap justify-start">
            <TabsTrigger value="profile" className="justify-start"><UserIcon className="mr-2 h-4 w-4" />Профиль</TabsTrigger>
            <TabsTrigger value="account" className="justify-start"><Lock className="mr-2 h-4 w-4" />Аккаунт</TabsTrigger>
            <TabsTrigger value="notifications" className="justify-start"><Bell className="mr-2 h-4 w-4" />Уведомления</TabsTrigger>
            <TabsTrigger value="appearance" className="justify-start"><Brush className="mr-2 h-4 w-4" />Внешний вид</TabsTrigger>
            <TabsTrigger value="privacy" className="justify-start"><Shield className="mr-2 h-4 w-4"/>Приватность</TabsTrigger>
          </TabsList>
          
          <div className="w-full">
            <TabsContent value="profile" className="mt-0">
              <ProfileTab />
            </TabsContent>

            <TabsContent value="account" className="mt-0">
              <AccountTab />
            </TabsContent>

            <TabsContent value="notifications" className="mt-0">
              <NotificationsTab />
            </TabsContent>
            
            <TabsContent value="appearance" className="mt-0">
              <AppearanceTab />
            </TabsContent>
            
            <TabsContent value="privacy" className="mt-0">
              <PrivacyTab />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
