
'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { AlertTriangle } from 'lucide-react';

export function SettingsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Общие настройки</CardTitle>
        <CardDescription>
          Измените основную информацию о вашей команде.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="team-name">Название команды</Label>
          <Input id="team-name" defaultValue="Текущее название" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="team-city">Город</Label>
          <Input id="team-city" defaultValue="Текущий город" />
        </div>
        <Button>Сохранить изменения</Button>

        <Alert variant="destructive" className="mt-8">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Опасная зона</AlertTitle>
          <AlertDescription>
            <div className="flex justify-between items-center">
              <p>Распустить команду. Это действие необратимо.</p>
              <Button variant="destructive">Распустить</Button>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
