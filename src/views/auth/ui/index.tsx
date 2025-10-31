

'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import Image from 'next/image';
import { cn } from '@/shared/lib/utils';
import Link from 'next/link';
import { i18n } from '@/shared/lib/i18n';
import { useToast } from '@/shared/hooks/use-toast';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Loader2 } from 'lucide-react';
import type { User } from '@/mocks';

// ------------------ Схемы валидации ------------------
const loginFormSchema = z.object({
  email: z.string().email({ message: "Неверный формат email." }),
  password: z.string().min(1, { message: "Пароль не может быть пустым." }),
});

// ------------------ Логотип ------------------
export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
        <Image src="https://placehold.co/32x32.png" alt="ProDvor Logo" width={32} height={32} className="rounded-md" data-ai-hint="logo" />
    </Link>
  );
}

// ------------------ Иконки соцсетей ------------------
export function YandexIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle cx="12" cy="12" r="12" fill="#FC3F1D" />
            <path
                d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z"
                fill="#fff"
            />
        </svg>
    );
}

export function VkIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <rect width="100" height="100" rx="20" fill="#0077FF"/>
            <path
                d="M53.71 72.04C30.92 72.04 17.92 56.42 17.38 30.42h11.42c0.38 19.08 8.8 27.17 15.47 28.83V30.42h10.75v16.46c6.58-0.71 13.5-8.21 15.83-16.46h10.75c-1.79 10.17-9.29 17.67-14.62 20.75 5.33 2.5 13.87 9.04 17.12 20.87H72.25c-2.54-7.92-8.87-14.05-17.25-14.88v14.87h-1.31z"
                fill="white"
            />
        </svg>
    );
}

export function TelegramIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 240 240"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <circle fill="#2AABEE" cx="120" cy="120" r="120" />
            <path
                fill="#FFFFFF"
                d="M54.3,118.8c35-15.2,58.3-25.3,70-30.2c33.3-13.9,40.3-16.3,44.8-16.4
        c1,0,3.2,0.2,4.7,1.4c1.2,1,1.5,2.3,1.7,3.3s0.4,3.1,0.2,4.7c-1.8,19-9.6,65.1-13.6,86.3
        c-1.7,9-5,12-8.2,12.3c-7,0.6-12.3-4.6-19-9c-10.6-6.9-16.5-11.2-26.8-18
        c-11.9-7.8-4.2-12.1,2.6-19.1c1.8-1.8,32.5-29.8,33.1-32.3
        c0.1-0.3,0.1-1.5-0.6-2.1c-0.7-0.6-1.7-0.4-2.5-0.2
        c-1.1,0.2-17.9,11.4-50.6,33.5c-4.8,3.3-9.1,4.9-13,4.8
        c-4.3-0.1-12.5-2.4-18.7-4.4c-7.5-2.4-13.5-3.7-13-7.9
        C45.7,123.3,48.7,121.1,54.3,118.8z"
            />
        </svg>
    );
}

export function GosuslugiIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 220 35"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMidYMid meet"
            {...props}
        >
            <path fill="#EE3F58" d="M143.6.8h-18c-.2 0-.3.1-.3.3-.5 8.1-2 16.9-4.2 24v.3c.1.1.2.1.3.1h6.2c.1 0 .3-.1.3-.2 1.7-5.5 3.1-12.7 3.6-18.8h5.9v18.7c0 .2.1.3.3.3h5.9c.2 0 .3-.1.3-.3v-24c0-.2-.1-.4-.3-.4M219.7.8h-5.9c-.2 0-.3.1-.3.3v18.6c-1.3.4-2.6.5-4 .5-3.9 0-4.8-1.2-4.8-6.4V1.2c0-.2-.1-.3-.3-.3h-5.9c-.2 0-.3.1-.3.3v13.4c0 8.4 2.8 11.7 10.1 11.7 4.1 0 8.8-1.1 11.5-2.1.1 0 .2-.2.2-.3V1.2c0-.2-.1-.4-.3-.4M95.2.9h-6c-.2 0-.3.1-.3.2-.9 3.7-2.8 9.9-5.4 16.4L77.5 1c0-.1-.2-.2-.3-.2h-6c-.1 0-.2.1-.3.1-.1.1-.1.2 0 .3l9 24.6c-.9 1.9-1.8 3.4-2.6 5-.6 1.1-1.2 2.2-1.8 3.4-.1.1 0 .2 0 .3.1.1.2.2.3.2h6.5c.1 0 .2-.1.3-.2 1.1-2.1 2.5-5.1 3.8-8.1 3.8-9 6.9-17.4 9.2-25.1 0-.1 0-.2-.1-.3-.1-.1-.2-.1-.3-.1M116.6 19.8c0-.1-.1-.2-.2-.2h-.3c-1.4.5-4.1 1-6 1-4.1 0-6-1.1-6-7.4 0-5 .6-7.4 6-7.4 1.5 0 3 .2 4.8.8.2 0 .3 0 .4-.2.7-1.3 1.5-2.8 2.4-4.8v-.3c0-.1-.1-.2-.2-.2-2.4-.8-5.3-1.2-7.8-1.2-8.6 0-12.4 4-12.4 13.1 0 9.2 3.8 13.3 12.4 13.3 2.1 0 6.4-.5 8.4-1.3.2-.1.2-.2.2-.4l-1.7-4.8zM172.5.9h-6c-.1 0-.3.1-.3.2-.9 3.7-2.8 9.9-5.4 16.4l-6-16.5c0-.1-.2-.2-.3-.2h-6c-.1 0-.2.1-.3.1-.1.1-.1.2 0 .3l9 24.6c-.9 1.9-1.8 3.4-2.6 5-.6 1.1-1.2 2.2-1.8 3.4-.1.1 0 .2 0 .3.1.1.2.2.3.2h6.5c.1 0 .2-.1.3-.2 1.1-2.1 2.5-5.1 3.8-8.1 3.8-9 6.9-17.4 9.1-25.1 0-.1 0-.2-.1-.3 0-.1-.1-.1-.2-.1M194.5.8h-17.4c-.2 0-.3.1-.3.3v24.1c0 .2.1.3.3.3h5.9c.2 0 .3-.1.3-.3V6.6h9.1c.1 0 .3-.1.3-.2.7-1.6 1.4-3.4 2.1-5.1V1c-.1-.1-.2-.2-.3-.2"/>
            <path fill="#0065B1" d="M31.3 20.8c-3.9 0-5.1-1.1-5.1-7.6 0-7 1.3-7.6 5.1-7.6s5.2.6 5.2 7.6c0 6.6-1.3 7.6-5.2 7.6m0-20.7c-8.5 0-11.8 3.6-11.8 13 0 9.5 3.3 13.2 11.8 13.2s11.9-3.7 11.9-13.2c0-9.3-3.4-13-11.9-13M66.6 19.8c0-.1-.1-.2-.2-.2h-.3c-1.4.5-4.1 1-6 1-4.1 0-6-1.1-6-7.4 0-5 .6-7.4 6-7.4 1.5 0 3 .2 4.8.8.1 0 .3 0 .4-.2.7-1.3 1.5-2.8 2.4-4.8v-.3c0-.1-.1-.2-.2-.2C65.2.4 62.3 0 59.8 0c-8.6 0-12.4 4-12.4 13.1 0 9.2 3.8 13.3 12.4 13.3 2.1 0 6.4-.5 8.4-1.3.2-.1.2-.2.2-.4l-1.8-4.9zM17.7.8H.3C.1.8 0 1 0 1.2v24.1c0 .2.1.3.3.3h5.9c.2 0 .3-.1.3-.3V6.6h9.1c.1 0 .2-.1.3-.2.7-1.6 1.4-3.4 2.1-5.1V1c-.1-.1-.2-.2-.3-.2"/>
        </svg>
    );
}

const SocialButton = ({ className, children }: { className?: string, children: React.ReactNode }) => (
    <button className={cn(
        "inline-flex items-center justify-center rounded-md border border-input bg-background transition-colors h-14 p-0 hover:bg-accent hover:text-accent-foreground",
        className
    )}>
        {children}
    </button>
)

export function AuthPage() {
  const { toast } = useToast();
  const { setUser, signOut } = useUserStore();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  useEffect(() => {
    // Clear any previous user simulation when visiting the auth page
    signOut();
  }, [signOut]);

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true);
    try {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/login`, values);
        if (response.status === 200 && response.data) {
            setUser(response.data as User);
            toast({
                title: "Вход выполнен!",
                description: `Добро пожаловать, ${response.data.nickname}!`,
            });
            router.push(`/users/${response.data.id}`);
        }
    } catch (error) {
        console.error("Login failed:", error);
        toast({
            variant: "destructive",
            title: "Ошибка входа",
            description: "Неверный email или пароль. Попробуйте снова.",
        });
    } finally {
        setIsLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm mx-auto shadow-xl border-border/60 bg-card">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Logo />
            </div>
            <CardTitle className="text-2xl font-bold">{i18n.auth.title}</CardTitle>
            <CardDescription>
                {i18n.auth.description}
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="email">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phone">{i18n.auth.phoneTab}</TabsTrigger>
                    <TabsTrigger value="email">{i18n.auth.emailTab}</TabsTrigger>
                </TabsList>
                <TabsContent value="phone" className="pt-4">
                     <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">{i18n.auth.phoneLabel}</Label>
                            <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                        </div>
                        <Button type="submit" className="w-full" disabled>
                            Продолжить
                        </Button>
                    </div>
                </TabsContent>
                <TabsContent value="email" className="pt-4">
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">{i18n.auth.emailLabel}</Label>
                            <Input id="email" type="email" placeholder="Введите email" required {...form.register("email")} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">{i18n.auth.passwordLabel}</Label>
                            <Input id="password" type="password" required {...form.register("password")} placeholder="Введите пароль"/>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">{i18n.auth.rememberMe}</Label>
                            </div>
                            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                {i18n.auth.forgotPassword}
                            </Link>
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Вход...
                                </>
                            ) : (
                                "Войти"
                            )}
                        </Button>
                    </form>
                </TabsContent>
            </Tabs>
            
            <div className="space-y-4 mt-6">
                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">{i18n.auth.socialsDivider}</span>
                    </div>
                </div>
                
                <div className="grid grid-cols-4 gap-2">
                    <SocialButton>
                        <YandexIcon className="h-8 w-8" />
                    </SocialButton>
                    <SocialButton>
                        <VkIcon className="h-8 w-8" />
                    </SocialButton>
                    <SocialButton>
                        <TelegramIcon className="h-8 w-8" />
                    </SocialButton>
                    <SocialButton>
                        <GosuslugiIcon className="w-24 h-auto" />
                    </SocialButton>
                </div>

                <div className="relative mt-6">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-card px-2 text-muted-foreground">{i18n.auth.noAccountDivider}</span>
                    </div>
                </div>

                <Button variant="secondary" className="w-full" asChild>
                  <Link href="/auth/register">{i18n.auth.register}</Link>
                </Button>

                <Button variant="outline" className="w-full" asChild>
                  <Link href="/">{i18n.auth.backToHome}</Link>
                </Button>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
