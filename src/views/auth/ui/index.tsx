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

const Logo = () => (
    <Image 
      src="https://prodvor.website/_next/image?url=%2Fimages%2Fyour-logo.png&w=64&q=75" 
      alt="ProDvor Logo" 
      width={40} 
      height={40} 
      className="object-contain"
    />
);

const YandexIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.10001 5H10.2L13.8333 12.4533L13.9 12.5867L14.0111 12.4533L17.7 5H20.7556L15.3111 14.4L21 22H17.8L14.0556 16.7067L13.9889 16.5867L13.8778 16.7067L10.0556 22H7L12.5889 12.44L7.10001 5Z" fill="#FC3F1D"/>
    </svg>
)

const VkontakteIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 12.162C15.93 11.672 17.43 10.162 17.43 8.012C17.43 5.342 15.39 3.302 12.72 3.302C10.05 3.302 8 5.342 8 8.012C8 10.122 9.47 11.622 11.37 12.142C11.37 12.142 11.13 12.152 10.5 12.152C8.3 12.152 4 13.332 4 16.002V17.702H12.5V16.102C12.5 15.002 13.29 14.202 14.39 14.202C15.49 14.202 16.29 15.002 16.29 16.102V17.702H20V16.002C20 13.332 15.7 12.152 13.5 12.152C13.5 12.152 13.5 12.162 14 12.162Z" fill="#0077FF"/>
    </svg>
)

const TelegramIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z" fill="#27A0E5"/>
        <path d="M7.99414 11.2363L16.2559 8.02633C16.9209 7.78033 17.4119 8.05633 17.2029 8.91433L15.3629 17.2353C15.2229 17.8593 14.7779 18.0213 14.2809 17.7493L11.3559 15.5903L9.98614 16.9223C9.82214 17.0863 9.68014 17.2283 9.38714 17.2283L9.61314 14.2493L14.4989 9.80333C14.7829 9.54933 14.4259 9.38333 14.0739 9.63733L8.06714 13.6333C7.45214 14.0203 6.88314 14.1853 6.36214 14.0213C5.74814 13.8243 5.40514 13.2543 5.61314 11.2363L7.99414 11.2363Z" fill="white"/>
    </svg>
)

const GosuslugiIcon = () => (
    <svg width="24" height="24" viewBox="0 0 26 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M25.132 10.706C25.132 10.053 24.607 9.528 23.954 9.528H19.961C19.308 9.528 18.783 10.053 18.783 10.706C18.783 11.359 19.308 11.884 19.961 11.884H23.954C24.607 11.884 25.132 11.359 25.132 10.706ZM23.954 13.758H19.961C19.308 13.758 18.783 14.283 18.783 14.936C18.783 15.589 19.308 16.114 19.961 16.114H23.954C24.607 16.114 25.132 15.589 25.132 14.936C25.132 14.283 24.607 13.758 23.954 13.758ZM23.954 17.99H19.961C19.308 17.99 18.783 18.515 18.783 19.168C18.783 19.821 19.308 20.346 19.961 20.346H23.954C24.607 20.346 25.132 19.821 25.132 19.168C25.132 18.515 24.607 17.99 23.954 17.99Z" fill="#0D47A1"/>
        <path d="M12.0151 0.000305176L3.10913 2.62831L12.0151 5.25731L20.9211 2.62831L12.0151 0.000305176Z" fill="#0D47A1"/>
        <path d="M11.9961 23.999L3.08911 21.372L3.09011 7.24597L0.868113 6.64197C0.329113 6.49497 -0.0158872 5.96197 0.132113 5.42297C0.279113 4.88497 0.811113 4.53897 1.35011 4.68697L11.9961 7.82897V23.999Z" fill="#0D47A1"/>
        <path d="M12.0341 24.0002V7.8282L22.6801 4.6862C23.2191 4.5392 23.7511 4.8852 23.8991 5.4232C24.0461 5.9622 23.7021 6.4952 23.1631 6.6422L20.9401 7.2462L20.9391 21.3722L12.0341 24.0002Z" fill="#0D47A1"/>
    </svg>
)


export function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm mx-4 shadow-xl border-border/60">
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
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
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
                    <Button variant="outline" size="icon"><YandexIcon /></Button>
                    <Button variant="outline" size="icon"><VkontakteIcon /></Button>
                    <Button variant="outline" size="icon"><TelegramIcon /></Button>
                    <Button variant="outline" size="icon"><GosuslugiIcon /></Button>
                </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
