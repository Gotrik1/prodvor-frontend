
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ArrowRight, User, Users } from 'lucide-react';
import type { PlanType } from './types';

const planTypes: PlanType[] = [
    { value: 'full-body', label: 'Фулл-бади', days: 1, description: 'Проработка всех групп мышц за одну тренировку.' },
    { value: '2-day-split', label: 'Сплит на 2 дня', days: 2, description: 'Разделение на верх и низ тела или тянущие/толкающие.' },
    { value: '3-day-split', label: 'Сплит на 3 дня', days: 3, description: 'Классический сплит для проработки каждой группы мышц раз в неделю.' },
    { value: '4-day-split', label: 'Сплит на 4 дня', days: 4, description: 'Для более продвинутых атлетов с фокусом на отдельные группы мышц.' },
];

export function PlanTypeSelector({ onSelect }: { onSelect: (type: PlanType) => void }) {
    return (
        <div className="py-4">
            <CardHeader className="text-center px-0 pt-0">
                <CardTitle>Выберите тип плана</CardTitle>
                <CardDescription>Это определит структуру вашей тренировочной недели.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {planTypes.map((type) => (
                    <Card 
                        key={type.value}
                        className="cursor-pointer hover:border-primary transition-colors group"
                        onClick={() => onSelect(type)}
                    >
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                {type.label}
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                            </CardTitle>
                            <CardDescription>{type.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </CardContent>
        </div>
    );
}
