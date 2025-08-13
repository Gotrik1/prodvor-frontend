import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { ArrowLeft, Bot, HardDrive } from "lucide-react";
import Link from "next/link";
import { CreateTournamentForm } from "./create-tournament-form";
import { AiAssistantForm } from "./ai-assistant-form";


export function CreateTournamentPage() {
    return (
        <div className="p-4 md:p-6 lg:p-8">
            <div className="max-w-4xl mx-auto">
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
        </div>
    );
}
