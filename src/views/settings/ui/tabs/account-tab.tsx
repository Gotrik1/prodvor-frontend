
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
import { Save } from 'lucide-react';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { useToast } from '@/shared/hooks/use-toast';

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

export function AccountTab() {
    const { toast } = useToast();
    const { user: currentUser } = useUserStore();
    
    const accountForm = useForm<z.infer<typeof accountFormSchema>>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            email: currentUser?.email || '',
        }
    });

     function onAccountSubmit(_values: z.infer<typeof accountFormSchema>) {
        toast({ title: "Настройки аккаунта обновлены", description: "Ваши данные успешно сохранены." });
    }

    return (
        <Form {...accountForm}>
            <form onSubmit={accountForm.handleSubmit(onAccountSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Настройки аккаунта</CardTitle>
                        <CardDescription>Управление параметрами входа и безопасности.</CardDescription>
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
    );
}
