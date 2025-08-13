import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
// import { generateNewsDigestAction } from "@/app/actions";
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert";
import { Button } from "@/shared/ui/button";
import { Trophy, Bot } from "lucide-react";
import { CreatePost } from "./create-post";
import { users } from "@/mocks";

const currentUser = users[0]; // Assuming user1 is the logged-in user for the main dashboard

function AiDigest() {
    return (
        <Alert variant="destructive">
            <Bot className="h-4 w-4" />
            <AlertTitle>AI-Дайджест временно недоступен</AlertTitle>
            <AlertDescription>
            Эта функция отключена для устранения неполадок.
            </AlertDescription>
        </Alert>
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
      <CreatePost user={currentUser} />
    </>
  );
}
