import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Bot, Lightbulb } from "lucide-react";

export function DashboardAside() {
  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Lightbulb />Голосование дня</CardTitle>
          <CardDescription>Кто выиграет Летний Кубок ProDvor?</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full justify-start" variant="outline">Ночные Снайперы</Button>
          <Button className="w-full justify-start" variant="outline">Короли Асфальта</Button>
          <Button className="w-full justify-start" variant="outline">Стальные Ястребы</Button>
          <div className="flex items-center gap-2 pt-2">
            <Button className="w-full">Проголосовать</Button>
            <Button className="w-full" variant="secondary">
                <Bot className="mr-2 h-4 w-4" /> AI-Прогноз
            </Button>
          </div>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
            <CardTitle>Партнерский блок</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 bg-muted rounded-lg border flex items-center justify-center">
            <p className="text-sm text-muted-foreground">Место для баннера</p>
          </div>
        </CardContent>
       </Card>
    </>
  );
}
