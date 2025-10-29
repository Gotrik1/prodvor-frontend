

'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { MoreHorizontal, Send, Settings, Shield, User, KeyRound, PlusCircle, Lock, Users as UsersIcon, Link2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { useToast } from '@/shared/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { Tooltip, TooltipProvider, TooltipTrigger } from '@/shared/ui/tooltip';

const mockAdmins = [
  { id: 'user92', name: 'Макс Барских', role: 'Главный администратор', section: 'Все разделы', status: 'Активен' },
  { id: 'staff4', name: 'Александр Громов', role: 'Менеджер по рекламе', section: 'Ad-CRM', status: 'Активен' },
  { id: 'user8', name: 'Ольга Иванова', role: 'Проджект-менеджер', section: 'Документация, Справка', status: 'Активен' },
  { id: 'user15', name: 'Сергей Кузнецов', role: 'Продакт-менеджер', section: 'Аналитика, Пользователи, A/B тесты', status: 'Активен' },
  { id: 'user93', name: 'Светлана Лобода', role: 'Менеджер турниров', section: 'Турниры, Расписание', status: 'Ожидает пароль' },
  { id: 'staff2', name: 'Елена Павлова', role: 'Менеджер по спорту', section: 'Виды спорта, Дисциплины', status: 'Ожидает пароль' },
  { id: 'staff1', name: 'Игорь Вольнов', role: 'Модератор контента', section: 'Лента, Комментарии', status: 'Ожидает пароль' },
];

type AdminRole = 'Главный администратор' | 'Менеджер турниров' | 'Модератор контента' | 'Менеджер по рекламе' | 'Менеджер по спорту' | 'Продакт-менеджер' | 'Проджект-менеджер';
const adminRoles: AdminRole[] = ['Менеджер турниров', 'Модератор контента', 'Менеджер по рекламе', 'Менеджер по спорту', 'Продакт-менеджер', 'Проджект-менеджер'];
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


const RoleSettingsDialog = ({ admin, open, onOpenChange, onSave }: { admin: typeof mockAdmins[0], open: boolean, onOpenChange: (open: boolean) => void, onSave: (role: AdminRole, duration: string) => void }) => {
    const [selectedRole, setSelectedRole] = useState<AdminRole>(admin.role as AdminRole);
    const [selectedDuration, setSelectedDuration] = useState('1');

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Настроить доступ для {admin.name}</DialogTitle>
                    <DialogDescription>Измените роль и срок действия пароля для администратора.</DialogDescription>
                </DialogHeader>
                 <div className="py-4 grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="role-select">Роль</Label>
                        <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as AdminRole)}>
                            <SelectTrigger id="role-select"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {adminRoles.map(role => (
                                    <SelectItem key={role} value={role}>{role}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                     </div>
                      <div className="space-y-2">
                        <Label htmlFor="duration-select">Срок действия пароля</Label>
                        <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                            <SelectTrigger id="duration-select"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1">1 день</SelectItem>
                                <SelectItem value="7">7 дней</SelectItem>
                                <SelectItem value="30">30 дней</SelectItem>
                            </SelectContent>
                        </Select>
                     </div>
                 </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Отмена</Button>
                    <Button onClick={() => { onSave(selectedRole, selectedDuration); onOpenChange(false); }}>Сохранить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const AddAdminDialog = ({ onAddAdmin }: { onAddAdmin: (name: string, role: AdminRole) => void }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState<AdminRole | ''>('');
    const [open, setOpen] = useState(false);

    const handleAdd = () => {
        if (name && role) {
            onAddAdmin(name, role);
            setName('');
            setRole('');
            setOpen(false);
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                 <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Добавить администратора
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Новый администратор</DialogTitle>
                    <DialogDescription>Введите данные нового администратора. Он будет добавлен в список со статусом "Ожидает пароль".</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Имя</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя Фамилия" className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Роль</Label>
                        <Select value={role} onValueChange={(value) => setRole(value as AdminRole)}>
                            <SelectTrigger className="col-span-3"><SelectValue placeholder="Выберите роль..." /></SelectTrigger>
                            <SelectContent>
                                {adminRoles.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setOpen(false)}>Отмена</Button>
                    <Button onClick={handleAdd}>Добавить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


const AdminTable = ({ admins, onSendPassword, onOpenDialog }: { admins: typeof mockAdmins, onSendPassword: (id: string, name: string) => void, onOpenDialog: (id: string) => void }) => {
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


export function AccessControlPage() {
    const [admins, setAdmins] = useState(mockAdmins);
    const { toast } = useToast();
    const [dialogState, setDialogState] = useState<Record<string, boolean>>({});

    const activeAdmins = admins.filter(a => a.status === 'Активен');
    const pendingAdmins = admins.filter(a => a.status === 'Ожидает пароль');

    const handleSendPassword = (adminId: string, adminName: string) => {
        setAdmins(prev => prev.map(admin => admin.id === adminId ? { ...admin, status: 'Активен' } : admin));
        toast({
            title: 'Пароль отправлен',
            description: `Новый пароль для администратора ${adminName} был успешно сгенерирован и отправлен.`,
        });
    };

    const handleSendAll = () => {
         setAdmins(prev => prev.map(admin => admin.role !== 'Главный администратор' ? { ...admin, status: 'Активен' } : admin));
         toast({
            title: 'Пароли отправлены',
            description: 'Новые пароли были разосланы всем администраторам, ожидающим доступ.',
        });
    };
    
     const handleAddAdmin = (name: string, role: AdminRole) => {
        const newAdmin = {
            id: `new-admin-${Date.now()}`,
            name,
            role,
            section: 'Определяется ролью',
            status: 'Ожидает пароль'
        };
        setAdmins(prev => [...prev, newAdmin]);
        toast({
            title: 'Администратор добавлен',
            description: `${name} был добавлен в список. Теперь вы можете отправить ему пароль.`,
        });
    };

    const handleOpenDialog = (adminId: string) => {
        setDialogState(prev => ({ ...prev, [adminId]: true }));
    }

    const handleCloseDialog = (adminId: string) => {
        setDialogState(prev => ({ ...prev, [adminId]: false }));
    }

    const handleSaveRole = (adminId: string, newRole: AdminRole, duration: string) => {
        setAdmins(prev => prev.map(admin => admin.id === adminId ? { ...admin, role: newRole } : admin));
        toast({
            title: 'Настройки доступа обновлены',
            description: `Для администратора установлена роль "${newRole}" со сроком доступа ${duration} д.`,
        });
    }

  return (
    <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
             <div>
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3"><KeyRound />Управление доступом</h1>
                <p className="text-muted-foreground mt-1">Управление администраторами и их правами доступа к панели.</p>
            </div>
             <div className="flex gap-2 w-full md:w-auto">
                <AddAdminDialog onAddAdmin={handleAddAdmin} />
                <Button variant="secondary" onClick={handleSendAll} className="w-full">
                    <Send className="mr-2 h-4 w-4" />
                    Прислать пароли всем
                </Button>
            </div>
        </div>

        <Card>
            <CardHeader>
                <CardTitle>Активные администраторы</CardTitle>
                <CardDescription>Пользователи, имеющие доступ к панели в данный момент.</CardDescription>
            </CardHeader>
            <CardContent>
                <AdminTable admins={activeAdmins} onSendPassword={handleSendPassword} onOpenDialog={handleOpenDialog} />
            </CardContent>
        </Card>

        {pendingAdmins.length > 0 && (
             <Card>
                <CardHeader>
                    <CardTitle>Ожидающие доступа</CardTitle>
                    <CardDescription>Этим администраторам необходимо отправить пароль для входа.</CardDescription>
                </CardHeader>
                <CardContent>
                    <AdminTable admins={pendingAdmins} onSendPassword={handleSendPassword} onOpenDialog={handleOpenDialog} />
                </CardContent>
            </Card>
        )}

        {Object.keys(dialogState).map(adminId => {
            const admin = admins.find(a => a.id === adminId);
            if (!admin) return null;
            return (
                <RoleSettingsDialog
                    key={adminId}
                    admin={admin}
                    open={!!dialogState[adminId]}
                    onOpenChange={(open) => open ? handleOpenDialog(adminId) : handleCloseDialog(adminId)}
                    onSave={(newRole, duration) => handleSaveRole(adminId, newRole, duration)}
                />
            )
        })}
    </div>
  );
}
    
