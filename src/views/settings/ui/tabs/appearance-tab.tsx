
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  FormLabel,
} from '@/shared/ui/form';
import { ThemeToggle } from '@/shared/ui/theme-toggle';

export function AppearanceTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Внешний вид</CardTitle>
                <CardDescription>Настройте отображение интерфейса.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 rounded-lg border">
                    <FormLabel>Тема оформления</FormLabel>
                    <ThemeToggle />
                </div>
            </CardContent>
        </Card>
    );
}
