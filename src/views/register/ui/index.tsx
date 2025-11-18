
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
import { Input } from "@/shared/ui/input";
import Link from "next/link";
import { Logo } from "@/views/auth/ui";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { useToast } from '@/shared/hooks/use-toast';
import { Loader2, CalendarIcon } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { cn } from '@/shared/lib/utils';
import { sdk } from '@/shared/api/sdkClient';
import { httpPublic } from '@/shared/api/http';
import { format } from 'date-fns';

const registerFormSchema = z.object({
  nickname: z.string().min(3, { message: "Никнейм должен быть не менее 3 символов." }),
  email: z.string().email({ message: "Неверный формат email." }),
  password: z.string().min(8, { message: "Пароль должен быть не менее 8 символов." }),
  confirmPassword: z.string(),
  first_name: z.string().min(2, "Имя обязательно."),
  last_name: z.string().min(2, "Фамилия обязательна."),
  birth_date: z.date({ required_error: "Укажите дату рождения." }),
}).refine(data => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
});


export function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
      first_name: "",
      last_name: "",
    },
  });

  const onRegisterSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    setIsLoading(true);
    try {
      const payload = {
        ...values,
        birth_date: format(values.birth_date, 'yyyy-MM-dd'),
        avatar_url: `https://i.pravatar.cc/150?u=${values.email}` // Mock avatar
      };
      
      const response = await httpPublic.post('/api/v1/auth/register', payload);

      if (response.status === 200) {
        toast({
            title: "Аккаунт создан! Теперь войдите.",
            description: `Добро пожаловать, ${response.data.nickname}!`,
        });
        router.push(`/auth`);
      }
    } catch (error: any) {
        const errorMessage = error.response?.data?.detail || "Произошла неизвестная ошибка.";
        toast({
            variant: "destructive",
            title: "Ошибка регистрации",
            description: errorMessage,
        });
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
                    <FormField control={form.control} name="first_name" render={({ field }) => (
                        <FormItem><FormLabel>Имя</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                    )} />
                    <FormField control={form.control} name="last_name" render={({ field }) => (
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
                <FormField control={form.control} name="birth_date" render={({ field }) => (
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
