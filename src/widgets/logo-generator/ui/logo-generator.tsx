
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Bot, Loader2, AlertTriangle, Construction } from "lucide-react";
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
    <>
       <div className="flex flex-col items-center justify-center text-center">
            <Construction className="h-10 w-10 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
                AI-генератор временно недоступен.
            </p>
        </div>
    </>
  );
}
