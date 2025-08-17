
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from '@/shared/ui/button';
import { Gem, Palette, ShoppingCart, Sparkles, Wand2 } from "lucide-react";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useToast } from "@/shared/hooks/use-toast";

const mockStoreItems = [
    {
      id: 'item-1',
      name: 'Золотая рамка "Чемпион"',
      description: 'Покажите всем, кто здесь победитель.',
      category: 'Рамки для аватара',
      price: 500,
      imageUrl: 'https://placehold.co/150x150.png',
      dataAiHint: 'gold frame',
    },
    {
      id: 'item-2',
      name: 'Эффект "Горящий мяч"',
      description: 'Анимированный эффект для страницы команды.',
      category: 'Эффекты для профиля',
      price: 1200,
      imageUrl: 'https://placehold.co/150x150.png',
      dataAiHint: 'fireball',
    },
    {
      id: 'item-3',
      name: 'Рамка "Неоновый киберпанк"',
      description: 'Стильная анимированная рамка для аватара.',
      category: 'Рамки для аватара',
      price: 750,
      imageUrl: 'https://placehold.co/150x150.png',
      dataAiHint: 'neon frame',
    },
    {
      id: 'item-4',
      name: 'Эффект "Легендарное сияние"',
      description: 'Золотое свечение вокруг вашего профиля.',
      category: 'Эффекты для профиля',
      price: 1500,
      imageUrl: 'https://placehold.co/150x150.png',
      dataAiHint: 'gold aura',
    },
    {
      id: 'item-5',
      name: 'Пак из 5 генераций лого',
      description: '+5 попыток для AI-генератора логотипов.',
      category: 'Бустеры',
      price: 300,
      imageUrl: 'https://placehold.co/150x150.png',
      dataAiHint: 'logo pack',
    },
     {
      id: 'item-6',
      name: 'Бустер опыта x2 (3 дня)',
      description: 'Удваивает получаемый опыт на 72 часа.',
      category: 'Бустеры',
      price: 400,
      imageUrl: 'https://placehold.co/150x150.png',
      dataAiHint: 'xp boost',
    },
];

const categories = [
    { id: 'all', name: 'Все товары', icon: Gem },
    { id: 'Рамки для аватара', name: 'Рамки', icon: Palette },
    { id: 'Эффекты для профиля', name: 'Эффекты', icon: Sparkles },
    { id: 'Бустеры', name: 'Бустеры', icon: Wand2 },
];

export function StorePage() {
    const { toast } = useToast();

    const handleBuy = (itemName: string) => {
        toast({
            title: "Покупка совершена!",
            description: `Предмет "${itemName}" добавлен в ваш инвентарь.`,
        });
    };

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                    <ShoppingCart className="h-8 w-8" />
                    Магазин ProDvor
                </h1>
                <p className="text-muted-foreground mt-1">
                    Приобретайте уникальные предметы для кастомизации вашего профиля и команды.
                </p>
            </div>
            
            <Tabs defaultValue="all" className="w-full">
                <TabsList>
                    {categories.map(cat => (
                        <TabsTrigger key={cat.id} value={cat.id}>
                            <cat.icon className="mr-2 h-4 w-4" />
                            {cat.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map(cat => (
                    <TabsContent key={cat.id} value={cat.id} className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {mockStoreItems
                                .filter(item => cat.id === 'all' || item.category === cat.id)
                                .map(item => (
                                <Card key={item.id} className="flex flex-col">
                                    <CardHeader className="p-0">
                                        <div className="aspect-square w-full relative">
                                            <Image 
                                                src={item.imageUrl} 
                                                alt={item.name} 
                                                fill 
                                                className="object-cover rounded-t-lg"
                                                data-ai-hint={item.dataAiHint}
                                            />
                                        </div>
                                    </CardHeader>
                                    <CardContent className="p-4 flex-grow">
                                        <CardTitle className="text-lg mb-1">{item.name}</CardTitle>
                                        <CardDescription>{item.description}</CardDescription>
                                    </CardContent>
                                    <CardContent className="p-4 pt-0 flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-xl font-bold text-primary">
                                            <Gem className="h-5 w-5"/>
                                            <span>{item.price}</span>
                                        </div>
                                        <Button onClick={() => handleBuy(item.name)}>Купить</Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
}
