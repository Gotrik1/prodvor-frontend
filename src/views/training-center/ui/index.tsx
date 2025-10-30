
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Calendar, Dumbbell } from "lucide-react";
import { TrainingPage } from "@/views/training";
import { FitnessPlanPage } from "@/features/fitness-plan/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { useIsMobile } from '@/hooks/use-mobile';

const trainingTabs = [
    { value: 'schedule', label: 'Мое расписание', icon: Calendar, component: <TrainingPage /> },
    { value: 'constructor', label: 'Конструктор планов', icon: Dumbbell, component: <FitnessPlanPage /> }
];

export function TrainingCenterPage() {
  const [activeTab, setActiveTab] = useState('schedule');
  const isMobile = useIsMobile();

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
        <div>
            <h1 className="text-3xl font-bold font-headline">Тренировочный центр</h1>
            <p className="text-muted-foreground mt-1">
                Планируйте свою активность, создавайте шаблоны и следите за расписанием.
            </p>
        </div>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {isMobile ? (
                <Select value={activeTab} onValueChange={setActiveTab}>
                    <SelectTrigger>
                        <SelectValue placeholder="Выберите раздел..." />
                    </SelectTrigger>
                    <SelectContent>
                        {trainingTabs.map(tab => (
                            <SelectItem key={tab.value} value={tab.value}>
                                <div className="flex items-center gap-2">
                                    <tab.icon className="h-4 w-4" />
                                    {tab.label}
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            ) : (
                <TabsList>
                    {trainingTabs.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value}>
                            <tab.icon className="mr-2 h-4 w-4" />
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>
            )}

            {trainingTabs.map(tab => (
                <TabsContent key={tab.value} value={tab.value} className="mt-6">
                    {tab.component}
                </TabsContent>
            ))}
        </Tabs>
    </div>
  );
}
