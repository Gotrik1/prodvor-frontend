import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { User, Users, ClipboardList, Gavel, Briefcase, Shield, Megaphone, Handshake, Star, PlusCircle, GanttChart, BarChart, DollarSign, Eye } from "lucide-react";

const roleTemplates = [
    { name: "Игрок", slug: "player", description: "Персональная страница игрока.", icon: User },
    { name: "Команда", slug: "team", description: "Публичная страница команды.", icon: Users },
    { name: "Тренер", slug: "coach", description: "Инструменты для управления.", icon: ClipboardList },
    { name: "Судья", slug: "referee", description: "Управление матчами.", icon: Gavel },
    { name: "Менеджер", slug: "manager", description: "Управление командами.", icon: Briefcase },
    { name: "Модератор", slug: "moderator", description: "Управление контентом.", icon: Shield },
    { name: "Организатор", slug: "organizer", description: "Создание и управление турнирами.", icon: Megaphone },
    { name: "Спонсор", slug: "sponsor", description: "Страница спонсора.", icon: Handshake },
    { name: "Болельщик", slug: "fan", description: "Лента новостей и матчи.", icon: Star },
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
                    Централизованное управление всеми аспектами платформы: от предпросмотра шаблонов до аналитики.
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Управление шаблонами</CardTitle>
                        <CardDescription>
                           Предпросмотр страниц для различных ролей и сущностей с использованием моковых данных.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                           {roleTemplates.map((template) => (
                                <TemplateCardLink key={template.slug} {...template} />
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Управление турнирами</CardTitle>
                            <CardDescription>Создание, настройка и предпросмотр турниров.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Link href="/tournaments/create">
                                <Card className="cursor-pointer hover:border-primary transition-colors">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="p-3 rounded-md bg-primary/10 text-primary"><PlusCircle className="w-6 h-6" /></div>
                                        <div>
                                            <CardTitle className="text-base">Создать турнир</CardTitle>
                                            <p className="text-xs text-muted-foreground">Форма для создания нового турнира.</p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                            <Link href="/tournaments/mytourney1/manage">
                                <Card className="cursor-pointer hover:border-primary transition-colors">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="p-3 rounded-md bg-primary/10 text-primary"><GanttChart className="w-6 h-6" /></div>
                                        <div>
                                            <CardTitle className="text-base">Управление (CRM)</CardTitle>
                                            <p className="text-xs text-muted-foreground">Панель управления для организатора.</p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                             <Link href="/admin/templates/tournament-public">
                                <Card className="cursor-pointer hover:border-primary transition-colors">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="p-3 rounded-md bg-primary/10 text-primary"><Eye className="w-6 h-6" /></div>
                                        <div>
                                            <CardTitle className="text-base">Промо-страница</CardTitle>
                                            <p className="text-xs text-muted-foreground">Предпросмотр "афиши" турнира.</p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Инструменты платформы</CardTitle>
                            <CardDescription>Глобальные разделы для аналитики и управления.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Link href="/admin/statistics">
                                <Card className="cursor-pointer hover:border-primary transition-colors">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="p-3 rounded-md bg-primary/10 text-primary"><BarChart className="w-6 h-6" /></div>
                                        <div>
                                            <CardTitle className="text-base">Статистика</CardTitle>
                                            <p className="text-xs text-muted-foreground">Списки пользователей, команд и т.д.</p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                            <Link href="/admin/advertising">
                                <Card className="cursor-pointer hover:border-primary transition-colors">
                                    <CardHeader className="flex flex-row items-center gap-4">
                                        <div className="p-3 rounded-md bg-primary/10 text-primary"><DollarSign className="w-6 h-6" /></div>
                                        <div>
                                            <CardTitle className="text-base">Ad-CRM</CardTitle>
                                            <p className="text-xs text-muted-foreground">Управление рекламным инвентарем.</p>
                                        </div>
                                    </CardHeader>
                                </Card>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
}