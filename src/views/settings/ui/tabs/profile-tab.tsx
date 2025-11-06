
'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
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
import { CalendarIcon, Save, Warehouse, UploadCloud, Loader2, BookCopy, AlertCircle } from 'lucide-react';
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
import Image from 'next/image';
import type { User, Sport, PresignedPostResponse } from '@/mocks';
import { api } from '@/shared/api/axios-instance';

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
});

const AvatarUploadDialog = () => {
    const { user, setUser, accessToken } = useUserStore();
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setError(null);
        setIsLoading(true);

        try {
            // Step 1: Request presigned URL
            const presignedResponse = await api.post('/api/v1/uploads/request-url', {
                contentType: file.type,
            }, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            const presignedData: PresignedPostResponse = presignedResponse.data;

            // Step 2: Upload file directly to storage
            const formData = new FormData();
            Object.entries(presignedData.fields).forEach(([key, value]) => {
                formData.append(key, value as string);
            });
            formData.append('file', file);

            const uploadResponse = await fetch(presignedData.url, {
                method: 'POST',
                body: formData,
            });

            if (!uploadResponse.ok) {
                throw new Error('Ошибка при загрузке файла в хранилище.');
            }

            // Step 3: Confirm upload with our backend
            const finalResponse = await api.post('/api/v1/users/avatar', {
                fileUrl: presignedData.fileUrl,
            }, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });
            
            const result = finalResponse.data;

            // Update user state
            setUser(result.user);
            toast({
                title: "Аватар обновлен!",
                description: "Ваш новый аватар успешно сохранен.",
            });

        } catch (err) {
            console.error(err);
            const errorMessage = err instanceof Error ? err.message : 'Произошла неизвестная ошибка.';
            setError(errorMessage);
            toast({
                variant: "destructive",
                title: "Ошибка загрузки",
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
            if(fileInputRef.current) fileInputRef.current.value = '';
        }
    };
    
    return (
        <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
                <AvatarImage src={user?.avatarUrl} />
                <AvatarFallback className="text-3xl">{user?.nickname?.charAt(0) || '?'}</AvatarFallback>
            </Avatar>
            <div>
                <Button onClick={handleAvatarClick} disabled={isLoading}>
                {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                    <Upload className="mr-2 h-4 w-4" />
                )}
                {isLoading ? 'Загрузка...' : 'Сменить аватар'}
                </Button>
                <p className="text-sm text-muted-foreground mt-2">PNG, JPG, GIF до 10МБ.</p>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/png, image/jpeg, image/gif"
                />
                 {error && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-destructive">
                        <AlertCircle className="h-4 w-4" />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

const DisciplinesCard = () => {
    const { toast } = useToast();
    const { user: currentUser, setUser, accessToken } = useUserStore();
    const [sportOptions, setSportOptions] = useState<OptionType[]>([]);
    const [selectedSports, setSelectedSports] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        async function fetchSports() {
            setIsLoading(true);
            try {
                const response = await api.get(`/api/v1/sports/`);
                const sports: Sport[] = response.data as unknown as Sport[];
                const options = sports.map(sport => ({
                    value: sport.id,
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
            } finally {
                setIsLoading(false);
            }
        }
        fetchSports();
    }, [toast]);
    
    useEffect(() => {
        if (currentUser?.sports) {
            setSelectedSports(currentUser.sports.map(s => s.id));
        }
    }, [currentUser]);

    const handleSaveDisciplines = async () => {
        if (!currentUser || !accessToken) return;
        setIsSaving(true);
        try {
            const response = await api.put(`/api/v1/users/${currentUser.id}`, {
                sports: selectedSports
            });
            const updatedUser = response.data as User;
            setUser(updatedUser);
            toast({
                title: "Дисциплины обновлены",
                description: "Ваш список видов спорта успешно сохранен.",
            });
        } catch {
             toast({
                variant: 'destructive',
                title: "Ошибка",
                description: "Не удалось сохранить дисциплины. Попробуйте позже.",
            });
        } finally {
            setIsSaving(false);
        }
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookCopy /> Мои дисциплины</CardTitle>
                <CardDescription>Выберите до 5 видов спорта, в которых вы участвуете.</CardDescription>
            </CardHeader>
            <CardContent>
                {isLoading ? (
                    <div className="space-y-2">
                        <div className="h-10 w-full rounded-md border flex items-center p-2 justify-between">
                             <span className="text-sm text-muted-foreground">Выберите ваши виды спорта...</span>
                        </div>
                    </div>
                ) : (
                    <MultiSelect
                        options={sportOptions}
                        selected={selectedSports}
                        onChange={setSelectedSports}
                        placeholder="Выберите ваши виды спорта..."
                        className="w-full"
                    />
                )}
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button onClick={handleSaveDisciplines} disabled={isSaving || selectedSports.length === 0 || selectedSports.length > 5}>
                     {isSaving ? (
                        <><Loader2 className="mr-2 h-4 w-4 animate-spin"/> Сохранение...</>
                     ) : (
                        <><Save className="mr-2 h-4 w-4" />Сохранить дисциплины</>
                     )}
                </Button>
            </CardFooter>
        </Card>
    );
};


export function ProfileTab() {
    const { toast } = useToast();
    const { user: currentUser, setUser, accessToken } = useUserStore();

    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            nickname: '',
            gender: 'мужской',
            bio: "",
            city: '',
        }
    });

    useEffect(() => {
        if (currentUser) {
            profileForm.reset({
                firstName: currentUser.firstName || '',
                lastName: currentUser.lastName || '',
                nickname: currentUser.nickname || '',
                gender: currentUser.gender || 'мужской',
                bio: currentUser.bio || "",
                city: currentUser.city || '',
                birthDate: currentUser.age ? new Date(new Date().setFullYear(new Date().getFullYear() - currentUser.age)) : undefined,
            });
        }
    }, [currentUser, profileForm]);

    async function onProfileSubmit(values: z.infer<typeof profileFormSchema>) {
        if (!currentUser || !accessToken) return;
        
        const dataToUpdate = {
            ...values,
            age: new Date().getFullYear() - values.birthDate.getFullYear(),
        };

        try {
            const response = await api.put(`/api/v1/users/${currentUser.id}`, dataToUpdate);
            setUser(response.data as User);
            toast({
                title: "Профиль обновлен",
                description: "Ваши данные успешно сохранены.",
            });
        } catch {
             toast({
                variant: 'destructive',
                title: "Ошибка",
                description: "Не удалось сохранить изменения. Попробуйте позже.",
            });
        }
    }

    return (
        <div className="space-y-6">
            <Form {...profileForm}>
                <form onSubmit={profileForm.handleSubmit(onProfileSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Публичный профиль</CardTitle>
                            <CardDescription>Эта информация будет видна другим пользователям.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                           
                            <AvatarUploadDialog />
                           
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

            <DisciplinesCard />
        </div>
    );
}
