

'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { CheckCircle, ListChecks, XCircle } from 'lucide-react';
import type { Team } from '@/mocks';
import { users } from '@/mocks';

// Mock values for demonstration
const mockRequirementValues: Record<string, number> = {
    req1: 5, // min players
    req2: 7, // max players
    req3: 16, // min age
    req4: 30, // max age
    req5: 1200, // min elo
    req6: 2000, // max elo
};

const RequirementItem = ({ label, passed, details }: { label: string, passed: boolean, details: string }) => (
    <li className="flex items-start gap-3">
        {passed ? (
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
        ) : (
            <XCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
        )}
        <div>
            <p className="font-medium">{label}</p>
            <p className="text-xs text-muted-foreground">{details}</p>
        </div>
    </li>
);

export function RequirementsChecklist({ team }: { team: Team | undefined }) {
    if (!team) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><ListChecks /> Требования</CardTitle>
                    <CardDescription>Выберите команду, чтобы проверить ее соответствие требованиям турнира.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground py-4">
                        <p>Команда не выбрана</p>
                    </div>
                </CardContent>
            </Card>
        );
    }
    
    const teamMembersData = users.filter(u => team.members.some(member => member.id === u.id));


    // Logic to check requirements
    const checks = {
        minPlayers: team.members.length >= mockRequirementValues.req1,
        maxPlayers: team.members.length <= mockRequirementValues.req2,
        minAge: teamMembersData.every(m => (m.age || 0) >= mockRequirementValues.req3),
        maxAge: teamMembersData.every(m => (m.age || 0) <= mockRequirementValues.req4),
        minElo: team.rank >= mockRequirementValues.req5,
        maxElo: team.rank <= mockRequirementValues.req6,
    };
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ListChecks /> Чек-лист</CardTitle>
                <CardDescription>Соответствие команды требованиям турнира.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    <RequirementItem 
                        label="Мин. игроков в составе"
                        passed={checks.minPlayers}
                        details={`Нужно: ${mockRequirementValues.req1}, у вас: ${team.members.length}`}
                    />
                     <RequirementItem 
                        label="Макс. игроков в составе"
                        passed={checks.maxPlayers}
                        details={`Нужно: ${mockRequirementValues.req2}, у вас: ${team.members.length}`}
                    />
                    <RequirementItem 
                        label="Мин. возраст игрока"
                        passed={checks.minAge}
                        details={`Нужно: ${mockRequirementValues.req3}+, у вас: все игроки соответствуют`}
                    />
                     <RequirementItem 
                        label="Макс. возраст игрока"
                        passed={checks.maxAge}
                        details={`Нужно: до ${mockRequirementValues.req4}, у вас: все игроки соответствуют`}
                    />
                     <RequirementItem 
                        label="Мин. командный ELO"
                        passed={checks.minElo}
                        details={`Нужно: ${mockRequirementValues.req5}+, у вас: ${team.rank}`}
                    />
                      <RequirementItem 
                        label="Макс. командный ELO"
                        passed={checks.maxElo}
                        details={`Нужно: до ${mockRequirementValues.req6}, у вас: ${team.rank}`}
                    />
                </ul>
            </CardContent>
        </Card>
    );
}
