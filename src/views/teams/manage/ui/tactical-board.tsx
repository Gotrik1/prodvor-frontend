
'use client';

import React, { useState } from 'react';
import type { User } from '@/mocks';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { Dices, Save } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

interface TacticalBoardProps {
    teamMembers: User[];
}

const soccerFieldImage = 'https://placehold.co/800x500/34D399/FFFFFF.png';

// Positions for a 4-4-2 formation (as percentages of width/height)
const formations: Record<string, { x: number, y: number, role: string }[]> = {
    '4-4-2': [
        { x: 50, y: 92, role: 'GK' }, // Goalkeeper
        { x: 20, y: 75, role: 'LB' }, // Left Back
        { x: 40, y: 78, role: 'LCB' }, // Left Center Back
        { x: 60, y: 78, role: 'RCB' }, // Right Center Back
        { x: 80, y: 75, role: 'RB' }, // Right Back
        { x: 25, y: 50, role: 'LM' }, // Left Midfielder
        { x: 45, y: 55, role: 'LCM' }, // Left Center Midfielder
        { x: 55, y: 55, role: 'RCM' }, // Right Center Midfielder
        { x: 75, y: 50, role: 'RM' }, // Right Midfielder
        { x: 40, y: 25, role: 'LS' }, // Left Striker
        { x: 60, y: 25, role: 'RS' }, // Right Striker
    ],
    '4-3-3': [
        { x: 50, y: 92, role: 'GK' },
        { x: 18, y: 75, role: 'LB' },
        { x: 40, y: 78, role: 'LCB' },
        { x: 60, y: 78, role: 'RCB' },
        { x: 82, y: 75, role: 'RB' },
        { x: 35, y: 50, role: 'LCM' },
        { x: 50, y: 60, role: 'CDM' },
        { x: 65, y: 50, role: 'RCM' },
        { x: 25, y: 25, role: 'LW' },
        { x: 50, y: 20, role: 'ST' },
        { x: 75, y: 25, role: 'RW' },
    ],
};

const PlayerChip = ({ player, onDragStart }: { player: User, onDragStart: (e: React.DragEvent, playerId: string) => void }) => (
    <div
        draggable
        onDragStart={(e) => onDragStart(e, player.id)}
        className="flex items-center gap-2 bg-card p-1.5 rounded-full border shadow cursor-grab active:cursor-grabbing"
    >
        <span className="font-bold text-xs bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center">
            {player.elo ? Math.round(player.elo / 100) : '?'}
        </span>
        <span className="text-sm font-medium pr-2">{player.nickname}</span>
    </div>
);

const PositionMarker = ({ position, assignedPlayer, onDrop, onDragOver }: { position: { x: number, y: number, role: string }, assignedPlayer: User | null, onDrop: (e: React.DragEvent, role: string) => void, onDragOver: (e: React.DragEvent) => void }) => (
    <div
        onDrop={(e) => onDrop(e, position.role)}
        onDragOver={onDragOver}
        className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
        style={{ left: `${position.x}%`, top: `${position.y}%` }}
    >
        {assignedPlayer ? (
            <div className="bg-primary text-primary-foreground font-bold rounded-full h-10 w-10 flex items-center justify-center text-sm shadow-lg border-2 border-card">
                {assignedPlayer.nickname.charAt(0)}
            </div>
        ) : (
            <div className="bg-muted border-2 border-dashed rounded-full h-10 w-10 flex items-center justify-center text-muted-foreground font-mono text-xs">
                {position.role}
            </div>
        )}
    </div>
);

export function TacticalBoard({ teamMembers }: TacticalBoardProps) {
    const [selectedFormation, setSelectedFormation] = useState('4-4-2');
    const [assignments, setAssignments] = useState<Record<string, string | null>>({}); // { role: playerId }
    
    const availablePlayers = teamMembers.filter(p => !Object.values(assignments).includes(p.id));

    const handleDragStart = (e: React.DragEvent, playerId: string) => {
        e.dataTransfer.setData("playerId", playerId);
    };
    
    const handleDrop = (e: React.DragEvent, role: string) => {
        e.preventDefault();
        const playerId = e.dataTransfer.getData("playerId");
        if (playerId) {
            setAssignments(prev => ({ ...prev, [role]: playerId }));
        }
    };
    
    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
    };

    const handleAutoAssign = () => {
        const formation = formations[selectedFormation];
        const newAssignments: Record<string, string | null> = {};
        const shuffledPlayers = [...teamMembers].sort(() => 0.5 - Math.random());
        
        formation.forEach((pos, index) => {
            if (shuffledPlayers[index]) {
                newAssignments[pos.role] = shuffledPlayers[index].id;
            }
        });
        setAssignments(newAssignments);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Тактическая доска</CardTitle>
                <CardDescription>Расставьте игроков по позициям. Перетащите игрока из списка доступных на поле.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="md:col-span-1 space-y-4">
                        <h3 className="font-semibold">Доступные игроки ({availablePlayers.length})</h3>
                        <div className="space-y-2 max-h-96 overflow-y-auto p-2 border rounded-lg bg-muted/30">
                            {availablePlayers.map(player => (
                                <PlayerChip key={player.id} player={player} onDragStart={handleDragStart} />
                            ))}
                        </div>
                    </div>
                    <div className="md:col-span-3">
                         <div className="flex justify-between items-center mb-4">
                             <div className="flex items-center gap-2">
                                <Label htmlFor="formation">Схема:</Label>
                                <Select value={selectedFormation} onValueChange={setSelectedFormation}>
                                    <SelectTrigger id="formation" className="w-[120px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="4-4-2">4-4-2</SelectItem>
                                        <SelectItem value="4-3-3">4-3-3</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleAutoAssign}><Dices className="mr-2 h-4 w-4"/>Авто</Button>
                        </div>
                        <div className="relative aspect-[4/2.5] w-full rounded-lg bg-cover bg-center border" style={{ backgroundImage: `url(${soccerFieldImage})` }}>
                            {formations[selectedFormation].map(pos => {
                                const assignedPlayerId = assignments[pos.role];
                                const assignedPlayer = assignedPlayerId ? teamMembers.find(p => p.id === assignedPlayerId) : null;
                                return (
                                    <PositionMarker 
                                        key={pos.role}
                                        position={pos}
                                        assignedPlayer={assignedPlayer || null}
                                        onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                    />
                                );
                            })}
                        </div>
                        <div className="flex justify-end mt-4">
                            <Button><Save className="mr-2 h-4 w-4" />Сохранить расстановку</Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
