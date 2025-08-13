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

export function RegisterPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4 dark">
      <Card className="w-full max-w-sm mx-auto shadow-xl border-border/60 bg-card">
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
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Имя</Label>
              <Input id="name" placeholder="Иван Иванов" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input id="password" type="password" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>
              <Input id="confirm-password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Зарегистрироваться
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
