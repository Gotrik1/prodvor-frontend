
'use client';

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
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/shared/ui/calendar";
import { cn } from "@/shared/lib/utils";
import React from 'react';


export function RegisterPage() {
    const [date, setDate] = React.useState<Date>();
    
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
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="first-name">Имя</Label>
                  <Input id="first-name" placeholder="Иван" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Фамилия</Label>
                  <Input id="last-name" placeholder="Иванов" required />
                </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="nickname">Никнейм</Label>
              <Input id="nickname" placeholder="Player1" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="role">Роль</Label>
                    <Select>
                        <SelectTrigger id="role">
                            <SelectValue placeholder="Выберите роль" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="player">Игрок</SelectItem>
                            <SelectItem value="referee">Судья</SelectItem>
                            <SelectItem value="fan">Болельщик</SelectItem>
                            <SelectItem value="coach">Тренер</SelectItem>
                            <SelectItem value="manager">Менеджер</SelectItem>
                            <SelectItem value="organizer">Организатор</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="birthdate">Дата рождения</Label>
                    <Popover>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn(
                            "w-full justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? date.toLocaleDateString() : <span>Выберите дату</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
             <div className="space-y-2">
              <Label htmlFor="phone">Номер телефона</Label>
              <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" required />
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
            <Button variant="outline" className="w-full" asChild>
              <Link href="/">Вернуться на главную</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
