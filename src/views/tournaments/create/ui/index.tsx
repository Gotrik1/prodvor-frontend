import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { ArrowLeft, Construction } from "lucide-react";
import Link from "next/link";

export function CreateTournamentPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                     <Button asChild variant="outline">
                        <Link href="/tournaments">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Назад к турнирам
                        </Link>
                    </Button>
                    <h1 className="text-lg font-semibold">Создание нового турнира</h1>
                </div>
            </header>
            <main className="flex-1 flex items-center justify-center p-4">
                <Card className="text-center max-w-lg w-full">
                    <CardHeader>
                        <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                        <Construction className="h-12 w-12" />
                        </div>
                        <CardTitle className="mt-4 text-2xl font-headline">Раздел в разработке</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Интерфейс для создания и настройки турнира появится здесь в ближайшее время.
                        </p>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}
