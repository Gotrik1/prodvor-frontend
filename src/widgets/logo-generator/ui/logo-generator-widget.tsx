"use client";

import { Bot } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { LogoGenerator } from "./logo-generator";

export function LogoGeneratorWidget() {
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
        <LogoGenerator />
      </CardContent>
    </Card>
  )
}
