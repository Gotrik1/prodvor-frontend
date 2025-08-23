
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSessionStore } from '@/entities/training/model/use-session-store';
import { usePlanStore } from '@/entities/training/model/use-plan-store';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import Link from 'next/link';
import { Label } from '@/shared/ui/label';
import { Input } from '@/shared/ui/input';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { GameplayEvent, awardProgressPoints } from '@/shared/lib/gamification';
import { Progress } from '@/shared/ui/progress';
import { Timer, Flag, SkipForward, Check, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/shared/ui/alert';

const useTimer = (initialSeconds = 60, onEnd: () => void) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        let interval: NodeJS.Timeout | null = null;
        if (isActive && seconds > 0) {
            interval = setInterval(() => {
                setSeconds(s => s - 1);
            }, 1000);
        } else if (seconds === 0 && isActive) {
            setIsActive(false);
            onEnd();
            // Optional: play sound
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isActive, seconds, onEnd]);

    const start = (duration: number) => {
        setSeconds(duration);
        setIsActive(true);
    };
    
    const stop = () => {
        setIsActive(false);
    }

    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return { start, stop, isActive, time: formatTime(seconds), rawSeconds: seconds };
};

export function WorkoutSessionPage({ planId }: { planId: string }) {
    const router = useRouter();
    const { user: currentUser } = useUserStore();
    const { plans } = usePlanStore();
    const { activeSession, startSession, updateSet, toggleSetComplete, endSession } = useSessionStore();
    const [currentDayIndex, setCurrentDayIndex] = useState(0);
    const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
    const [isResting, setIsResting] = useState(false);

    useEffect(() => {
        if (!activeSession || activeSession.plan.id !== planId) {
            const planToStart = plans.find(p => p.id === planId);
            if (planToStart) {
                startSession(planToStart);
            }
        }
    }, [planId, plans, startSession, activeSession]);
    
    const onTimerEnd = () => {
        setIsResting(false);
    };
    
    const { start: startTimer, stop: stopTimer, time: timerDisplay } = useTimer(60, onTimerEnd);

    if (!activeSession) {
        // This can happen if the user refreshes the page and zustand hasn't rehydrated yet
        return (
             <div className="flex items-center justify-center min-h-[80vh] p-4">
                <Card className="text-center">
                    <CardHeader>
                        <CardTitle>Загрузка сессии...</CardTitle>
                    </CardHeader>
                </Card>
            </div>
        );
    }
    
    const dayKeys = Object.keys(activeSession.plan.days);
    const currentDayKey = dayKeys[currentDayIndex];
    const currentDay = activeSession.plan.days[currentDayKey];
    const currentExercise = currentDay?.exercises[currentExerciseIndex];
    const sessionDayResult = activeSession.dayResults[currentDayKey];
    const sessionExerciseResult = sessionDayResult?.exercises[currentExerciseIndex];

    const totalExercises = dayKeys.reduce((sum, key) => sum + activeSession.plan.days[key].exercises.length, 0);
    const completedExercises = dayKeys.reduce((sum, key) => {
        return sum + (activeSession.dayResults[key]?.exercises.filter(ex => ex.sets.every(s => s.completed)).length || 0);
    }, 0);
    const progress = totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;
    
    const handleNextExercise = () => {
        if (currentExerciseIndex < currentDay.exercises.length - 1) {
            setCurrentExerciseIndex(prev => prev + 1);
        } else if (currentDayIndex < dayKeys.length - 1) {
            setCurrentDayIndex(prev => prev + 1);
            setCurrentExerciseIndex(0);
        } else {
            handleFinishWorkout();
        }
    };

    const handleFinishWorkout = () => {
        const finalSession = endSession();
        if (finalSession) {
             // To pass complex state to the results page after redirect
            localStorage.setItem('last-workout-result', JSON.stringify(finalSession));
        }

        if (currentUser) {
            awardProgressPoints(GameplayEvent.TRAINING_COMPLETED, { userId: currentUser.id, entityId: planId });
        }
        
        router.push(`/training-center/session/${planId}/results`);
    };

    const handleSetToggle = (setIndex: number) => {
        toggleSetComplete(currentDayKey, currentExercise.id, setIndex);
        
        const isLastSet = setIndex === sessionExerciseResult.sets.length - 1;
        const restDuration = Number(isLastSet ? currentExercise.restAfterExercise : currentExercise.restBetweenSets) || 0;
        
        if (restDuration > 0) {
            setIsResting(true);
            startTimer(restDuration);
        }
    };
    
    const handleSkipRest = () => {
        stopTimer();
        setIsResting(false);
    }

    if (!currentDay || !currentExercise || !sessionExerciseResult) {
        return (
            <div className="flex items-center justify-center min-h-[80vh] p-4">
                <Card className="text-center">
                    <CardHeader>
                        <CardTitle>Ошибка загрузки тренировки</CardTitle>
                        <CardContent>
                             <Button asChild className="mt-4">
                                <Link href="/training-center">Вернуться</Link>
                            </Button>
                        </CardContent>
                    </CardHeader>
                </Card>
            </div>
        );
    }

    if (isResting) {
        return (
             <div className="flex items-center justify-center min-h-[80vh] p-4">
                 <Card className="text-center w-full max-w-md">
                    <CardHeader>
                        <Timer className="mx-auto h-12 w-12 text-primary" />
                        <CardTitle className="text-6xl font-bold tracking-tighter">{timerDisplay}</CardTitle>
                        <CardDescription>Время отдыха</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button size="lg" onClick={handleSkipRest}>Пропустить</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 space-y-6">
            <header className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold">{activeSession.plan.name}</h1>
                    <p className="text-muted-foreground">{currentDay.name}</p>
                </div>
                <Button variant="ghost" onClick={handleFinishWorkout}>
                    <Flag className="mr-2 h-4 w-4"/>
                    Завершить
                </Button>
            </header>

            <div className="space-y-2">
                <Progress value={progress} />
                <p className="text-xs text-muted-foreground text-right">{completedExercises} из {totalExercises} упражнений</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">{currentExercise.name}</CardTitle>
                    <CardDescription>Подходы: {currentExercise.sets}, Повторения: {currentExercise.reps}, Вес: {currentExercise.weight}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {sessionExerciseResult.sets.map((set, index) => (
                        <div key={index} className="grid grid-cols-12 gap-2 items-end p-2 rounded-md bg-muted/50">
                            <div className="col-span-1 font-bold text-lg">{index + 1}</div>
                            <div className="col-span-4 space-y-1">
                                <Label htmlFor={`reps-${index}`} className="text-xs">Факт. повт.</Label>
                                <Input id={`reps-${index}`} placeholder={currentExercise.reps} value={set.actualReps} onChange={(e) => updateSet(currentDayKey, currentExercise.id, index, e.target.value, set.actualWeight)} />
                            </div>
                            <div className="col-span-4 space-y-1">
                                <Label htmlFor={`weight-${index}`} className="text-xs">Факт. вес</Label>
                                <Input id={`weight-${index}`} placeholder={currentExercise.weight} value={set.actualWeight} onChange={(e) => updateSet(currentDayKey, currentExercise.id, index, set.actualReps, e.target.value)} />
                            </div>
                            <div className="col-span-3 flex justify-end gap-2">
                                <Button size="icon" variant={set.completed ? "default" : "outline"} className="h-10 w-10 border-green-500/50 text-green-400 bg-green-500/10 hover:bg-green-500/20" onClick={() => handleSetToggle(index)}>
                                    <Check className="h-5 w-5"/>
                                </Button>
                            </div>
                        </div>
                    ))}
                     <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Отдых</AlertTitle>
                        <AlertDescription>
                            Между подходами: {currentExercise.restBetweenSets} сек. После упражнения: {currentExercise.restAfterExercise} сек.
                        </AlertDescription>
                    </Alert>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" size="lg" onClick={handleNextExercise}>
                        Следующее упражнение
                        <SkipForward className="ml-2 h-4 w-4"/>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
