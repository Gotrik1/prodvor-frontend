

'use client';

import type { Team } from "@/mocks";
import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LogoGeneratorWidget } from "@/widgets/logo-generator";
import { TacticalBoard } from "./tactical-board";
import { RosterManagement } from "./roster-management";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { TransfersTab } from "./transfers-tab";
import { users } from "@/mocks";
import { AnnouncementsTab } from "@/views/tournaments/manage/ui/tabs/announcements-tab";

export function TeamManagementPage({ team }: { team: Team | undefined }) {

    if (!team) {
        return (
             <div className="flex flex-col min-h-[80vh] items-center justify-center p-4">
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

    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                 <div>
                    <h1 className="text-3xl font-bold font-headline">Управление командой</h1>
                    <p className="text-muted-foreground mt-1">
                        CRM-панель капитана команды <span className="font-semibold text-primary">{team.name}</span>.
                    </p>
                </div>
                <Button asChild variant="outline">
                    <Link href={`/teams/${team.id}`}>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        К профилю команды
                    </Link>
                </Button>
            </div>
            <Tabs defaultValue="roster" className="w-full">
                <TabsList className="grid w-full grid-cols-5">
                    <TabsTrigger value="roster">Состав и Тактика</TabsTrigger>
                    <TabsTrigger value="branding">Брендинг</TabsTrigger>
                    <TabsTrigger value="transfers">Трансферы</TabsTrigger>
                    <TabsTrigger value="announcements">Анонсы</TabsTrigger>
                    <TabsTrigger value="settings">Настройки</TabsTrigger>
                </TabsList>
                <TabsContent value="roster" className="mt-6 space-y-8">
                    <RosterManagement allTeamMembers={teamMembers} />
                    <TacticalBoard teamMembers={teamMembers} />
                </TabsContent>
                <TabsContent value="branding" className="mt-6">
                    <LogoGeneratorWidget />
                </TabsContent>
                <TabsContent value="transfers" className="mt-6">
                   <TransfersTab team={team} />
                </TabsContent>
                <TabsContent value="announcements" className="mt-6">
                   <AnnouncementsTab />
                </TabsContent>
                <TabsContent value="settings" className="mt-6">
                   <Card><CardHeader><CardTitle>Настройки команды</CardTitle></CardHeader><CardContent><p className="text-muted-foreground">Раздел в разработке.</p></CardContent></Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
