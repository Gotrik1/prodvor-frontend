
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Dumbbell, PlusCircle, Calendar as CalendarIcon } from "lucide-react";
import React from "react";
import Link from "next/link";
import { FitnessSchedule } from "@/widgets/fitness-schedule";


export function TrainingPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                        Мои тренировки
                    </h1>
                    <p className="text-muted-foreground mt-1">Планируйте свою активность и следите за командными занятиями.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="lg" asChild>
                        <Link href="/fitness-plan">
                             <PlusCircle className="mr-2 h-4 w-4" />
                            Конструктор планов
                        </Link>
                    </Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2"><CalendarIcon /> Календарь активности</CardTitle>
                     <CardDescription>Расписание ваших личных и групповых тренировок.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FitnessSchedule />
                </CardContent>
            </Card>

        </div>
    );
}
