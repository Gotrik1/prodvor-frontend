
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { FitnessSchedule } from "@/widgets/fitness-schedule";

export function ScheduleTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Расписание матчей</CardTitle>
                <CardDescription>Календарь всех запланированных игр и событий турнира.</CardDescription>
            </CardHeader>
            <CardContent>
                <FitnessSchedule />
            </CardContent>
        </Card>
    )
}
