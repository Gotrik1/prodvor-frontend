
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
        <div className="space-y-8">
            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-2"><CalendarIcon /> Мое расписание</CardTitle>
                     <CardDescription>Календарь ваших личных и групповых тренировок, на которые вы записались.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FitnessSchedule personalOnly={true} />
                </CardContent>
            </Card>

        </div>
    );
}
