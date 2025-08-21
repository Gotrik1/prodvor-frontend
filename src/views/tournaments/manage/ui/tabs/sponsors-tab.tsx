'use client';

import { Button } from '@/shared/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/shared/ui/card';
import { UserPlus, Send } from 'lucide-react';
import Link from 'next/link';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar';
import { Input } from '@/shared/ui/input';
import { Textarea } from '@/shared/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { sponsors as initialSponsors } from '@/views/tournaments/public-page/ui/mock-data';

export function SponsorsTab() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Спонсоры</CardTitle>
          <CardDescription>
            Управление спонсорами и партнерами турнира.
          </CardDescription>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Привлечь спонсора
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Пригласить спонсора</DialogTitle>
              <DialogDescription>
                Отправьте предложение о сотрудничестве.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input placeholder="Название компании-спонсора" />
              <Textarea placeholder="Текст предложения..." />
            </div>
            <DialogFooter>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Отправить предложение
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Спонсор</TableHead>
                <TableHead>Вклад</TableHead>
                <TableHead className="text-right">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {initialSponsors.map((sponsor) => (
                <TableRow key={sponsor.id}>
                  <TableCell className="font-medium">
                    <Link
                      href={`/sponsors/${sponsor.id}`}
                      className="flex items-center gap-3 group"
                    >
                      <Avatar>
                        <AvatarImage src={sponsor.logoUrl} />
                        <AvatarFallback>{sponsor.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="group-hover:text-primary transition-colors">
                        {sponsor.name}
                      </span>
                    </Link>
                  </TableCell>
                  <TableCell>{sponsor.contribution}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="destructive" size="sm">
                      Удалить
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
