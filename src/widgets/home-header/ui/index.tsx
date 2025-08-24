
import { Button } from "@/shared/ui/button";
import Link from "next/link";
import { ThemeToggle } from "@/shared/ui/theme-toggle";

export function HomeHeader() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-xl invisible">
                ProDvor
            </Link>
            <div className="flex items-center gap-2">
                <ThemeToggle />
                <Button asChild>
                    <Link href="/auth">Войти</Link>
                </Button>
            </div>
            </div>
      </header>
    )
}
