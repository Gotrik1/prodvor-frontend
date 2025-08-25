

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { BookOpen, ShieldCheck, ArrowRight, Star, BarChart, Calendar, Gavel, Archive, Search, Bot, Send, Loader2, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Progress } from "@/shared/ui/progress";
import React, { useState } from "react";
import { Badge } from "@/shared/ui/badge";
import { mockCourses, mockCases, knowledgeBaseData } from '../lib/mock-data';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Input } from "@/shared/ui/input";
import { askRulesExpertAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import type { AskRulesExpertOutput } from "@/shared/lib/schemas";


const AiAssistant = () => {
    const [question, setQuestion] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<AskRulesExpertOutput | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!question.trim()) return;
        
        setIsLoading(true);
        setResult(null);
        
        const response = await askRulesExpertAction({ question });
        setResult(response);
        setIsLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Bot />AI-Консультант</CardTitle>
                <CardDescription>Задайте вопрос по правилам в свободной форме.</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
                    <Input 
                        placeholder="Напр., офсайд в мини-футболе" 
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        disabled={isLoading}
                    />
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                </form>
                {result && (
                    <Alert>
                        <AlertTitle>Ответ AI</AlertTitle>
                        <AlertDescription className="space-y-2">
                            <p>{result.answer}</p>
                            {result.source && (
                                <p className="text-xs text-muted-foreground border-t pt-2 mt-2">
                                    Источник: {result.source}
                                </p>
                            )}
                        </AlertDescription>
                    </Alert>
                )}
            </CardContent>
        </Card>
    )
};


export function RefereeCenterPage() {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredKnowledgeBase = knowledgeBaseData.map(sport => ({
        ...sport,
        documents: sport.documents.filter(doc => 
            doc.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
    })).filter(sport => sport.documents.length > 0);


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
                    <AiAssistant />
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
                               <Card key={course.id} className={course.id === mockCourses[0].id ? "bg-muted/50 border-primary/50" : ""}>
                                   <CardHeader>
                                       <CardTitle className="text-lg flex items-center gap-2">
                                            <course.icon className="h-5 w-5"/>
                                            {course.title}
                                       </CardTitle>
                                       <CardDescription>
                                            {course.discipline}
                                            {course.id === mockCourses[0].id && <Badge variant="secondary" className="ml-2">Рекомендовано</Badge>}
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

                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <CardTitle className="flex items-center gap-2">
                                    <Gavel className="h-6 w-6 text-primary" />
                                    База знаний
                                </CardTitle>
                            </div>
                            <CardDescription>Всегда актуальные версии правил и регламентов по ключевым видам спорта.</CardDescription>
                             <div className="relative mt-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input 
                                    placeholder="Поиск по документам..." 
                                    className="pl-9"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Accordion type="single" collapsible className="w-full" defaultValue="football">
                                {filteredKnowledgeBase.map(sport => (
                                    <AccordionItem value={sport.id} key={sport.id}>
                                        <AccordionTrigger className="text-lg font-semibold text-left">{sport.name}</AccordionTrigger>
                                        <AccordionContent>
                                            <div className="space-y-2 pl-2">
                                                {sport.documents.map(doc => (
                                                    <Link href="#" key={doc.id} className="flex items-center gap-3 p-2 rounded-md hover:bg-muted/50 group">
                                                        <doc.icon className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors"/>
                                                        <span className="font-medium group-hover:text-primary transition-colors">{doc.title}</span>
                                                    </Link>
                                                ))}
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                            {filteredKnowledgeBase.length === 0 && (
                                <p className="text-center text-muted-foreground py-4">По вашему запросу ничего не найдено.</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
                
                <div className="space-y-8 lg:sticky top-24">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BarChart />Моя карьера</CardTitle>
                             <CardDescription>Ваш текущий статус и прогресс к следующей категории.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-baseline p-2 bg-muted/50 rounded-md">
                                <span className="text-muted-foreground">Категория:</span>
                                <span className="font-bold text-lg">Вторая</span>
                            </div>
                            <div className="flex justify-between items-baseline p-2 bg-muted/50 rounded-md">
                                <span className="text-muted-foreground">Рейтинг:</span>
                                <div className="flex items-center gap-1 font-bold text-lg text-amber-400">
                                    <Star className="h-4 w-4 fill-amber-400"/> 4.82
                                </div>
                            </div>
                             <div className="flex justify-between items-baseline p-2 bg-muted/50 rounded-md">
                                <span className="text-muted-foreground">Матчей отсужено:</span>
                                <span className="font-bold text-lg">128</span>
                            </div>
                             <Button asChild className="w-full mt-2">
                                <Link href="/training-center">
                                    <Calendar className="mr-2 h-4 w-4" />
                                    Управлять расписанием
                                </Link>
                            </Button>
                        </CardContent>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2 text-primary pt-4 border-t"><ShieldCheck />Аттестация</CardTitle>
                             <CardDescription>
                                Выполните цели для повышения категории до &quot;Первой&quot;.
                            </CardDescription>
                        </CardHeader>
                         <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center text-sm mb-1">
                                    <span className="font-medium">Прогресс до теста:</span>
                                    <span className="font-bold text-primary">80%</span>
                                </div>
                                <Progress value={80} />
                                <ul className="text-xs text-muted-foreground pt-2 space-y-1.5">
                                    <li className="flex items-center"><CheckCircle className="h-3.5 w-3.5 mr-2 text-green-500" /> Отсудить еще 2 рейтинговых матча.</li>
                                    <li className="flex items-center"><CheckCircle className="h-3.5 w-3.5 mr-2 text-green-500" /> Пройти курс <Link href="#" className="text-primary hover:underline ml-1">&quot;VAR для дворового футбола&quot;</Link>.</li>
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
