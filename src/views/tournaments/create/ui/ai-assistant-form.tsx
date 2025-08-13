import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Construction } from "lucide-react";

export function AiAssistantForm() {
    return (
        <Card className="mt-4">
            <CardHeader>
                <CardTitle>Создание турнира с AI-Мастером</CardTitle>
                <CardDescription>
                    Воспользуйтесь помощью AI-ассистента для быстрого создания концепции турнира.
                </CardDescription>
            </CardHeader>
             <CardContent className="flex flex-col items-center justify-center text-center min-h-[40vh]">
                 <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                    <Construction className="h-12 w-12" />
                </div>
                <h3 className="mt-4 text-2xl font-headline">Раздел в разработке</h3>
                <p className="text-muted-foreground mt-2">
                    Этот увлекательный функционал скоро появится.
                </p>
            </CardContent>
        </Card>
    );
}
