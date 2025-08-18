
'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from '@/shared/ui/dialog';
import { Button } from '@/shared/ui/button';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { CalendarIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils';
import type { WorkoutPlan } from './types';

interface ScheduleActivityDialogProps {
    isOpen: boolean;
    onClose: () => void;
    plan: WorkoutPlan;
    onSchedule: (plan: WorkoutPlan, startDate: Date, time: string, restDays: number) => void;
}

export function ScheduleActivityDialog({ isOpen, onClose, plan, onSchedule }: ScheduleActivityDialogProps) {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState('12:00');
    const [restDays, setRestDays] = useState(1);

    const handleSubmit = () => {
        if (!startDate || !plan) return;
        onSchedule(plan, startDate, time, restDays);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Запланировать: {plan.name}</DialogTitle>
                    <DialogDescription>
                        Выберите дату начала и интервал отдыха. План будет автоматически распределен по календарю.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-6 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Дата начала</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                    "w-full justify-start text-left font-normal",
                                    !startDate && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {startDate ? startDate.toLocaleDateString() : <span>Выберите дату</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    initialFocus
                                />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="time">Время тренировок</Label>
                             <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="rest-days">Дней отдыха между тренировками</Label>
                         <Select value={String(restDays)} onValueChange={(value) => setRestDays(Number(value))}>
                            <SelectTrigger id="rest-days">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="0">Без отдыха</SelectItem>
                                <SelectItem value="1">1 день</SelectItem>
                                <SelectItem value="2">2 дня</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Отмена</Button>
                    <Button onClick={handleSubmit}>Добавить в план</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
