
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
import { Activity } from './activity-library';

export interface ScheduledActivity extends Activity {
    startDate: string;
    time: string;
    repeat: 'none' | 'daily' | 'weekly' | 'monthly' | 'custom';
    customInterval: number;
}

interface ScheduleActivityDialogProps {
    isOpen: boolean;
    onClose: () => void;
    activity: Activity;
    onSchedule: (scheduledActivity: ScheduledActivity) => void;
}

export function ScheduleActivityDialog({ isOpen, onClose, activity, onSchedule }: ScheduleActivityDialogProps) {
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState('12:00');
    const [repeat, setRepeat] = useState<'none' | 'daily' | 'weekly' | 'monthly' | 'custom'>('weekly');
    const [customInterval, setCustomInterval] = useState(2);

    const handleSubmit = () => {
        if (!startDate) return;

        const newScheduledActivity: ScheduledActivity = {
            ...activity,
            id: `scheduled-${Date.now()}`,
            startDate: startDate.toISOString(),
            time,
            repeat,
            customInterval,
        };
        onSchedule(newScheduledActivity);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Настроить активность: {activity.name}</DialogTitle>
                    <DialogDescription>
                        Укажите дату, время и правила повторения для этой активности в вашем плане.
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
                             <Label htmlFor="time">Время</Label>
                             <Input id="time" type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="repeat">Повторение</Label>
                        <Select value={repeat} onValueChange={(value) => setRepeat(value as any)}>
                            <SelectTrigger id="repeat">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">Не повторять</SelectItem>
                                <SelectItem value="daily">Каждый день</SelectItem>
                                <SelectItem value="weekly">Каждую неделю</SelectItem>
                                <SelectItem value="monthly">Каждый месяц</SelectItem>
                                <SelectItem value="custom">Каждые N дней</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    {repeat === 'custom' && (
                        <div className="space-y-2">
                             <Label htmlFor="interval">Интервал (дни)</Label>
                             <Input id="interval" type="number" value={customInterval} onChange={(e) => setCustomInterval(Number(e.target.value))} min="2" />
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Отмена</Button>
                    <Button onClick={handleSubmit}>Добавить в план</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
