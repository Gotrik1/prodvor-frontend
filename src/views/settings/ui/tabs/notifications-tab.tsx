
'use client';

import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  FormDescription,
  FormLabel,
} from '@/shared/ui/form';
import { Save } from 'lucide-react';
import { Switch } from '@/shared/ui/switch';

export function NotificationsTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Уведомления</CardTitle>
                <CardDescription>Выберите, какие уведомления вы хотите получать.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <FormLabel>Новые вызовы</FormLabel>
                        <FormDescription>Получать уведомления, когда вам бросают вызов.</FormDescription>
                    </div>
                    <Switch defaultChecked/>
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <FormLabel>Комментарии к постам</FormLabel>
                        <FormDescription>Уведомлять о новых комментариях под вашими постами.</FormDescription>
                    </div>
                    <Switch defaultChecked/>
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <FormLabel>Новости платформы</FormLabel>
                        <FormDescription>Получать email-рассылку о новостях и обновлениях.</FormDescription>
                    </div>
                    <Switch />
                </div>
            </CardContent>
             <CardFooter className="border-t px-6 py-4">
                <Button><Save className="mr-2 h-4 w-4" />Сохранить</Button>
            </CardFooter>
        </Card>
    );
}
