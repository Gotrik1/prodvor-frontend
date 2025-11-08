
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Label } from '@/shared/ui/label';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { Slider } from '@/shared/ui/slider';
import { useScale } from '@/shared/hooks/use-scale';
import { Button } from '@/shared/ui/button';
import { Save } from 'lucide-react';
import { useToast } from '@/shared/hooks/use-toast';

export function AppearanceTab() {
  const { scale, setScale } = useScale();
  const { toast } = useToast();

  const handleSave = () => {
    // In a real app, this would call an API like:
    // api.put('/api/v1/users/me/settings', { theme: currentTheme, scale });
    toast({
      title: 'Настройки сохранены',
      description: 'Ваш интерфейс был успешно обновлен.',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Внешний вид</CardTitle>
        <CardDescription>Настройте отображение интерфейса.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 rounded-lg border">
          <Label className="font-medium">Тема оформления</Label>
          <ThemeToggle />
        </div>
        <div className="space-y-4 p-4 rounded-lg border">
          <div className="flex items-center justify-between">
            <Label htmlFor="scale-slider" className="font-medium">
              Масштаб интерфейса
            </Label>
            <span className="text-sm font-mono text-muted-foreground">
              {Math.round(scale * 100)}%
            </span>
          </div>
          <Slider
            id="scale-slider"
            min={0.8}
            max={1.2}
            step={0.05}
            value={[scale]}
            onValueChange={([value]) => setScale(value)}
          />
        </div>
      </CardContent>
      <CardFooter className="border-t px-6 py-4">
        <Button onClick={handleSave}>
          <Save className="mr-2 h-4 w-4" />
          Сохранить
        </Button>
      </CardFooter>
    </Card>
  );
}
