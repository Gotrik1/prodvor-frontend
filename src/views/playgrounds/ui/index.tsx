
'use client';

import { useState } from 'react';
import { Button } from "@/shared/ui/button";
import { Card, CardContent } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { PlusCircle, Search } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import Image from 'next/image';

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

export function PlaygroundsPage() {
    const [activeFilter, setActiveFilter] = useState("Все");

    return (
        <div className="p-4 md:p-6 lg:p-8 space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                        Места для тренировок
                    </h1>
                    <p className="text-muted-foreground mt-1">Найдите или добавьте свое любимое место для игр и тренировок.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Добавить место
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
                    <div className="relative w-full aspect-[16/9] rounded-lg overflow-hidden">
                        <Image
                            src="https://placehold.co/1200x800.png"
                            alt="Карта города с площадками"
                            fill
                            className="object-cover"
                            data-ai-hint="city map"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
