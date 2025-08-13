import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Construction } from "lucide-react";

export function MessagesPage() {
    return (
        <div className="p-4 md:p-6 space-y-6 flex items-center justify-center min-h-[80vh]">
            <Card className="text-center max-w-md w-full">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit">
                      <Construction className="h-12 w-12" />
                    </div>
                    <CardTitle className="mt-4 text-2xl font-headline">Раздел "Сообщения"</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Этот раздел находится в разработке. Скоро здесь появятся ваши чаты.
                    </p>
                </CardContent>
            </Card>
        </div>
    );
}
