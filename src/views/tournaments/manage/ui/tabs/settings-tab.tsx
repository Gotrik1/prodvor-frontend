'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { AlertTriangle, ListChecks, Loader2, Save } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import React, { useState } from "react";
import { Checkbox } from "@/shared/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/lib/utils";
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from "@/shared/ui/calendar";
import { Tournament, requirements as initialRequirements } from '@/views/tournaments/public-page/ui/mock-data';
import { useToast } from "@/shared/hooks/use-toast";

export function SettingsTab({ tournament, onTournamentChange }: { tournament: Tournament, onTournamentChange: (data: Partial<Tournament>) => void }) {
    const { toast } = useToast();
    const [selectedRequirements, setSelectedRequirements] = useState<string[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    
    const handleRequirementChange = (reqId: string, checked: boolean) => {
        setSelectedRequirements(prev =>
            checked ? [...prev, reqId] : prev.filter(id => id !== reqId)
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        onTournamentChange({ [e.target.id]: e.target.value });
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            toast({
                title: "Настройки сохранены",
                description: "Все изменения были успешно применены.",
            });
        }, 1500);
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Основные настройки</CardTitle>
                    <CardDescription>Редактирование ключевых параметров вашего мероприятия.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Название турнира</Label>
                        <Input id="name" value={tournament.name} onChange={handleInputChange} />
                    </div>
                    <div>
                         <Label>Ключевые даты</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>Начало регистрации</span>
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><CalendarComponent mode="single" initialFocus /></PopoverContent>
                            </Popover>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>Конец регистрации</span>
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><CalendarComponent mode="single" initialFocus /></PopoverContent>
                            </Popover>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>Начало турнира</span>
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><CalendarComponent mode="single" selected={new Date(tournament.startDate)} onSelect={(date) => onTournamentChange({ startDate: date?.toISOString() || '' })} initialFocus /></PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="prizePool">Призовой фонд</Label>
                        <Input id="prizePool" value={tournament.prizePool} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rules">Правила</Label>
                        <Textarea id="rules" placeholder="Опишите основные правила и регламент турнира..." rows={10} defaultValue="1. Все матчи играются до 2 побед (Best of 3). 2. Опоздание на матч более чем на 15 минут карается техническим поражением. 3. Запрещено использование любого стороннего ПО."/>
                    </div>
                     <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg" onClick={handleSave} disabled={isSaving}>
                             {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Сохранение...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Сохранить изменения
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ListChecks /> Требования к участникам</CardTitle>
                        <CardDescription>Установите правила для регистрации команд.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {initialRequirements.map((req) => (
                             <div key={req.id} className="flex items-center space-x-2">
                                <Checkbox 
                                    id={req.id} 
                                    checked={selectedRequirements.includes(req.id)}
                                    onCheckedChange={(checked) => handleRequirementChange(req.id, !!checked)}
                                />
                                <Label htmlFor={req.id} className="text-sm font-normal leading-snug">
                                    {req.name}
                                </Label>
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="h-5 w-5" />
                            Опасная зона
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="w-full">Отменить турнир</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Вы уверены, что хотите отменить турнир?</DialogTitle>
                                    <DialogDescription>
                                        Это действие необратимо. Все данные о турнире, включая регистрации, будут удалены. Введите название турнира, чтобы подтвердить.
                                    </DialogDescription>
                                </DialogHeader>
                                <Input placeholder={tournament.name} className="my-4"/>
                                <DialogFooter>
                                    <Button variant="destructive">Я понимаю, отменить турнир</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                         <p className="text-xs text-muted-foreground">Это действие необратимо. Все данные о турнире, включая регистрации, будут удалены.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
