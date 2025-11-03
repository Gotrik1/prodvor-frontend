

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Save, Laptop, Smartphone, AlertTriangle, LogOut } from 'lucide-react';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { useToast } from '@/shared/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import React, { useState } from 'react';

const accountFormSchema = z.object({
  email: z.string().email('Неверный формат email.'),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, 'Новый пароль должен быть не менее 8 символов.').optional(),
  confirmPassword: z.string().optional(),
}).refine(data => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    return true;
}, {
    message: "Введите текущий пароль для смены.",
    path: ["currentPassword"],
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
});


// MOCK DATA for sessions
const mockSessions = [
    { id: 1, isCurrent: true, userAgent: 'Chrome on Windows', ipAddress: '95.123.45.67', lastActiveAt: new Date().toISOString() },
    { id: 2, isCurrent: false, userAgent: 'Safari on iPhone', ipAddress: '212.55.78.90', lastActiveAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString() },
];

function ActiveSessions() {
    const [sessions, setSessions] = useState(mockSessions);
    const { toast } = useToast();

    const handleTerminate = (sessionId: number) => {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        toast({ title: "Сессия завершена", description: "Доступ с этого устройства был прекращен." });
    };

    const handleTerminateAll = () => {
        setSessions(prev => prev.filter(s => s.isCurrent));
        toast({ title: "Все сессии завершены", description: "Все сессии, кроме текущей, были завершены." });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Активные сессии</CardTitle>
                <CardDescription>Здесь показаны все устройства, на которых выполнен вход в ваш аккаунт.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {sessions.map(session => {
                    const isDesktop = session.userAgent.toLowerCase().includes('windows') || session.userAgent.toLowerCase().includes('mac');
                    return (
                        <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border">
                            <div className="flex items-center gap-3">
                                {isDesktop ? <Laptop className="h-6 w-6 text-muted-foreground" /> : <Smartphone className="h-6 w-6 text-muted-foreground" />}
                                <div>
                                    <p className="font-semibold">{session.userAgent}</p>
                                    <p className="text-xs text-muted-foreground">
                                        IP: {session.ipAddress}
                                        {session.isCurrent && <span className="text-green-400 font-bold ml-2">(Текущая)</span>}
                                    </p>
                                </div>
                            </div>
                            {!session.isCurrent && (
                                 <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">Завершить</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Завершить сессию?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            Вы уверены, что хотите завершить эту сессию? Потребуется повторный вход на устройстве {session.userAgent}.
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <AlertDialogFooter>
                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleTerminate(session.id)} className="bg-destructive hover:bg-destructive/90">
                                            Да, завершить
                                        </AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            )}
                        </div>
                    )
                })}
            </CardContent>
            <CardFooter>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                       <Button variant="destructive">
                            <LogOut className="mr-2 h-4 w-4"/>
                            Завершить все другие сессии
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Завершить все другие сессии?</AlertDialogTitle>
                        <AlertDialogDescription>
                           Это действие завершит все сеансы на всех устройствах, кроме текущего. Вам придется заново войти в систему на них.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction onClick={handleTerminateAll} className="bg-destructive hover:bg-destructive/90">
                            Да, завершить все
                        </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
        </Card>
    );
}

export function AccountTab() {
    const { toast } = useToast();
    const { user: currentUser } = useUserStore();
    
    const accountForm = useForm<z.infer<typeof accountFormSchema>>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            email: currentUser?.email || '',
        }
    });

     function onAccountSubmit() {
        toast({ title: "Настройки аккаунта обновлены", description: "Ваши данные успешно сохранены." });
    }

    return (
        <div className="space-y-6">
            <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Настройки входа</CardTitle>
                            <CardDescription>Управление email и паролем для входа в аккаунт.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <FormField control={accountForm.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <CardTitle className="text-lg pt-4 border-t">Смена пароля</CardTitle>
                             <FormField control={accountForm.control} name="currentPassword" render={({ field }) => (
                                <FormItem><FormLabel>Текущий пароль</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={accountForm.control} name="newPassword" render={({ field }) => (
                                <FormItem><FormLabel>Новый пароль</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={accountForm.control} name="confirmPassword" render={({ field }) => (
                                <FormItem><FormLabel>Подтвердите новый пароль</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button type="submit"><Save className="mr-2 h-4 w-4" />Сохранить</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>

            <ActiveSessions />
             <Card className="border-destructive/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-destructive"><AlertTriangle />Удаление аккаунта</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">Это действие необратимо. Все ваши данные, включая профиль, команды, статистику и достижения, будут безвозвратно удалены.</p>
                     <Button variant="destructive">Удалить мой аккаунт</Button>
                </CardContent>
             </Card>
        </div>
    );
}
