
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs"
import { Calendar, Dumbbell } from "lucide-react"
import { TrainingPage } from "@/views/training";
import { FitnessPlanPage } from "@/views/fitness-plan";

export function TrainingCenterPage() {
  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Тренировочный центр</h1>
            <p className="text-muted-foreground mt-1">
                Планируйте свою активность, создавайте шаблоны и следите за расписанием.
            </p>
        </div>
        <Tabs defaultValue="schedule" className="w-full">
            <TabsList className="h-auto w-full flex-col sm:flex-row">
                <TabsTrigger value="schedule" className="w-full sm:w-auto"><Calendar className="mr-2 h-4 w-4" />Мое расписание</TabsTrigger>
                <TabsTrigger value="constructor" className="w-full sm:w-auto"><Dumbbell className="mr-2 h-4 w-4" />Конструктор планов</TabsTrigger>
            </TabsList>
            <TabsContent value="schedule" className="mt-6">
                <TrainingPage />
            </TabsContent>
            <TabsContent value="constructor" className="mt-6">
                <FitnessPlanPage />
            </TabsContent>
        </Tabs>
    </div>
  );
}
