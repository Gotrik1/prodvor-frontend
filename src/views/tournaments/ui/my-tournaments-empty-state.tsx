
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { PlusCircle, Trophy } from "lucide-react";
import Link from "next/link";

export function MyTournamentsEmptyState() {
    return (
        <Card className="flex items-center justify-center min-h-[300px] border-dashed">
            <CardContent className="text-center p-6">
                <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
                    <Trophy className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-bold font-headline">У вас пока нет турниров</h3>
                <p className="text-muted-foreground mt-2 mb-6 max-w-sm">
                    Создайте свой первый турнир и начните собирать участников, или присоединитесь к уже существующим.
                </p>
                <Button asChild>
                    <Link href="/tournaments/create">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Создать турнир
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}
