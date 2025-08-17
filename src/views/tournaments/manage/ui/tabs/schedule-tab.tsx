
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Calendar } from "lucide-react";

export function ScheduleTab() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Расписание матчей</CardTitle>
                <CardDescription>Календарь всех запланированных игр.</CardDescription>
            </CardHeader>
            <CardContent className="min-h-[50vh] flex items-center justify-center bg-muted/30 rounded-lg">
                 <div className="text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">Расписание в разработке</h3>
                    <p className="mt-1 text-sm text-muted-foreground">Здесь будет интерактивный календарь матчей.</p>
                </div>
            </CardContent>
        </Card>
    )
}
