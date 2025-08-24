import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Construction } from "lucide-react";

export function PlaceholderTemplate({ roleName }: { roleName: string }) {
    return (
        <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-muted/20 flex items-center justify-center min-h-[60vh]">
            <Card className="text-center max-w-md">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                      <Construction className="h-12 w-12" />
                    </div>
                    <CardTitle className="mt-4 text-2xl font-headline">Шаблон для роли &quot;{roleName}&quot;</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Этот шаблон находится в разработке. Скоро здесь появится полноценный интерфейс для управления задачами, специфичными для данной роли.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
