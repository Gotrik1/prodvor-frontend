import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import Link from "next/link";
import { PlayerPageTemplate } from "./templates/player-page-template";
import { TeamPageTemplate } from "./templates/team-page-template";
import type { LucideIcon } from "lucide-react";
import { User, Users, ClipboardList, Gavel, Briefcase, Shield, Megaphone, Handshake, Star } from "lucide-react";
import React from "react";
import { ScrollArea } from "@/shared/ui/scroll-area";

const roles = [
    // This card will now be a link
    // {
    //     name: "Игрок",
    //     description: "Персональная страница игрока со статистикой и достижениями.",
    //     icon: User,
    //     template: <PlayerPageTemplate />,
    // },
    {
        name: "Команда",
        description: "Публичная страница команды с составом, матчами и статистикой.",
        icon: Users,
        template: <TeamPageTemplate />,
    },
    {
        name: "Тренер",
        description: "Инструменты для управления тренировками и аналитики команды.",
        icon: ClipboardList,
        template: <div className="text-center p-8">Шаблон для тренера в разработке.</div>,
    },
    {
        name: "Судья",
        description: "Управление матчами, фиксация результатов и просмотр расписания.",
        icon: Gavel,
        template: <div className="text-center p-8">Шаблон для судьи в разработке.</div>,
    },
    {
        name: "Менеджер",
        description: "Инструменты для управления несколькими командами и игроками.",
        icon: Briefcase,
        template: <div className="text-center p-8">Шаблон для менеджера в разработке.</div>,
    },
    {
        name: "Модератор",
        description: "Инструменты для управления контентом и пользователями.",
        icon: Shield,
        template: <div className="text-center p-8">Шаблон для модератора в разработке.</div>,
    },
    {
        name: "Организатор",
        description: "Создание и управление турнирами, лигами и мероприятиями.",
        icon: Megaphone,
        template: <div className="text-center p-8">Шаблон для организатора в разработке.</div>,
    },
    {
        name: "Спонсор",
        description: "Страница с информацией о спонсируемых командах и турнирах.",
        icon: Handshake,
        template: <div className="text-center p-8">Шаблон для спонсора в разработке.</div>,
    },
    {
        name: "Болельщик",
        description: "Лента новостей, отслеживаемые команды и предстоящие матчи.",
        icon: Star,
        template: <div className="text-center p-8">Шаблон для болельщика в разработке.</div>,
    },
];

const TemplateCardAsDialog = ({
    name,
    description,
    icon: Icon,
    template,
}: {
    name: string;
    description: string;
    icon: LucideIcon;
    template: React.ReactNode;
}) => (
    <Dialog>
        <DialogTrigger asChild>
            <Card className="cursor-pointer hover:border-primary transition-colors hover:shadow-lg">
                <CardHeader className="flex flex-row items-center gap-4">
                    <div className="p-3 rounded-md bg-primary/10 text-primary">
                        <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle>{name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">{description}</p>
                </CardContent>
            </Card>
        </DialogTrigger>
        <DialogContent className="max-w-4xl h-[90vh]">
            <DialogHeader>
                <DialogTitle>Предпросмотр шаблона: {name}</DialogTitle>
            </DialogHeader>
            <ScrollArea className="h-full pr-6">
                <div className="py-4">
                  {template}
                </div>
            </ScrollArea>
        </DialogContent>
    </Dialog>
);


export function AdminPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
                        <span className="font-headline">ProDvor</span>
                    </Link>
                    <Button asChild>
                        <Link href="/dashboard">Вернуться в дашборд</Link>
                    </Button>
                </div>
            </header>

            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 font-headline">
                            Панель администратора
                        </h1>
                        <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                            Этот раздел предназначен для управления платформой и просмотра шаблонов страниц для различных ролей и сущностей. Нажмите на карточку для предпросмотра.
                        </p>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>Шаблоны страниц</CardTitle>
                            <CardDescription>
                                Здесь можно увидеть, как выглядят страницы для разных ролей и сущностей с использованием моковых данных.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                <Link href="/admin/templates/player">
                                    <Card className="cursor-pointer h-full hover:border-primary transition-colors hover:shadow-lg">
                                        <CardHeader className="flex flex-row items-center gap-4">
                                            <div className="p-3 rounded-md bg-primary/10 text-primary">
                                                <User className="w-6 h-6" />
                                            </div>
                                            <CardTitle>Игрок</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <p className="text-sm text-muted-foreground">Персональная страница игрока со статистикой и достижениями.</p>
                                        </CardContent>
                                    </Card>
                                </Link>

                                {roles.map((role) => (
                                    <TemplateCardAsDialog key={role.name} {...role} />
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            <footer className="border-t border-border/40 mt-12">
                <div className="container mx-auto px-4 md:px-6 py-6 text-center text-muted-foreground">
                    <p>© 2025 ProDvor. Все права защищены.</p>
                </div>
            </footer>
        </div>
    );
}
