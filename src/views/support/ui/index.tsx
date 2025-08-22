
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/shared/ui/card";
import { LifeBuoy, Send } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/shared/ui/accordion";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Button } from "@/shared/ui/button";
import { useToast } from "@/shared/hooks/use-toast";

const faqData = [
    {
        category: 'Общие вопросы',
        questions: [
            { q: 'Что такое ProDvor?', a: 'ProDvor — это социальная платформа, объединяющая дворовый спорт и любительский киберспорт. Мы помогаем игрокам находить команды, участвовать в турнирах и развивать свою спортивную карьеру.' },
            { q: 'Как изменить свою роль на платформе?', a: 'Роль выбирается при регистрации. Для смены роли (например, с "Игрока" на "Тренера") необходимо приобрести соответствующий статус в магазине или получить приглашение от организации.' },
            { q: 'Что такое ELO-рейтинг?', a: 'Это система для расчета относительной силы игроков и команд. За победу над сильным соперником вы получаете больше очков, чем за победу над слабым.' },
        ]
    },
    {
        category: 'Турниры',
        questions: [
            { q: 'Как зарегистрировать команду на турнир?', a: 'На странице турнира нажмите кнопку "Подать заявку". Это может сделать только капитан команды, соответствующей дисциплине турнира.' },
            { q: 'Где посмотреть сетку и расписание?', a: 'На странице турнира перейдите в "Турнирный хаб". Там вы найдете всю актуальную информацию о ходе соревнования.' },
        ]
    },
    {
        category: 'Команды',
        questions: [
            { q: 'Как создать свою команду?', a: 'Перейдите в раздел "Команды" и нажмите кнопку "Создать свою команду". Вы автоматически станете ее капитаном.' },
            { q: 'Как пригласить игрока в команду?', a: 'Это может сделать только капитан. В разделе управления командой есть функция поиска и приглашения игроков по никнейму.' },
        ]
    }
];

export function SupportPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Запрос отправлен!",
            description: "Наша команда поддержки свяжется с вами в ближайшее время.",
        });
        (e.target as HTMLFormElement).reset();
    };


    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
                      <LifeBuoy className="h-12 w-12" />
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold font-headline">Центр поддержки</h1>
                    <p className="text-muted-foreground mt-2">
                        Найдите ответы на свои вопросы или свяжитесь с нами.
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Часто задаваемые вопросы (FAQ)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Accordion type="single" collapsible className="w-full">
                            {faqData.map(category => (
                                <React.Fragment key={category.category}>
                                    <h3 className="text-lg font-semibold mt-4 mb-2">{category.category}</h3>
                                    {category.questions.map(item => (
                                        <AccordionItem value={item.q} key={item.q}>
                                            <AccordionTrigger>{item.q}</AccordionTrigger>
                                            <AccordionContent>
                                                {item.a}
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </React.Fragment>
                            ))}
                        </Accordion>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Не нашли ответ?</CardTitle>
                        <CardDescription>Заполните форму ниже, и наша команда поддержки свяжется с вами.</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="category">Категория</Label>
                                    <Select>
                                        <SelectTrigger id="category">
                                            <SelectValue placeholder="Выберите категорию вопроса" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="technical">Техническая проблема</SelectItem>
                                            <SelectItem value="tournaments">Вопрос по турниру</SelectItem>
                                            <SelectItem value="profile">Профиль и аккаунт</SelectItem>
                                            <SelectItem value="other">Другое</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="subject">Тема</Label>
                                    <Input id="subject" placeholder="Кратко опишите проблему" required />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Описание</Label>
                                <Textarea id="description" placeholder="Опишите вашу проблему как можно подробнее..." rows={6} required />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button type="submit">
                                <Send className="mr-2 h-4 w-4" />
                                Отправить запрос
                            </Button>
                        </CardFooter>
                    </form>
                </Card>
            </div>
        </div>
    );
}
