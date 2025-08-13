import type { SVGProps } from 'react';
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Checkbox } from "@/shared/ui/checkbox";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { HelpCircle } from "lucide-react";
import Image from 'next/image';
import type { ComponentProps } from "react";

// ------------------ Логотип ------------------
export function Logo(
  props: Omit<ComponentProps<typeof Image>, "src" | "alt" | "width" | "height">
) {
  return (
    <Image
      src="https://prodvor.website/_next/image?url=%2Fimages%2Fyour-logo.png&w=64&q=75"
      alt="ProDvor Logo"
      width={40}
      height={40}
      {...props}
      className="object-contain"
    />
  );
}

// ------------------ Yandex ------------------
export function YandexIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="12" r="12" fill="#FC3F1D" />
      <path
        d="M13.32 7.666h-.924c-1.694 0-2.585.858-2.585 2.123 0 1.43.616 2.1 1.881 2.959l1.045.704-3.003 4.487H7.49l2.695-4.014c-1.55-1.111-2.42-2.19-2.42-4.015 0-2.288 1.595-3.85 4.62-3.85h3.003v11.868H13.32V7.666z"
        fill="#fff"
      />
    </svg>
  );
}

// ------------------ VK ------------------
export function VkIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
        <rect width="100" height="100" rx="20" fill="#0077FF"/>
        <path
          d="M53.71 72.04C30.92 72.04 17.92 56.42 17.38 30.42h11.42c0.38 19.08 8.8 27.17 15.47 28.83V30.42h10.75v16.46c6.58-0.71 13.5-8.21 15.83-16.46h10.75c-1.79 10.17-9.29 17.67-14.62 20.75 5.33 2.5 13.87 9.04 17.12 20.87H72.25c-2.54-7.92-8.87-14.05-17.25-14.88v14.87h-1.31z"
          fill="white"
        />
    </svg>
  );
}

// ------------------ Telegram ------------------
export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="tgGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2AABEE" />
          <stop offset="1" stopColor="#229ED9" />
        </linearGradient>
      </defs>
      <circle fill="url(#tgGradient)" cx="120" cy="120" r="120" />
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

// ------------------ Госуслуги ------------------
export function GosuslugiIcon(props: SVGProps<SVGSVGElement>) {
  return (
     <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
        <path fill="#EE3F58" d="m25.3 1.4h-3c-.1 0-.1.1-.1.1-0.1 1.4-.3 2.8-.7 4v.1c0 0 .1 0 .1.1h1c.1 0 .1-.1.1-.1.3-.9.5-2.1.6-3.1h1v3.1c0 .1 0 .1.1.1h1c.1 0 .1-.1.1-.1v-4c0-.1 0-.1-.1-.1m12.7 0h-1c-.1 0-.1.1-.1.1v3.1c-.2.1-.4.1-.7.1-0.7 0-.8-.2-.8-1.1v-2.2c0-.1 0-.1-.1-.1h-1c-.1 0-.1.1-.1.1v2.2c0 1.4.5 2 1.7 2 .7 0 1.5-.2 1.9-.3 0 0 .1 0 .1-.1v-3.1c0-.1 0-.1-.1-.1m-20.8.1h-1c-.1 0-.1.1-.1.1-.1.6-.5 1.6-0.9 2.7l-1-2.7c0 0 0-.1-.1-.1h-1c0 0 0 .1-.1.1 0 0 0 0 0 .1l1.5 4.1c-.1.3-.3.6-.4.8-0.1.2-.2.4-.3.6 0 0 0 .1 0 .1 0 0 0 .1.1.1h1.1c0 0 .1 0 .1-.1.2-.3.4-.8.6-1.3.6-1.5 1.1-2.9 1.5-4.2 0 0 0-.1 0-.1 0 0 0 0 0 0m-4.3 3.1c0 0 0 0 0 0h0c-.2.1-.7.2-1 .2-0.7 0-1-.2-1-1.2 0-.8.1-1.2 1-1.2.2 0 .5 0 .8.1 0 0 .1 0 .1 0 .1-.2.2-.5.4-.8v0c0 0 0 0 0 0-0.4-.1-.9-.2-1.3-.2-1.4 0-2.1.7-2.1 2.2s.7 2.2 2.1 2.2c.3 0 1.1-.1 1.4-.2 0 0 0 0 0-.1l-.3-.8zm6.6-3.3h-1c0 0-.1.1-.1.1-.1.6-.5 1.6-0.9 2.7l-1-2.8c0 0 0-.1-.1-.1h-1c0 0-.1.1-.1.1 0 0 0 0 0 .1l1.5 4.1c-.1.3-.3.6-.4.8-0.1.2-.2.4-.3.6 0 0 0 .1 0 .1 0 0 0 .1.1.1h1.1c.1 0 .1 0 .1-.1.2-.3.4-.8.6-1.3.6-1.5 1.1-2.9 1.5-4.2 0 0 0 0 0-.1m5.2-0.1h-2.9c-.1 0-.1.1-.1.1v4c0 .1 0 .1.1.1h1c.1 0 .1-.1.1-.1v-3h1.5c.1 0 .1 0 .1 0 .1-.3.2-.6.3-.8v-0.4c0-.1-.1-.1-.1-.1"/>
        <path fill="#0065B1" d="m5.2 4.1c-0.6 0-0.8-.2-0.8-1.3 0-1.1.2-1.2.8-1.2s.9.1.9 1.2c0 1.1-.3 1.3-.9 1.3m0-3.4c-1.4 0-2 .6-2 2.2s.6 2.2 2 2.2 2-.6 2-2.2-0.6-2.2-2-2.2m7.4 2.6c0 0 0 0 0 0h0c-.2.1-.7.2-1 .2-0.7 0-1-.2-1-1.2 0-.8.1-1.2 1-1.2.2 0 .5 0 .8.1 0 0 .1 0 .1 0 .1-.2.2-.5.4-.8v0c0 0 0 0 0 0-0.4-.1-.9-.2-1.3-.2-1.4 0-2.1.7-2.1 2.2s.7 2.2 2.1 2.2c.3 0 1.1-.1 1.4-.2 0 0 0 0 0-.1l-.3-.8zM3 .8h-2.9c-.1 0-.1.1-.1.1v4c0 .1 0 .1.1.1h1c.1 0 .1-.1.1-.1v-3h1.5c.1 0 .1 0 .1 0 .1-.3.2-.6.3-.8v-0.4c0-.1-.1-.1-.1-.1"/>
    </svg>
  );
}

export function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-sm mx-auto shadow-xl border-border/60 bg-card">
        <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
                <Logo />
            </div>
            <CardTitle className="text-2xl font-bold">Вход в ProDvor ID</CardTitle>
        </CardHeader>
        <CardContent>
            <Tabs defaultValue="email">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="phone">Телефон</TabsTrigger>
                    <TabsTrigger value="email">Почта</TabsTrigger>
                </TabsList>
                <TabsContent value="phone" className="pt-4">
                     <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="phone">Телефон</Label>
                            <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
                        </div>
                        <Button type="submit" className="w-full">Продолжить</Button>
                    </div>
                </TabsContent>
                <TabsContent value="email" className="pt-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input id="email" type="email" placeholder="admin@example.com" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Пароль</Label>
                            <Input id="password" type="password" required />
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Checkbox id="remember" />
                                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground">Сохранить вход</Label>
                            </div>
                            <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                                <HelpCircle className="inline h-4 w-4 mr-1" />
                                Забыли пароль?
                            </a>
                        </div>
                        <Button type="submit" className="w-full">Продолжить</Button>
                    </div>
                </TabsContent>
            </Tabs>
            
            <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Или войдите с помощью</span>
                </div>
            </div>

            <div className="space-y-2">
                <Button variant="outline" className="w-full font-bold">Создать аккаунт</Button>
                <div className="grid grid-cols-4 gap-2">
                    <Button variant="outline" size="icon" className="h-12 w-full"><YandexIcon className="h-10 w-10 p-1" /></Button>
                    <Button variant="outline" size="icon" className="h-12 w-full"><VkIcon className="h-10 w-10 p-1" /></Button>
                    <Button variant="outline" size="icon" className="h-12 w-full"><TelegramIcon className="h-10 w-10 p-1" /></Button>
                    <Button variant="outline" size="icon" className="h-12 w-full"><GosuslugiIcon className="h-10 w-10 p-1" /></Button>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
    

    


