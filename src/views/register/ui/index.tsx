
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import Link from "next/link";
import { Logo } from "@/views/auth/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { useToast } from '@/shared/hooks/use-toast';
import { Loader2, CalendarIcon } from 'lucide-react';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import type { User } from '@/mocks';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { cn } from '@/shared/lib/utils';
import api from '@/shared/api/axios-instance';

const registerFormSchema = z.object({
  nickname: z.string().min(3, { message: "Никнейм должен быть не менее 3 символов." }),
  email: z.string().email({ message: "Неверный формат email." }),
  password: z.string().min(8, { message: "Пароль должен быть не менее 8 символов." }),
  confirmPassword: z.string(),
  firstName: z.string().min(2, "Имя обязательно."),
  lastName: z.string().min(2, "Фамилия обязательна."),
  city: z.string().min(2, "Город обязателен."),
  role: z.string({ required_error: "Пожалуйста, выберите роль." }),
  birthDate: z.date({ required_error: "Укажите дату рождения." }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
});


export function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const { setUser } = useUserStore();

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      city: "",
    },
  });

  const onRegisterSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    setIsLoading(true);
    try {
      const response = await api.post(`/api/v1/auth/register`, {
        nickname: values.nickname,
        email: values.email,
        password: values.password,
        role: values.role,
        city: values.city,
        firstName: values.firstName,
        lastName: values.lastName,
        age: new Date().getFullYear() - values.birthDate.getFullYear(),
      });

      if (response.status === 201) {
        setUser(response.data as User);
        toast({
            title: "Аккаунт создан!",
            description: `Добро пожаловать, ${response.data.nickname}!`,
        });
        router.push(`/users/${response.data.id}`);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
            toast({
                variant: "destructive",
                title: "Ошибка регистрации",
                description: error.response.data?.error || "Произошла неизвестная ошибка.",
            });
        } else {
            toast({
                variant: "destructive",
                title: "Ошибка регистрации",
                description: "Не удалось подключиться к серверу.",
            });
        }
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-lg mx-auto shadow-xl border-border/60 bg-card">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <Logo />
          </div>
          <CardTitle className="text-2xl font-bold">Создание аккаунта</CardTitle>
          <CardDescription>
            Уже есть аккаунт?{" "}
            <Link href="/auth" className="text-primary hover:underline">
              Войти
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="firstName" render={({ field }) => (
                        <FormItem><FormLabel>Имя</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="lastName" render={({ field }) => (
                        <FormItem><FormLabel>Фамилия</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                <FormField control={form.control} name="nickname" render={({ field }) => (
                    <FormItem><FormLabel>Никнейм</FormLabel><FormControl><Input placeholder="Player1" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                    <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" placeholder="player@example.com" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="password" render={({ field }) => (
                        <FormItem><FormLabel>Пароль</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                        <FormItem><FormLabel>Подтвердите пароль</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                </div>
                 <div className="grid grid-cols-2 gap-4">
                    <FormField control={form.control} name="city" render={({ field }) => (
                        <FormItem><FormLabel>Город</FormLabel><FormControl><Input placeholder="Например, Москва" {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                     <FormField control={form.control} name="role" render={({ field }) => (
                        <FormItem>
                            <FormLabel>Основная роль</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl><SelectTrigger><SelectValue placeholder="Выберите роль" /></SelectTrigger></FormControl>
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
                </div>
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Регистрация..." : "Создать аккаунт"}
              </Button>
            </form>
          </Form>
          <Button variant="outline" className="w-full mt-4" asChild>
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

    