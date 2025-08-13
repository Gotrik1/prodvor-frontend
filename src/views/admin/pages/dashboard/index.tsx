import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { User, Users, ClipboardList, Gavel, Briefcase, Shield, Megaphone, Handshake, Star, PlusCircle, GanttChart, BarChart, DollarSign } from "lucide-react";

const roles = [
    {
        name: "Команда",
        slug: "team",
        description: "Публичная страница команды с составом, матчами и статистикой.",
        icon: Users,
    },
    {
        name: "Тренер",
        slug: "coach",
        description: "Инструменты для управления тренировками и аналитики команды.",
        icon: ClipboardList,
    },
    {
        name: "Судья",
        slug: "referee",
        description: "Управление матчами, фиксация результатов и просмотр расписания.",
        icon: Gavel,
    },
    {
        name: "Менеджер",
        slug: "manager",
        description: "Инструменты для управления несколькими командами и игроками.",
        icon: Briefcase,
    },
    {
        name: "Модератор",
        slug: "moderator",
        description: "Инструменты для управления контентом и пользователями.",
        icon: Shield,
    },
    {
        name: "Организатор",
        slug: "organizer",
        description: "Создание и управление турнирами, лигами и мероприятиями.",
        icon: Megaphone,
    },
    {
        name: "Спонсор",
        slug: "sponsor",
        description: "Страница с информацией о спонсируемых командах и турнирах.",
        icon: Handshake,
    },
    {
        name: "Болельщик",
        slug: "fan",
        description: "Лента новостей, отслеживаемые команды и предстоящие матчи.",
        icon: Star,
    },
];

const TemplateCardLink = ({ name, description, icon: Icon, slug }: { name: string; description: string; icon: LucideIcon; slug: string; }) => (
    <Link href={`/admin/templates/${slug}`}>
        <Card className="cursor-pointer h-full hover:border-primary transition-colors hover:shadow-lg">
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
    </Link>
);


export function AdminDashboardPage() {
    return (
        <>
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 font-headline">
                    Панель администратора
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mt-4 max-w-3xl mx-auto">
                    Этот раздел предназначен для управления платформой и просмотра шаблонов страниц для различных ролей и сущностей. Нажмите на карточку для предпросмотра.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Шаблоны страниц</CardTitle>
                        <CardDescription>
                            Здесь можно увидеть, как выглядят страницы для разных ролей и сущностей с использованием моковых данных.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            <TemplateCardLink
                                name="Игрок"
                                description="Персональная страница игрока со статистикой и достижениями."
                                icon={User}
                                slug="player"
                            />

                            {roles.map((role) => (
                                <TemplateCardLink key={role.name} {...role} />
                            ))}

                            <Link href="/tournaments/create">
                                <Card className="cursor-pointer h-full hover:border-primary transition-colors hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="p-3 rounded-md bg-primary/10 text-primary">
                                            <PlusCircle className="w-6 h-6" />
                                        </div>
                                        <CardTitle>Создание турнира</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">Страница с формой для создания нового турнира.</p>
                                    </CardContent>
                                </Card>
                            </Link>

                            <Link href="/tournaments/mytourney1/manage">
                                <Card className="cursor-pointer h-full hover:border-primary transition-colors hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="p-3 rounded-md bg-primary/10 text-primary">
                                            <GanttChart className="w-6 h-6" />
                                        </div>
                                        <CardTitle>Управление турниром</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">Страница CRM для управления существующим турниром.</p>
                                    </CardContent>
                                </Card>
                            </Link>

                        </div>
                    </CardContent>
                </Card>
                    <Card>
                    <CardHeader>
                        <CardTitle>Инструменты</CardTitle>
                        <CardDescription>
                            Разделы для управления данными и просмотра статистики.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6">
                                <Link href="/admin/statistics">
                                <Card className="cursor-pointer h-full hover:border-primary transition-colors hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="p-3 rounded-md bg-primary/10 text-primary">
                                            <BarChart className="w-6 h-6" />
                                        </div>
                                        <CardTitle>Статистика</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">Просмотр списков всех пользователей, команд и спонсоров.</p>
                                    </CardContent>
                                </Card>
                            </Link>
                                <Link href="/admin/advertising">
                                <Card className="cursor-pointer h-full hover:border-primary transition-colors hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="p-3 rounded-md bg-primary/10 text-primary">
                                            <DollarSign className="w-6 h-6" />
                                        </div>
                                        <CardTitle>Ad-CRM</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">Управление рекламой, аналитика и прогнозирование.</p>
                                    </CardContent>
                                </Card>
                            </Link>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
