
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from '@/shared/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Trash2 } from 'lucide-react';
import { useProtocol } from '../lib/use-protocol';
import { EventType, eventTypes } from '@/widgets/match-protocol/ui/match-timeline';
import { registeredTeams, users } from '@/views/tournaments/public-page/ui/mock-data';

const eventLabels: Record<EventType, string> = {
    [eventTypes.GOAL]: 'Гол',
    [eventTypes.YELLOW_CARD]: 'Желтая карточка',
    [eventTypes.RED_CARD]: 'Красная карточка',
    [eventTypes.SUBSTITUTION]: 'Замена',
};

const team1 = registeredTeams[0];
const team2 = registeredTeams[1];
const allPlayers = users.filter(u => team1.members.includes(u.id) || team2.members.includes(u.id));

export function ProtocolEditor() {
    const { events, addEvent, removeEvent } = useProtocol();
    const [eventType, setEventType] = useState<EventType>(eventTypes.GOAL);
    const [minute, setMinute] = useState('');
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');
    const [team, setTeam] = useState('team1');

    const handleAddEvent = () => {
        if (!minute || !player1) return;

        const newEvent: Omit<any, 'id'> = {
            minute: parseInt(minute, 10),
            type: eventType,
            team: allPlayers.find(p => p.id === player1)?.teamId === team1.id ? 'team1' : 'team2',
            player: allPlayers.find(p => p.id === player1)?.nickname,
        };

        if (eventType === eventTypes.GOAL && player2) {
            newEvent.assist = allPlayers.find(p => p.id === player2)?.nickname;
        }

        if (eventType === eventTypes.SUBSTITUTION && player2) {
            newEvent.playerOut = allPlayers.find(p => p.id === player1)?.nickname;
            newEvent.playerIn = allPlayers.find(p => p.id === player2)?.nickname;
            newEvent.player = ''; // Substitution doesn't have a single primary player
        }

        addEvent(newEvent);
        // Reset form
        setMinute('');
        setPlayer1('');
        setPlayer2('');
    };

    const getPlayerLabel = () => {
        switch (eventType) {
            case eventTypes.GOAL: return "Автор гола";
            case eventTypes.YELLOW_CARD:
            case eventTypes.RED_CARD: return "Игрок";
            case eventTypes.SUBSTITUTION: return "Ушедший игрок";
            default: return "Игрок 1";
        }
    };
    
    const getPlayer2Label = () => {
        switch (eventType) {
            case eventTypes.GOAL: return "Ассистент (необязательно)";
            case eventTypes.SUBSTITUTION: return "Вышедший игрок";
            default: return null;
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Редактор протокола</CardTitle>
                <CardDescription>Добавляйте ключевые события матча в реальном времени.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-end mb-6 p-4 border rounded-lg bg-muted/50">
                    <div className="space-y-2">
                        <Label>Тип события</Label>
                        <Select value={eventType} onValueChange={(value) => setEventType(value as EventType)}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {Object.values(eventTypes).map(type => (
                                    <SelectItem key={type} value={type}>{eventLabels[type]}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                     <div className="space-y-2">
                        <Label>Минута</Label>
                        <Input type="number" placeholder="e.g., 42" value={minute} onChange={(e) => setMinute(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>{getPlayerLabel()}</Label>
                        <Select value={player1} onValueChange={setPlayer1}>
                             <SelectTrigger><SelectValue placeholder="Выберите игрока" /></SelectTrigger>
                             <SelectContent>
                                {allPlayers.map(p => <SelectItem key={p.id} value={p.id}>{p.nickname}</SelectItem>)}
                             </SelectContent>
                        </Select>
                    </div>
                    {getPlayer2Label() && (
                        <div className="space-y-2">
                            <Label>{getPlayer2Label()}</Label>
                             <Select value={player2} onValueChange={setPlayer2}>
                                <SelectTrigger><SelectValue placeholder="Выберите игрока" /></SelectTrigger>
                                <SelectContent>
                                    {allPlayers.map(p => <SelectItem key={p.id} value={p.id}>{p.nickname}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <Button onClick={handleAddEvent} className="w-full">Добавить событие</Button>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Хронология событий</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                        {events.map(event => (
                            <div key={event.id} className="flex items-center justify-between p-2 rounded-md bg-muted/50">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-sm w-8">{event.minute}'</span>
                                    <span className="font-semibold">{eventLabels[event.type]}</span>
                                    <span className="text-muted-foreground">{event.player}{event.assist ? ` (${event.assist})` : ''}{event.playerIn ? `↑${event.playerIn} / ↓${event.playerOut}` : ''}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeEvent(event.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
