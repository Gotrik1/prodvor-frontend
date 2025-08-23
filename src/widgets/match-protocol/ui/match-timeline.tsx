
'use client';

import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

// --- ICONS ---
const GoalIcon = () => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        className="text-foreground"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <path d="M12 12l4.24 4.24"></path>
        <path d="M12 12l-4.24 4.24"></path>
        <path d="M12 12l-4.24-4.24"></path>
        <path d="M12 12l4.24-4.24"></path>
        <path d="M12 21.66V2"></path>
        <path d="M2.34 12H21.66"></path>
        <path d="M16.24 7.76l-8.48 8.48"></path>
        <path d="M16.24 16.24l-8.48-8.48"></path>
    </svg>
);
const YellowCardIcon = () => <div className="h-5 w-4 bg-yellow-400 rounded-sm" />;
const RedCardIcon = () => <div className="h-5 w-4 bg-red-500 rounded-sm" />;
const SubstitutionIcon = () => (
  <div className="relative h-5 w-5 bg-green-500/80 rounded-sm text-white flex items-center justify-center">
    <ArrowUp className="absolute h-3 w-3 top-0.5" />
    <ArrowDown className="absolute h-3 w-3 bottom-0.5" />
  </div>
);

// --- MOCK DATA & TYPES ---
export const eventTypes = {
  GOAL: 'goal',
  YELLOW_CARD: 'yellow_card',
  RED_CARD: 'red_card',
  SUBSTITUTION: 'substitution',
} as const;

export type EventType = typeof eventTypes[keyof typeof eventTypes];

export interface MatchEvent {
  id: number;
  minute: number;
  type: EventType;
  team: 'team1' | 'team2';
  player: string;
  assist?: string;
  playerIn?: string;
  playerOut?: string;
}

export const matchEvents: MatchEvent[] = [
  { id: 1, minute: 9, type: eventTypes.GOAL, team: 'team1', player: 'Денис Черышев' },
  { id: 2, minute: 22, type: eventTypes.GOAL, team: 'team1', player: 'Артем Дзюба', assist: 'Александр Головин' },
  { id: 3, minute: 38, type: eventTypes.RED_CARD, team: 'team2', player: 'Костакис Артиматас' },
  { id: 4, minute: 55, type: eventTypes.SUBSTITUTION, team: 'team2', player: '', playerIn: 'Матия Шполярич', playerOut: 'Фотис Папулис' },
  { id: 5, minute: 61, type: eventTypes.SUBSTITUTION, team: 'team1', player: '', playerIn: 'Федор Кудряшов', playerOut: 'Сергей Петров' },
  { id: 6, minute: 68, type: eventTypes.YELLOW_CARD, team: 'team2', player: 'Иоаннис Коусулос' },
  { id: 7, minute: 79, type: eventTypes.GOAL, team: 'team1', player: 'Александр Головин' },
  { id: 8, minute: 89, type: eventTypes.GOAL, team: 'team1', player: 'Денис Черышев' },
  { id: 10, minute: 91, type: eventTypes.GOAL, team: 'team1', player: 'Денис Черышев' },
];

const eventIcons: Record<EventType, React.ComponentType> = {
  [eventTypes.GOAL]: GoalIcon,
  [eventTypes.YELLOW_CARD]: YellowCardIcon,
  [eventTypes.RED_CARD]: RedCardIcon,
  [eventTypes.SUBSTITUTION]: SubstitutionIcon,
};

// --- COMPONENT ---
export function MatchTimeline({ events }: { events: MatchEvent[] }) {
  const firstHalfEvents = events.filter(e => e.minute <= 45);
  const secondHalfEvents = events.filter(e => e.minute > 45 && e.minute <= 90);
  const extraTimeEvents = events.filter(e => e.minute > 90);

  const renderEvent = (event: MatchEvent, halfDuration: number, timeOffset: number) => {
    const position = ((event.minute - timeOffset) / halfDuration) * 100;
    const Icon = eventIcons[event.type];

    const tooltipContent = (
      <>
        <p className="font-bold">{event.minute}' {event.player}</p>
        {event.type === 'goal' && event.assist && <p className="text-xs">Пас: {event.assist}</p>}
        {event.type === 'substitution' && <p className="text-xs">↑{event.playerIn} / ↓{event.playerOut}</p>}
      </>
    );
    
    return (
      <TooltipProvider key={event.id} delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className="absolute -top-2.5 transform -translate-x-1/2 cursor-pointer"
              style={{ left: `${position}%` }}
            >
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-2.5 bg-muted-foreground/50"></div>
                <Icon />
              </div>
            </div>
          </TooltipTrigger>
          <TooltipContent>{tooltipContent}</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  };

  return (
    <div className="w-full px-4 md:px-8">
       <div className="grid grid-cols-2 text-center text-sm text-muted-foreground mb-1">
        <span>1-й тайм</span>
        <span>2-й тайм</span>
      </div>
      <div className="flex items-center justify-center w-full gap-2">
        {/* First Half */}
        <div className="relative flex-1 h-2 bg-primary/50 rounded-l-full">
          {firstHalfEvents.map(e => renderEvent(e, 45, 0))}
        </div>
        <div className="w-1 h-4 bg-muted-foreground/50"></div>
        {/* Second Half */}
        <div className="relative flex-1 h-2 bg-primary/50 rounded-r-full">
          {secondHalfEvents.map(e => renderEvent(e, 45, 45))}
          {extraTimeEvents.map(e => renderEvent(e, 45, 45))}
        </div>
      </div>
    </div>
  );
}
