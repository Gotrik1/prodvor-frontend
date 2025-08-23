
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

export function PrivacyTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Приватность</CardTitle>
                <CardDescription>Управляйте видимостью вашего профиля.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <FormLabel>Показывать мой профиль в поиске</FormLabel>
                        <FormDescription>Разрешить другим пользователям находить вас.</FormDescription>
                    </div>
                    <Switch defaultChecked/>
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <FormLabel>Показывать мою статистику</FormLabel>
                        <FormDescription>Сделать статистику матчей публичной.</FormDescription>
                    </div>
                    <Switch defaultChecked/>
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button><Save className="mr-2 h-4 w-4" />Сохранить</Button>
            </CardFooter>
        </Card>
    );
}
