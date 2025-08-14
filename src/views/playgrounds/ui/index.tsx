

'use client';

import { useState } from 'react';
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PlusCircle, Search, Star, MapPin } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';
import { YandexMapV3 } from '@/widgets/yandex-map';
import { playgrounds as mockPlaygrounds } from '@/mocks';

const mainFilters = ["Все", "Футбол", "Баскетбол", "Стритбол", "Воркаут", "Универсальная", "Фитнес-зал", "Бассейн", "Теннисный корт"];
const secondaryFilters = ["Лыжная трасса", "Биатлонный комплекс", "Каток", "Сноуборд-парк", "Горнолыжный склон", "Стрельбище"];

const FilterButton = ({ label, isActive, onClick }: { label: string, isActive: boolean, onClick: () => void }) => (
    <Button
        variant={isActive ? "default" : "secondary"}
        onClick={onClick}
        className="rounded-full"
    >
        {label}
    </Button>
);

const FavoritePlaygrounds = () => {
    const favoritePlaygrounds = mockPlaygrounds.slice(0, 3); // Mock data for now

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
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
                    <p className="text-sm text-muted-foreground text-center py-4">У вас пока нет избранных площадок. Добавьте их, нажав на звездочку на странице площадки.</p>
                )}
            </CardContent>
        </Card>
    );
};

const NearbyPlaygrounds = () => {
    // Mock data for nearby playgrounds. In a real app, this would come from a geolocation API.
    const nearbyPlaygrounds = mockPlaygrounds.slice(0, 4);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
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
        </Card>
    )
}


export function PlaygroundsPage() {
    const [activeFilter, setActiveFilter] = useState("Все");

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
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

                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <Button variant="ghost" size="icon">
                                    <Search className="h-5 w-5 text-muted-foreground" />
                                </Button>
                                {mainFilters.map(filter => (
                                    <FilterButton
                                        key={filter}
                                        label={filter}
                                        isActive={activeFilter === filter}
                                        onClick={() => setActiveFilter(filter)}
                                    />
                                ))}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 pl-12">
                                {secondaryFilters.map(filter => (
                                    <FilterButton
                                        key={filter}
                                        label={filter}
                                        isActive={activeFilter === filter}
                                        onClick={() => setActiveFilter(filter)}
                                    />
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-2">
                            <div className="relative w-full h-[600px] rounded-lg overflow-hidden">
                            <YandexMapV3 />
                            </div>
                        </CardContent>
                    </Card>
                </div>
                <div className="lg:sticky top-24 space-y-8">
                     <FavoritePlaygrounds />
                     <NearbyPlaygrounds />
                </div>
            </div>
        </div>
    );
}
