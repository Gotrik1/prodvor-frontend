
'use client';

import React, { useState, useEffect } from 'react';
import type { User } from '@/mocks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Button } from '@/shared/ui/button';
import { ArrowDown, ArrowUp, Crown } from 'lucide-react';
import { Skeleton } from '@/shared/ui/skeleton';

interface RosterManagementProps {
    allTeamMembers: User[];
}

export function RosterManagement({ allTeamMembers: initialTeamMembers }: RosterManagementProps) {
    const [mainRoster, setMainRoster] = useState<User[]>([]);
    const [substitutes, setSubstitutes] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Since allTeamMembers is passed as a prop, we can directly use it.
        // The main roster is the first 5, the rest are substitutes.
        // This is still a mock logic, but it uses the members passed from the parent.
        const firstFive = initialTeamMembers.slice(0, 5);
        const rest = initialTeamMembers.slice(5);
        setMainRoster(firstFive);
        setSubstitutes(rest);
        setIsLoading(false);
    }, [initialTeamMembers]);

    const moveToSubstitutes = (player: User) => {
        setMainRoster(prev => prev.filter(p => p.id !== player.id));
        setSubstitutes(prev => [...prev, player]);
    };

    const moveToMainRoster = (player: User) => {
        setSubstitutes(prev => prev.filter(p => p.id !== player.id));
        setMainRoster(prev => [...prev, player]);
    };

    const PlayerRow = ({ player, action }: { player: User, action: (player: User) => void }) => {
        const isCaptain = player.role === 'Капитан';
        return (
            <div className="flex items-center justify-between p-2 rounded-md bg-background hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={player.avatarUrl} />
                        <AvatarFallback>{player.nickname.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">{player.nickname}</span>
                        {isCaptain && <Crown className="h-4 w-4 text-amber-400" />}
                    </div>
                </div>
                {!isCaptain && (
                     <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => action(player)}>
                        {mainRoster.some(p => p.id === player.id) ? <ArrowDown className="h-4 w-4"/> : <ArrowUp className="h-4 w-4"/>}
                    </Button>
                )}
            </div>
        );
    };
    
    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Skeleton className="h-5 w-1/3 mb-2" />
                        <div className="space-y-2 p-2 border rounded-lg">
                            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
                        </div>
                    </div>
                    <div>
                        <Skeleton className="h-5 w-1/3 mb-2" />
                        <div className="space-y-2 p-2 border rounded-lg">
                             <Skeleton className="h-12 w-full" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Управление составом</CardTitle>
                <CardDescription>Определите основной состав и запасных игроков для предстоящих матчей.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="font-semibold mb-2">Основной состав ({mainRoster.length})</h3>
                    <div className="space-y-2 p-2 rounded-lg border bg-muted/30 min-h-[100px]">
                        {mainRoster.length > 0 ? (
                            mainRoster.map(player => <PlayerRow key={player.id} player={player} action={moveToSubstitutes} />)
                        ) : (
                            <p className="text-sm text-center text-muted-foreground py-4">Нет игроков в основном составе</p>
                        )}
                    </div>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2">Запасные ({substitutes.length})</h3>
                    <div className="space-y-2 p-2 rounded-lg border bg-muted/30 min-h-[100px]">
                        {substitutes.length > 0 ? (
                            substitutes.map(player => <PlayerRow key={player.id} player={player} action={moveToMainRoster} />)
                        ) : (
                             <p className="text-sm text-center text-muted-foreground py-4">Нет запасных игроков</p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
