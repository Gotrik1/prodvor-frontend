

'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Construction, Swords } from "lucide-react";
import Link from "next/link";


export const TeamChallengesWidget = ({ teamId }: { teamId: string }) => {
    return (
        <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                    <CardTitle>Вызовы</CardTitle>
                    <CardDescription>Управляйте вызовами или бросайте их другим командам.</CardDescription>
                </div>
                <Button asChild className="mt-4 md:mt-0">
                    <Link href="/competitions">
                        <Swords className="mr-2 h-4 w-4" /> Перейти в хаб соревнований
                    </Link>
                </Button>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center text-center min-h-[20vh] text-muted-foreground">
                 <Construction className="h-10 w-10 mb-4" />
                 <p className="font-semibold">Раздел в разработке</p>
                 <p className="text-sm">Здесь будет отображаться история вызовов команды.</p>
            </CardContent>
        </Card>
    )
};
