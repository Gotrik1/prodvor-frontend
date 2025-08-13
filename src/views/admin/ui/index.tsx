import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import Link from "next/link";
import { PlayerPageTemplate } from "./templates/player-page-template";
import { TeamPageTemplate } from "./templates/team-page-template";

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
                        <p className="text-lg md:text-xl text-muted-foreground mt-4">
                            Этот раздел предназначен для управления платформой и просмотра шаблонов страниц.
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
                            <Tabs defaultValue="player">
                                <TabsList className="mb-4">
                                    <TabsTrigger value="player">Страница игрока</TabsTrigger>
                                    <TabsTrigger value="team">Страница команды</TabsTrigger>
                                </TabsList>
                                <TabsContent value="player">
                                    <PlayerPageTemplate />
                                </TabsContent>
                                <TabsContent value="team">
                                    <TeamPageTemplate />
                                </TabsContent>
                            </Tabs>
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
