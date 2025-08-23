
"use client";

import { Card, CardContent } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/ui/avatar";
import type { User } from "@/mocks/users";

export function CreatePost({ user }: { user: User }) {
  if (!user) return null;

  return (
    <Card className="bg-card">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={user.avatarUrl} />
            <AvatarFallback>{user.nickname?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
          <div className="w-full">
            <textarea
              placeholder="Что у вас нового?"
              className="w-full bg-transparent border-0 focus:ring-0 resize-none text-base p-0"
              rows={2}
            ></textarea>
            <div className="flex justify-end mt-2">
              <Button>Опубликовать</Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
