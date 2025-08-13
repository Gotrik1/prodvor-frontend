import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Flame } from "lucide-react";

export function DashboardAside() {
  return (
    <>
      <Card className="bg-card">
        <CardHeader>
          <CardTitle>Центр прогнозов</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-sm mb-4">
            Сделайте прогноз и сравните с мнением AI-аналитика.
          </p>
          <Button className="w-full mb-4">
            <Flame className="mr-2 h-4 w-4" /> Прогноз AI
          </Button>
          <p className="text-center text-muted-foreground text-sm">
            Нет предстоящих матчей для прогноза.
          </p>
        </CardContent>
      </Card>
      <div className="h-64 bg-card rounded-lg border">
        {/* Placeholder for another component */}
      </div>
    </>
  );
}
