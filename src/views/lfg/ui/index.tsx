
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Search } from "lucide-react";

export function LfgPage() {
    return (
        <div className="p-4 md:p-6 space-y-6 flex items-center justify-center min-h-[80vh]">
            <Card className="text-center max-w-md w-full">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                      <Search className="h-12 w-12" />
                    </div>
                    <CardTitle className="mt-4 text-2xl font-headline">Раздел "Поиск игры"</CardTitle>
                    <CardDescription>В разработке</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Этот раздел находится в разработке. Скоро здесь можно будет создавать объявления о поиске игроков или команды, а также откликаться на существующие.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
