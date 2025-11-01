
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Construction } from "lucide-react";

export const TeamMatchesWidget = () => (
    <Card>
        <CardHeader>
            <CardTitle>История матчей</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center text-center min-h-[20vh] text-muted-foreground">
             <Construction className="h-10 w-10 mb-4" />
             <p className="font-semibold">Раздел в разработке</p>
             <p className="text-sm">Здесь будет отображаться история прошедших матчей команды.</p>
        </CardContent>
    </Card>
);
