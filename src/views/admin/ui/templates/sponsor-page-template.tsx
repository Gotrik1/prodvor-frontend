
'use client';

import { sponsors } from "@/mocks";
import type { Sponsor } from "@/mocks/personnel";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { Award, Building, Handshake, Save, User } from "lucide-react";
import Link from "next/link";

const defaultSponsor = sponsors[0];

export function SponsorPageTemplate({ sponsor: sponsorProp }: { sponsor?: Sponsor }) {
    const sponsor = sponsorProp || defaultSponsor;

    if (!sponsor) {
        return (
             <div className="flex flex-col min-h-[80vh] items-center justify-center">
                <Card className="text-center max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Ошибка 404</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Спонсор не найден.
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/dashboard">Вернуться на платформу</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        )
    }


    return (
        <div className="border rounded-lg p-4 md:p-6 space-y-6 bg-muted/20">
            <header className="flex flex-col md:flex-row items-center gap-6">
                <Avatar className="h-24 w-24 border-4 border-primary rounded-md">
                    <AvatarImage src={sponsor.logoUrl} alt={sponsor.name} />
                    <AvatarFallback>{sponsor.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-center md:text-left">
                    <h1 className="text-3xl font-bold font-headline">{sponsor.name}</h1>
                    <p className="text-muted-foreground text-lg">Роль: Спонсор</p>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Award />
                            Спонсируемые турниры
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Информация о спонсируемых турнирах появится здесь.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Handshake />
                            Спонсируемые команды
                        </CardTitle>
                    </CardHeader>
                     <CardContent>
                        <p className="text-muted-foreground">Информация о спонсируемых командах появится здесь.</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Настройки профиля</CardTitle>
                    <CardDescription>Управляйте информацией о себе как о спонсоре.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="legal-entity">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="legal-entity"><Building className="mr-2 h-4 w-4" />Юр. лицо</TabsTrigger>
                            <TabsTrigger value="individual"><User className="mr-2 h-4 w-4" />Физ. лицо</TabsTrigger>
                        </TabsList>
                        <TabsContent value="legal-entity" className="mt-6">
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="org-name">Название организации</Label>
                                    <Input id="org-name" defaultValue={sponsor.name} />
                                </div>
                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="inn">ИНН</Label>
                                        <Input id="inn" placeholder="1234567890" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="kpp">КПП</Label>
                                        <Input id="kpp" placeholder="098765432" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="contact-person">Контактное лицо</Label>
                                    <Input id="contact-person" placeholder="Иванов Иван Иванович" />
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="contact-email">Контактный Email</Label>
                                    <Input id="contact-email" type="email" placeholder="sponsor@example.com" />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="individual" className="mt-6">
                             <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="full-name">ФИО</Label>
                                    <Input id="full-name" placeholder="Петров Петр Петрович" />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="passport-series">Серия паспорта</Label>
                                        <Input id="passport-series" placeholder="0000" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="passport-number">Номер паспорта</Label>
                                        <Input id="passport-number" placeholder="111222" />
                                    </div>
                                </div>
                                 <div className="space-y-2">
                                    <Label htmlFor="phone">Контактный телефон</Label>
                                    <Input id="phone" type="tel" placeholder="+7 (999) 123-45-67" />
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="border-t px-6 py-4">
                     <Button><Save className="mr-2 h-4 w-4" />Сохранить изменения</Button>
                </CardFooter>
            </Card>

        </div>
    );
}
