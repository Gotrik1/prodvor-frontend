import { Button } from "@/shared/ui/button";
import Image from "next/image";
import Link from "next/link";

const Logo = () => (
    <Image 
      src="https://placehold.co/64x64.png"
      alt="ProDvor Logo" 
      width={40} 
      height={40} 
      className="object-contain"
      data-ai-hint="logo"
    />
);

export function HomeHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <Logo />
                    <span className="font-headline">ProDvor</span>
                </Link>
                <nav className="hidden md:flex gap-6 items-center">
                    <Link href="/teams" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        Команды
                    </Link>
                    <Link href="/competitions" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        Соревнования
                    </Link>
                     <Link href="/playgrounds" className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                        Площадки
                    </Link>
                </nav>
                <Button asChild>
                    <Link href="/auth">Войти / Регистрация</Link>
                </Button>
            </div>
      </header>
    );
}
