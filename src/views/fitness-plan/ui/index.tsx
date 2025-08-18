
'use client';

import React, { useState } from 'react';
import { Button } from '@/shared/ui/button';
import { Dumbbell, Save, PlusCircle, Trash2, Calendar, BookOpen, Users, Star, Building, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/shared/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/shared/ui/dialog';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { useToast } from '@/shared/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { scheduleData } from '@/widgets/fitness-schedule/lib/mock-data';
import Link from 'next/link';
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar';
import { Badge } from '@/shared/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { cn } from '@/shared/lib/utils';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { FitnessSchedule } from '@/widgets/fitness-schedule';

interface Exercise {
  id: string;
  name: string;
  sets: string;
  reps: string;
  weight: string;
}

interface WorkoutPlan {
  id: string;
  name: string;
  exercises: Exercise[];
}

interface GroupEvent {
    id: string;
    title: string;
    category: string;
    trainer: { id: string; avatarUrl: string; nickname: string; };
    location?: string;
    isCustom?: boolean;
}

const allScheduleEvents = Object.values(scheduleData).flat();

const initialGroupEvents: GroupEvent[] = allScheduleEvents.map(event => ({
    id: event.id,
    title: event.title,
    category: event.category,
    trainer: event.trainer,
    location: "Фитнес-клуб 'Pro-Forma'",
    isCustom: false,
}));


const categoryColors: Record<string, string> = {
    'Силовая': 'bg-red-500/10 text-red-300 border-red-500/20',
    'Кардио': 'bg-blue-500/10 text-blue-300 border-blue-500/20',
    'Mind & Body': 'bg-green-500/10 text-green-300 border-green-500/20',
    'Танцы': 'bg-purple-500/10 text-purple-300 border-purple-500/20',
    'Вода': 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
};

const NewPlanForm = ({ onSave }: { onSave: (plan: WorkoutPlan) => void }) => {
    const [planName, setPlanName] = useState('');
    const [exercises, setExercises] = useState<Exercise[]>([
        { id: `ex-${Date.now()}`, name: '', sets: '', reps: '', weight: '' }
    ]);

    const handleExerciseChange = (index: number, field: keyof Exercise, value: string) => {
        const newExercises = [...exercises];
        newExercises[index] = { ...newExercises[index], [field]: value };
        setExercises(newExercises);
    };

    const addExercise = () => {
        setExercises([...exercises, { id: `ex-${Date.now()}`, name: '', sets: '', reps: '', weight: '' }]);
    };

    const removeExercise = (index: number) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        if (!planName || exercises.some(ex => !ex.name)) return;
        onSave({
            id: `plan-${Date.now()}`,
            name: planName,
            exercises
        });
    };

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="plan-name">Название плана</Label>
                <Input id="plan-name" placeholder="Например, День ног" value={planName} onChange={(e) => setPlanName(e.target.value)} />
            </div>
            <div className="space-y-4">
                {exercises.map((ex, index) => (
                    <div key={ex.id} className="grid grid-cols-12 gap-2 items-end p-2 border rounded-md">
                        <div className="col-span-4 space-y-1">
                            <Label className="text-xs">Упражнение</Label>
                            <Input placeholder="Приседания" value={ex.name} onChange={(e) => handleExerciseChange(index, 'name', e.target.value)} />
                        </div>
                        <div className="col-span-2 space-y-1">
                            <Label className="text-xs">Подходы</Label>
                            <Input placeholder="3" value={ex.sets} onChange={(e) => handleExerciseChange(index, 'sets', e.target.value)} />
                        </div>
                        <div className="col-span-2 space-y-1">
                            <Label className="text-xs">Повторы</Label>
                            <Input placeholder="12" value={ex.reps} onChange={(e) => handleExerciseChange(index, 'reps', e.target.value)} />
                        </div>
                        <div className="col-span-3 space-y-1">
                            <Label className="text-xs">Вес/Усилие</Label>
                            <Input placeholder="50 кг" value={ex.weight} onChange={(e) => handleExerciseChange(index, 'weight', e.target.value)} />
                        </div>
                        <div className="col-span-1">
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
            <DialogFooter>
                <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Сохранить шаблон</Button>
            </DialogFooter>
        </div>
    );
};

const NewGroupEventForm = ({ onSave }: { onSave: (event: GroupEvent) => void }) => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [trainer, setTrainer] = useState('');
    const [location, setLocation] = useState('');
    
    const handleSave = () => {
        if (!title || !category) return;
        onSave({
            id: `custom-${Date.now()}`,
            title,
            category,
            trainer: { id: 'custom', nickname: trainer || 'Не указан', avatarUrl: '' },
            location,
            isCustom: true,
        });
    };

    return (
        <div className="space-y-4">
            <div className="space-y-2">
                <Label htmlFor="event-title">Название занятия</Label>
                <Input id="event-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Например, Zumba с Анной"/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="event-category">Категория</Label>
                 <Select onValueChange={setCategory}>
                    <SelectTrigger id="event-category"><SelectValue placeholder="Выберите категорию..."/></SelectTrigger>
                    <SelectContent>
                        {Object.keys(categoryColors).map(cat => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label htmlFor="event-trainer">Тренер (необязательно)</Label>
                <Input id="event-trainer" value={trainer} onChange={e => setTrainer(e.target.value)} placeholder="Имя тренера"/>
            </div>
             <div className="space-y-2">
                <Label htmlFor="event-location">Место (необязательно)</Label>
                <Input id="event-location" value={location} onChange={e => setLocation(e.target.value)} placeholder="Название фитнес-клуба или адрес"/>
            </div>
            <DialogFooter>
                <Button onClick={handleSave}><Save className="mr-2 h-4 w-4"/>Сохранить занятие</Button>
            </DialogFooter>
        </div>
    );
};

export function FitnessPlanPage() {
    const [plans, setPlans] = useState<WorkoutPlan[]>([]);
    const [favoriteEvents, setFavoriteEvents] = useState<GroupEvent[]>(initialGroupEvents.slice(0, 3));
    const { toast } = useToast();
    const [isPlanFormOpen, setIsPlanFormOpen] = useState(false);
    const [isGroupFormOpen, setIsGroupFormOpen] = useState(false);
    const [selectedFitnessCenter, setSelectedFitnessCenter] = useState<string | null>('fc1');
    const { user } = useUserStore();

    const handleSavePlan = (plan: WorkoutPlan) => {
        setPlans([...plans, plan]);
        setIsPlanFormOpen(false);
        toast({
            title: "Шаблон сохранен!",
            description: `Ваш новый план "${plan.name}" был успешно создан.`,
        });
    };
    
    const handleSaveGroupEvent = (event: GroupEvent) => {
        setFavoriteEvents([event, ...favoriteEvents]);
        setIsGroupFormOpen(false);
        toast({
            title: "Занятие добавлено!",
            description: `Активность "${event.title}" добавлена в ваше избранное.`,
        });
    };
    
    const toggleFavorite = (event: GroupEvent) => {
        if (favoriteEvents.some(fav => fav.id === event.id)) {
            setFavoriteEvents(favoriteEvents.filter(fav => fav.id !== event.id));
        } else {
            setFavoriteEvents([...favoriteEvents, event]);
        }
    };


    return (
        <div className="space-y-8">
            <Tabs defaultValue="templates" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="templates"><Dumbbell className="mr-2 h-4 w-4"/>Личные шаблоны</TabsTrigger>
                    <TabsTrigger value="group"><Users className="mr-2 h-4 w-4"/>Групповые занятия</TabsTrigger>
                </TabsList>
                <TabsContent value="templates" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Шаблоны личных тренировок</CardTitle>
                            <CardDescription>Создайте свои программы тренировок, чтобы быстро добавлять их в расписание.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {plans.map(plan => (
                                    <Card key={plan.id} className="flex flex-col">
                                        <CardHeader>
                                            <CardTitle>{plan.name}</CardTitle>
                                        </CardHeader>
                                        <CardContent className="flex-grow">
                                            <ul className="text-sm text-muted-foreground space-y-1">
                                                {plan.exercises.slice(0, 4).map(ex => (
                                                    <li key={ex.id} className="truncate"> • {ex.name} ({ex.sets}x{ex.reps})</li>
                                                ))}
                                                {plan.exercises.length > 4 && <li>...и еще {plan.exercises.length - 4}</li>}
                                            </ul>
                                        </CardContent>
                                        <CardFooter>
                                             <Button className="w-full"><Calendar className="mr-2 h-4 w-4"/>Запланировать</Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                                 <Dialog open={isPlanFormOpen} onOpenChange={setIsPlanFormOpen}>
                                    <DialogTrigger asChild>
                                        <Card className="flex items-center justify-center min-h-[200px] border-2 border-dashed hover:border-primary transition-colors cursor-pointer">
                                            <div className="text-center text-muted-foreground">
                                                <PlusCircle className="mx-auto h-10 w-10 mb-2" />
                                                <p className="font-semibold">Создать новый шаблон</p>
                                            </div>
                                        </Card>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-3xl">
                                        <DialogHeader>
                                            <DialogTitle>Новый шаблон тренировки</DialogTitle>
                                        </DialogHeader>
                                        <NewPlanForm onSave={handleSavePlan} />
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="group" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Расписание групповых занятий</CardTitle>
                            <CardDescription>Просматривайте и записывайтесь на занятия в вашем фитнес-центре.</CardDescription>
                        </CardHeader>
                        <CardContent>
                           
                            {!selectedFitnessCenter ? (
                                <div className="text-center py-10 px-4 border-2 border-dashed rounded-lg">
                                    <Building className="mx-auto h-12 w-12 text-muted-foreground" />
                                    <h3 className="mt-4 text-lg font-semibold">Фитнес-центр не выбран</h3>
                                    <p className="mt-1 text-sm text-muted-foreground">Добавьте свой фитнес-центр для синхронизации расписания.</p>
                                    <Button asChild className="mt-4">
                                        <Link href="/playgrounds/add">
                                            <PlusCircle className="mr-2 h-4 w-4"/> Добавить фитнес-центр
                                        </Link>
                                    </Button>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
                                        <div>
                                            <h3 className="text-lg font-semibold">Расписание: Фитнес-клуб "Pro-Forma"</h3>
                                            <p className="text-sm text-muted-foreground">Последнее обновление: сегодня</p>
                                        </div>
                                    </div>
                                    <FitnessSchedule />
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
