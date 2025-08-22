
'use client';

import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/shared/ui/card';
import { PlusCircle, Send, Edit } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/shared/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Input } from '@/shared/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { users } from '@/mocks';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Label } from '@/shared/ui/label';

const mockDisqualifiedPlayers = [
  {
    ...users[0],
    status: 'Активна',
    reason: 'Красная карточка',
    duration: '1 матч',
  },
  {
    ...users[8],
    status: 'Завершена',
    reason: 'Перебор желтых',
    duration: '1 матч',
  },
];

const sanctionStatusColors: Record<string, string> = {
  Активна: 'bg-red-500/20 text-red-300 border-red-500/30',
  Завершена: 'bg-muted text-muted-foreground border-border',
  Отменена: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

export function StaffTab() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Персонал турнира</CardTitle>
                <CardDescription>Судьи, организаторы и другие роли.</CardDescription>
            </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <PlusCircle className="mr-2 h-4 w-4" />
                Пригласить
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Пригласить персонал</DialogTitle>
                <DialogDescription>
                  Найдите пользователя по никнейму и отправьте ему приглашение.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <Input placeholder="Никнейм пользователя..." />
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите роль" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="referee">Судья</SelectItem>
                    <SelectItem value="organizer">Организатор</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <DialogFooter>
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Отправить приглашение
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {users
              .filter((s) => s.role === 'Судья' || s.role === 'Организатор')
              .slice(0, 3)
              .map((person) => (
                <li key={person.id}>
                  <Link
                    href={`/users/${person.id}`}
                    className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={person.avatarUrl} />
                        <AvatarFallback>
                          {person.firstName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p>
                          {person.firstName} {person.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {person.role}
                        </p>
                      </div>
                    </div>
                    <Badge variant={'secondary'}>Принято</Badge>
                  </Link>
                </li>
              ))}
          </ul>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Дисциплинарные санкции</CardTitle>
                <CardDescription>Дисквалификации и другие ограничения.</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Игрок</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead className="text-right">Действие</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDisqualifiedPlayers.map((player) => (
                  <TableRow key={player.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={player.avatarUrl} />
                          <AvatarFallback>
                            {player.nickname.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{player.nickname}</p>
                          <p className="text-xs text-muted-foreground">
                            {player.reason} ({player.duration})
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={sanctionStatusColors[player.status]}>
                        {player.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <Edit className="mr-2 h-3 w-3" />
                            Изменить
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Изменить статус санкции</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label>Игрок</Label>
                              <Input value={player.nickname} disabled />
                            </div>
                            <div className="space-y-2">
                              <Label>Статус</Label>
                              <Select defaultValue={player.status}>
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="Активна">Активна</SelectItem>
                                  <SelectItem value="Завершена">
                                    Завершена
                                  </SelectItem>
                                  <SelectItem value="Отменена">
                                    Отменена
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button>Сохранить</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
