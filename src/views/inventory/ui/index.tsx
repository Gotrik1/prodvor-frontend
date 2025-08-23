
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { CheckCircle, Gem, Package, Palette, Sparkles, Wand2 } from 'lucide-react';
import Image from 'next/image';
import { Badge } from '@/shared/ui/badge';
import { cn } from '@/shared/lib/utils';
import { useToast } from '@/shared/hooks/use-toast';
import Link from 'next/link';
import { mockStoreItems } from '@/views/store/lib/mock-data';


const categoryIcons: Record<string, React.ElementType> = {
  'Рамки для аватара': Palette,
  'Эффекты для профиля': Sparkles,
  'Бустеры': Wand2,
};

export function InventoryPage() {
  const [inventory] = useState(mockStoreItems.filter(item => item.type !== 'pro_status'));
  const [activeItemId, setActiveItemId] = useState('item-1');
  const { toast } = useToast();

  const handleActivate = (itemId: string, itemName: string) => {
    setActiveItemId(itemId);
    toast({
      title: 'Предмет активирован!',
      description: `Вы успешно применили "${itemName}".`,
    });
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
          <Package className="h-8 w-8" />
          Мой инвентарь
        </h1>
        <p className="text-muted-foreground mt-1">
          Здесь хранятся все ваши купленные предметы, награды и бустеры.
        </p>
      </div>

      {inventory.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {inventory.map((item) => {
            const Icon = categoryIcons[item.category] || Gem;
            const isActive =
              activeItemId === item.id && item.type !== 'consumable';
            return (
              <Card
                key={item.id}
                className={cn(
                  'flex flex-col',
                  isActive && 'border-primary shadow-primary/20 shadow-lg'
                )}
              >
                <CardHeader className="relative p-0">
                  <div className="aspect-video w-full relative">
                    <Image
                      src={item.imageUrl}
                      alt={item.name}
                      fill
                      className="object-cover rounded-t-lg"
                      data-ai-hint={item.dataAiHint}
                    />
                  </div>
                  <Badge
                    variant="secondary"
                    className="absolute top-2 left-2 flex items-center gap-1"
                  >
                    <Icon className="h-3 w-3" />
                    {item.category}
                  </Badge>
                </CardHeader>
                <CardContent className="p-4 flex-grow">
                  <CardTitle className="text-lg mb-2">{item.name}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  {item.type === 'consumable' ? (
                    <div className="text-sm text-muted-foreground">
                      Осталось:{' '}
                      <span className="font-bold text-foreground">
                        {item.quantity} шт.
                      </span>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => handleActivate(item.id, item.name)}
                      disabled={isActive}
                    >
                      {isActive && <CheckCircle className="mr-2 h-4 w-4" />}
                      {isActive ? 'Активировано' : 'Активировать'}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="flex items-center justify-center min-h-[50vh] border-dashed">
          <CardContent className="text-center p-6">
            <div className="mx-auto bg-muted/50 text-muted-foreground p-4 rounded-full w-fit mb-4">
              <Package className="h-12 w-12" />
            </div>
            <h3 className="text-2xl font-bold font-headline">
              Ваш инвентарь пуст
            </h3>
            <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
              Посетите магазин, чтобы приобрести уникальные предметы, или
              выигрывайте их в турнирах.
            </p>
            <Button asChild>
              <Link href="/store">В магазин</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
