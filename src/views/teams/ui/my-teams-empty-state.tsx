
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Users } from "lucide-react";
import Link from "next/link";

export function MyTeamsEmptyState() {
    return (
        <Card className="flex items-center justify-center min-h-[200px] border-dashed">
            <CardContent className="text-center p-6">
                <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
                    <Users className="h-10 w-10" />
                </div>
                <h3 className="text-xl font-bold font-headline">Вы еще не состоите в командах</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                    Присоединитесь к существующей команде или создайте свою, чтобы начать свой путь к победе.
                </p>
                <Button asChild variant="secondary">
                    <Link href="/teams/create">
                        Создать команду
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
