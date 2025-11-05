

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import type { User } from '@/mocks';

export function TacticalBoard({ teamMembers: _teamMembers }: { teamMembers: User[] }) {
    // This is a placeholder component for the tactical board feature.
    return (
        <Card>
            <CardHeader>
                <CardTitle>Тактическая доска</CardTitle>
                <CardDescription>Расстановка игроков на поле.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="aspect-video bg-green-800/20 rounded-lg border-2 border-dashed border-green-500/30 p-4 relative flex items-center justify-center">
                    <p className="text-muted-foreground">Здесь будет тактическая доска</p>
                </div>
            </CardContent>
        </Card>
    );
}
