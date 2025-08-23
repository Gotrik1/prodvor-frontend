
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Puzzle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/shared/ui/progress";
import { mockDailyQuests, mockWeeklyQuests } from '@/views/quests/lib/mock-data';

export function ActiveQuestsWidget() {
  const activeQuests = [...mockDailyQuests.slice(0, 2), ...mockWeeklyQuests.slice(0, 1)];

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Puzzle /> Активные квесты</CardTitle>
        <CardDescription>Ваш прогресс по текущим заданиям.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeQuests.map(quest => (
            <div key={quest.id} className="space-y-2">
                <div className="flex justify-between items-center text-sm">
                    <p className="font-medium truncate pr-2">{quest.name}</p>
                    <p className="text-muted-foreground flex-shrink-0">{quest.progress}/{quest.target}</p>
                </div>
                <Progress value={(quest.progress / quest.target) * 100} />
            </div>
        ))}
        <Button asChild variant="secondary" size="sm" className="w-full mt-2">
            <Link href="/quests">
                Все квесты <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
