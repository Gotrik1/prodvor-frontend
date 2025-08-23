
'use client';

import { users, UserRole } from '@/mocks';
import { useUserStore } from '@/widgets/dashboard-header/model/user-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/shared/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { Button } from '@/shared/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const rolesOrder: UserRole[] = [
    'Администратор',
    'Модератор',
    'Организатор',
    'Судья',
    'Тренер',
    'Менеджер',
    'Игрок',
    'Болельщик',
];

export function SimulationPage() {
    const { user: currentUser, setUser } = useUserStore();
    const router = useRouter();

    const groupedUsers = users.reduce((acc, user) => {
        (acc[user.role] = acc[user.role] || []).push(user);
        return acc;
    }, {} as Record<UserRole, typeof users>);

    const handleUserSelect = (userId: string) => {
        const selectedUser = users.find(u => u.id === userId);
        if (selectedUser) {
            setUser(selectedUser);
            // Optionally redirect to dashboard after selection
            // router.push('/dashboard');
        }
    };
    
    const handleStopSimulation = () => {
        setUser(null);
    }

    return (
            <Card>
                <CardHeader>
                    <CardTitle>Режим симуляции</CardTitle>
                    <CardDescription>
                        Выберите пользователя, чтобы увидеть платформу его глазами.
                        После выбора перейдите в <Link href="/dashboard" className="text-primary hover:underline">основной дашборд</Link>, чтобы увидеть изменения.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Select onValueChange={handleUserSelect} value={currentUser?.id}>
                        <SelectTrigger className="w-full max-w-sm">
                            <SelectValue placeholder="Выберите пользователя для симуляции..." />
                        </SelectTrigger>
                        <SelectContent>
                            {rolesOrder.map(role => (
                                groupedUsers[role] && (
                                    <SelectGroup key={role}>
                                        <SelectLabel>{role}</SelectLabel>
                                        {groupedUsers[role].map(user => (
                                            <SelectItem key={user.id} value={user.id}>
                                                {user.firstName} {user.lastName} ({user.nickname})
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                )
                            ))}
                        </SelectContent>
                    </Select>

                    {currentUser && (
                        <div className="p-4 bg-muted/50 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2">
                                <Eye className="h-5 w-5 text-primary" />
                                <div>
                                    <p className="font-semibold">Текущая симуляция:</p>
                                    <p className="text-sm text-muted-foreground">{currentUser.firstName} {currentUser.lastName} ({currentUser.role})</p>
                                </div>
                            </div>
                            <Button variant="destructive" onClick={handleStopSimulation}>
                                <EyeOff className="mr-2 h-4 w-4"/>
                                Завершить симуляцию
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
    );
}
