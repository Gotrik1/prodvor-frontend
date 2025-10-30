
'use client';

import React, { useState } from 'react';
import { Button } from "@/shared/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { Label } from '@/shared/ui/label';
import { PlusCircle } from "lucide-react";
import type { UserRole } from '@/mocks/users';

const adminRoles: UserRole[] = ['Менеджер' as any, 'Модератор' as any, 'Менеджер' as any, 'Менеджер' as any, 'Продакт-менеджер' as any, 'Проджект-менеджер' as any];

export const AddAdminDialog = ({ onAddAdmin }: { onAddAdmin: (name: string, role: UserRole) => void }) => {
    const [name, setName] = useState('');
    const [role, setRole] = useState<UserRole | ''>('');
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
                    <DialogDescription>Введите данные нового администратора. Он будет добавлен в список со статусом &quot;Ожидает пароль&quot;.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Имя</Label>
                        <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя Фамилия" className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="role" className="text-right">Роль</Label>
                        <Select value={role} onValueChange={(value) => setRole(value as UserRole)}>
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
