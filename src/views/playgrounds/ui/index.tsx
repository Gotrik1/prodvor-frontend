

'use client';

import { useState, useMemo } from 'react';
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { PlusCircle, Star, MapPin, List, Search } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { YandexMapV3 } from '@/widgets/yandex-map';
import { playgrounds as mockPlaygrounds, allSports } from '@/mocks';
import { Badge } from '@/shared/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Input } from "@/shared/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/shared/ui/select";

const allSportsFlat = allSports.reduce((acc, sport) => {
    acc.push({ id: sport.id, name: sport.name });
    if (sport.subdisciplines) {
        sport.subdisciplines.forEach(sub => {
            acc.push({ id: sub.id, name: sub.name });
        });
    }
    return acc;
}, [] as { id: string, name: string }[]);


const FavoritePlaygrounds = () => {
    const favoritePlaygrounds = mockPlaygrounds.slice(0, 3);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <Star className="text-amber-400" />
                    Избранные площадки
                </CardTitle>
            </CardHeader>
            <CardContent>
                {favoritePlaygrounds.length > 0 ? (
                    <div className="space-y-4">
                        {favoritePlaygrounds.map(playground => (
                             <Link href={`/playgrounds/${playground.id}`} key={playground.id} className="flex items-center gap-4 group p-2 rounded-md hover:bg-muted/50 transition-colors">
                                <div className="relative w-16 h-12 rounded-md overflow-hidden shrink-0">
                                    <Image
                                        src={playground.imageUrl}
                                        alt={playground.name}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={playground.dataAiHint}
                                    />
                                </div>
                                <div>
                                    <p className="font-semibold leading-tight group-hover:text-primary transition-colors">{playground.name}</p>
                                    <p className="text-xs text-muted-foreground">{playground.type}</p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-muted-foreground text-center py-4">У вас пока нет избранных площадок.</p>
                )}
            </CardContent>
        </Card>
    );
};

const NearbyPlaygrounds = () => {
    const nearbyPlaygrounds = mockPlaygrounds.slice(0, 4);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    <MapPin className="text-primary" />
                    Площадки рядом
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {nearbyPlaygrounds.map(playground => (
                         <Link href={`/playgrounds/${playground.id}`} key={playground.id} className="flex items-center gap-4 group p-2 rounded-md hover:bg-muted/50 transition-colors">
                            <div className="relative w-16 h-12 rounded-md overflow-hidden shrink-0">
                                <Image
                                    src={playground.imageUrl}
                                    alt={playground.name}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={playground.dataAiHint}
                                />
                            </div>
                            <div>
                                <p className="font-semibold leading-tight group-hover:text-primary transition-colors">{playground.name}</p>
                                <p className="text-xs text-muted-foreground">{playground.address}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </CardContent>
    </Card>);
};

export function PlaygroundsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState('any');
    const [disciplineFilter, setDisciplineFilter] = useState('any');
    
    const teamSports = allSports.filter(s => s.isTeamSport);
    const individualSports = allSports.filter(s => !s.isTeamSport);

    const filteredPlaygrounds = useMemo(() => {
        const lowercasedQuery = searchQuery.toLowerCase();
        return mockPlaygrounds.filter(playground => {
            const queryMatch = lowercasedQuery === '' ||
                playground.name.toLowerCase().includes(lowercasedQuery) ||
                playground.address.toLowerCase().includes(lowercasedQuery);
            
            const typeMatch = typeFilter === 'any' || playground.type === typeFilter;
            
            const disciplineMatch = disciplineFilter === 'any' || playground.sportIds.includes(disciplineFilter);

            return queryMatch && typeMatch && disciplineMatch;
        });
    }, [searchQuery, typeFilter, disciplineFilter]);

    return (
        <div className="p-4 md:p-6 lg:p-8">
             <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                        Места для тренировок
                    </h1>
                    <p className="text-muted-foreground mt-1">Найдите или добавьте свое любимое место для игр и тренировок.</p>
                </div>
                <Button asChild>
                    <Link href="/playgrounds/add">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Добавить место
                    </Link>
                </Button>
            </div>
            
            <Card className="mb-8">
                <CardHeader>
                    <CardTitle>Поиск и фильтрация</CardTitle>
                    <CardDescription>Найдите идеальное место для ваших тренировок.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="relative lg:col-span-2">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input 
                                placeholder="Название или адрес..." 
                                className="pl-9"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                         <Select value={typeFilter} onValueChange={setTypeFilter}>
                            <SelectTrigger><SelectValue /></SelectTrigger>
                            <SelectContent>
                               <SelectItem value="any">Любой тип</SelectItem>
                               <SelectItem value="Открытая площадка">Открытая площадка</SelectItem>
                               <SelectItem value="Закрытое помещение">Закрытое помещение</SelectItem>
                               <SelectItem value="Стадион">Стадион</SelectItem>
                               <SelectItem value="Спортивный центр">Спортивный центр</SelectItem>
                               <SelectItem value="Специализированный объект">Специализированный объект</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={disciplineFilter} onValueChange={setDisciplineFilter}>
                            <SelectTrigger><SelectValue placeholder="Дисциплина" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="any">Любая дисциплина</SelectItem>
                                <SelectGroup>
                                    <SelectLabel>Командные</SelectLabel>
                                    {teamSports.map((sport) => (
                                        <SelectItem key={sport.id} value={sport.id}>
                                            {sport.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                                <SelectGroup>
                                    <SelectLabel>Индивидуальные</SelectLabel>
                                     {individualSports.map((sport) => (
                                        <SelectItem key={sport.id} value={sport.id}>
                                            {sport.name}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            <Tabs defaultValue="map">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                    <TabsTrigger value="map"><MapPin className="mr-2 h-4 w-4"/>Карта</TabsTrigger>
                    <TabsTrigger value="list"><List className="mr-2 h-4 w-4"/>Список</TabsTrigger>
                    <TabsTrigger value="favorites"><Star className="mr-2 h-4 w-4"/>Избранное</TabsTrigger>
                    <TabsTrigger value="nearby">Рядом</TabsTrigger>
                </TabsList>
                <div className="mt-6">
                    <TabsContent value="map">
                         <Card>
                            <CardContent className="p-2">
                                <div className="relative w-full h-[600px] rounded-lg overflow-hidden border">
                                    <YandexMapV3 />
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="list">
                         <Card>
                            <CardHeader>
                                <CardTitle>Список площадок ({filteredPlaygrounds.length})</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="border rounded-lg overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Название</TableHead>
                                                <TableHead>Адрес</TableHead>
                                                <TableHead className="hidden md:table-cell">Тип</TableHead>
                                                <TableHead className="hidden md:table-cell">Покрытие</TableHead>
                                                <TableHead className="hidden md:table-cell">Виды спорта</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredPlaygrounds.map((p) => (
                                                <TableRow key={p.id}>
                                                    <TableCell className="font-medium">
                                                        <Link href={`/playgrounds/${p.id}`} className="hover:text-primary transition-colors">
                                                            {p.name}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell>{p.address}</TableCell>
                                                    <TableCell className="hidden md:table-cell"><Badge variant="outline">{p.type}</Badge></TableCell>
                                                    <TableCell className="hidden md:table-cell">{p.surface}</TableCell>
                                                    <TableCell className="text-xs hidden md:table-cell">
                                                        {p.sportIds.map((id: string) => allSportsFlat.find(s => s.id === id)?.name).filter(Boolean).join(', ')}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="favorites">
                       <FavoritePlaygrounds />
                    </TabsContent>
                     <TabsContent value="nearby">
                       <NearbyPlaygrounds />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
}
