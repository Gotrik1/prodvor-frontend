
'use client';

import React, { useState } from 'react';
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/shared/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Label } from '@/shared/ui/label';
import type { UserRole } from '@/mocks/users';

const adminRoles: UserRole[] = ['Менеджер турниров', 'Модератор контента', 'Менеджер по рекламе', 'Менеджер по спорту', 'Продакт-менеджер', 'Проджект-менеджер'];

type Admin = {
    id: string;
    name: string;
    role: string;
}

export const RoleSettingsDialog = ({ admin, open, onOpenChange, onSave }: { admin: Admin, open: boolean, onOpenChange: (open: boolean) => void, onSave: (role: UserRole, duration: string) => void }) => {
    const [selectedRole, setSelectedRole] = useState<UserRole>(admin.role as UserRole);
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
                        <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
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
    );
};
