
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { BookOpen, ShieldCheck, FileText, ArrowRight, Video, GraduationCap } from "lucide-react";
import Link from "next/link";

const mockCourses = [
    {
        id: 'course-1',
        title: 'VAR для дворового футбола: Продвинутый уровень',
        description: 'Изучите основы работы с видеоповторами в спорных ситуациях. Курс включает симуляции и практические задания.',
        type: 'Видеокурс',
        icon: Video,
    },
    {
        id: 'course-2',
        title: 'Психология в судействе: Управление конфликтами',
        description: 'Научитесь управлять эмоциями игроков и разрешать конфликтные ситуации на поле.',
        type: 'Лекция',
        icon: GraduationCap,
    },
];

const mockRules = [
    { id: 'rules-1', title: 'Правила дворового футбола 5х5 (ProDvor)', icon: FileText },
    { id: 'rules-2', title: 'Регламент по стритболу 3х3', icon: FileText },
    { id: 'rules-3', title: 'Общие положения о проведении матчей', icon: FileText },
];

export function RefereeCenterPage() {
    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline">Центр судей</h1>
                <p className="text-muted-foreground mt-1">
                    Ваш центр профессионального развития.
                </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-6 w-6 text-primary" />
                                Курсы повышения квалификации
                            </CardTitle>
                            <CardDescription>Проходите курсы, чтобы повысить свою категорию и получать назначения на более важные матчи.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {mockCourses.map(course => (
                                <Card key={course.id} className="bg-muted/50">
                                    <CardHeader>
                                        <CardTitle className="text-lg flex items-center gap-2">
                                            <course.icon className="h-5 w-5" />
                                            {course.title}
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground mb-4">{course.description}</p>
                                        <Button>Начать обучение <ArrowRight className="ml-2 h-4 w-4" /></Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <FileText className="h-6 w-6 text-primary" />
                                Спортивные регламенты
                            </CardTitle>
                             <CardDescription>Актуальные правила по всем дисциплинам ProDvor.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-2">
                                {mockRules.map(rule => (
                                    <li key={rule.id}>
                                        <Link href="#" className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors group">
                                            <div className="flex items-center gap-3">
                                                <rule.icon className="h-5 w-5 text-muted-foreground" />
                                                <span className="font-medium group-hover:text-primary">{rule.title}</span>
                                            </div>
                                            <ArrowRight className="h-4 w-4 text-muted-foreground" />
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                
                <Card className="sticky top-24">
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
                        <div className="p-4 border rounded-lg bg-muted/50 text-sm space-y-2">
                            <p><span className="font-semibold">Текущая категория:</span> Вторая</p>
                            <p><span className="font-semibold">Статус теста:</span> <span className="text-amber-400">Не пройден</span></p>
                        </div>
                        <p className="text-xs text-muted-foreground my-4">
                            Тест состоит из 30 вопросов по правилам и спорным ситуациям. Для успешной сдачи необходимо правильно ответить минимум на 25 вопросов.
                        </p>
                         <Button className="w-full" size="lg">
                            Начать тестирование
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
