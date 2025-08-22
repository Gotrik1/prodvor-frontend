
'use client';

import { ranks, allSports } from '@/mocks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Badge } from '@/shared/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Construction, User, Gavel, Megaphone, ClipboardList, Briefcase, Handshake, Star, Shield, Award } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/shared/ui/accordion';

const rankColors = [
    'border-destructive/50', // Annihilator
    'border-amber-400/50', // First After God
    'border-purple-400/50', // Undisputed
    'border-blue-400/50', // Zen Master
    'border-teal-400/50', // First Among Equals
    'border-green-400/50', // Neighborhood Threat
    'border-yellow-400/50', // Who are you, warrior?
    'border-orange-400/50', // Street Fighter
    'border-stone-400/50', // Persistent
    'border-slate-400/50', // Already Running
    'border-gray-400/50', // Take Me
];

const PlaceholderColumn = ({ title, description }: { title: string, description: string }) => (
    <div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <Card className="flex flex-col items-center justify-center min-h-[40vh] text-center p-4">
             <div className="mx-auto bg-primary/10 text-primary p-4 rounded-full w-fit mb-4">
                <Construction className="h-10 w-10" />
            </div>
            <p className="text-muted-foreground mt-2 max-w-sm">
                {description}
            </p>
        </Card>
    </div>
);


export function RanksPage() {
    return (
        <Tabs defaultValue="player">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-8">
                <TabsTrigger value="player"><User className="mr-2 h-4 w-4" />Игрок</TabsTrigger>
                <TabsTrigger value="coach"><ClipboardList className="mr-2 h-4 w-4" />Тренер</TabsTrigger>
                <TabsTrigger value="referee"><Gavel className="mr-2 h-4 w-4" />Судья</TabsTrigger>
                <TabsTrigger value="manager"><Briefcase className="mr-2 h-4 w-4" />Менеджер</TabsTrigger>
                <TabsTrigger value="organizer"><Megaphone className="mr-2 h-4 w-4" />Организатор</TabsTrigger>
                <TabsTrigger value="sponsor"><Handshake className="mr-2 h-4 w-4" />Спонсор</TabsTrigger>
                <TabsTrigger value="fan"><Star className="mr-2 h-4 w-4" />Болельщик</TabsTrigger>
                <TabsTrigger value="moderator"><Shield className="mr-2 h-4 w-4" />Модератор</TabsTrigger>
            </TabsList>
            <TabsContent value="player" className="mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <h3 className="text-xl font-bold mb-4">Ранги</h3>
                        <div className="space-y-4">
                            {ranks.map((rank, index) => (
                                <Card key={rank.name} className={`bg-card/50 ${rankColors[index] || 'border-border'}`}>
                                    <CardHeader>
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-md bg-muted">
                                                    <rank.icon className="w-6 h-6 text-primary" />
                                                </div>
                                                <div>
                                                    <CardTitle className="text-xl">{rank.name}</CardTitle>
                                                    <CardDescription className="italic">"{rank.title}"</CardDescription>
                                                </div>
                                            </div>
                                            <Badge variant="outline" className="font-mono text-base w-fit">
                                                {rank.eloMin}{rank.eloMax > rank.eloMin ? ` - ${rank.eloMax}` : '+'} ELO
                                            </Badge>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-muted-foreground">{rank.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-xl font-bold mb-4">Ачивки</h3>
                        <Card>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                    <Award className="h-5 w-5"/>
                                    <CardTitle>Достижения игрока</CardTitle>
                                </div>
                                <CardDescription>Достижения группируются по видам спорта.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Accordion type="single" collapsible className="w-full">
                                    {allSports.map(sport => (
                                        <AccordionItem value={sport.id} key={sport.id}>
                                            <AccordionTrigger>{sport.name}</AccordionTrigger>
                                            <AccordionContent>
                                                <div className="text-center text-muted-foreground p-4">
                                                    <p>Достижения для этого вида спорта скоро появятся.</p>
                                                </div>
                                            </AccordionContent>
                                        </AccordionItem>
                                    ))}
                                </Accordion>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </TabsContent>
            
            {[
                { value: 'coach', name: 'Тренер' },
                { value: 'referee', name: 'Судья' },
                { value: 'manager', name: 'Менеджер' },
                { value: 'organizer', name: 'Организатор' },
                { value: 'sponsor', name: 'Спонсор' },
                { value: 'fan', name: 'Болельщик' },
                { value: 'moderator', name: 'Модератор' },
            ].map(role => (
                 <TabsContent key={role.value} value={role.value} className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <PlaceholderColumn title="Ранги" description={`Система прогрессии для роли "${role.name}" находится в разработке.`} />
                        <PlaceholderColumn title="Ачивки" description={`Система достижений для роли "${role.name}" находится в разработке.`} />
                    </div>
                </TabsContent>
            ))}
        </Tabs>
    );
}
