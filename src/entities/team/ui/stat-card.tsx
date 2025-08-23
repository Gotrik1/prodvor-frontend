
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";

export const StatCard = ({ title, value, icon: Icon }: { title: string, value: string | React.ReactNode, icon: React.ElementType }) => (
    <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
        </CardContent>
    </Card>
);

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
