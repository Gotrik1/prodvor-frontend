
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
import { Label } from '@/shared/ui/label';
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
                        <Label className="font-medium">Новые вызовы</Label>
                        <p className="text-sm text-muted-foreground">Получать уведомления, когда вам бросают вызов.</p>
                    </div>
                    <Switch defaultChecked/>
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <Label className="font-medium">Комментарии к постам</Label>
                        <p className="text-sm text-muted-foreground">Уведомлять о новых комментариях под вашими постами.</p>
                    </div>
                    <Switch defaultChecked/>
                </div>
                 <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                        <Label className="font-medium">Новости платформы</Label>
                        <p className="text-sm text-muted-foreground">Получать email-рассылку о новостях и обновлениях.</p>
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
