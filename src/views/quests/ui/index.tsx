

'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { QuestCard } from './quest-card';
import { questsByRole, eventQuests } from '../lib/mock-data';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Puzzle } from 'lucide-react';

export function QuestsPage() {
    const { user } = useUserStore();

    const userQuests = useMemo(() => {
        if (!user || !user.role) {
            // Default to player quests if user is not defined
            return questsByRole['Игрок'] || { daily: [], weekly: [] };
        }
        return questsByRole[user.role] || questsByRole['Игрок'] || { daily: [], weekly: [] };
    }, [user]);


    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-8">
            <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                    <Puzzle className="h-8 w-8" />
                    Квесты
                </h1>
                <p className="text-muted-foreground mt-1">
                    Выполняйте задания, чтобы получать награды и ускорять свой прогресс.
                </p>
            </div>
            
            <Tabs defaultValue="daily" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="daily">Ежедневные</TabsTrigger>
                    <TabsTrigger value="weekly">Еженедельные</TabsTrigger>
                    <TabsTrigger value="event">Событийные</TabsTrigger>
                </TabsList>
                <TabsContent value="daily" className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userQuests.daily.map(quest => (
                            <QuestCard key={quest.id} quest={quest} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="weekly" className="mt-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {userQuests.weekly.map(quest => (
                            <QuestCard key={quest.id} quest={quest} />
                        ))}
                    </div>
                </TabsContent>
                <TabsContent value="event" className="mt-6">
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {eventQuests.map(quest => (
                            <QuestCard key={quest.id} quest={quest} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

const QuestCard = ({ quest: initialQuest }: { quest: typeof eventQuests[0] }) => {
    const { toast } = useToast();
    const [quest, setQuest] = useState(initialQuest);
    const isCompleted = quest.progress >= quest.target;

    const handleClaim = () => {
        if (isCompleted && !quest.claimed) {
            setQuest(prev => ({...prev, claimed: true}));
            toast({
                title: "Награда получена!",
                description: `Вы получили ${quest.rewards.xp} ОП и ${quest.rewards.pd_coins} PD Coins.`
            });
        }
    };
    
    return (
         <Card className={cn("flex flex-col transition-all", isCompleted && !quest.claimed && "border-primary shadow-primary/20", quest.claimed && "opacity-60 bg-muted/50")}>
            <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className="p-3 rounded-lg bg-muted text-primary">
                    <Puzzle className="h-6 w-6" />
                </div>
                <div>
                    <CardTitle>{quest.name}</CardTitle>
                    <CardDescription>{quest.description}</CardDescription>
                </div>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
                <div>
                    <div className="flex justify-between items-center mb-1 text-sm">
                        <span className="font-medium">Прогресс</span>
                        <span className="text-muted-foreground">{quest.progress} / {quest.target}</span>
                    </div>
                    <Progress value={(quest.progress / quest.target) * 100} />
                </div>
                <div className="flex items-center justify-center gap-4 text-center pt-2">
                    <div>
                        <p className="font-bold text-lg">{quest.rewards.xp}</p>
                        <p className="text-xs text-muted-foreground">Очки прогресса</p>
                    </div>
                    <div className="flex items-center gap-2 font-bold text-lg text-primary">
                        <Gem className="h-5 w-5" />
                        <span>{quest.rewards.pd_coins}</span>
                    </div>
                </div>
            </CardContent>
            <CardContent>
                 <Button 
                    className="w-full" 
                    disabled={!isCompleted || quest.claimed}
                    onClick={handleClaim}
                >
                    {quest.claimed ? (
                        <>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Награда получена
                        </>
                    ) : isCompleted ? (
                        "Забрать награду"
                    ) : (
                        "В процессе"
                    )}
                </Button>
            </CardContent>
        </Card>
    )
}
