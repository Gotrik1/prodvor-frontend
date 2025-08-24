

'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card';
import { Input } from '@/shared/ui/input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/ui/form';
import { Save, Warehouse } from 'lucide-react';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Textarea } from '@/shared/ui/textarea';
import { useToast } from '@/shared/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import Link from 'next/link';

const profileFormSchema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать не менее 2 символов.'),
  lastName: z.string().min(2, 'Фамилия должна содержать не менее 2 символов.'),
  nickname: z.string().min(3, 'Никнейм должен содержать не менее 3 символов.'),
  gender: z.enum(['мужской', 'женский']),
  bio: z.string().max(160, 'Биография не должна превышать 160 символов.').optional(),
});

export function ProfileTab() {
    const { toast } = useToast();
    const { user: currentUser } = useUserStore();
    
    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: currentUser?.firstName || '',
            lastName: currentUser?.lastName || '',
            nickname: currentUser?.nickname || '',
            gender: currentUser?.gender || 'мужской',
            bio: currentUser?.bio || "Страстный игрок в дворовый футбол и CS2. Ищу команду для серьезных игр."
        }
    });

    function onProfileSubmit() {
        toast({ title: "Профиль обновлен", description: "Ваши данные успешно сохранены." });
    }

    return (
        <Form {...profileForm}>
            <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                <Card>
                    <CardHeader>
                        <CardTitle>Публичный профиль</CardTitle>
                        <CardDescription>Эта информация будет видна другим пользователям.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src={currentUser?.avatarUrl} />
                                <AvatarFallback>{currentUser?.nickname?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col gap-2">
                                <Button type="button" variant="outline">Загрузить новый аватар</Button>
                                <Button asChild type="button" variant="secondary">
                                    <Link href="/inventory"><Warehouse className="mr-2 h-4 w-4"/>Настроить рамку</Link>
                                </Button>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={profileForm.control} name="firstName" render={({ field }) => (
                                <FormItem><FormLabel>Имя</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={profileForm.control} name="lastName" render={({ field }) => (
                                <FormItem><FormLabel>Фамилия</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={profileForm.control} name="nickname" render={({ field }) => (
                                <FormItem><FormLabel>Никнейм</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={profileForm.control} name="gender" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Пол</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Выберите пол" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="мужской">Мужской</SelectItem>
                                            <SelectItem value="женский">Женский</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                         <FormField control={profileForm.control} name="bio" render={({ field }) => (
                            <FormItem><FormLabel>О себе</FormLabel><FormControl><Textarea {...field} /></FormControl><FormDescription>Краткая информация о вас.</FormDescription><FormMessage /></FormItem>
                        )}/>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button type="submit"><Save className="mr-2 h-4 w-4" />Сохранить</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}
