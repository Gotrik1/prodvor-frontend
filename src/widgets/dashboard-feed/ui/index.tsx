import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { generateNewsDigestAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Trophy } from "lucide-react";
import { CreatePost } from "./create-post";

async function AiDigest() {
  const digest = await generateNewsDigestAction();

  if (digest.error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>{digest.title}</AlertTitle>
        <AlertDescription>
          {digest.content}
          <Button variant="link" className="p-0 h-auto text-destructive">
            Попробовать снова
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div>
      <h3 className="font-bold text-lg mb-2">{digest.title}</h3>
      <p className="text-muted-foreground whitespace-pre-wrap">{digest.content}</p>
    </div>
  );
}

export function DashboardFeed() {
  return (
    <>
      <Card className="bg-card">
        <CardHeader className="flex flex-row items-center gap-2">
          <Trophy className="h-5 w-5 text-primary" />
          <CardTitle>AI-Дайджест</CardTitle>
        </CardHeader>
        <CardContent>
          <AiDigest />
        </CardContent>
      </Card>
      <CreatePost />
    </>
  );
}
