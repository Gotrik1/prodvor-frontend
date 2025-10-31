
'use client';

import React, { useState } from 'react';
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
import { Loader2, CalendarIcon } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/dialog';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { cn } from '@/shared/lib/utils';
import type { User } from '@/mocks';

const registerFormSchema = z.object({
  nickname: z.string().min(3, { message: "Никнейм должен быть не менее 3 символов." }),
  email: z.string().email({ message: "Неверный формат email." }),
  password: z.string().min(8, { message: "Пароль должен быть не менее 8 символов." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
});

const profileFormSchema = z.object({
    firstName: z.string().min(2, "Имя обязательно."),
    lastName: z.string().min(2, "Фамилия обязательна."),
    city: z.string().min(2, "Город обязателен."),
    role: z.string({ required_error: "Пожалуйста, выберите роль." }),
    birthDate: z.date({ required_error: "Укажите дату рождения." }),
});

function ProfileSetupDialog({ open, onOpenChange, onSave }: { open: boolean, onOpenChange: (open: boolean) => void, onSave: (data: any) => Promise<void> }) {
    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            city: 'Москва',
        },
    });

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Завершение регистрации</DialogTitle>
                    <DialogDescription>
                        Расскажите немного о себе, чтобы мы могли персонализировать ваш опыт.
                    </DialogDescription>
                </DialogHeader>
                <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(onSave)} className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={profileForm.control} name="firstName" render={({ field }) => (
                                <FormItem><FormLabel>Имя</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={profileForm.control} name="lastName" render={({ field }) => (
                                <FormItem><FormLabel>Фамилия</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <FormField control={profileForm.control} name="city" render={({ field }) => (
                            <FormItem><FormLabel>Город</FormLabel><FormControl><Input placeholder="Например, Москва" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={profileForm.control} name="role" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Основная роль</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Выберите вашу основную роль" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Игрок">Игрок</SelectItem>
                                        <SelectItem value="Судья">Судья</SelectItem>
                                        <SelectItem value="Тренер">Тренер</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={profileForm.control} name="birthDate" render={({ field }) => (
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
                        <DialogFooter>
                            <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                                {profileForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Завершить регистрацию
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}

export function RegisterPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [createdUser, setCreatedUser] = useState<User | null>(null);

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onRegisterSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/users`, {
        nickname: values.nickname,
        email: values.email,
        password: values.password, // In a real app, this should be handled securely
        role: "Игрок", // Default role, user will confirm in next step
        city: "Не указан", // Default city
      });

      if (response.status === 201) {
        setCreatedUser(response.data);
        setShowProfileDialog(true);
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

  const onProfileSave = async (profileData: any) => {
    if (!createdUser) return;
    
    // In a real app, this would be a PUT/PATCH request to update the user
    console.log("Updating user:", createdUser.id, "with data:", profileData);
    
    toast({
        title: "Профиль обновлен!",
        description: "Ваш аккаунт полностью готов. Теперь вы можете войти.",
    });
    
    setShowProfileDialog(false);
    router.push("/auth");
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
            <form onSubmit={form.handleSubmit(onRegisterSubmit)} className="space-y-4">
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
                {isLoading ? "Регистрация..." : "Продолжить"}
              </Button>
            </form>
          </Form>
          <Button variant="outline" className="w-full mt-4" asChild>
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </CardContent>
      </Card>
      
      <ProfileSetupDialog 
        open={showProfileDialog}
        onOpenChange={setShowProfileDialog}
        onSave={onProfileSave}
      />
    </div>
  );
}
