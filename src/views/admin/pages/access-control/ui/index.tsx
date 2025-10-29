

'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { MoreHorizontal, Send, Settings, Shield, User, Users, KeyRound } from "lucide-react";
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

const mockAdmins = [
  { id: 'user92', name: 'Макс Барских', role: 'Главный администратор', section: 'Все разделы', status: 'Активен' },
  { id: 'user93', name: 'Светлана Лобода', role: 'Менеджер турниров', section: 'Турниры, Расписание', status: 'Активен' },
  { id: 'staff2', name: 'Елена Павлова', role: 'Менеджер по спорту', section: 'Виды спорта, Дисциплины', status: 'Ожидает пароль' },
  { id: 'staff1', name: 'Игорь Вольнов', role: 'Модератор контента', section: 'Лента, Комментарии', status: 'Ожидает пароль' },
  { id: 'staff4', name: 'Александр Громов', role: 'Менеджер по рекламе', section: 'Ad-CRM', status: 'Активен' },
];

type AdminRole = 'Главный администратор' | 'Менеджер турниров' | 'Модератор контента' | 'Менеджер по рекламе' | 'Менеджер по спорту';
const adminRoles: AdminRole[] = ['Главный администратор', 'Менеджер турниров', 'Модератор контента', 'Менеджер по рекламе', 'Менеджер по спорту'];

const statusColors: Record<string, string> = {
  Активен: 'bg-green-500/20 text-green-300 border-green-500/30',
  'Ожидает пароль': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
};

const RoleSettingsDialog = ({ admin, open, onOpenChange, onSave }: { admin: typeof mockAdmins[0], open: boolean, onOpenChange: (open: boolean) => void, onSave: (role: AdminRole) => void }) => {
    const [selectedRole, setSelectedRole] = useState<AdminRole>(admin.role as AdminRole);

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Настроить доступ для {admin.name}</DialogTitle>
                    <DialogDescription>Измените роль, чтобы предоставить доступ к соответствующему разделу админ-панели.</DialogDescription>
                </DialogHeader>
                 <div className="py-4">
                     <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as AdminRole)}>
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                            {adminRoles.map(role => (
                                <SelectItem key={role} value={role}>{role}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                 </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Отмена</Button>
                    <Button onClick={() => { onSave(selectedRole); onOpenChange(false); }}>Сохранить</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export function AccessControlPage() {
    const [admins, setAdmins] = useState(mockAdmins);
    const { toast } = useToast();
    const [dialogState, setDialogState] = useState<Record<string, boolean>>({});

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
            description: 'Новые пароли были разосланы всем администраторам.',
        });
    };

    const handleOpenDialog = (adminId: string) => {
        setDialogState(prev => ({ ...prev, [adminId]: true }));
    }

    const handleCloseDialog = (adminId: string) => {
        setDialogState(prev => ({ ...prev, [adminId]: false }));
    }

    const handleSaveRole = (adminId: string, newRole: AdminRole) => {
        setAdmins(prev => prev.map(admin => admin.id === adminId ? { ...admin, role: newRole } : admin));
        toast({
            title: 'Роль обновлена',
            description: `Роль для администратора была успешно изменена.`,
        });
    }

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-3xl font-bold font-headline flex items-center gap-3"><KeyRound />Управление доступом</h1>
            <p className="text-muted-foreground mt-1">Управление администраторами и их правами доступа к панели.</p>
        </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Список администраторов</CardTitle>
                <CardDescription>Отправляйте пароли и настраивайте роли для персонала.</CardDescription>
            </div>
             <Button onClick={handleSendAll}>
                <Send className="mr-2 h-4 w-4" />
                Прислать пароли всем
            </Button>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Администратор</TableHead>
                  <TableHead>Роль</TableHead>
                  <TableHead>Раздел</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins.map((admin) => (
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
                        <div className="flex items-center gap-2">
                             {admin.role === 'Главный администратор' && <Shield className="h-4 w-4 text-primary"/>}
                             {admin.role !== 'Главный администратор' && <User className="h-4 w-4 text-muted-foreground"/>}
                             {admin.role}
                        </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{admin.section}</TableCell>
                    <TableCell>
                        <Badge className={statusColors[admin.status]}>{admin.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                        {admin.role !== 'Главный администратор' && (
                             <>
                                <Button variant="secondary" size="sm" onClick={() => handleSendPassword(admin.id, admin.name)}>
                                    <Send className="mr-2 h-4 w-4" />
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
                                        <DropdownMenuItem onClick={() => handleOpenDialog(admin.id)}>
                                            <Settings className="mr-2 h-4 w-4" />
                                            Настроить доступ
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                                <RoleSettingsDialog 
                                    admin={admin}
                                    open={!!dialogState[admin.id]} 
                                    onOpenChange={(open) => open ? handleOpenDialog(admin.id) : handleCloseDialog(admin.id)}
                                    onSave={(newRole) => handleSaveRole(admin.id, newRole)}
                                />
                             </>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
