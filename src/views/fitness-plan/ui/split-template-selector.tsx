
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ArrowLeft, ArrowRight, Edit } from 'lucide-react';
import type { PlanType } from './types';
import { Button } from '@/shared/ui/button';

export const splitTemplates: Record<PlanType['value'], { name: string; days: string[] }[]> = {
    'full-body': [],
    '2-day-split': [
        { name: 'Верх / Низ', days: ['Тренировка верха', 'Тренировка низа'] },
        { name: 'Тянущие / Толкающие', days: ['Тянущие мышцы', 'Толкающие мышцы'] },
    ],
    '3-day-split': [
        { name: 'Тяни / Толкай / Ноги', days: ['Толкающие (Грудь, Плечи, Трицепс)', 'Тянущие (Спина, Бицепс)', 'Ноги'] },
        { name: 'Классический сплит', days: ['Грудь и Трицепс', 'Спина и Бицепс', 'Ноги и Плечи'] },
    ],
    '4-day-split': [
        { name: 'Верх / Низ (x2)', days: ['Верх тела 1 (Сила)', 'Низ тела 1 (Сила)', 'Верх тела 2 (Гипертрофия)', 'Низ тела 2 (Гипертрофия)'] },
        { name: 'Продвинутый сплит', days: ['Грудь и Трицепс', 'Спина и Бицепс', 'Ноги', 'Плечи и Руки'] },
    ],
};

interface SplitTemplateSelectorProps {
    planType: PlanType;
    onSelect: (dayNames: string[]) => void;
    onBack: () => void;
}

export function SplitTemplateSelector({ planType, onSelect, onBack }: SplitTemplateSelectorProps) {
    const templates = splitTemplates[planType.value];
    const customTemplateDays = Array.from({ length: planType.days }, (_, i) => `День ${i + 1}`);

    return (
        <div className="py-4">
            <CardHeader className="text-center px-0 pt-0">
                <CardTitle>Выберите шаблон разбивки</CardTitle>
                <CardDescription>Выберите готовую схему или создайте свою.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {templates.map((template) => (
                    <Card 
                        key={template.name}
                        className="cursor-pointer hover:border-primary transition-colors group flex flex-col"
                        onClick={() => onSelect(template.days)}
                    >
                        <CardHeader>
                            <CardTitle className="flex justify-between items-center">
                                {template.name}
                                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                            </CardTitle>
                        </CardHeader>
                         <CardContent className="flex-grow">
                            <ul className="text-sm text-muted-foreground list-disc list-inside">
                                {template.days.map(day => <li key={day}>{day}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                ))}
                <Card 
                    className="cursor-pointer hover:border-primary transition-colors group flex flex-col"
                    onClick={() => onSelect(customTemplateDays)}
                >
                    <CardHeader>
                        <CardTitle className="flex justify-between items-center">
                            Свой шаблон
                            <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors transform group-hover:translate-x-1" />
                        </CardTitle>
                    </CardHeader>
                     <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">Создайте свою собственную разбивку и назовите дни самостоятельно.</p>
                    </CardContent>
                </Card>
            </CardContent>
             <div className="flex justify-start pt-6 border-t">
                 <Button variant="outline" onClick={onBack}>
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Назад к выбору типа
                </Button>
            </div>
        </div>
    );
}
