
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { Bell, Brush, Lock, User as UserIcon, Save, Shield } from 'lucide-react';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Textarea } from '@/shared/ui/textarea';
import { Switch } from '@/shared/ui/switch';
import { ThemeToggle } from '@/shared/ui/theme-toggle';
import { useToast } from '@/shared/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

const profileFormSchema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать не менее 2 символов.'),
  lastName: z.string().min(2, 'Фамилия должна содержать не менее 2 символов.'),
  nickname: z.string().min(3, 'Никнейм должен содержать не менее 3 символов.'),
  gender: z.enum(['мужской', 'женский']),
  bio: z.string().max(160, 'Биография не должна превышать 160 символов.').optional(),
});

const accountFormSchema = z.object({
  email: z.string().email('Неверный формат email.'),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(8, 'Новый пароль должен быть не менее 8 символов.').optional(),
  confirmPassword: z.string().optional(),
}).refine(data => {
    if (data.newPassword && !data.currentPassword) {
        return false;
    }
    return true;
}, {
    message: "Введите текущий пароль для смены.",
    path: ["currentPassword"],
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Пароли не совпадают.",
    path: ["confirmPassword"],
});


export function SettingsPage() {
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

    const accountForm = useForm<z.infer<typeof accountFormSchema>>({
        resolver: zodResolver(accountFormSchema),
        defaultValues: {
            email: currentUser?.email || '',
        }
    });

    function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
        toast({ title: "Профиль обновлен", description: "Ваши данные успешно сохранены." });
    }
     function onAccountSubmit(values: z.infer<typeof accountFormSchema>) {
        toast({ title: "Настройки аккаунта обновлены", description: "Ваши данные успешно сохранены." });
    }

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="mx-auto w-full max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">Настройки</h1>
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile"><UserIcon className="mr-2 h-4 w-4" />Профиль</TabsTrigger>
            <TabsTrigger value="account"><Lock className="mr-2 h-4 w-4" />Аккаунт</TabsTrigger>
            <TabsTrigger value="notifications"><Bell className="mr-2 h-4 w-4" />Уведомления</TabsTrigger>
            <TabsTrigger value="appearance"><Brush className="mr-2 h-4 w-4" />Внешний вид</TabsTrigger>
            <TabsTrigger value="privacy"><Shield className="mr-2 h-4 w-4"/>Приватность</TabsTrigger>
          </TabsList>
          
          {/* Profile Tab */}
          <TabsContent value="profile" className="mt-6">
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
                                <Button type="button" variant="outline">Загрузить новый аватар</Button>
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
          </TabsContent>

          {/* Account Tab */}
          <TabsContent value="account" className="mt-6">
             <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onAccountSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Настройки аккаунта</CardTitle>
                            <CardDescription>Управление параметрами входа и безопасности.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                             <FormField control={accountForm.control} name="email" render={({ field }) => (
                                <FormItem><FormLabel>Email</FormLabel><FormControl><Input type="email" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <CardTitle className="text-lg pt-4 border-t">Смена пароля</CardTitle>
                             <FormField control={accountForm.control} name="currentPassword" render={({ field }) => (
                                <FormItem><FormLabel>Текущий пароль</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={accountForm.control} name="newPassword" render={({ field }) => (
                                <FormItem><FormLabel>Новый пароль</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                             <FormField control={accountForm.control} name="confirmPassword" render={({ field }) => (
                                <FormItem><FormLabel>Подтвердите новый пароль</FormLabel><FormControl><Input type="password" {...field} /></FormControl><FormMessage /></FormItem>
                            )}/>
                        </CardContent>
                        <CardFooter className="border-t px-6 py-4">
                            <Button type="submit"><Save className="mr-2 h-4 w-4" />Сохранить</Button>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Уведомления</CardTitle>
                    <CardDescription>Выберите, какие уведомления вы хотите получать.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                            <FormLabel>Новые вызовы</FormLabel>
                            <FormDescription>Получать уведомления, когда вам бросают вызов.</FormDescription>
                        </div>
                        <Switch defaultChecked/>
                    </div>
                     <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                            <FormLabel>Комментарии к постам</FormLabel>
                            <FormDescription>Уведомлять о новых комментариях под вашими постами.</FormDescription>
                        </div>
                        <Switch defaultChecked/>
                    </div>
                     <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                            <FormLabel>Новости платформы</FormLabel>
                            <FormDescription>Получать email-рассылку о новостях и обновлениях.</FormDescription>
                        </div>
                        <Switch />
                    </div>
                </CardContent>
                 <CardFooter className="border-t px-6 py-4">
                    <Button><Save className="mr-2 h-4 w-4" />Сохранить</Button>
                </CardFooter>
            </Card>
          </TabsContent>
          
           {/* Appearance Tab */}
          <TabsContent value="appearance" className="mt-6">
            <Card>
                <CardHeader>
                    <CardTitle>Внешний вид</CardTitle>
                    <CardDescription>Настройте отображение интерфейса.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between p-4 rounded-lg border">
                        <FormLabel>Тема оформления</FormLabel>
                        <ThemeToggle />
                    </div>
                </CardContent>
            </Card>
          </TabsContent>
          
           {/* Privacy Tab */}
          <TabsContent value="privacy" className="mt-6">
             <Card>
                <CardHeader>
                    <CardTitle>Приватность</CardTitle>
                    <CardDescription>Управляйте видимостью вашего профиля.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                            <FormLabel>Показывать мой профиль в поиске</FormLabel>
                            <FormDescription>Разрешить другим пользователям находить вас.</FormDescription>
                        </div>
                        <Switch defaultChecked/>
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                        <div>
                            <FormLabel>Показывать мою статистику</FormLabel>
                            <FormDescription>Сделать статистику матчей публичной.</FormDescription>
                        </div>
                        <Switch defaultChecked/>
                    </div>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                    <Button><Save className="mr-2 h-4 w-4" />Сохранить</Button>
                </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
