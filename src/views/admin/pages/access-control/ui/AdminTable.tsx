
'use client';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Button } from "@/shared/ui/button";
import { MoreHorizontal, Settings, Shield, User, Lock, Users as UsersIcon, Link2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/shared/ui/tooltip';

type Admin = {
    id: string;
    name: string;
    role: string;
    section: string;
    status: string;
}

type AdminRole = 'Главный администратор' | 'Менеджер турниров' | 'Модератор контента' | 'Менеджер по рекламе' | 'Менеджер по спорту' | 'Продакт-менеджер' | 'Проджект-менеджер';
const managementRoles: AdminRole[] = ['Продакт-менеджер', 'Проджект-менеджер'];

const roleIcons: Record<AdminRole, React.ElementType> = {
    'Главный администратор': Shield,
    'Менеджер турниров': UsersIcon,
    'Модератор контента': UsersIcon,
    'Менеджер по рекламе': UsersIcon,
    'Менеджер по спорту': UsersIcon,
    'Продакт-менеджер': Lock,
    'Проджект-менеджер': Lock
};


export const AdminTable = ({ admins, onSendPassword, onOpenDialog }: { admins: Admin[], onSendPassword: (id: string, name: string) => void, onOpenDialog: (id: string) => void }) => {
    return (
        <div className="border rounded-lg">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Администратор</TableHead>
                        <TableHead>Роль</TableHead>
                        <TableHead>Раздел</TableHead>
                        <TableHead className="text-right">Действия</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {admins.map((admin) => {
                        const Icon = roleIcons[admin.role as AdminRole] || User;
                        const isManager = managementRoles.includes(admin.role as AdminRole);
                        return (
                            <TableRow key={admin.id}>
                                <TableCell>
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={`https://i.pravatar.cc/150?u=${admin.id}`} />
                                            <AvatarFallback>{admin.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span className="font-medium">{admin.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell>
                                     <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <div className="flex items-center gap-2">
                                                    <Icon className={`h-4 w-4 ${isManager ? 'text-blue-400' : 'text-muted-foreground'}`}/>
                                                    {admin.role}
                                                </div>
                                            </TooltipTrigger>
                                            {isManager && (
                                                <TooltipContent>
                                                    <p>Долгосрочный доступ</p>
                                                </TooltipContent>
                                            )}
                                        </Tooltip>
                                    </TooltipProvider>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{admin.section}</TableCell>
                                <TableCell className="text-right">
                                    {admin.role !== 'Главный администратор' && (
                                        <>
                                            <Button variant="secondary" size="sm" onClick={() => onSendPassword(admin.id, admin.name)} disabled={admin.status === 'Активен'}>
                                                <Link2 className="mr-2 h-4 w-4" />
                                                Прислать пароль
                                            </Button>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0 ml-2">
                                                        <span className="sr-only">Открыть меню</span>
                                                        <MoreHorizontal className="h-4 w-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem onClick={() => onOpenDialog(admin.id)}>
                                                        <Settings className="mr-2 h-4 w-4" />
                                                        Настроить доступ
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </>
                                    )}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};
