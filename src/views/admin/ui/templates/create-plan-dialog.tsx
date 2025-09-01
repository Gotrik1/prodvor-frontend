
'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { PlanTypeSelector } from '@/views/fitness-plan/ui/plan-type-selector';
import { SplitTemplateSelector } from '@/views/fitness-plan/ui/split-template-selector';
import { NewPlanForm } from '@/views/fitness-plan/ui/new-plan-form';
import type { PlanType, WorkoutPlan, Exercise } from '@/views/fitness-plan/ui/types';
import type { User } from '@/mocks';
import { useToast } from '@/shared/hooks/use-toast';
import { usePlanStore } from '@/entities/training/model/use-plan-store';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

interface CreatePlanDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    client: User;
    coach: User;
}

interface SplitTemplate {
    name: string;
    days: string[];
    prefilled?: boolean;
    exercises?: Record<string, Omit<Exercise, 'id'>[]>;
}

export function CreatePlanDialog({ isOpen, setIsOpen, client, coach }: CreatePlanDialogProps) {
    const { toast } = useToast();
    // This is a bit of a trick: we get the `addPlan` function but we won't use it directly on the coach.
    // Instead, we'll simulate adding the plan to the client's store.
    // In a real app, an API call would handle this assignment.
    const { addPlan } = usePlanStore();
    const { user: currentUser, setUser } = useUserStore();
    
    const [selectedPlanType, setSelectedPlanType] = useState<PlanType | null>(null);
    const [selectedSplitTemplate, setSelectedSplitTemplate] = useState<SplitTemplate | null>(null);

    const handleCloseDialog = () => {
        setIsOpen(false);
        // Delay resetting to avoid content flash
        setTimeout(() => {
            setSelectedPlanType(null);
            setSelectedSplitTemplate(null);
        }, 300);
    }

    const handleSavePlan = (plan: WorkoutPlan) => {
        // --- SIMULATION of assigning plan to a client ---
        // 1. Temporarily switch context to the client
        const originalUser = currentUser;
        setUser(client);

        // 2. Add the plan as if the client themself added it.
        // This will add it to the correct user's plan list in the simulation.
        addPlan(plan);

        // 3. Switch back to the coach's context
        if (originalUser) {
             setUser(originalUser);
        }
        // --- END SIMULATION ---
        
        handleCloseDialog();
        toast({
            title: "План назначен!",
            description: `План "${plan.name}" был успешно создан и назначен клиенту ${client.nickname}.`,
        });
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
                        clientName={client.nickname}
                    />
        }
        if (selectedPlanType) {
            return <SplitTemplateSelector planType={selectedPlanType} onSelect={setSelectedSplitTemplate} onBack={handleBack} />
        }
        return <PlanTypeSelector onSelect={setSelectedPlanType} />
    }
    
    const getDialogTitle = () => {
        if (selectedPlanType && selectedSplitTemplate) {
            return `Шаг 3: Наполнение плана для ${client.nickname}`;
        }
        if (selectedPlanType) {
            return 'Шаг 2: Выбор шаблона разбивки';
        }
        return 'Шаг 1: Создание нового плана';
    }

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && handleCloseDialog()}>
            <DialogContent className="sm:max-w-4xl" onInteractOutside={(e) => {
                const target = e.target as HTMLElement;
                if(target.closest('[role="combobox"]') || target.closest('[aria-haspopup="dialog"]')) {
                    e.preventDefault();
                }
            }}>
                <DialogHeader>
                    <DialogTitle>{getDialogTitle()}</DialogTitle>
                </DialogHeader>
                {renderDialogContent()}
            </DialogContent>
        </Dialog>
    );
}

