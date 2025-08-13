
'use client';

import { teams, users } from "@/mocks";
import type { Team, User } from "@/mocks";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Crown, Edit, Mail, Shield, Trash2, UserPlus, Users, XCircle } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Badge } from "@/shared/ui/badge";
import { Input } from "@/shared/ui/input";
import { Separator } from "@/shared/ui/separator";
import { LogoGeneratorWidget } from "@/widgets/logo-generator";

const mockApplications = users.slice(2, 4).map(u => ({ ...u, status: 'pending' }));

export function TeamManagementPage({ team }: { team: Team | undefined }) {

    if (!team) {
        return (
             <div className="flex flex-col min-h-screen items-center justify-center p-4">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Команда не найдена.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/dashboard">Вернуться на платформу</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const teamMembers = users.filter(u => team.members.includes(u.id));
    const captain = users.find(u => u.id === team.captainId);

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <LogoGeneratorWidget />
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Users />Состав команды ({teamMembers.length})</CardTitle>
                            <CardDescription>Управление текущими участниками вашей команды.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3">
                                {teamMembers.map(member => (
                                    <li key={member.id} className="flex items-center justify-between p-2 rounded-md bg-muted/30 hover:bg-muted/60 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={member.avatarUrl} />
                                                <AvatarFallback>{member.firstName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-semibold">{member.nickname}</p>
                                                <p className="text-xs text-muted-foreground">{member.firstName} {member.lastName}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                                {member.id === captain?.id ? (
                                                <Badge variant="default"><Crown className="mr-1 h-3 w-3" />Капитан</Badge>
                                                ) : (
                                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-destructive">
                                                    <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Mail />Заявки на вступление ({mockApplications.length})</CardTitle>
                            <CardDescription>Рассмотрите заявки от игроков, желающих присоединиться к вашей команде.</CardDescription>
                        </CardHeader>
                        <CardContent>
                                <ul className="space-y-3">
                                {mockApplications.map(applicant => (
                                    <li key={applicant.id} className="flex items-center justify-between p-2 rounded-md bg-muted/30">
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={applicant.avatarUrl} />
                                                <AvatarFallback>{applicant.firstName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                                <div>
                                                <p className="font-semibold">{applicant.nickname}</p>
                                                <p className="text-xs text-muted-foreground">Рейтинг: 1400 ELO</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="outline" size="icon" className="h-8 w-8 bg-green-500/10 border-green-500/20 text-green-300 hover:bg-green-500/20 hover:text-green-200">
                                                <CheckCircle className="h-4 w-4" />
                                            </Button>
                                            <Button variant="outline" size="icon" className="h-8 w-8 bg-red-500/10 border-red-500/20 text-red-300 hover:bg-red-500/20 hover:text-red-200">
                                                <XCircle className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                        <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Shield />Статус команды</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Image src={team.logoUrl} alt={team.name} width={256} height={256} className="w-24 h-24 rounded-lg mx-auto border" data-ai-hint="team logo" />
                                <div className="text-center">
                                <p className="text-lg font-bold">{team.name}</p>
                                <p className="text-sm text-muted-foreground">{team.game}</p>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Рейтинг:</span>
                                <span className="font-bold">{team.rank} ELO</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-muted-foreground">Статус набора:</span>
                                <Badge variant="secondary">Открыт</Badge>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><UserPlus />Пригласить игрока</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <Label htmlFor="nickname-invite">Никнейм игрока</Label>
                                <div className="flex gap-2">
                                    <Input id="nickname-invite" placeholder="Player123" />
                                    <Button variant="secondary">Найти</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
