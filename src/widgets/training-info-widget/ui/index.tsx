

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Activity, Dumbbell } from "lucide-react";
import Link from "next/link";

export const TrainingInfoWidget = () => (
    <Card className="md:shadow-main-sm shadow-none md:bg-card bg-transparent">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <Activity />
                <span className="md:hidden">Тренировки</span>
                <span className="hidden md:inline">Тренировочный процесс</span>
            </CardTitle>
            <CardDescription className="hidden md:block">Информация о тренировочной активности и предпочтениях игрока.</CardDescription>
        </CardHeader>
        <CardContent className="md:p-6 space-y-6">
            <div className="flex items-center justify-center min-h-[150px] text-center text-muted-foreground">
                <p>У игрока пока нет данных о тренировках.</p>
            </div>
        </CardContent>
    </Card>
);
