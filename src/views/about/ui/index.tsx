
import { Button } from "@/shared/ui/button";
import Image from "next/image";
import Link from "next/link";

export function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <main className="flex-1">
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 font-headline text-center">
                                О платформе ProDvor
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mt-8">
                                ProDvor — это революционная социальная платформа, созданная для того, чтобы объединить мир дворового спорта и любительского киберспорта. Наша миссия — предоставить каждому игроку, независимо от его уровня, инструменты и сообщество для роста, соревнований и достижения новых высот.
                            </p>
                            <p className="text-lg md:text-xl text-muted-foreground mt-6">
                                Мы верим, что страсть к игре не знает границ. Будь то футбольный матч на коробке за домом или напряженная онлайн-битва в любимой игре, ProDvor дает вам возможность:
                            </p>
                            <ul className="list-disc list-inside text-lg md:text-xl text-muted-foreground mt-6 space-y-2">
                                <li>Создавать команды и управлять ими.</li>
                                <li>Находить соперников и организовывать матчи.</li>
                                <li>Участвовать в регулярных турнирах и лигах с реальными призами.</li>
                                <li>Отслеживать свою статистику и прогресс.</li>
                                <li>Использовать AI-инструменты для анализа игр и создания уникальной командной айдентики.</li>
                                <li>Быть частью живого и активного сообщества единомышленников.</li>
                            </ul>
                            <p className="text-lg md:text-xl text-muted-foreground mt-6">
                                ProDvor — это не просто платформа. Это ваша арена, где вы устанавливаете правила и пишете свою собственную историю побед.
                            </p>
                            <div className="text-center mt-12">
                                <Button asChild size="lg">
                                    <Link href="/auth/register">Присоединиться сейчас</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
