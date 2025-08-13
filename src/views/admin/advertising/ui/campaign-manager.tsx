
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { MoreHorizontal, PlusCircle, Megaphone, Send, UploadCloud } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Textarea } from "@/shared/ui/textarea";

const mockCampaigns = [
    { id: 'camp1', name: 'Летний Кубок - Регистрация', status: 'Активна', segment: 'Игроки в футбол (Москва)', impressions: '1.2M', clicks: '2,450', ctr: '0.20%' },
    { id: 'camp2', name: 'Спонсорская интеграция Red Energy', status: 'Активна', segment: 'Все пользователи', impressions: '5.8M', clicks: '1,160', ctr: '0.02%' },
    { id: 'camp3', name: 'Турнир CS2 Open', status: 'На паузе', segment: 'Игроки CS2', impressions: '560k', clicks: '1,960', ctr: '0.35%' },
    { id: 'camp4', name: 'Весенний сезон - Анонс', status: 'Завершена', segment: 'Все пользователи', impressions: '10.2M', clicks: '15,300', ctr: '0.15%' },
];

const statusStyles: Record<string, string> = {
    'Активна': 'bg-green-500/20 text-green-300 border-green-500/30',
    'На паузе': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'Завершена': 'bg-muted text-muted-foreground border-border',
}

export function CampaignManager() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2"><Megaphone /> Менеджер Кампаний</CardTitle>
                    <CardDescription>Создавайте, отслеживайте и управляйте всеми рекламными кампаниями для продажи инвентаря.</CardDescription>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            Создать кампанию
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[625px]">
                        <DialogHeader>
                            <DialogTitle>Новая рекламная кампания</DialogTitle>
                            <DialogDescription>
                                Настройте параметры для нового рекламного размещения на платформе.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Название</Label>
                                <Input id="name" placeholder="Напр., Спонсорская интеграция 'Brand X'" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="segment" className="text-right">Аудитория</Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Выберите сегмент" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Все пользователи</SelectItem>
                                        <SelectItem value="football_moscow">Игроки в футбол (Москва)</SelectItem>
                                        <SelectItem value="cs2_players">Игроки CS2</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="type" className="text-right">Тип</Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Выберите тип кампании" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="banner">Баннер в ленте</SelectItem>
                                        <SelectItem value="native">Нативная интеграция</SelectItem>
                                        <SelectItem value="challenge">Брендированный челлендж</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                             <div className="grid grid-cols-4 items-start gap-4">
                                <Label className="text-right pt-2">Креатив</Label>
                                <div className="col-span-3">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground"/>
                                            <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Загрузите баннер</span></p>
                                        </div>
                                        <input id="dropzone-file" type="file" className="hidden" />
                                    </label>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Запустить кампанию</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </CardHeader>
            <CardContent>
                <div className="border rounded-lg">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Название</TableHead>
                                <TableHead>Статус</TableHead>
                                <TableHead>Сегмент</TableHead>
                                <TableHead className="text-right">Показы</TableHead>
                                <TableHead className="text-right">Клики</TableHead>
                                <TableHead className="text-right">CTR</TableHead>
                                <TableHead><span className="sr-only">Действия</span></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockCampaigns.map((campaign) => (
                                <TableRow key={campaign.id}>
                                    <TableCell className="font-medium">{campaign.name}</TableCell>
                                    <TableCell>
                                        <Badge className={statusStyles[campaign.status]}>{campaign.status}</Badge>
                                    </TableCell>
                                    <TableCell>{campaign.segment}</TableCell>
                                    <TableCell className="text-right font-mono">{campaign.impressions}</TableCell>
                                    <TableCell className="text-right font-mono">{campaign.clicks}</TableCell>
                                    <TableCell className="text-right font-mono">{campaign.ctr}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Открыть меню</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem>Редактировать</DropdownMenuItem>
                                                <DropdownMenuItem>Статистика</DropdownMenuItem>
                                                <DropdownMenuItem>Дублировать</DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-500">Архивировать</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}
