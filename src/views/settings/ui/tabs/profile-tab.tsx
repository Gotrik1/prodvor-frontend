

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
import { CalendarIcon, Save, Warehouse, UploadCloud, Loader2 } from 'lucide-react';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Textarea } from '@/shared/ui/textarea';
import { useToast } from '@/shared/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import Link from 'next/link';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { cn } from '@/shared/lib/utils';
import { MultiSelect, type OptionType } from '@/shared/ui/multi-select';
import React, { useState, useCallback, useEffect } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/shared/ui/dialog';
import Image from 'next/image';
import axios from 'axios';
import type { User, Sport } from '@/mocks';

const profileFormSchema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать не менее 2 символов.'),
  lastName: z.string().min(2, 'Фамилия должна содержать не менее 2 символов.'),
  nickname: z.string().min(3, 'Никнейм должен содержать не менее 3 символов.'),
  gender: z.enum(['мужской', 'женский']),
  bio: z.string().max(160, 'Биография не должна превышать 160 символов.').optional(),
  birthDate: z.date({
    required_error: "Пожалуйста, выберите дату рождения.",
  }),
  city: z.string().min(2, "Название города должно содержать не менее 2 символов."),
  disciplines: z.array(z.string()).min(1, "Выберите хотя бы одну дисциплину.").max(5, "Можно выбрать не более 5 дисциплин."),
});

const AvatarUploadDialog = () => {
    const { user, setUser } = useUserStore();
    const { toast } = useToast();
    const [filePreview, setFilePreview] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0];
        if (!selectedFile) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            setFilePreview(reader.result as string);
        };
    }, []);

    const handleSaveAvatar = () => {
        if (!filePreview || !user) return;
        setIsLoading(true);

        // Simulate backend upload
        setTimeout(() => {
            setUser({ ...user, avatarUrl: filePreview });
            setIsLoading(false);
            setIsOpen(false);
            setFilePreview(null);
            toast({
                title: "Аватар обновлен!",
                description: "Ваш новый аватар успешно сохранен.",
            });
        }, 1500);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline">Загрузить новый аватар</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Обновить аватар</DialogTitle>
                    <CardDescription>Выберите новое изображение для вашего профиля.</CardDescription>
                </DialogHeader>
                <div className="py-4">
                    {filePreview ? (
                        <div className="space-y-4">
                            <div className="relative w-48 h-48 mx-auto">
                                <Image src={filePreview} alt="Превью аватара" layout="fill" className="object-cover rounded-full" />
                            </div>
                            <Button variant="outline" className="w-full" onClick={() => setFilePreview(null)}>Выбрать другой файл</Button>
                        </div>
                    ) : (
                         <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <UploadCloud className="w-10 h-10 mb-4 text-muted-foreground" />
                                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Нажмите, чтобы загрузить</span></p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG, GIF (макс. 800x800px)</p>
                                </div>
                                <input id="dropzone-file" type="file" className="hidden" accept="image/*" onChange={handleFileChange} />
                            </label>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="ghost" onClick={() => setIsOpen(false)} disabled={isLoading}>Отмена</Button>
                    <Button onClick={handleSaveAvatar} disabled={!filePreview || isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Сохранение...
                            </>
                        ) : 'Сохранить'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};


export function ProfileTab() {
    const { toast } = useToast();
    const { user: currentUser, setUser } = useUserStore();
    const [sportOptions, setSportOptions] = useState<OptionType[]>([]);
    
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    useEffect(() => {
        async function fetchSports() {
            if (!API_BASE_URL) return;
            try {
                const response = await axios.get(`${API_BASE_URL}/api/v1/sports`);
                const sports: Sport[] = response.data;
                const options = sports.map(sport => ({
                    value: String(sport.id),
                    label: sport.name,
                    group: sport.isTeamSport ? 'Командные' : 'Индивидуальные',
                }));
                setSportOptions(options);
            } catch (error) {
                console.error("Failed to fetch sports:", error);
                toast({
                    variant: 'destructive',
                    title: 'Ошибка загрузки',
                    description: 'Не удалось загрузить список дисциплин.'
                });
            }
        }
        fetchSports();
    }, [API_BASE_URL, toast]);

    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            nickname: '',
            gender: 'мужской',
            bio: "Страстный игрок в дворовый футбол и CS2. Ищу команду для серьезных игр.",
            city: '',
            disciplines: [],
        }
    });

    useEffect(() => {
        if (currentUser) {
            profileForm.reset({
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                nickname: currentUser.nickname || '',
                gender: currentUser.gender || 'мужской',
                bio: currentUser.bio || "Страстный игрок в дворовый футбол и CS2. Ищу команду для серьезных игр.",
                city: currentUser.city || '',
                disciplines: (currentUser.disciplines || []).map(String),
                birthDate: currentUser.age ? new Date(new Date().setFullYear(new Date().getFullYear() - currentUser.age)) : undefined,
            });
        }
    }, [currentUser, profileForm]);

    async function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
        if (!currentUser) return;
        
        const dataToUpdate = {
            ...values,
            age: new Date().getFullYear() - values.birthDate.getFullYear(),
        };

        try {
            const response = await axios.put(`${API_BASE_URL}/api/v1/users/${currentUser.id}`, dataToUpdate);
            
            setUser(response.data as User);

            toast({
                title: "Профиль обновлен",
                description: "Ваши данные успешно сохранены.",
            });
        } catch (error) {
             toast({
                variant: 'destructive',
                title: "Ошибка",
                description: "Не удалось сохранить изменения. Попробуйте позже.",
            });
        }
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
                                <AvatarUploadDialog />
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
                                    <Select onValueChange={field.onChange} value={field.value}>
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
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <FormField control={profileForm.control} name="city" render={({ field }) => (
                                <FormItem><FormLabel>Город</FormLabel><FormControl><Input {...field} placeholder="Например, Москва" /></FormControl><FormMessage /></FormItem>
                            )}/>
                            <FormField control={profileForm.control} name="birthDate" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Дата рождения</FormLabel>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button
                                            variant={"outline"}
                                            className={cn(
                                                "w-full pl-3 text-left font-normal",
                                                !field.value && "text-muted-foreground"
                                            )}
                                            >
                                            {field.value ? (
                                                field.value.toLocaleDateString()
                                            ) : (
                                                <span>Выберите дату</span>
                                            )}
                                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                            </Button>
                                        </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={field.value}
                                            onSelect={field.onChange}
                                            disabled={(date) =>
                                                date > new Date() || date < new Date("1900-01-01")
                                            }
                                            initialFocus
                                        />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}/>
                        </div>
                        <FormField
                            control={profileForm.control}
                            name="disciplines"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Мои дисциплины</FormLabel>
                                    <FormControl>
                                        <MultiSelect
                                            options={sportOptions}
                                            selected={field.value}
                                            onChange={field.onChange}
                                            placeholder="Выберите ваши виды спорта..."
                                            className="w-full"
                                        />
                                    </FormControl>
                                    <FormDescription>Выберите до 5 видов спорта, в которых вы участвуете.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                         <FormField control={profileForm.control} name="bio" render={({ field }) => (
                            <FormItem><FormLabel>О себе</FormLabel><FormControl><Textarea {...field} /></FormControl><FormDescription>Краткая информация о вас.</FormDescription><FormMessage /></FormItem>
                        )}/>
                    </CardContent>
                    <CardFooter className="border-t px-6 py-4">
                        <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                             {profileForm.formState.isSubmitting ? (
                                <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Сохранение...</>
                             ) : (
                                <><Save className="mr-2 h-4 w-4" />Сохранить</>
                             )}
                        </Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    );
}

    


