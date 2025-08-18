
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { ArrowLeft, ArrowRight, Edit } from 'lucide-react';
import type { PlanType, Exercise } from './types';
import { Button } from '@/shared/ui/button';

export const splitDayTemplates: Record<string, {label: string, value: string}[]> = {
    '2-day-split': [
        { label: 'Тренировка верха', value: 'upper' },
        { label: 'Тренировка низа', value: 'lower' },
        { label: 'Тянущие мышцы', value: 'pull' },
        { label: 'Толкающие мышцы', value: 'push' },
    ],
    '3-day-split': [
        { label: 'Грудь и Трицепс', value: 'chest-tri' },
        { label: 'Спина и Бицепс', value: 'back-bi' },
        { label: 'Ноги и Плечи', value: 'legs-shoulders' },
    ],
    '4-day-split': [
        { label: 'Грудь', value: 'chest' },
        { label: 'Спина', value: 'back' },
        { label: 'Ноги', value: 'legs' },
        { label: 'Руки и Плечи', value: 'arms-shoulders' },
    ],
}

interface SplitTemplate {
    name: string;
    days: string[];
    prefilled?: boolean;
    exercises?: Record<string, Omit<Exercise, 'id'>[]>;
}

const sportWikiVariant1: Record<string, Omit<Exercise, 'id'>[]> = {
    'Спина, трицепс': [
        { name: 'Тяга штанги к поясу в наклоне', sets: '4', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Подтягивания к груди', sets: '4', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Тяга верхнего блока прямыми руками', sets: '4', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Жим лежа узким хватом', sets: '3', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Разгибания рук на верхнем блоке', sets: '3', reps: '10-12', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
    ],
    'Ноги': [
        { name: 'Приседания со штангой', sets: '3', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Жим платформы ногами', sets: '3', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Разгибания ног в станке', sets: '3', reps: '10-12', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Сгибания ног в станке', sets: '3', reps: '10-12', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Подъем на носки', sets: '3', reps: '10-12', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
    ],
    'Грудь, бицепс': [
        { name: 'Жим штанги на наклонной скамье', sets: '4', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Разведения с гантелями', sets: '4', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Отжимания на брусьях', sets: '4', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Сгибания рук с гантелями (супинация)', sets: '3', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Подъем штанги на бицепс (Скамья Скотта)', sets: '3', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
    ],
    'Дельты': [
        { name: 'Жимы штанги вверх сидя', sets: '3', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Протяжка штанги вдоль туловища', sets: '3', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Махи гантелями через стороны', sets: '3', reps: '10-12', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Тяга нижнего блока к груди сидя', sets: '3', reps: '8-10', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
        { name: 'Махи гантелями в наклоне', sets: '3', reps: '10-12', weight: '', restBetweenSets: '60', restAfterExercise: '120' },
    ],
};


export const splitTemplates: Record<PlanType['value'], SplitTemplate[]> = {
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
        {
            name: 'Программа от SportWiki',
            days: ['Спина, трицепс', 'Ноги', 'Грудь, бицепс', 'Дельты'],
            prefilled: true,
            exercises: sportWikiVariant1
        },
        { name: 'Классический бодибилдинг', days: ['Грудь', 'Спина', 'Ноги', 'Руки и Плечи'] },
    ],
};

interface SplitTemplateSelectorProps {
    planType: PlanType;
    onSelect: (template: SplitTemplate) => void;
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
                        onClick={() => onSelect(template)}
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
                    onClick={() => onSelect({ name: 'Свой шаблон', days: customTemplateDays })}
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
