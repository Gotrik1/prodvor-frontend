
'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { YandexMapV3 } from "@/widgets/yandex-map";
import { UploadCloud } from "lucide-react";
import { allSports } from "@/mocks";
import { MultiSelect } from "@/shared/ui/multi-select";
import { useState } from "react";
import { useToast } from "@/shared/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { GameplayEvent, awardProgressPoints } from "@/shared/lib/gamification";


const features = [
    { id: "lighting", label: "Освещение" },
    { id: "changing_room", label: "Раздевалка с душем" },
    { id: "hoops", label: "Кольца (баскетбол)" },
    { id: "gym_equipment", label: "Силовые тренажеры" },
    { id: "rentals", label: "Прокат инвентаря" },
    { id: "fence", label: "Ограждение" },
    { id: "water_source", label: "Источник воды" },
    { id: "net_volleyball", label: "Сетка (волейбол)" },
    { id: "cardio_zone", label: "Кардио-зона" },
    { id: "targets", label: "Мишени" },
    { id: "benches", label: "Скамейки" },
    { id: "gates", label: "Ворота" },
    { id: "horizontal_bars", label: "Турники" },
    { id: "pull_up_bar", label: "Подъемник" },
];

const sportOptions = allSports.map(sport => ({
    value: sport.id,
    label: sport.name,
    group: sport.isTeamSport ? 'Командные' : 'Индивидуальные',
}));


export function AddPlaygroundPage() {
    const { toast } = useToast();
    const router = useRouter();
    const { user: currentUser } = useUserStore();
    const [selectedSports, setSelectedSports] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you would send data to the backend for moderation
        
        if (currentUser) {
            awardProgressPoints(GameplayEvent.PLAYGROUND_ADDED, { userId: currentUser.id });
        }
        
        toast({
            title: "Заявка отправлена!",
            description: "Новая площадка была отправлена на модерацию. Спасибо за ваш вклад!",
        });
        
        router.push('/playgrounds');
    };
    
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold font-headline">Новое место для тренировок</h1>
                    <p className="text-muted-foreground mt-2">Добавьте свою любимую площадку, зал или поле на карту ProDvor.</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Информация о месте</CardTitle>
                            <CardDescription>
                                Добавьте новое место. Оно появится на карте и будет ожидать проверки модератором.
                                За каждое уникальное место вы получите очки прогресса!
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Название</Label>
                                <Input id="name" placeholder="Например, Коробка за домом или Фитнес-клуб 'Атлет'" required/>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="address">Адрес</Label>
                                <Input id="address" placeholder="Город, улица, дом" required/>
                                <p className="text-xs text-muted-foreground">Начните вводить адрес, а затем уточните положение на карте.</p>
                            </div>

                            <div className="space-y-2">
                                <Label>Расположение на карте</Label>
                                <div className="h-[400px] w-full rounded-md overflow-hidden border">
                                    <YandexMapV3 />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="place-type">Тип места</Label>
                                    <Select>
                                        <SelectTrigger id="place-type">
                                            <SelectValue placeholder="Выберите тип" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="outdoor">Открытая площадка</SelectItem>
                                            <SelectItem value="indoor">Закрытое помещение</SelectItem>
                                            <SelectItem value="stadium">Стадион</SelectItem>
                                            <SelectItem value="center">Спортивный центр</SelectItem>
                                            <SelectItem value="special">Специализированный объект</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="surface-type">Покрытие</Label>
                                    <Select>
                                        <SelectTrigger id="surface-type">
                                            <SelectValue placeholder="Выберите покрытие" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="asphalt">Асфальт</SelectItem>
                                            <SelectItem value="rubber">Резиновое</SelectItem>
                                            <SelectItem value="grass">Газон</SelectItem>
                                            <SelectItem value="sand">Песок</SelectItem>
                                            <SelectItem value="parquet">Паркет</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Виды спорта</Label>
                                <MultiSelect
                                    options={sportOptions}
                                    selected={selectedSports}
                                    onChange={setSelectedSports}
                                    placeholder="Выберите один или несколько видов спорта..."
                                    className="w-full"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Особенности</Label>
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-2">
                                {features.map(feature => (
                                        <div key={feature.id} className="flex items-center space-x-2">
                                            <Checkbox id={feature.id} />
                                            <Label htmlFor={feature.id} className="font-normal text-sm">{feature.label}</Label>
                                        </div>
                                ))}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="photos">Фотография</Label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground"/>
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Нажмите, чтобы загрузить фото</span></p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div> 
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button size="lg" type="submit">Добавить место</Button>
                            </div>

                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
}
