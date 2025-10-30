
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import React from "react";
import { FitnessSchedule } from "@/widgets/fitness-schedule";


export function TrainingPage() {
    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                     <CardTitle>Мое расписание</CardTitle>
                     <CardDescription>Календарь ваших личных и групповых тренировок, а также предстоящих матчей.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FitnessSchedule showHeader={true} />
                </CardContent>
            </Card>

        </div>
    );
}
