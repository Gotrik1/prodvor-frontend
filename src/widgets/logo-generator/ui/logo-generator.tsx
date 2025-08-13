
"use client";

import { Construction } from "lucide-react";

export function LogoGenerator() {
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
