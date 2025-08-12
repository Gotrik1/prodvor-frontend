"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Loader2, AlertTriangle } from "lucide-react";
import Image from "next/image";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { generateLogosAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";

const formSchema = z.object({
  prompt: z.string().min(10, {
    message: "Описание должно быть не менее 10 символов.",
  }),
});

export function LogoGenerator() {
  const [logoUrls, setLogoUrls] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prompt: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setLogoUrls([]);
    setError(null);
    
    const result = await generateLogosAction({
      logoDescription: values.prompt,
    });

    if (result.error || result.logoDataUris.length === 0) {
      setError(result.error || "Не удалось сгенерировать логотипы. Попробуйте другой запрос.");
    } else {
      setLogoUrls(result.logoDataUris);
    }
    
    setIsLoading(false);
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-card/80 border-border/60 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
            <div className="p-3 rounded-md bg-accent/10 text-accent">
                <Bot className="w-8 h-8" />
            </div>
            <div>
                <CardTitle className="font-headline text-2xl">AI-генератор логотипов</CardTitle>
                <CardDescription>Опишите логотип вашей мечты</CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="prompt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Описание логотипа</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Например: 'Агрессивный орел с баскетбольным мячом'"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} size="lg" className="w-full font-bold bg-accent hover:bg-accent/90 text-accent-foreground">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Генерация...
                </>
              ) : (
                "Сгенерировать логотип"
              )}
            </Button>
          </form>
        </Form>
        
        {error && (
            <Alert variant="destructive" className="mt-6">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Ошибка</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}

        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            <div className="w-full aspect-square bg-muted/50 rounded-lg animate-pulse"></div>
            <div className="w-full aspect-square bg-muted/50 rounded-lg animate-pulse" style={{ animationDelay: '200ms' }}></div>
            <div className="w-full aspect-square bg-muted/50 rounded-lg animate-pulse" style={{ animationDelay: '400ms' }}></div>
          </div>
        )}

        {logoUrls.length > 0 && !isLoading && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4 text-center">Ваши варианты логотипов:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {logoUrls.map((url, index) => (
                <div key={index} className="relative aspect-square w-full overflow-hidden rounded-lg border-2 border-primary/50 shadow-lg transition-transform hover:scale-105">
                  <Image
                    src={url}
                    alt={`Generated Logo ${index + 1}`}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
