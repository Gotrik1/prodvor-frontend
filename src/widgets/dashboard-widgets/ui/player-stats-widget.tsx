
'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { User as UserIcon, Gem, ArrowRight } from "lucide-react";
import Link from "next/link";
import { ranks } from "@/mocks/ranks";
import type { User } from "@/mocks";
import { Progress } from "@/shared/ui/progress";

const getRankForElo = (elo: number) => {
    return ranks.find(rank => elo >= rank.eloMin && elo <= rank.eloMax);
};

export function PlayerStatsWidget({ user }: { user: User }) {
  const rank = user.elo ? getRankForElo(user.elo) : null;
  // Mock progress data
  const progressPoints = 3750;
  const pointsToNextLevel = 5000;
  const levelProgress = (progressPoints / pointsToNextLevel) * 100;
  const currentLevel = 18;

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <UserIcon />
            Мой прогресс
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {rank && (
            <div className="p-3 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <rank.icon className="h-6 w-6 text-primary" />
                        <div>
                            <p className="font-semibold">{rank.name}</p>
                            <p className="text-xs text-muted-foreground">{user.elo} ELO</p>
                        </div>
                    </div>
                </div>
            </div>
        )}
        <div className="space-y-2">
            <div className="flex justify-between items-baseline mb-1">
                <span className="font-semibold">Уровень {currentLevel}</span>
                <span className="text-xs text-muted-foreground">{progressPoints} / {pointsToNextLevel} ОП</span>
            </div>
            <Progress value={levelProgress} />
        </div>

        <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
                <Gem className="h-6 w-6 text-primary" />
                <div>
                    <p className="font-semibold">Монеты</p>
                    <p className="text-xs text-muted-foreground">PD Coins</p>
                </div>
            </div>
            <p className="text-xl font-bold">1,250</p>
        </div>
        
        <Button asChild variant="secondary" size="sm" className="w-full">
            <Link href={`/users/${user.id}`}>
                Полная статистика <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
