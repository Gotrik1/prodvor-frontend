
'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { ArrowLeft, CheckCircle, Gem } from "lucide-react";
import Link from "next/link";
import { mockStoreItems } from "../lib/mock-data";
import { useToast } from "@/shared/hooks/use-toast";
import { useRouter } from "next/navigation";

const proFeatures = [
    "Доступ к AI-Аналитику матчей",
    "Расширенная статистика по игрокам и командам",
    "Возможность создавать и управлять несколькими командами (для Менеджера)",
    "Приоритетный доступ к бета-версиям новых функций",
    "Уникальный значок PRO в профиле",
];

export function ProStatusPage() {
    const { toast } = useToast();
    const router = useRouter();

    const coachStatus = mockStoreItems.find(item => item.id === 'pro-coach');
    const managerStatus = mockStoreItems.find(item => item.id === 'pro-manager');

    const handlePurchase = (statusName: string) => {
        toast({
            title: "Поздравляем!",
            description: `Вы успешно приобрели ${statusName}. Все PRO-функции разблокированы.`,
        });
        // In a real app, you would update user role and redirect
        router.push('/dashboard');
    }

    return (
        <div className="p-4 md:p-6 lg:p-8 flex items-center justify-center min-h-screen bg-muted/30">
            <div className="max-w-4xl w-full">
                 <div className="mb-6">
                    <Button asChild variant="outline">
                        <Link href="/store">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Назад в магазин
                        </Link>
                    </Button>
                </div>
                <div className="text-center mb-10">
                    <h1 className="text-4xl font-black font-headline tracking-tight">Разблокируйте PRO-возможности</h1>
                    <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
                        Получите доступ к эксклюзивным инструментам, которые помогут вам и вашей команде достичь новых высот.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    {coachStatus && (
                        <Card className="border-2 border-primary shadow-lg shadow-primary/10">
                            <CardHeader>
                                <CardTitle className="text-2xl">{coachStatus.name}</CardTitle>
                                <CardDescription>{coachStatus.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold">{coachStatus.price}</span>
                                    <div className="flex items-center text-muted-foreground">
                                        <Gem className="h-4 w-4 mr-1"/>
                                        <span>PD Coins</span>
                                    </div>
                                </div>
                                <ul className="space-y-2 text-sm">
                                    {proFeatures.slice(0, 3).map(feature => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" size="lg" onClick={() => handlePurchase(coachStatus.name)}>Приобрести</Button>
                            </CardFooter>
                        </Card>
                    )}

                     {managerStatus && (
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-2xl">{managerStatus.name}</CardTitle>
                                <CardDescription>{managerStatus.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-baseline gap-2">
                                    <span className="text-4xl font-bold">{managerStatus.price}</span>
                                    <div className="flex items-center text-muted-foreground">
                                        <Gem className="h-4 w-4 mr-1"/>
                                        <span>PD Coins</span>
                                    </div>
                                </div>
                                 <ul className="space-y-2 text-sm">
                                    {proFeatures.map(feature => (
                                        <li key={feature} className="flex items-center gap-2">
                                            <CheckCircle className="h-4 w-4 text-green-500" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" size="lg" variant="secondary" onClick={() => handlePurchase(managerStatus.name)}>Приобрести</Button>
                            </CardFooter>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
