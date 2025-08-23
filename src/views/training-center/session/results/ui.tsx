
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/ui/card'; // Assuming CardDescription is used in the original file, keeping it for now
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { ArrowLeft, Clock, Dumbbell, Flame, CheckCircle, Repeat } from 'lucide-react'; // Assuming CheckCircle and Repeat are used, keeping them
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { formatDistanceStrict } from 'date-fns';
import { ru } from 'date-fns/locale';
import type { WorkoutSession } from '@/views/fitness-plan/ui/types';

export function WorkoutResultsPage({ planId }: { planId: string }) {
    const [sessionResult, setSessionResult] = useState<WorkoutSession | null>(null);

    useEffect(() => {
        const storedResults = localStorage.getItem('last-workout-result');
        if (storedResults) {
            const parsedResult = JSON.parse(storedResults);
            if (parsedResult.plan.id === planId) {
                setSessionResult(parsedResult);
            }
        }
    }, [planId]);

    if (!sessionResult) {
        return (
            <div className="flex items-center justify-center min-h-[80vh] p-4">
                <Card className="text-center">
                    <CardHeader>
                        <CardTitle>Результаты не найдены</CardTitle>
                        <CardDescription>Не удалось загрузить результаты последней тренировки.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/training-center"><ArrowLeft className="mr-2 h-4 w-4"/>Вернуться в центр</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    const { plan, startTime, endTime, dayResults } = sessionResult;

    const totalDuration = endTime ? formatDistanceStrict(new Date(startTime), new Date(endTime), { locale: ru }) : 'N/A';
    
    const totalSetsCompleted = Object.values(dayResults).flatMap(d => d.exercises).flatMap(e => e.sets).filter(s => s.completed).length;
    
    const totalVolume = Object.values(dayResults)
      .flatMap((d) => d.exercises)
      .flatMap((e) => {
          const planDayKey = Object.keys(plan.days).find(key => plan.days[key].exercises.some(ex => ex.id === e.exerciseId));
          if (!planDayKey) return [];
          const planEx = plan.days[planDayKey].exercises.find(ex => ex.id === e.exerciseId);
          if (!planEx) return [];
          
          return e.sets.map((s) => {
              if (!s.completed) return 0;
              const reps = Number(s.actualReps || planEx.reps);
              const weightString = s.actualWeight || planEx.weight;
              const weight = parseFloat(weightString.replace(/[^0-9.,]/g, '').replace(',', '.'));

              return isNaN(reps) || isNaN(weight) ? 0 : reps * weight;
          })
      })
      .reduce((sum, vol) => sum + (vol || 0), 0);

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8">
            <div className="mb-6">
                <Button asChild variant="outline">
                    <Link href="/training-center"><ArrowLeft className="mr-2 h-4 w-4" />Вернуться в центр</Link>
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl">Результаты тренировки</CardTitle>
                    <CardDescription>{plan.name} - {new Date(startTime).toLocaleDateString('ru-RU', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="p-4 bg-muted rounded-lg text-center">
                            <Clock className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                            <p className="font-bold text-xl">{totalDuration}</p>
                            <p className="text-xs text-muted-foreground">Длительность</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg text-center">
                            <Dumbbell className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                            <p className="font-bold text-xl">{totalVolume.toLocaleString('ru-RU')} кг</p>
                            <p className="text-xs text-muted-foreground">Общий тоннаж</p>
                        </div>
                        <div className="p-4 bg-muted rounded-lg text-center">
                            <Repeat className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                            <p className="font-bold text-xl">{totalSetsCompleted}</p>
                            <p className="text-xs text-muted-foreground">Подходов выполнено</p>
                        </div>
                         <div className="p-4 bg-muted rounded-lg text-center">
                            <Flame className="mx-auto h-6 w-6 text-muted-foreground mb-2" />
                            <p className="font-bold text-xl">~450</p>
                            <p className="text-xs text-muted-foreground">Калорий сожжено</p>
                        </div>
                    </div>

                    {Object.entries(dayResults).map(([dayKey, dayData]) => (
                        <div key={dayKey}>
                             <h3 className="text-xl font-semibold mb-2">{plan.days[dayKey].name}</h3>
                             <div className="border rounded-lg overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Упражнение</TableHead>
                                            <TableHead className="text-center">Подход</TableHead>
                                            <TableHead>План</TableHead>
                                            <TableHead>Факт</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {dayData.exercises.map((exResult) => {
                                            const planEx = plan.days[dayKey].exercises.find(e => e.id === exResult.exerciseId);
                                            if (!planEx) return null;
                                            return exResult.sets.map((setResult, setIndex) => (
                                                <TableRow key={`${exResult.exerciseId}-${setIndex}`} className={!setResult.completed ? 'bg-destructive/10' : ''}>
                                                    {setIndex === 0 && (
                                                        <TableCell rowSpan={exResult.sets.length} className="align-top font-medium">{planEx.name}</TableCell>
                                                    )}
                                                    <TableCell className="text-center">{setIndex + 1}</TableCell>
                                                    <TableCell>{planEx.reps} повт. x {planEx.weight}</TableCell>
                                                    <TableCell className="font-semibold flex items-center gap-2">
                                                        {setResult.completed && <CheckCircle className="h-4 w-4 text-green-500" />}
                                                        {setResult.actualReps || planEx.reps} повт. x {setResult.actualWeight || planEx.weight}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        })}
                                    </TableBody>
                                </Table>
                             </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
