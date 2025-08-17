
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { BookOpen, ShieldCheck, FileText, ArrowRight, Video, GraduationCap, Star, BarChart, Calendar, Gavel, Archive } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/shared/ui/progress";
import React from "react";
import { Badge } from "@/shared/ui/badge";

const mockCourses = [
    {
        id: 'course-1',
        title: 'VAR для дворового футбола: Продвинутый уровень',
        description: 'Изучите основы работы с видеоповторами в спорных ситуациях. Курс включает симуляции и практические задания.',
        type: 'Видеокурс',
        discipline: 'Футбол',
        icon: Video,
        progress: 75,
    },
    {
        id: 'course-2',
        title: 'Психология в судействе: Управление конфликтами',
        description: 'Научитесь управлять эмоциями игроков и разрешать конфликтные ситуации на поле.',
        type: 'Лекция',
        discipline: 'Общее',
        icon: GraduationCap,
        progress: 100,
    },
    {
        id: 'course-3',
        title: 'Правила стритбола 3х3: Разбор сложных моментов',
        description: 'Детальный анализ правил FIBA 3x3 с примерами из реальных игр.',
        type: 'Видеокурс',
        discipline: 'Баскетбол',
        icon: Video,
        progress: 20,
    }
];

const mockCases = [
    { id: 'case-1', title: 'Спорный гол на последних секундах', discipline: 'Футбол', tags: ['VAR', 'Правило последнего касания'] },
    { id: 'case-2', title: 'Определение неспортивного поведения', discipline: 'Баскетбол', tags: ['Неспортивный фол', 'Дисквалификация'] },
    { id: 'case-3', title: 'Двойное касание в волейболе', discipline: 'Волейбол', tags: ['Техническая ошибка'] },
];


export function RefereeCenterPage() {
    const recommendedCourse = mockCourses[0];

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Центр судей</h1>
                <p className="text-muted-foreground mt-1">
                    Ваш центр профессионального развития.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-primary" />
                                Образовательная платформа
                            </CardTitle>
                            <CardDescription>Проходите курсы, чтобы повысить свою категорию и получать назначения на более важные матчи.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                           {mockCourses.map(course => (
                               <Card key={course.id} className={course.id === recommendedCourse.id ? "bg-muted/50 border-primary/50" : ""}>
                                   <CardHeader>
                                       <CardTitle className="text-lg flex items-center gap-2">
                                            <course.icon className="h-5 w-5"/>
                                            {course.title}
                                       </CardTitle>
                                       <CardDescription>
                                            {course.discipline}
                                            {course.id === recommendedCourse.id && <Badge variant="secondary" className="ml-2">Рекомендовано</Badge>}
                                        </CardDescription>
                                   </CardHeader>
                                   <CardContent>
                                       <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                                       {course.progress !== undefined && (
                                            <div className="space-y-2 mb-4">
                                               <div className="flex justify-between items-center text-sm mb-1">
                                                   <span className="font-medium">Прогресс:</span>
                                                   <span className="font-bold text-primary">{course.progress}%</span>
                                               </div>
                                               <Progress value={course.progress} />
                                           </div>
                                       )}
                                       <Button>
                                           {course.progress === 100 ? 'Повторить' : course.progress && course.progress > 0 ? 'Продолжить' : 'Начать'}
                                           <ArrowRight className="ml-2 h-4 w-4" />
                                       </Button>
                                   </CardContent>
                               </Card>
                           ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Archive className="h-6 w-6 text-primary" />
                                    Разбор кейсов
                                </CardTitle>
                                <Button variant="ghost" size="sm">Смотреть все</Button>
                            </div>
                            <CardDescription>Анализ сложных и спорных игровых ситуаций от экспертов ProDvor.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {mockCases.map(caseItem => (
                                <Link href="#" key={caseItem.id} className="block group">
                                    <div className="p-4 rounded-lg border bg-background hover:border-primary/50 transition-colors">
                                        <h4 className="font-semibold group-hover:text-primary">{caseItem.title}</h4>
                                        <div className="flex items-center gap-2 mt-2">
                                            <Badge variant="secondary">{caseItem.discipline}</Badge>
                                            {caseItem.tags.map(tag => (
                                                <Badge key={tag} variant="outline">{tag}</Badge>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </CardContent>
                    </Card>

                </div>
                
                <div className="space-y-8 lg:sticky top-24">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BarChart />Моя карьера</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between items-baseline">
                                <span className="text-muted-foreground">Категория:</span>
                                <span className="font-bold text-lg">Вторая</span>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-muted-foreground">Рейтинг:</span>
                                <div className="flex items-center gap-1 font-bold text-lg text-amber-400">
                                    <Star className="h-4 w-4 fill-amber-400"/> 4.82
                                </div>
                            </div>
                            <div className="flex justify-between items-baseline">
                                <span className="text-muted-foreground">Матчей отсужено:</span>
                                <span className="font-bold text-lg">128</span>
                            </div>
                             <Button asChild className="w-full mt-4 !-mb-2">
                                <Link href="/training-center">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Управлять расписанием
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="text-center">
                            <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
                                <ShieldCheck className="h-10 w-10" />
                            </div>
                            <CardTitle className="text-2xl">Аттестация</CardTitle>
                            <CardDescription>
                                Подтвердите свою квалификацию, чтобы повысить судейскую категорию до "Первой".
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="font-medium">Прогресс до теста:</span>
                                    <span className="font-bold text-primary">80%</span>
                                </div>
                                <Progress value={80} />
                                <ul className="text-xs text-muted-foreground list-disc pl-4 mt-2 space-y-1">
                                    <li>Отсудить еще 2 рейтинговых матча.</li>
                                    <li>Пройти курс <Link href="#" className="text-primary hover:underline">"VAR для дворового футбола"</Link>.</li>
                                </ul>
                            </div>
                            <Button className="w-full mt-6" disabled>
                                Тестирование (недоступно)
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
