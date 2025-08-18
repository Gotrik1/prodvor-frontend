
'use client';

import { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { PlusCircle, Trash2, Save, ArrowLeft } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';
import type { WorkoutPlan, PlanType, Exercise, PlanDay } from './types';

interface NewPlanFormProps {
    planType: PlanType;
    dayNames: string[];
    onSave: (plan: WorkoutPlan) => void;
    onBack: () => void;
}

const createInitialDays = (dayNames: string[]): Record<string, PlanDay> => {
    const days: Record<string, PlanDay> = {};
    dayNames.forEach((name, index) => {
        const dayKey = `day${index + 1}`;
        days[dayKey] = {
            name: name || `День ${index + 1}`,
            exercises: [{ id: `ex-${Date.now()}`, name: '', sets: '', reps: '', weight: '', restBetweenSets: '60', restAfterExercise: '120' }],
        };
    });
    return days;
};

export const NewPlanForm = ({ planType, dayNames, onSave, onBack }: NewPlanFormProps) => {
    const [planName, setPlanName] = useState('');
    const [days, setDays] = useState<Record<string, PlanDay>>(createInitialDays(dayNames));

    const handleExerciseChange = (dayKey: string, exIndex: number, field: keyof Exercise, value: string) => {
        const newDays = { ...days };
        newDays[dayKey].exercises[exIndex] = { ...newDays[dayKey].exercises[exIndex], [field]: value };
        setDays(newDays);
    };
    
    const handleDayNameChange = (dayKey: string, newName: string) => {
        const newDays = { ...days };
        newDays[dayKey].name = newName;
        setDays(newDays);
    };

    const addExercise = (dayKey: string) => {
        const newDays = { ...days };
        newDays[dayKey].exercises.push({ id: `ex-${Date.now()}`, name: '', sets: '', reps: '', weight: '', restBetweenSets: '60', restAfterExercise: '120' });
        setDays(newDays);
    };

    const removeExercise = (dayKey: string, exIndex: number) => {
        const newDays = { ...days };
        newDays[dayKey].exercises = newDays[dayKey].exercises.filter((_, i) => i !== exIndex);
        setDays(newDays);
    };

    const handleSave = () => {
        if (!planName) return; // Basic validation
        onSave({
            id: `plan-${Date.now()}`,
            name: planName,
            type: planType,
            days,
        });
    };

    return (
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-4">
            <div className="space-y-2">
                <Label htmlFor="plan-name">Название плана</Label>
                <Input id="plan-name" placeholder="Например, Моя программа на массу" value={planName} onChange={(e) => setPlanName(e.target.value)} />
            </div>
            
            <Accordion type="multiple" defaultValue={['day1']} className="w-full">
                {Object.entries(days).map(([dayKey, dayData]) => (
                    <AccordionItem value={dayKey} key={dayKey}>
                        <AccordionTrigger>
                            <div className="flex items-center gap-2 w-full pr-2">
                                <Input 
                                    value={dayData.name} 
                                    onChange={(e) => handleDayNameChange(dayKey, e.target.value)}
                                    onClick={(e) => e.stopPropagation()}
                                    className="w-full md:w-1/2 border-none shadow-none focus-visible:ring-1 h-8 font-semibold text-base"
                                />
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            <div className="space-y-4 pl-2">
                                {dayData.exercises.map((ex, index) => (
                                    <div key={ex.id} className="grid grid-cols-12 gap-2 items-end p-2 border rounded-md">
                                        <div className="col-span-12 md:col-span-6 space-y-1">
                                            <Label className="text-xs">Упражнение</Label>
                                            <Input placeholder="Приседания со штангой" value={ex.name} onChange={(e) => handleExerciseChange(dayKey, index, 'name', e.target.value)} />
                                        </div>
                                        <div className="col-span-4 md:col-span-2 space-y-1">
                                            <Label className="text-xs">Подходы</Label>
                                            <Input placeholder="3" value={ex.sets} onChange={(e) => handleExerciseChange(dayKey, index, 'sets', e.target.value)} />
                                        </div>
                                        <div className="col-span-4 md:col-span-2 space-y-1">
                                            <Label className="text-xs">Повторы</Label>
                                            <Input placeholder="12" value={ex.reps} onChange={(e) => handleExerciseChange(dayKey, index, 'reps', e.target.value)} />
                                        </div>
                                        <div className="col-span-4 md:col-span-2 space-y-1">
                                            <Label className="text-xs">Вес</Label>
                                            <Input placeholder="50 кг" value={ex.weight} onChange={(e) => handleExerciseChange(dayKey, index, 'weight', e.target.value)} />
                                        </div>
                                        <div className="col-span-6 md:col-span-5 space-y-1">
                                            <Label className="text-xs">Отдых между подходами (сек)</Label>
                                            <Input placeholder="60" value={ex.restBetweenSets} onChange={(e) => handleExerciseChange(dayKey, index, 'restBetweenSets', e.target.value)} />
                                        </div>
                                         <div className="col-span-6 md:col-span-5 space-y-1">
                                            <Label className="text-xs">Отдых после упражнения (сек)</Label>
                                            <Input placeholder="120" value={ex.restAfterExercise} onChange={(e) => handleExerciseChange(dayKey, index, 'restAfterExercise', e.target.value)} />
                                        </div>
                                        <div className="col-span-12 md:col-span-2 flex justify-end">
                                            <Button variant="ghost" size="icon" onClick={() => removeExercise(dayKey, index)}>
                                                <Trash2 className="h-4 w-4 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button variant="outline" onClick={() => addExercise(dayKey)} className="w-full">
                                    <PlusCircle className="mr-2 h-4 w-4" /> Добавить упражнение
                                </Button>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
            
            <div className="flex justify-between pt-4 border-t">
                 <Button variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Назад
                </Button>
                <Button onClick={handleSave} disabled={!planName}>
                    <Save className="mr-2 h-4 w-4" /> Сохранить план
                </Button>
            </div>
        </div>
    );
};
