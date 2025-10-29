

'use client';

import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Send, KeyRound, PlusCircle } from "lucide-react";
import { useToast } from '@/shared/hooks/use-toast';
import type { UserRole } from '@/mocks/users';
import { AddAdminDialog } from './AddAdminDialog';
import { RoleSettingsDialog } from './RoleSettingsDialog';
import { AdminTable } from './AdminTable';

const mockAdmins = [
  { id: 'user92', name: 'Макс Барских', role: 'Главный администратор', section: 'Все разделы', status: 'Активен' },
  { id: 'user93', name: 'Светлана Лобода', role: 'Проджект-менеджер', section: 'Документация, Справка', status: 'Активен' },
  { id: 'user15', name: 'Сергей Кузнецов', role: 'Продакт-менеджер', section: 'Аналитика, Пользователи, A/B тесты', status: 'Активен' },
  { id: 'staff4', name: 'Александр Громов', role: 'Менеджер по рекламе', section: 'Ad-CRM', status: 'Активен' },
  { id: 'user8', name: 'Ольга Иванова', role: 'Менеджер турниров', section: 'Турниры, Расписание', status: 'Активен' },
  { id: 'staff2', name: 'Елена Павлова', role: 'Менеджер по спорту', section: 'Виды спорта, Дисциплины', status: 'Ожидает пароль' },
  { id: 'staff1', name: 'Игорь Вольнов', role: 'Модератор контента', section: 'Лента, Комментарии', status: 'Ожидает пароль' },
];

export function AccessControlPage() {
    const [admins, setAdmins] = useState(mockAdmins);
    const { toast } = useToast();
    const [dialogState, setDialogState] = useState<Record<string, boolean>>({});

    const activeAdmins = useMemo(() => admins.filter(a => a.status === 'Активен'), [admins]);
    const pendingAdmins = useMemo(() => admins.filter(a => a.status === 'Ожидает пароль'), [admins]);

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
    
     const handleAddAdmin = (name: string, role: UserRole) => {
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

    const handleSaveRole = (adminId: string, newRole: UserRole, duration: string) => {
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
    
