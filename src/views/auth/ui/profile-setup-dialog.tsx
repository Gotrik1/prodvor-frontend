
'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { Input } from "@/shared/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/shared/ui/form';
import { Loader2, CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/shared/ui/popover';
import { Calendar } from '@/shared/ui/calendar';
import { cn } from '@/shared/lib/utils';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';

const profileFormSchema = z.object({
    firstName: z.string().min(2, "Имя обязательно."),
    lastName: z.string().min(2, "Фамилия обязательна."),
    city: z.string().min(2, "Город обязателен."),
    role: z.string({ required_error: "Пожалуйста, выберите роль." }),
    birthDate: z.date({ required_error: "Укажите дату рождения." }),
});

interface ProfileSetupDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (data: any) => Promise<void>;
    isClosable?: boolean;
}

export function ProfileSetupDialog({ open, onOpenChange, onSave, isClosable = true }: ProfileSetupDialogProps) {
    const { user: currentUser } = useUserStore();

    const profileForm = useForm<z.infer<typeof profileFormSchema>>({
        resolver: zodResolver(profileFormSchema),
        defaultValues: {
            firstName: currentUser?.firstName || '',
            lastName: currentUser?.lastName || '',
            city: currentUser?.city || 'Москва',
            role: currentUser?.role || undefined,
            birthDate: currentUser?.age ? new Date(new Date().setFullYear(new Date().getFullYear() - currentUser.age)) : undefined,
        },
    });

    const handleFormSubmit = async (data: z.infer<typeof profileFormSchema>) => {
        await onSave(data);
    }

    return (
        <Dialog open={open} onOpenChange={isClosable ? onOpenChange : () => {}}>
            <DialogContent onInteractOutside={(e) => {
                if (!isClosable) {
                    e.preventDefault();
                }
            }}>
                <DialogHeader>
                    <DialogTitle>Завершение регистрации</DialogTitle>
                    <DialogDescription>
                        Расскажите немного о себе, чтобы мы могли персонализировать ваш опыт.
                    </DialogDescription>
                </DialogHeader>
                <Form {...profileForm}>
                    <form onSubmit={profileForm.handleSubmit(handleFormSubmit)} className="space-y-4 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <FormField control={profileForm.control} name="firstName" render={({ field }) => (
                                <FormItem><FormLabel>Имя</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                            <FormField control={profileForm.control} name="lastName" render={({ field }) => (
                                <FormItem><FormLabel>Фамилия</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
                            )} />
                        </div>
                        <FormField control={profileForm.control} name="city" render={({ field }) => (
                            <FormItem><FormLabel>Город</FormLabel><FormControl><Input placeholder="Например, Москва" {...field} /></FormControl><FormMessage /></FormItem>
                        )} />
                        <FormField control={profileForm.control} name="role" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Основная роль</FormLabel>
                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl><SelectTrigger><SelectValue placeholder="Выберите вашу основную роль" /></SelectTrigger></FormControl>
                                    <SelectContent>
                                        <SelectItem value="Игрок">Игрок</SelectItem>
                                        <SelectItem value="Судья">Судья</SelectItem>
                                        <SelectItem value="Тренер">Тренер</SelectItem>
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={profileForm.control} name="birthDate" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Дата рождения</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <FormControl>
                                            <Button variant={"outline"} className={cn("w-full justify-start text-left font-normal", !field.value && "text-muted-foreground")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {field.value ? field.value.toLocaleDateString() : <span>Выберите дату</span>}
                                            </Button>
                                        </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={field.value} onSelect={field.onChange} disabled={(date) => date > new Date() || date < new Date("1900-01-01")} initialFocus /></PopoverContent>
                                </Popover>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <DialogFooter>
                            <Button type="submit" disabled={profileForm.formState.isSubmitting}>
                                {profileForm.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Завершить регистрацию
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
