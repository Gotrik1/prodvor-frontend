
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { User, ClipboardList, Gavel, Briefcase, Shield, Megaphone, Handshake, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const roles: { name: string; description: string; icon: LucideIcon }[] = [
    { name: "Игрок", description: "Основная роль на платформе. Участвует в матчах, состоит в командах, имеет личную статистику.", icon: User },
    { name: "Тренер", description: "Управляет составом, назначает тренировки, анализирует матчи.", icon: ClipboardList },
    { name: "Судья", description: "Проводит матчи, фиксирует результаты, следит за соблюдением правил.", icon: Gavel },
    { name: "Менеджер", description: "Управляет несколькими командами или игроками, занимается трансферами.", icon: Briefcase },
    { name: "Организатор", description: "Создает и проводит турниры, лиги и другие мероприятия.", icon: Megaphone },
    { name: "Спонсор", description: "Поддерживает команды или турниры, имеет публичную страницу.", icon: Handshake },
    { name: "Болельщик", description: "Следит за командами и игроками, просматривает матчи, участвует в жизни сообщества.", icon: Star },
    { name: "Модератор", description: "Следит за порядком на платформе, управляет контентом и пользователями.", icon: Shield },
];


export function RolesPage() {
  return (
    <div className="border rounded-lg">
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>Роль</TableHead>
                    <TableHead>Описание</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {roles.map(role => (
                    <TableRow key={role.name}>
                        <TableCell className="font-medium whitespace-nowrap">
                            <div className="flex items-center gap-2">
                                <role.icon className="h-5 w-5 text-primary" />
                                {role.name}
                            </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{role.description}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </div>
  );
}
