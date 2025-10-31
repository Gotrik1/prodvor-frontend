
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Loader2, CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { cn } from '@/shared/lib/utils';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { useToast } from '@/shared/hooks/use-toast';
import { Logo } from '@/views/auth/ui';
import type { User } from '@/mocks';

const profileFormSchema = z.object({
    firstName: z.string().min(2, "Имя обязательно."),
    lastName: z.string().min(2, "Фамилия обязательна."),
    city: z.string().min(2, "Город обязателен."),
    role: z.string({ required_error: "Пожалуйста, выберите роль." }),
    birthDate: z.date({ required_error: "Укажите дату рождения." }),
});

export default function CompleteProfilePage() {
    const { user: currentUser, setUser } = useUserStore();
    const router = useRouter();
    const { toast } = useToast();

    const form = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: currentUser?.firstName || '',
            lastName: currentUser?.lastName || '',
            city: currentUser?.city === 'Не указан' ? '' : currentUser?.city || '',
            role: currentUser?.role || undefined,
            birthDate: currentUser?.age ? new Date(new Date().setFullYear(new Date().getFullYear() - currentUser.age)) : undefined,
        },
    });

    const onSubmit = async (data: z.infer<typeof profileFormSchema>) => {
        if (!currentUser) return;
        
        const updatedUser: User = {
            ...currentUser,
            ...data,
            age: new Date().getFullYear() - data.birthDate.getFullYear(),
        };
        
        // In a real app, this would be a PUT/PATCH request to update the user
        console.log("Updating user:", currentUser.id, "with data:", updatedUser);
        setUser(updatedUser);

        toast({
            title: "Профиль настроен!",
            description: "Добро пожаловать на платформу ProDvor.",
        });

        router.push('/dashboard');
    }

    if (!currentUser) {
        // This can happen on a direct navigation or refresh.
        // Redirect to login if there's no user to complete the profile for.
        if (typeof window !== 'undefined') {
            router.push('/auth');
        }
        return null;
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-background p-4">
            <Card className="w-full max-w-md mx-auto">
                <CardHeader className="text-center">
                    <div className="flex justify-center mb-4">
                        <Logo />
                    </div>
                    <CardTitle>Завершение регистрации</CardTitle>
                    <CardDescription>
                        Расскажите немного о себе, чтобы мы могли персонализировать ваш опыт.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                             <div className="grid grid-cols-2 gap-4">
                                <FormField control={form.control} name="firstName" render={({ field }) => (
                                    <FormItem><FormLabel>Имя</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                                <FormField control={form.control} name="lastName" render={({ field }) => (
                                    <FormItem><FormLabel>Фамилия</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                                )} />
                            </div>
                            <FormField control={form.control} name="city" render={({ field }) => (
                                <FormItem><FormLabel>Город</FormLabel><FormControl><Input placeholder="Например, Москва" {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={form.control} name="role" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Основная роль</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl><SelectTrigger><SelectValue placeholder="Выберите вашу основную роль" /></SelectTrigger></FormControl>
                                        <SelectContent>
                                            <SelectItem value="Игрок">Игрок</SelectItem>
                                            <SelectItem value="Судья">Судья</SelectItem>
                                            <SelectItem value="Тренер">Тренер</SelectItem>
                                            <SelectItem value="Болельщик">Болельщик</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="birthDate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Дата рождения</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <FormControl>
                                                <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {field.value ? field.value.toLocaleDateString() : <span>Выберите дату</span>}
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /></PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )} />
                             <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Завершить регистрацию
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
