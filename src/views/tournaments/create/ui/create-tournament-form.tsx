"use client";

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { allSports } from "@/mocks";
import { Textarea } from "@/shared/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { CalendarIcon, UploadCloud } from "lucide-react";
import { Calendar } from "@/shared/ui/calendar";
import { cn } from "@/shared/lib/utils";
import React from "react";


export function CreateTournamentForm() {
    const teamSports = allSports.filter(s => s.isTeamSport);
    const individualSports = allSports.filter(s => !s.isTeamSport);

    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Параметры турнира</CardTitle>
                <CardDescription>Заполните все необходимые поля для создания нового турнира.</CardDescription>
            </CardHeader>
            <CardContent>
                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Название турнира</Label>
                        <Input id="name" placeholder="Например, ProDvor Summer Cup" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Краткое описание (необязательно)</Label>
                        <Textarea id="description" placeholder="Для кого этот турнир, какие его цели?" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="discipline">Дисциплина</Label>
                            <Select>
                                <SelectTrigger id="discipline"><SelectValue placeholder="Выберите дисциплину" /></SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Командные</SelectLabel>
                                        {teamSports.map((sport) => (
                                            <SelectItem key={sport.id} value={sport.id}>
                                                {sport.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>Индивидуальные</SelectLabel>
                                         {individualSports.map((sport) => (
                                            <SelectItem key={sport.id} value={sport.id}>
                                                {sport.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="type">Тип турнира</Label>
                            <Select defaultValue="team">
                                <SelectTrigger id="type"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="team">Командный</SelectItem>
                                    <SelectItem value="solo">Индивидуальный</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="format">Формат проведения</Label>
                            <Select defaultValue="single-elimination">
                                <SelectTrigger id="format"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="single-elimination">Single Elimination</SelectItem>
                                    <SelectItem value="double-elimination">Double Elimination</SelectItem>
                                    <SelectItem value="round-robin">Round Robin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="participants">Кол-во участников</Label>
                            <Select defaultValue="16">
                                <SelectTrigger id="participants"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="4">4</SelectItem>
                                    <SelectItem value="8">8</SelectItem>
                                    <SelectItem value="16">16</SelectItem>
                                    <SelectItem value="32">32</SelectItem>
                                    <SelectItem value="64">64</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="level">Уровень турнира</Label>
                            <Select>
                                <SelectTrigger id="level"><SelectValue placeholder="Выберите уровень" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="city">Городской</SelectItem>
                                    <SelectItem value="regional">Региональный</SelectItem>
                                    <SelectItem value="federal">Федеральный</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="location">Место проведения</Label>
                            <Input id="location" placeholder="Онлайн или укажите город/регион" />
                        </div>
                    </div>
                    <div>
                         <Label>Ключевые даты</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" /> {/* TODO: Replace !true with actual condition */}
                                    <span>Начало регистрации</span>
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><Calendar mode="single" initialFocus /></PopoverContent>
                            </Popover>
                            <Popover>
 <PopoverTrigger asChild> {/* TODO: Replace !true with actual condition */}
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" /> 
                                    <span>Конец регистрации</span>
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><Calendar mode="single" initialFocus /></PopoverContent>
                            </Popover>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !true && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    <span>Начало турнира</span>
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><Calendar mode="single" initialFocus /></PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="prize">Призовой фонд (необязательно)</Label>
                        <Input id="prize" placeholder="Например, 50,000 PD + девайсы от спонсора" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="rules">Правила (необязательно)</Label>
                        <Textarea id="rules" placeholder="Опишите основные правила и регламент турнира..." rows={5} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="banner">Баннер акции</Label>
                         <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground"/>
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Нажмите, чтобы загрузить фото</span></p>
                                    <p className="text-xs text-muted-foreground">Рекомендуемый размер 1200x400</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div> 
                    </div>
                    <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg">Создать турнир</Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}
