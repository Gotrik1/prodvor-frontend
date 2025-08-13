import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { ArrowLeft, Bot, HardDrive } from "lucide-react";
import Link from "next/link";
import { CreateTournamentForm } from "./create-tournament-form";
import { AiAssistantForm } from "./ai-assistant-form";


export function CreateTournamentPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                     <Button asChild variant="outline">
                        <Link href="/tournaments">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Назад к турнирам
                        </Link>
                    </Button>
                    <h1 className="text-lg font-semibold">Создание нового турнира</h1>
                </div>
            </header>
            <main className="flex-1 p-4 md:p-6 lg:p-8">
                <div className="container mx-auto max-w-4xl">
                    <Tabs defaultValue="manual">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="ai">
                                <Bot className="mr-2 h-4 w-4"/>
                                AI-Мастер
                            </TabsTrigger>
                            <TabsTrigger value="manual">
                                <HardDrive className="mr-2 h-4 w-4"/>
                                Ручной режим
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="ai">
                           <AiAssistantForm />
                        </TabsContent>
                        <TabsContent value="manual">
                            <CreateTournamentForm />
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
        </div>
    );
}
