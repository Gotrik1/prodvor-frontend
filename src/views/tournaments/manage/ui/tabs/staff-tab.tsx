'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { PlusCircle, Send } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/shared/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Input } from "@/shared/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/ui/dialog";
import { users } from '@/mocks';

export function StaffTab() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Судьи</CardTitle>
                     <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" />Пригласить</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Пригласить судью</DialogTitle>
                                <DialogDescription>Найдите пользователя по никнейму и отправьте ему приглашение.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                               <Input placeholder="Никнейм пользователя..." />
                            </div>
                            <DialogFooter>
                                <Button><Send className="mr-2 h-4 w-4"/>Отправить приглашение</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {users.filter(s => s.role === 'Судья').map(person => (
                            <li key={person.id}>
                                <Link href={`/users/${person.id}`} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={person.avatarUrl} />
                                            <AvatarFallback>{person.firstName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{person.firstName} {person.lastName}</span>
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
                    <CardTitle>Организаторы</CardTitle>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm"><PlusCircle className="mr-2 h-4 w-4" />Пригласить</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Пригласить организатора</DialogTitle>
                                <DialogDescription>Найдите пользователя по никнейму и отправьте ему приглашение.</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                               <Input placeholder="Никнейм пользователя..." />
                            </div>
                            <DialogFooter>
                                <Button><Send className="mr-2 h-4 w-4"/>Отправить приглашение</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-3">
                        {users.filter(s => s.role === 'Организатор').map(person => (
                             <li key={person.id}>
                                <Link href={`/users/${person.id}`} className="flex items-center justify-between p-2 rounded-md hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <Avatar>
                                            <AvatarImage src={person.avatarUrl} />
                                            <AvatarFallback>{person.firstName.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        <span>{person.firstName} {person.lastName}</span>
                                    </div>
                                    <Badge variant={'default'}>Приглашен</Badge>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    )
}
