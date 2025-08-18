
'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Save, PlusCircle, Trash2, Calendar as CalendarIcon, PlayCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/shared/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import { useToast } from '@/shared/hooks/use-toast';
import { FitnessSchedule } from '@/widgets/fitness-schedule';
import { PlanTypeSelector } from './plan-type-selector';
import { NewPlanForm } from './new-plan-form';
import type { WorkoutPlan, PlanType, Exercise } from './types';
import { useWorkoutStore } from '@/views/training-center/session/lib/workout-store';
import { useRouter } from 'next/navigation';
import { SplitTemplateSelector, splitTemplates } from './split-template-selector';
import { ScheduleActivityDialog } from './schedule-activity-dialog';
import { Activity } from './activity-library';

interface SplitTemplate {
    name: string;
    days: string[];
    prefilled?: boolean;
    exercises?: Record<string, Omit<Exercise, 'id'>[]>;
}

export function FitnessPlanPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { plans, addPlan, isPlanFormOpen, setIsPlanFormOpen, selectedPlanType, setSelectedPlanType } = useWorkoutStore();
    const [selectedSplitTemplate, setSelectedSplitTemplate] = useState<SplitTemplate | null>(null);
    const [activityToSchedule, setActivityToSchedule] = useState<Activity | null>(null);

    const handleSavePlan = (plan: WorkoutPlan) => {
        addPlan(plan);
        handleCloseDialog(); // Close and reset everything
        toast({
            title: "План сохранен!",
            description: `Ваш новый план "${plan.name}" был успешно создан.`,
        });
    };

    const handleSelectPlanType = (type: PlanType) => {
        setSelectedPlanType(type);
    };

    const handleSelectSplitTemplate = (template: SplitTemplate) => {
        setSelectedSplitTemplate(template);
    }
    
    const handleCloseDialog = () => {
        setIsPlanFormOpen(false);
        // Delay resetting to avoid content flash
        setTimeout(() => {
            setSelectedPlanType(null);
            setSelectedSplitTemplate(null);
        }, 300);
    }
    
    const handleStartWorkout = (plan: WorkoutPlan) => {
        router.push(`/training-center/session/${plan.id}`);
    };

    const handleBack = () => {
        if (selectedSplitTemplate) {
            setSelectedSplitTemplate(null);
        } else if (selectedPlanType) {
            setSelectedPlanType(null);
        }
    }

    const renderDialogContent = () => {
        if (selectedPlanType && selectedSplitTemplate) {
            return <NewPlanForm 
                        planType={selectedPlanType} 
                        dayNames={selectedSplitTemplate.days} 
                        templateName={selectedSplitTemplate.prefilled ? selectedSplitTemplate.name : ''}
                        prefilledExercises={selectedSplitTemplate.exercises}
                        onSave={handleSavePlan} 
                        onBack={handleBack} 
                    />
        }
        if (selectedPlanType) {
            return <SplitTemplateSelector planType={selectedPlanType} onSelect={handleSelectSplitTemplate} onBack={handleBack} />
        }
        return <PlanTypeSelector onSelect={handleSelectPlanType} />
    }
    
    const getDialogTitle = () => {
        if (selectedPlanType && selectedSplitTemplate) {
            return 'Шаг 3: Наполните план';
        }
        if (selectedPlanType) {
            return 'Шаг 2: Выберите шаблон разбивки';
        }
        return 'Шаг 1: Создание нового плана';
    }

    const handleScheduleClick = (plan: WorkoutPlan) => {
        // For simplicity, let's schedule the first day of the plan.
        // A more complex implementation could let the user choose which day.
        const firstDayKey = Object.keys(plan.days)[0];
        if (firstDayKey) {
            const activity: Activity = {
                id: plan.id,
                name: `${plan.name}: ${plan.days[firstDayKey].name}`,
                type: 'template',
            };
            setActivityToSchedule(activity);
        }
    };
    
     const handleConfirmSchedule = (scheduledActivity: any) => {
        // Here you would typically update a global schedule state.
        // For now, we'll just show a toast.
        toast({
            title: "Тренировка запланирована!",
            description: `"${scheduledActivity.name}" добавлена в ваше расписание.`,
        });
        setActivityToSchedule(null);
    };


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
                                <CardFooter className="gap-2">
                                     <Button variant="secondary" className="w-full" onClick={() => handleScheduleClick(plan)}><CalendarIcon className="mr-2 h-4 w-4"/>В расписание</Button>
                                     <Button className="w-full" onClick={() => handleStartWorkout(plan)}>
                                        <PlayCircle className="mr-2 h-4 w-4"/>Запустить
                                     </Button>
                                </CardFooter>
                            </Card>
                        ))}
                         <Dialog open={isPlanFormOpen} onOpenChange={handleCloseDialog}>
                            <DialogTrigger asChild>
                                <Card className="flex items-center justify-center min-h-[200px] border-2 border-dashed hover:border-primary transition-colors cursor-pointer" onClick={() => setIsPlanFormOpen(true)}>
                                    <div className="text-center text-muted-foreground">
                                        <PlusCircle className="mx-auto h-10 w-10 mb-2" />
                                        <p className="font-semibold">Создать новый план</p>
                                    </div>
                                </Card>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-4xl" onInteractOutside={(e) => {
                                // Prevent closing when clicking on select/popover triggers
                                const target = e.target as HTMLElement;
                                if(target.closest('[role="combobox"]') || target.closest('[aria-haspopup="dialog"]')) {
                                    e.preventDefault();
                                } else {
                                    handleCloseDialog();
                                }
                            }}>
                                <DialogHeader>
                                    <DialogTitle>{getDialogTitle()}</DialogTitle>
                                </DialogHeader>
                                {renderDialogContent()}
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardContent>
            </Card>
            {activityToSchedule && (
                 <ScheduleActivityDialog
                    isOpen={!!activityToSchedule}
                    onClose={() => setActivityToSchedule(null)}
                    activity={activityToSchedule}
                    onSchedule={handleConfirmSchedule}
                />
            )}
        </div>
    );
}
