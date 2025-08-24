

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Activity, Dumbbell } from "lucide-react";
import { playgrounds } from "@/mocks";
import Link from "next/link";

export const PlayerTrainingStats = () => (
     <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base"><Activity /> Тренировочный процесс</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <Card className="bg-muted/50 text-center p-2">
                    <p className="text-xs text-muted-foreground">Специализация</p>
                    <p className="font-semibold text-sm">Выносливость</p>
                </Card>
                 <Card className="bg-muted/50 text-center p-2">
                    <p className="text-xs text-muted-foreground">Режим</p>
                    <p className="font-semibold text-sm">4-5 раз/нед.</p>
                </Card>
            </div>
             <div>
                <h3 className="text-sm font-semibold mb-2">Предпочитаемые места</h3>
                 <div className="space-y-2">
                    {playgrounds.slice(0, 1).map(p => (
                        <Link href={`/playgrounds/${p.id}`} key={p.id} className="block p-2 rounded-md border bg-card hover:border-primary transition-colors">
                            <div className="flex items-center gap-2">
                                <Dumbbell className="h-4 w-4 text-primary" />
                                <div>
                                    <p className="font-semibold text-xs">{p.name}</p>
                                    <p className="text-xs text-muted-foreground">{p.address}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
)

export const TrainingTab = () => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity /> Тренировочный процесс</CardTitle>
            <CardDescription>Информация о тренировочной активности и предпочтениях игрока.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Специализация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><span className="font-semibold">Основной фокус:</span> Выносливость и скорость</p>
                        <p><span className="font-semibold">Дополнительно:</span> Силовые тренировки</p>
                    </CardContent>
                </Card>
                <Card className="bg-muted/50">
                    <CardHeader>
                        <CardTitle className="text-lg">Режим</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <p><span className="font-semibold">Частота:</span> 4-5 раз в неделю</p>
                        <p><span className="font-semibold">Любимое время:</span> Вечер</p>
                    </CardContent>
                </Card>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-2">Предпочитаемые места</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {playgrounds.slice(0, 2).map(p => (
                        <Link href={`/playgrounds/${p.id}`} key={p.id} className="block p-3 rounded-md border bg-card hover:border-primary transition-colors">
                            <div className="flex items-center gap-3">
                                <Dumbbell className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-semibold">{p.name}</p>
                                    <p className="text-xs text-muted-foreground">{p.address}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </CardContent>
    </Card>
);

    
