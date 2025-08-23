
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import { User, ClipboardList, Gavel, Briefcase, Shield, Megaphone, Handshake, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const roles: { id: string; name: string; description: string; icon: LucideIcon }[] = [
    { id: 'player', name: "Игрок", description: "Основная роль на платформе. Участвует в матчах, состоит в командах, имеет личную статистику.", icon: User },
    { id: 'coach', name: "Тренер", description: "Управляет составом, назначает тренировки, анализирует матчи.", icon: ClipboardList },
    { id: 'referee', name: "Судья", description: "Проводит матчи, фиксирует результаты, следит за соблюдением правил.", icon: Gavel },
    { id: 'manager', name: "Менеджер", description: "Управляет несколькими командами или игроками, занимается трансферами.", icon: Briefcase },
    { id: 'organizer', name: "Организатор", description: "Создает и проводит турниры, лиги и другие мероприятия.", icon: Megaphone },
    { id: 'sponsor', name: "Спонсор", description: "Поддерживает команды или турниры, имеет публичную страницу.", icon: Handshake },
    { id: 'fan', name: "Болельщик", description: "Следит за командами и игроками, просматривает матчи, участвует в жизни сообщества.", icon: Star },
    { id: 'moderator', name: "Модератор", description: "Следит за порядком на платформе, управляет контентом и пользователями.", icon: Shield },
];


export function RolesPage() {
  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">ID</TableHead>
            <TableHead>Роль</TableHead>
            <TableHead>Описание</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {roles.map(role => (
                    <TableRow key={role.id}>
                        <TableCell className="font-mono text-xs">{role.id}</TableCell>
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
