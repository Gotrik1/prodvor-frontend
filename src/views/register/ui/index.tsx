
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
import { Label } from "@/shared/ui/label";
import Link from "next/link";
import { Logo } from "@/views/auth/ui";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { useToast } from '@/shared/hooks/use-toast';
import { Loader2 } from 'lucide-react';

const registerFormSchema = z.object({
  nickname: z.string().min(3, { message: "Никнейм должен быть не менее 3 символов." }),
  email: z.string().email({ message: "Неверный формат email." }),
  password: z.string().min(8, { message: "Пароль должен быть не менее 8 символов." }),
  confirmPassword: z.string(),
  role: z.string({ required_error: "Пожалуйста, выберите роль." }),
  city: z.string().min(2, { message: "Название города обязательно." }),
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
      city: "Москва", // Default city
    },
  });

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users`, {
        nickname: values.nickname,
        email: values.email,
        // In a real app, we would hash the password on the client or, preferably, server-side.
        // For this prototype, we're sending it as is. The backend doesn't store it anyway.
        role: values.role,
        city: values.city,
      });

      if (response.status === 201) {
        toast({
          title: "Регистрация успешна!",
          description: "Теперь вы можете войти в свой аккаунт.",
        });
        router.push("/auth");
      }
    } catch (error) {
      console.error("Registration failed:", error);
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
      <Card className="w-full max-w-md mx-auto shadow-xl border-border/60 bg-card">
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
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Никнейм</FormLabel>
                    <FormControl>
                      <Input placeholder="Player1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Город</FormLabel>
                    <FormControl>
                      <Input placeholder="Например, Москва" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

               <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Основная роль</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите вашу основную роль" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="player">Игрок</SelectItem>
                          <SelectItem value="referee">Судья</SelectItem>
                          <SelectItem value="coach">Тренер</SelectItem>
                        </SelectContent>
                      </Select>
                       <FormMessage />
                    </FormItem>
                  )}
                />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="player@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Подтвердите пароль</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isLoading}>
                 {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Регистрация..." : "Зарегистрироваться"}
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
