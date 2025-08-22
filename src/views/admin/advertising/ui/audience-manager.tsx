
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { users, teams, allSports } from '@/mocks';
import { BarChart, Filter, Users, DollarSign, Save } from 'lucide-react';
import { Slider } from '@/shared/ui/slider';
import { Badge } from "@/shared/ui/badge";
import type { User } from '@/mocks';

const allDisciplines = allSports.map(s => s.name);
const allRoles = [...new Set(users.map(u => u.role))];
const allCities = ["Москва", "Санкт-Петербург", "Новосибирск", "Екатеринбург"]; // Mock cities

export function AudienceManager() {
    const [filters, setFilters] = useState({
        discipline: '',
        role: '',
        elo: [1000, 2000],
        city: '',
        age: [16, 45],
    });

    const handleFilterChange = (key: keyof typeof filters, value: string | number[]) => {
        setFilters(prev => ({ ...prev, [key]: value === 'all' ? '' : value }));
    };
    
    const filteredUsers = useMemo(() => {
        return users.filter(user => {
            // This is a simplified filtering logic for demonstration.
            // A real implementation would involve more complex data lookups.
            const eloMatch = true; // Assume ELO matches for now
            const roleMatch = filters.role ? user.role === filters.role : true;
            const cityMatch = true; // Assume city matches for now
            const disciplineMatch = true; // Assume discipline matches for now
            
            return roleMatch && eloMatch && cityMatch && disciplineMatch;
        });
    }, [filters]);

    const audienceSize = filteredUsers.length;
    
    const potentialRevenue = useMemo(() => {
        // Simplified calculation based on audience size and average revenue per user
        const ARPU = 44; // From our initial analysis
        const annualRevenue = (audienceSize * ARPU) / 1000000; // in millions
        return annualRevenue;
    }, [audienceSize]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Filter /> Управление Аудиториями</CardTitle>
                <CardDescription>Создавайте и анализируйте сегменты пользователей для таргетированной рекламы. Это ключ к увеличению eCPM.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Filters Section */}
                    <div className="lg:col-span-1 space-y-4 p-4 border rounded-lg bg-muted/50">
                        <h3 className="font-semibold">Фильтры сегментации</h3>
                         <div className="space-y-2">
                            <Label>Дисциплина</Label>
                            <Select onValueChange={(value) => handleFilterChange('discipline', value)}>
                                <SelectTrigger><SelectValue placeholder="Любая" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Любая</SelectItem>
                                    {allDisciplines.slice(0,10).map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Роль</Label>
                            <Select onValueChange={(value) => handleFilterChange('role', value)}>
                                <SelectTrigger><SelectValue placeholder="Любая" /></SelectTrigger>
                                <SelectContent>
                                     <SelectItem value="all">Любая</SelectItem>
                                     {allRoles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label>Город</Label>
                             <Select onValueChange={(value) => handleFilterChange('city', value)}>
                                <SelectTrigger><SelectValue placeholder="Любой" /></SelectTrigger>
                                <SelectContent>
                                     <SelectItem value="all">Любой</SelectItem>
                                     {allCities.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Рейтинг ELO: {filters.elo[0]} - {filters.elo[1]}</Label>
                            <Slider
                                value={filters.elo}
                                onValueChange={(value) => handleFilterChange('elo', value)}
                                min={500}
                                max={3000}
                                step={100}
                            />
                        </div>
                         <div className="space-y-2">
                            <Label>Возраст: {filters.age[0]} - {filters.age[1]}</Label>
                            <Slider
                                 value={filters.age}
                                 onValueChange={(value) => handleFilterChange('age', value)}
                                 min={12}
                                 max={80}
                                 step={1}
                            />
                        </div>
                    </div>
                    {/* Results Section */}
                    <div className="lg:col-span-2 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <Card className="text-center">
                                <CardHeader className="pb-2">
                                    <Users className="mx-auto h-6 w-6 text-muted-foreground mb-2"/>
                                    <CardTitle className="text-lg">Размер аудитории</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold">{audienceSize.toLocaleString('ru-RU')}</p>
                                    <p className="text-xs text-muted-foreground">пользователей</p>
                                </CardContent>
                            </Card>
                             <Card className="text-center">
                                <CardHeader className="pb-2">
                                    <DollarSign className="mx-auto h-6 w-6 text-muted-foreground mb-2"/>
                                    <CardTitle className="text-lg">Потенциальный доход</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-3xl font-bold text-green-400">~{potentialRevenue.toFixed(2)} млн ₽</p>
                                    <p className="text-xs text-muted-foreground">в год</p>
                                </CardContent>
                            </Card>
                        </div>
                        <Card className="bg-background">
                             <CardHeader>
                                <CardTitle className="text-lg">Сохранить сегмент</CardTitle>
                                <CardDescription>Сохраните эту конфигурацию для использования в рекламных кампаниях.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex items-end gap-2">
                                <div className="flex-grow space-y-2">
                                    <Label htmlFor="segment-name">Название сегмента</Label>
                                    <Input id="segment-name" placeholder="Напр., Активные игроки в футбол (Москва)" />
                                </div>
                                <Button>
                                    <Save className="mr-2 h-4 w-4"/> Сохранить
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
