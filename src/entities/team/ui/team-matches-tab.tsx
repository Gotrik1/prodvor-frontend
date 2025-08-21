// This is a new file.
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import Image from "next/image";
import { teams } from "@/mocks";
import { Badge } from "@/shared/ui/badge";

const TeamMatches = () => (
    <ul className="space-y-2">
        <li className="flex justify-between items-center p-3 rounded-md hover:bg-muted/50">
            <div className="flex items-center gap-3">
                <Image src={teams[1].logoUrl} alt={teams[1].name} width={32} height={32} className="rounded-md" data-ai-hint="team logo" />
                <span className="font-medium">vs {teams[1].name}</span>
            </div>
            <p className="text-sm text-muted-foreground">Летний Кубок ProDvor</p>
            <Badge variant="success">Победа 5:3</Badge>
        </li>
        <li className="flex justify-between items-center p-3 rounded-md hover:bg-muted/50">
            <div className="flex items-center gap-3">
                <Image src={teams[2].logoUrl} alt={teams[2].name} width={32} height={32} className="rounded-md" data-ai-hint="team logo" />
                <span className="font-medium">vs {teams[2].name}</span>
            </div>
            <p className="text-sm text-muted-foreground">Товарищеский матч</p>
            <Badge variant="destructive">Поражение 1:2</Badge>
        </li>
    </ul>
);

export const TeamMatchesTab = () => (
    <Card>
        <CardHeader>
            <CardTitle>История матчей</CardTitle>
        </CardHeader>
        <CardContent>
            <TeamMatches />
        </CardContent>
    </Card>
);
