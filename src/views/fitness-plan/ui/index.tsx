
'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Dumbbell, PlusCircle, Trash2, CalendarPlus } from 'lucide-react';

interface Exercise {
  id: number;
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

interface WorkoutPlan {
  id: number;
  name: string;
  exercises: Exercise[];
}

const mockPlans: WorkoutPlan[] = [
    {
        id: 1,
        name: 'День ног',
        exercises: [
            { id: 1, name: 'Приседания со штангой', sets: '4', reps: '8-10', weight: '80 кг' },
            { id: 2, name: 'Жим ногами в тренажере', sets: '3', reps: '12', weight: '120 кг' },
            { id: 3, name: 'Сгибания ног лежа', sets: '3', reps: '15', weight: '40 кг' },
        ]
    },
    {
        id: 2,
        name: 'Тренировка груди и трицепса',
        exercises: [
            { id: 1, name: 'Жим лежа', sets: '5', reps: '5', weight: '100 кг' },
            { id: 2, name: 'Отжимания на брусьях', sets: '4', reps: '12', weight: 'Собственный' },
            { id: 3, name: 'Французский жим', sets: '3', reps: '10', weight: '30 кг' },
        ]
    }
];


function WorkoutPlanForm({ onSave, closeDialog }: { onSave: (plan: Omit<WorkoutPlan, 'id'>) => void; closeDialog: () => void; }) {
  const [planName, setPlanName] = useState('');
  const [exercises, setExercises] = useState<Omit<Exercise, 'id'>[]>([
    { name: '', sets: '', reps: '', weight: '' },
  ]);

  const handleExerciseChange = (index: number, field: keyof Omit<Exercise, 'id'>, value: string) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const addExercise = () => {
    setExercises([...exercises, { name: '', sets: '', reps: '', weight: '' }]);
  };

  const removeExercise = (index: number) => {
    const newExercises = exercises.filter((_, i) => i !== index);
    setExercises(newExercises);
  };

  const handleSave = () => {
    if (planName.trim() === '') return; // Basic validation
    onSave({ name: planName, exercises: exercises.map(e => ({...e, id: Date.now()})) });
    closeDialog();
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="plan-name">Название плана</Label>
        <Input
          id="plan-name"
          placeholder="Например, День спины"
          value={planName}
          onChange={(e) => setPlanName(e.target.value)}
        />
      </div>
      <div className="space-y-4">
        {exercises.map((exercise, index) => (
          <div key={index} className="grid grid-cols-12 gap-2 items-end p-2 border rounded-md">
            <div className="col-span-12 md:col-span-4 space-y-1">
              <Label className="text-xs">Упражнение</Label>
              <Input placeholder="Жим лежа" value={exercise.name} onChange={(e) => handleExerciseChange(index, 'name', e.target.value)} />
            </div>
            <div className="col-span-4 md:col-span-2 space-y-1">
              <Label className="text-xs">Подходы</Label>
              <Input placeholder="3" value={exercise.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)} />
            </div>
            <div className="col-span-4 md:col-span-2 space-y-1">
              <Label className="text-xs">Повторы</Label>
              <Input placeholder="12" value={exercise.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)} />
            </div>
            <div className="col-span-4 md:col-span-3 space-y-1">
              <Label className="text-xs">Вес/усилие</Label>
              <Input placeholder="80 кг" value={exercise.weight} onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)} />
            </div>
            <div className="col-span-12 md:col-span-1 flex justify-end">
              <Button variant="ghost" size="icon" onClick={() => removeExercise(index)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Button variant="outline" onClick={addExercise} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" /> Добавить упражнение
      </Button>
      <DialogFooter className="!mt-6">
        <Button onClick={handleSave}>Сохранить план</Button>
      </DialogFooter>
    </div>
  );
}

export function FitnessPlanPage() {
  const [plans, setPlans] = useState<WorkoutPlan[]>(mockPlans);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSavePlan = (newPlan: Omit<WorkoutPlan, 'id'>) => {
    setPlans(prev => [...prev, { ...newPlan, id: Date.now() }]);
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
            <Dumbbell className="h-8 w-8" />
            Мои фитнес-планы
          </h1>
          <p className="text-muted-foreground mt-1">
            Создавайте шаблоны тренировок для быстрого планирования.
          </p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button size="lg">
              <PlusCircle className="mr-2 h-4 w-4" />
              Создать новый план
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[825px]">
            <DialogHeader>
              <DialogTitle>Новый план тренировки</DialogTitle>
              <DialogDescription>
                Создайте шаблон для своих регулярных занятий в зале.
              </DialogDescription>
            </DialogHeader>
            <WorkoutPlanForm onSave={handleSavePlan} closeDialog={() => setIsDialogOpen(false)} />
          </DialogContent>
        </Dialog>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {plans.map(plan => (
            <Card key={plan.id} className="flex flex-col">
                <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.exercises.length} упражнения</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                    <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {plan.exercises.slice(0, 4).map(ex => (
                            <li key={ex.id} className="truncate">{ex.name}</li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter>
                    <Button className="w-full">
                        <CalendarPlus className="mr-2 h-4 w-4"/>
                        Добавить в календарь
                    </Button>
                </CardFooter>
            </Card>
        ))}
      </div>
    </div>
  );
}
