
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui/card";
import { Button } from '@/shared/ui/button';
import { Gem, Palette, ShoppingCart, Sparkles, Wand2, Award } from "lucide-react";
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useToast } from "@/shared/hooks/use-toast";
import Link from "next/link";
import { mockStoreItems } from '../lib/mock-data';
import { cn } from "@/shared/lib/utils";


const categories = [
    { id: 'all', name: 'Все товары', icon: Gem },
    { id: 'PRO-статусы', name: 'PRO-статусы', icon: Award },
    { id: 'Рамки для аватара', name: 'Рамки', icon: Palette },
    { id: 'Эффекты для профиля', name: 'Эффекты', icon: Sparkles },
    { id: 'Бустеры', name: 'Бустеры', icon: Wand2 },
];

export function StorePage() {
    const { toast } = useToast();

    const handleBuy = (itemName: string, itemType: string) => {
        if (itemType === 'pro_status') {
            // This is handled by the Link, but we can still show a toast if needed
            // or perform other actions.
            return;
        }
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
                <TabsList className="flex flex-wrap h-auto">
                    {categories.map(cat => (
                        <TabsTrigger key={cat.id} value={cat.id} className="flex-shrink-0 flex-grow">
                            <cat.icon className="mr-2 h-4 w-4" />
                            {cat.name}
                        </TabsTrigger>
                    ))}
                </TabsList>

                {categories.map(cat => {
                    const filteredItems = mockStoreItems.filter(item => cat.id === 'all' || item.category === cat.id);
                    return (
                        <TabsContent key={cat.id} value={cat.id} className="mt-6">
                            {filteredItems.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {filteredItems.map(item => (
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
                                            <CardFooter className="p-4 pt-0 flex justify-between items-center">
                                                <div className="flex items-center gap-2 text-xl font-bold text-primary">
                                                    <Gem className="h-5 w-5"/>
                                                    <span>{item.price}</span>
                                                </div>
                                                {item.type === 'pro_status' ? (
                                                    <Button asChild>
                                                        <Link href={`/store/pro`}>Подробнее</Link>
                                                    </Button>
                                                ) : (
                                                    <Button onClick={() => handleBuy(item.name, item.type)}>Купить</Button>
                                                )}
                                            </CardFooter>
                                        </Card>
                                    ))}
                                </div>
                            ) : (
                                <Card className="flex items-center justify-center min-h-[40vh] border-dashed">
                                    <CardContent className="text-center p-6">
                                         <div className="mx-auto bg-muted/50 text-muted-foreground p-4 rounded-full w-fit mb-4">
                                            <cat.icon className="h-10 w-10" />
                                        </div>
                                        <h3 className="text-xl font-bold font-headline">Товары не найдены</h3>
                                        <p className="text-muted-foreground mt-2 max-w-sm">
                                           В этой категории пока нет товаров. Загляните позже!
                                        </p>
                                    </CardContent>
                                </Card>
                            )}
                        </TabsContent>
                    )
                })}
            </Tabs>
        </div>
    );
}
