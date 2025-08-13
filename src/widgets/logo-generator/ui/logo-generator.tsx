
"use client";

import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Wand2, Loader2, AlertTriangle, Download } from "lucide-react";
import Image from 'next/image';
import { generateTeamLogoVariations } from "@/shared/api/generate-team-logo-variations";
import { Skeleton } from "@/shared/ui/skeleton";

export function LogoGenerator() {
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logos, setLogos] = useState<string[]>([]);

  const handleGenerate = async () => {
    if (!description) {
      setError("Пожалуйста, введите описание для логотипа.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setLogos([]);

    const result = await generateTeamLogoVariations({ logoDescription: description });

    if (result.error || result.logoDataUris.length === 0) {
      setError(result.error || "Не удалось сгенерировать логотипы. Попробуйте другой запрос.");
    } else {
      setLogos(result.logoDataUris);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Например: Агрессивный красный дракон с футбольным мячом"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isLoading}
        />
        <Button onClick={handleGenerate} disabled={isLoading} className="sm:w-auto w-full">
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Генерация...
            </>
          ) : (
            <>
              <Wand2 className="mr-2 h-4 w-4" />
              Создать
            </>
          )}
        </Button>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Ошибка</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {isLoading && Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="aspect-square w-full">
             <Skeleton className="w-full h-full rounded-lg" />
          </div>
        ))}
        {logos.map((logoDataUri, index) => (
          <div key={index} className="group relative aspect-square w-full overflow-hidden rounded-lg border">
            <Image
              src={logoDataUri}
              alt={`Generated logo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 hover:text-white">
                    <Download className="h-6 w-6"/>
                </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
