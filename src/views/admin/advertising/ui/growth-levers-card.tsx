
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Label } from "@/shared/ui/label";
import { Switch } from "@/shared/ui/switch";
import { growthLevers } from '../lib/mock-data';
import { useAdSettingsContext } from './index';
import { Zap } from "lucide-react";

export function GrowthLeversCard() {
    const { activeLevers, handleLeverToggle } = useAdSettingsContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Zap /> Рычаги роста</CardTitle>
                <CardDescription>Активируйте стратегии для увеличения дохода.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {growthLevers.map(lever => (
                    <div key={lever.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <Label htmlFor={lever.id} className="flex flex-col gap-1 pr-2 cursor-pointer">
                            <span>{lever.lever}</span>
                            <span className="font-bold text-green-400">{lever.effect}</span>
                        </Label>
                        <Switch
                            id={lever.id}
                            checked={!!activeLevers[lever.id]}
                            onCheckedChange={() => handleLeverToggle(lever.id)}
                        />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
