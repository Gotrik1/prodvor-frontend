

'use client';

import { MatchEvent, EventType, eventTypes } from './match-timeline';
import { Card, CardContent } from '@/shared/ui/card';
import { ArrowUp, ArrowDown } from 'lucide-react';

// Re-using icons from timeline, maybe move to a shared file later
const GoalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"></path><path d="m15.5 15.5-7-7"></path><path d="m8.5 15.5 7-7"></path></svg>
);
const YellowCardIcon = () => <div className="h-4 w-3 bg-yellow-400 rounded-sm" />;
const RedCardIcon = () => <div className="h-4 w-3 bg-red-500 rounded-sm" />;
const SubstitutionIcon = () => (
  <div className="relative h-4 w-4 bg-green-500/80 rounded-sm text-white flex items-center justify-center">
    <ArrowUp className="absolute h-2.5 w-2.5 top-0" />
    <ArrowDown className="absolute h-2.5 w-2.5 bottom-0" />
  </div>
);

const eventIcons: Record<EventType, React.ComponentType> = {
  [eventTypes.GOAL]: GoalIcon,
  [eventTypes.YELLOW_CARD]: YellowCardIcon,
  [eventTypes.RED_CARD]: RedCardIcon,
  [eventTypes.SUBSTITUTION]: SubstitutionIcon,
};

const getEventDescription = (event: MatchEvent) => {
    switch(event.type) {
        case eventTypes.GOAL:
            return `Гол! Забивает ${event.player}. ${event.assist ? `(Пас: ${event.assist})` : ''}`;
        case eventTypes.YELLOW_CARD:
            return `Желтая карточка. ${event.player} получает предупреждение.`;
        case eventTypes.RED_CARD:
            return `Красная карточка! ${event.player} удален с поля.`;
        case eventTypes.SUBSTITUTION:
            return `Замена. Уходит: ${event.playerOut}, выходит: ${event.playerIn}.`;
        default:
            return 'Неизвестное событие';
    }
}

export function LiveTextFeed({ events }: { events: MatchEvent[] }) {
    const sortedEvents = [...events].sort((a, b) => b.minute - a.minute);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Текстовая трансляция</h3>
                <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-3 border rounded-lg p-4 bg-muted/30">
                    {sortedEvents.map(event => {
                        const Icon = eventIcons[event.type];
                        return (
                            <div key={event.id} className="flex items-start gap-4 p-3 rounded-md bg-card">
                                <div className="font-mono text-lg text-muted-foreground w-12 text-center">{event.minute}&apos;</div>
                                <div className="flex-shrink-0 pt-1"><Icon /></div>
                                <div className="flex-grow text-sm">
                                    <p>{getEventDescription(event)}</p>
                                </div>
                            </div>
                        )
                    })}
                     {sortedEvents.length === 0 && (
                         <div className="text-center py-10 text-muted-foreground">
                            Событий в матче пока нет.
                         </div>
                    )}
                </div>
            </div>
            <div>
                 <h3 className="text-xl font-bold mb-4">Видеотрансляция</h3>
                 <Card>
                    <CardContent className="p-2">
                        <div className="aspect-video bg-muted rounded-md overflow-hidden">
                             <iframe
                                className="w-full h-full"
                                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                title="YouTube video player"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </CardContent>
                 </Card>
            </div>
        </div>
    );
}
