import { Button } from "@/shared/ui/button";
import Link from "next/link";

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

            <main className="flex-1">
                <section className="py-16 md:py-24">
                    <div className="container mx-auto px-4 md:px-6">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 font-headline text-center">
                                Панель администратора
                            </h1>
                            <p className="text-lg md:text-xl text-muted-foreground mt-8 text-center">
                                Этот раздел предназначен для управления платформой.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <footer className="border-t border-border/40">
                <div className="container mx-auto px-4 md:px-6 py-6 text-center text-muted-foreground">
                    <p>© 2025 ProDvor. Все права защищены.</p>
                </div>
            </footer>
        </div>
    );
}
