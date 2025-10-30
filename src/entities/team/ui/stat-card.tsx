

'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export const TeamStatCard = ({ title, value, description }: { title: string, value: string, description: string }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-3xl font-bold">{value}</p>
            <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
);
