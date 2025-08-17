
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Slider } from "@/shared/ui/slider";
import { useAdSettingsContext } from './index';
import { BarChart3 } from "lucide-react";

export function AssumptionsCard() {
    const { assumptions, handleAssumptionChange } = useAdSettingsContext();

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BarChart3 /> Базовые параметры</CardTitle>
                <CardDescription>Изменяйте значения, чтобы увидеть их влияние на доход.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="ecpm">Смешанный eCPM, ₽</Label>
                    <div className="flex items-center gap-4">
                        <Slider id="ecpm" value={[Number(assumptions.ecpm)]} onValueChange={([value]) => handleAssumptionChange('ecpm', String(value))} max={200} step={1} />
                        <Input className="w-20" value={assumptions.ecpm} onChange={(e) => handleAssumptionChange('ecpm', e.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="fillRate">Fill-rate, %</Label>
                    <div className="flex items-center gap-4">
                        <Slider id="fillRate" value={[Number(assumptions.fillRate)]} onValueChange={([value]) => handleAssumptionChange('fillRate', String(value))} max={100} step={1} />
                        <Input className="w-20" value={assumptions.fillRate} onChange={(e) => handleAssumptionChange('fillRate', e.target.value)} />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="mau">MAU (Месячная аудитория)</Label>
                    <Input id="mau" value={assumptions.mau} onChange={(e) => handleAssumptionChange('mau', e.target.value)} />
                </div>
            </CardContent>
        </Card>
    );
}
