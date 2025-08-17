
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Puzzle } from "lucide-react";

export function QuestsPage() {
    return (
        <div className="p-4 md:p-6 space-y-6 flex items-center justify-center min-h-[80vh]">
            <Card className="text-center max-w-md w-full">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                      <Puzzle className="h-12 w-12" />
                    </div>
                    <CardTitle className="mt-4 text-2xl font-headline">Раздел "Квесты"</CardTitle>
                    <CardDescription>В разработке</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Этот раздел находится в разработке. Скоро здесь появятся ежедневные, еженедельные и специальные задания с наградами за их выполнение.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
