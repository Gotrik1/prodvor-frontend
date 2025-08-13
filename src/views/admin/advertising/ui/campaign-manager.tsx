
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { MoreHorizontal, PlusCircle, Megaphone } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";

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
                    <CardDescription>Создавайте, отслеживайте и управляйте всеми рекламными кампаниями.</CardDescription>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Создать кампанию
                </Button>
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
