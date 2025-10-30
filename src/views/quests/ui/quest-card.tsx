

'use client';

import * as LucideIcons from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/ui/card';
import { Progress } from '@/shared/ui/progress';
import { Button } from '@/shared/ui/button';
import { Gem, CheckCircle, Puzzle } from 'lucide-react';
import { useToast } from '@/shared/hooks/use-toast';
import { Quest } from '../lib/mock-data';

const DynamicIcon = ({ name, ...props }: { name: keyof typeof LucideIcons } & React.ComponentProps<'svg'>) => {
    const IconComponent = LucideIcons[name];
    if (!IconComponent) {
        return <Puzzle {...props} />; // Fallback Icon
    }
    return <IconComponent {...props} />;
};


export const QuestCard = ({ quest }: { quest: Quest }) => {
    const { toast } = useToast();
    const isCompleted = quest.progress >= quest.target;

    const handleClaim = () => {
        toast({
            title: "Награда получена!",
            description: `Вы получили ${quest.rewards.xp} XP и ${quest.rewards.pd_coins} PD Coins.`,
        });
        // In a real app, you'd update the quest state to 'claimed'.
    };

    return (
        <Card className="flex flex-col">
            <CardHeader>
                <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-md mt-1">
                        <DynamicIcon name={quest.icon} className="h-6 w-6" />
                    </div>
                    <div>
                        <CardTitle className="text-lg">{quest.name}</CardTitle>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <p className="text-sm text-muted-foreground h-10">{quest.description}</p>
                <div>
                    <div className="flex justify-between items-center text-sm mb-1">
                        <span className="font-medium">Прогресс:</span>
                        <span className="font-bold text-primary">{quest.progress}/{quest.target}</span>
                    </div>
                    <Progress value={(quest.progress / quest.target) * 100} />
                </div>
            </CardContent>
            <CardFooter className="flex-col items-stretch space-y-2">
                <div className="flex justify-center items-center gap-4 text-sm font-semibold">
                    <span>Награда:</span>
                    <div className="flex items-center gap-1">
                        <span className="font-bold text-amber-400">{quest.rewards.xp} XP</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Gem className="h-4 w-4 text-primary" />
                        <span className="font-bold text-primary">{quest.rewards.pd_coins}</span>
                    </div>
                </div>
                <Button onClick={handleClaim} disabled={!isCompleted || quest.claimed} className="w-full">
                    {quest.claimed ? (
                        <>Забрано</>
                    ) : isCompleted ? (
                        <><CheckCircle className="mr-2 h-4 w-4" />Забрать</>
                    ) : (
                        'Выполнить'
                    )}
                </Button>
            </CardFooter>
        </Card>
    );
};
