
import { Button } from "@/shared/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import Link from 'next/link';

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Вход</TabsTrigger>
          <TabsTrigger value="register">Регистрация</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Вход</CardTitle>
              <CardDescription>
                Войдите в свой аккаунт, чтобы продолжить.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-login">Email</Label>
                <Input id="email-login" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <div className="flex items-center">
                    <Label htmlFor="password-login">Пароль</Label>
                    <Link href="#" className="ml-auto inline-block text-sm underline">
                        Забыли пароль?
                    </Link>
                </div>
                <Input id="password-login" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Войти</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Регистрация</CardTitle>
              <CardDescription>
                Создайте аккаунт, чтобы начать пользоваться платформой.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email-register">Email</Label>
                <Input id="email-register" type="email" placeholder="m@example.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-register">Пароль</Label>
                <Input id="password-register" type="password" required />
              </div>
               <div className="space-y-2">
                <Label htmlFor="password-confirm">Повторите пароль</Label>
                <Input id="password-confirm" type="password" required />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Зарегистрироваться</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
