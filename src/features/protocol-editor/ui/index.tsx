

'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from '@/shared/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Trash2, PlusCircle } from 'lucide-react';
import { useProtocol } from '../lib/use-protocol';
import { EventType, users, teams, type BracketMatch, type MatchEvent } from '@/mocks';

const eventLabels: Record<EventType, string> = {
    'goal': 'Гол',
    'yellow_card': 'Желтая карточка',
    'red_card': 'Красная карточка',
    'substitution': 'Замена',
};

const eventTypes = Object.keys(eventLabels) as EventType[];

export function ProtocolEditor({ match }: { match: BracketMatch }) {
    const { events, addEvent, removeEvent } = useProtocol();
    const [eventType, setEventType] = useState<EventType>('goal');
    const [minute, setMinute] = useState('');
    const [player1, setPlayer1] = useState('');
    const [player2, setPlayer2] = useState('');

    const { team1, team2 } = match;

    const team1Members = useMemo(() => team1 ? users.filter(u => team1.members.some(m => m.id === u.id)) : [], [team1]);
    const team2Members = useMemo(() => team2 ? users.filter(u => team2.members.some(m => m.id === u.id)) : [], [team2]);
    const allPlayersInMatch = useMemo(() => [...team1Members, ...team2Members], [team1Members, team2Members]);


    const handleAddEvent = () => {
        if (!minute || !player1 || (eventType === 'substitution' && !player2)) return;

        const p1 = allPlayersInMatch.find(p => p.id === player1);
        if (!p1) return;

        const newEvent: Omit<MatchEvent, 'id'> = {
            minute: parseInt(minute, 10),
            type: eventType,
            team: team1Members.some(m => m.id === p1.id) ? 'team1' : 'team2',
            player: p1.nickname,
            assist: undefined,
            playerIn: undefined,
            playerOut: undefined,
        };

        if (eventType === 'goal' && player2) {
            newEvent.assist = allPlayersInMatch.find(p => p.id === player2)?.nickname;
        }

        if (eventType === 'substitution' && player2) {
            newEvent.playerOut = p1.nickname;
            newEvent.playerIn = allPlayersInMatch.find(p => p.id === player2)?.nickname;
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
            case 'goal': return "Автор гола";
            case 'yellow_card':
            case 'red_card': return "Игрок";
            case 'substitution': return "Ушедший игрок";
            default: return "Игрок 1";
        }
    };
    
    const getPlayer2Label = () => {
        switch (eventType) {
            case 'goal': return "Ассистент (необязательно)";
            case 'substitution': return "Вышедший игрок";
            default: return null;
        }
    };

    return (
        <Card className="border-t-4 border-primary">
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
                                {eventTypes.map(type => (
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
                                <SelectGroup>
                                    <SelectLabel>{team1?.name}</SelectLabel>
                                    {team1Members.map(p => <SelectItem key={p.id} value={p.id}>{p.nickname}</SelectItem>)}
                                </SelectGroup>
                                <SelectGroup>
                                     <SelectLabel>{team2?.name}</SelectLabel>
                                     {team2Members.map(p => <SelectItem key={p.id} value={p.id}>{p.nickname}</SelectItem>)}
                                </SelectGroup>
                             </SelectContent>
                        </Select>
                    </div>
                    {getPlayer2Label() && (
                        <div className="space-y-2">
                            <Label>{getPlayer2Label()}</Label>
                             <Select value={player2} onValueChange={setPlayer2}>
                                <SelectTrigger><SelectValue placeholder="Выберите игрока" /></SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>{team1?.name}</SelectLabel>
                                        {team1Members.map(p => <SelectItem key={p.id} value={p.id}>{p.nickname}</SelectItem>)}
                                    </SelectGroup>
                                    <SelectGroup>
                                        <SelectLabel>{team2?.name}</SelectLabel>
                                        {team2Members.map(p => <SelectItem key={p.id} value={p.id}>{p.nickname}</SelectItem>)}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                    <Button onClick={handleAddEvent} className="w-full">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Добавить
                    </Button>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-2">Хронология событий</h3>
                    <div className="space-y-2 max-h-60 overflow-y-auto pr-2 border rounded-lg p-2">
                        {events.map(event => (
                            <div key={event.id} className="flex items-center justify-between p-2 rounded-md bg-background hover:bg-muted">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-sm w-8">{event.minute}&apos;</span>
                                    <span className="font-semibold">{eventLabels[event.type]}</span>
                                    <span className="text-muted-foreground text-sm">{event.player}{event.assist ? ` (${event.assist})` : ''}{event.playerIn ? `↑${event.playerIn} / ↓${event.playerOut}` : ''}</span>
                                </div>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-destructive" onClick={() => removeEvent(event.id)}>
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        ))}
                         {events.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">Событий пока не добавлено.</p>}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
