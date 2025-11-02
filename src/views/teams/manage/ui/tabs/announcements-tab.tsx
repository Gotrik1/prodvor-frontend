'use client';

import { Button } from "@/shared/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { Bot, Megaphone, Loader2, Pencil } from "lucide-react";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/shared/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui/form";
import { useToast } from "@/shared/hooks/use-toast";
import { useTournamentCrmContext } from "@/views/tournaments/manage/lib/TournamentCrmContext";

const SendTeamAnnouncementInputSchema = z.object({
  teamId: z.string().describe("The ID of the team."),
  subject: z.string().min(5, { message: "Тема должна содержать не менее 5 символов." }).describe('The subject of the announcement.'),
  message: z.string().min(10, { message: "Сообщение или промпт должно содержать не менее 10 символов." }).describe('The content of the announcement message or a prompt for the AI.'),
  isAiEnhanced: z.boolean().default(false).describe("Whether to use AI to enhance the message.")
});

export function AnnouncementsTab() {
  const { toast } = useToast();
  // In a real app, we would get the team from a context or props
  const teamId = "team1"; 

  const form = useForm<z.infer<typeof SendTeamAnnouncementInputSchema>>({
    resolver: zodResolver(SendTeamAnnouncementInputSchema),
    defaultValues: {
      teamId: teamId,
      subject: "",
      message: "",
      isAiEnhanced: false,
    },
  });

  async function onSubmit(values: z.infer<typeof SendTeamAnnouncementInputSchema>) {
    // We mock the action here
    console.log("Sending team announcement:", values);
    toast({
        title: "Успех!",
        description: "Ваш анонс был успешно отправлен всем подписчикам команды.",
    });
    form.reset({ teamId: values.teamId, subject: '', message: '', isAiEnhanced: values.isAiEnhanced });
  }

  const isAiMode = form.watch("isAiEnhanced");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Анонсы для подписчиков</CardTitle>
        <CardDescription>
          Отправляйте важные сообщения всем, кто следит за вашей командой.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs 
                defaultValue="manual" 
                className="w-full" 
                onValueChange={(value) => form.setValue("isAiEnhanced", value === 'ai')}
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="manual"><Pencil className="mr-2 h-4 w-4" />Ручной режим</TabsTrigger>
                    <TabsTrigger value="ai"><Bot className="mr-2 h-4 w-4" />AI-помощник</TabsTrigger>
                </TabsList>

                <div className="pt-6 space-y-6">
                     <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Тема</FormLabel>
                            <FormControl>
                                <Input
                                placeholder="Например: Изменение в составе"
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    <FormField
                        control={form.control}
                        name="message"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>{isAiMode ? "Опишите суть анонса (промпт)" : "Сообщение"}</FormLabel>
                            <FormControl>
                                <Textarea
                                placeholder={isAiMode ? "Например: напиши пост о нашей последней победе со счетом 3:1" : "Введите текст вашего анонса..."}
                                rows={8}
                                {...field}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </Tabs>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Megaphone className="mr-2 h-4 w-4" />
                    Отправить анонс
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
