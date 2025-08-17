
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Calendar } from "@/shared/ui/calendar";
import { Dumbbell, PlusCircle, Users, Clock, MapPin, Calendar as CalendarIcon } from "lucide-react";
import React from "react";
import { Badge } from "@/shared/ui/badge";
import Link from "next/link";
import Image from "next/image";
import { teams } from "@/mocks";

const mockPersonalTrainings = [
    { id: 1, title: "Силовая тренировка", type: "Воркаут", date: "2025-08-25T19:00:00", location: 'Площадка у дома' },
    { id: 2, title: "Пробежка", type: "Кардио", date: "2025-08-26T08:00:00", location: 'Парк "Сокольники"' },
];

const mockTeamTrainings = [
    { id: 1, team: teams[0], title: "Тактическая тренировка", date: "2025-08-27T18:30:00", location: 'Стадион "Центральный"' },
];


export function TrainingPage() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                        Мои тренировки
                    </h1>
                    <p className="text-muted-foreground mt-1">Планируйте свою активность и следите за командными занятиями.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button size="lg" asChild>
                        <Link href="/fitness-plan">
                             <PlusCircle className="mr-2 h-4 w-4" />
                            Конструктор планов
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2"><CalendarIcon /> Календарь активности</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-center">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                className="p-0"
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="lg:sticky top-24 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Предстоящие тренировки</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockPersonalTrainings.map(t => (
                                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div>
                                        <Badge variant="secondary">{t.type}</Badge>
                                        <p className="font-semibold mt-1">{t.title}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4" />
                                            {new Date(t.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                         <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            {t.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                              {mockTeamTrainings.map(t => (
                                <div key={t.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                                    <div>
                                         <Link href={`/teams/${t.team.id}`} className="flex items-center gap-2 mb-1 group">
                                            <Image src={t.team.logoUrl} alt={t.team.name} width={20} height={20} className="rounded-sm" data-ai-hint="team logo" />
                                            <span className="text-xs font-semibold group-hover:text-primary">{t.team.name}</span>
                                        </Link>
                                        <p className="font-semibold">{t.title}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4" />
                                            {new Date(t.date).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                         <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            {t.location}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                     <Card className="bg-gradient-to-br from-primary/20 to-card border-primary/50">
                        <CardHeader>
                            <div className="flex items-center gap-3 text-primary">
                                <Dumbbell className="h-6 w-6" />
                                <CardTitle className="text-2xl font-bold">Фитнес-тренировки</CardTitle>
                            </div>
                             <CardDescription className="text-foreground/80 pt-2">
                                Новый сервис от ProDvor! Получите персональные планы тренировок, разработанные AI под ваши цели.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">Узнать больше</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
