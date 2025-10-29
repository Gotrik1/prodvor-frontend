
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card';
import { Button } from '@/shared/ui/button';
import { AlertTriangle } from 'lucide-react';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center p-4">
      <Card className="text-center max-w-md w-full">
        <CardHeader>
          <div className="mx-auto bg-destructive/10 text-destructive p-4 rounded-full w-fit">
            <AlertTriangle className="h-12 w-12" />
          </div>
          <CardTitle className="mt-4 text-2xl font-headline">
            Что-то пошло не так
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-6">
            Произошла непредвиденная ошибка. Пожалуйста, попробуйте обновить
            страницу.
          </p>
          <Button onClick={() => reset()}>Попробовать снова</Button>
        </CardContent>
      </Card>
    </div>
  );
}
