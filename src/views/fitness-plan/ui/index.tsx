
'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Dumbbell, Save, PlusCircle, Trash2, Calendar as CalendarIcon, BookOpen, Users, Star, Building, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/shared/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useToast } from '@/shared/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { FitnessSchedule } from '@/widgets/fitness-schedule';
import { PlanTypeSelector } from './plan-type-selector';
import { NewPlanForm } from './new-plan-form';
import type { WorkoutPlan, PlanType } from './types';


export function FitnessPlanPage() {
    const [plans, setPlans] = useState<WorkoutPlan[]>([]);
    const { toast } = useToast();
    const [isPlanFormOpen, setIsPlanFormOpen] = useState(false);
    const [selectedPlanType, setSelectedPlanType] = useState<PlanType | null>(null);

    const handleSavePlan = (plan: WorkoutPlan) => {
        setPlans([...plans, plan]);
        setIsPlanFormOpen(false);
        setSelectedPlanType(null); // Reset after saving
        toast({
            title: "План сохранен!",
            description: `Ваш новый план "${plan.name}" был успешно создан.`,
        });
    };

    const handleSelectPlanType = (type: PlanType) => {
        setSelectedPlanType(type);
    };
    
    const handleCloseDialog = () => {
        setIsPlanFormOpen(false);
        // Delay resetting the plan type to avoid flash of content
        setTimeout(() => setSelectedPlanType(null), 300);
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Мои планы тренировок</CardTitle>
                    <CardDescription>Создайте свои программы тренировок, чтобы быстро добавлять их в расписание.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {plans.map(plan => (
                            <Card key={plan.id} className="flex flex-col">
                                <CardHeader>
                                    <CardTitle>{plan.name}</CardTitle>
                                    <CardDescription>{plan.type.label}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <ul className="text-sm text-muted-foreground space-y-1">
                                        {Object.entries(plan.days).slice(0, 4).map(([dayKey, dayData]) => (
                                             <li key={dayKey} className="truncate"> • {dayData.name} ({dayData.exercises.length} упр.)</li>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardFooter>
                                     <Button className="w-full"><CalendarIcon className="mr-2 h-4 w-4"/>Запланировать</Button>
                                </CardFooter>
                            </Card>
                        ))}
                         <Dialog open={isPlanFormOpen} onOpenChange={setIsPlanFormOpen}>
                            <DialogTrigger asChild>
                                <Card className="flex items-center justify-center min-h-[200px] border-2 border-dashed hover:border-primary transition-colors cursor-pointer">
                                    <div className="text-center text-muted-foreground">
                                        <PlusCircle className="mx-auto h-10 w-10 mb-2" />
                                        <p className="font-semibold">Создать новый план</p>
                                    </div>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-4xl" onInteractOutside={handleCloseDialog}>
                                <DialogHeader>
                                    <DialogTitle>
                                        {selectedPlanType ? `Новый план: ${selectedPlanType.label}` : 'Создание нового плана'}
                                    </DialogTitle>
                                </DialogHeader>
                                {selectedPlanType ? (
                                    <NewPlanForm 
                                        planType={selectedPlanType} 
                                        onSave={handleSavePlan} 
                                        onBack={() => setSelectedPlanType(null)}
                                    />
                                ) : (
                                    <PlanTypeSelector onSelect={handleSelectPlanType} />
                                )}
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
