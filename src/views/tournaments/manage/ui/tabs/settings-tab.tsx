

'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { AlertTriangle, ListChecks, Loader2, Save, PlusCircle, MapPin, Trash2, Globe, Building } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Label } from "@/shared/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import React, { useState } from "react";
import { Checkbox } from "@/shared/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { cn } from "@/shared/lib/utils";
import { Calendar as CalendarIcon } from 'lucide-react';
import { Calendar as CalendarComponent } from "@/shared/ui/calendar";
import { requirements as initialRequirements, Tournament, TournamentLevel } from '@/mocks';
import { useToast } from "@/shared/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { useTournamentCrmContext } from "../../lib/TournamentCrmContext";

const mockPlaygrounds = [
    { id: 'p1', name: 'Стадион "Центральный"', address: 'ул. Ленина, 1' },
    { id: 'p2', name: 'Спортивный комплекс "Олимп"', address: 'пр. Мира, 5' },
    { id: 'p3', name: 'Коробка у школы №15', address: 'ул. Школьная, 15' },
];


export function SettingsTab() {
    const { tournament, handleTournamentChange } = useTournamentCrmContext();
    const { toast } = useToast();
    const [selectedRequirements, setSelectedRequirements] = useState<string[]>(['req1', 'req2', 'req3', 'req4', 'req5']);
    const [isSaving, setIsSaving] = useState(false);
    const [tournamentPlaygrounds, setTournamentPlaygrounds] = useState(tournament?.playgrounds || [mockPlaygrounds[0]]);
    const [regStartDate, setRegStartDate] = useState<Date | undefined>();
    const [regEndDate, setRegEndDate] = useState<Date | undefined>();
    
    if (!tournament) return null;

    const handleRequirementChange = (reqId: string, checked: boolean) => {
        setSelectedRequirements(prev =>
            checked ? [...prev, reqId] : prev.filter(id => id !== reqId)
        );
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        handleTournamentChange({ [e.target.id]: e.target.value } as Partial<Tournament>);
    };
    
    const handleSelectChange = (id: 'level', value: TournamentLevel) => {
        handleTournamentChange({ [id]: value });
    };

    const handleSave = () => {
        setIsSaving(true);
        // Simulate API call
        setTimeout(() => {
            setIsSaving(false);
            toast({
                title: "Настройки сохранены",
                description: "Все изменения были успешно применены.",
            });
        }, 1500);
    };
    
    const availablePlaygrounds = mockPlaygrounds.filter(p => !tournamentPlaygrounds.some(tp => tp.id === p.id));
    
    const addPlayground = (playground: typeof mockPlaygrounds[0]) => {
        setTournamentPlaygrounds(prev => [...prev, playground]);
    };

    const removePlayground = (playgroundId: string) => {
        setTournamentPlaygrounds(prev => prev.filter(p => p.id !== playgroundId));
    };

    const needsInput = (reqId: string) => !['req7'].includes(reqId);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <CardHeader>
                    <CardTitle>Основные настройки</CardTitle>
                    <CardDescription>Редактирование ключевых параметров вашего мероприятия.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="name">Название турнира</Label>
                        <Input id="name" value={tournament.name} onChange={handleInputChange} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="description">Описание турнира</Label>
                        <Textarea 
                            id="description" 
                            placeholder="Расскажите о вашем турнире: для кого он, какие цели, формат и т.д." 
                            rows={5} 
                            value={tournament.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="level">Уровень турнира</Label>
                             <Select value={tournament.level} onValueChange={(value) => handleSelectChange('level', value as TournamentLevel)}>
                                <SelectTrigger id="level">
                                    <SelectValue placeholder="Выберите уровень" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Городской"><Building className="mr-2 h-4 w-4"/>Городской</SelectItem>
                                    <SelectItem value="Региональный"><MapPin className="mr-2 h-4 w-4"/>Региональный</SelectItem>
                                    <SelectItem value="Федеральный"><Globe className="mr-2 h-4 w-4"/>Федеральный</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Локация</Label>
                            <Input id="location" value={tournament.location} onChange={handleInputChange} placeholder="Напр. Москва" />
                        </div>
                    </div>

                     <div className="space-y-2">
                        <Label>Места проведения</Label>
                         <Card className="bg-muted/50">
                             <CardContent className="p-4 space-y-3">
                                 {tournamentPlaygrounds.map(pg => (
                                     <div key={pg.id} className="flex items-center justify-between p-2 rounded-md bg-background">
                                         <div>
                                             <p className="font-medium">{pg.name}</p>
                                             <p className="text-xs text-muted-foreground">{pg.address}</p>
                                         </div>
                                         <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive" onClick={() => removePlayground(pg.id)}>
                                             <Trash2 className="h-4 w-4" />
                                         </Button>
                                     </div>
                                 ))}
                                 <Dialog>
                                     <DialogTrigger asChild>
                                        <Button variant="outline" className="w-full mt-2">
                                            <PlusCircle className="mr-2 h-4 w-4" />
                                            Добавить площадку
                                        </Button>
                                     </DialogTrigger>
                                     <DialogContent>
                                         <DialogHeader>
                                             <DialogTitle>Выбор площадки</DialogTitle>
                                             <DialogDescription>Выберите место проведения из списка доступных на платформе.</DialogDescription>
                                         </DialogHeader>
                                         <div className="py-4 space-y-2">
                                            {availablePlaygrounds.length > 0 ? availablePlaygrounds.map(pg => (
                                                 <div key={pg.id} className="flex items-center justify-between p-2 rounded-md hover:bg-muted">
                                                    <div>
                                                         <p className="font-medium">{pg.name}</p>
                                                         <p className="text-xs text-muted-foreground">{pg.address}</p>
                                                    </div>
                                                    <DialogFooter>
                                                        <Button size="sm" onClick={() => addPlayground(pg)}>Выбрать</Button>
                                                    </DialogFooter>
                                                 </div>
                                            )) : (
                                                <p className="text-sm text-center text-muted-foreground py-4">Все доступные площадки уже добавлены.</p>
                                            )}
                                         </div>
                                     </DialogContent>
                                 </Dialog>
                             </CardContent>
                         </Card>
                    </div>

                    <div>
                         <Label>Ключевые даты</Label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-2">
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !regStartDate && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {regStartDate ? regStartDate.toLocaleDateString() : <span>Начало регистрации</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><CalendarComponent mode="single" selected={regStartDate} onSelect={setRegStartDate} initialFocus /></PopoverContent>
                            </Popover>
                            <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !regEndDate && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" /> 
                                    {regEndDate ? regEndDate.toLocaleDateString() : <span>Конец регистрации</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><CalendarComponent mode="single" selected={regEndDate} onSelect={setRegEndDate} initialFocus /></PopoverContent>
                            </Popover>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !tournament.startDate && "text-muted-foreground")}>
                                    <CalendarIcon className="mr-2 h-4 w-4" /> 
                                    {tournament.startDate ? new Date(tournament.startDate).toLocaleDateString() : <span>Начало турнира</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0"><CalendarComponent mode="single" selected={new Date(tournament.startDate)} onSelect={(date) => handleTournamentChange({ startDate: date?.toISOString() || '' })} initialFocus /></PopoverContent>
                            </Popover>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="prizePool">Призовой фонд</Label>
                        <Input id="prizePool" value={tournament.prizePool} onChange={handleInputChange} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="rules">Правила</Label>
                        <Textarea id="rules" placeholder="Опишите основные правила и регламент турнира..." rows={10} defaultValue="1. Все матчи играются до 2 побед (Best of 3). 2. Опоздание на матч более чем на 15 минут карается техническим поражением. 3. Запрещено использование любого стороннего ПО."/>
                    </div>
                     <div className="flex justify-end pt-4">
                        <Button type="submit" size="lg" onClick={handleSave} disabled={isSaving}>
                             {isSaving ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Сохранение...
                                </>
                            ) : (
                                <>
                                    <Save className="mr-2 h-4 w-4" />
                                    Сохранить изменения
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><ListChecks /> Требования к участникам</CardTitle>
                        <CardDescription>Установите правила для регистрации команд.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {initialRequirements.map((req) => (
                             <div key={req.id} className="flex items-center justify-between gap-4 p-2 rounded-md hover:bg-muted/50">
                                <div className="flex items-center space-x-2">
                                    <Checkbox 
                                        id={req.id} 
                                        checked={selectedRequirements.includes(req.id)}
                                        onCheckedChange={(checked) => handleRequirementChange(req.id, !!checked)}
                                    />
                                    <Label htmlFor={req.id} className="text-sm font-normal leading-snug cursor-pointer">
                                        {req.name}
                                    </Label>
                                </div>
                                {needsInput(req.id) && (
                                     <Input 
                                        type="number" 
                                        className="w-20 h-8"
                                        disabled={!selectedRequirements.includes(req.id)}
                                     />
                                )}
                            </div>
                        ))}
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-destructive">
                            <AlertTriangle className="h-5 w-5" />
                            Опасная зона
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="destructive" className="w-full">Отменить турнир</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Вы уверены, что хотите отменить турнир?</DialogTitle>
                                    <DialogDescription>
                                        Это действие необратимо. Все данные о турнире, включая регистрации, будут удалены. Введите название турнира, чтобы подтвердить.
                                    </DialogDescription>
                                </DialogHeader>
                                <Input placeholder={tournament.name} className="my-4"/>
                                <DialogFooter>
                                    <Button variant="destructive">Я понимаю, отменить турнир</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                         <p className="text-xs text-muted-foreground">Это действие необратимо. Все данные о турнире, включая регистрации, будут удалены.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
