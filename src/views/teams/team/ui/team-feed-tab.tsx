
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/shared/ui/card";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { PostCard } from "@/widgets/dashboard-feed/ui/post-card";
import { Rss } from "lucide-react";
import type { Post, Team, User } from "@/mocks";
import { users } from "@/mocks";

// Mock the current user for CreatePost component
const currentUser = users[0];

export function TeamFeedTab({ posts, team }: { posts: Post[], team: Team }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
                 {/* Assuming the current user is part of the team, show CreatePost */}
                {team.members.includes(currentUser.id) && <CreatePost user={currentUser} />}
                {posts.length > 0 ? (
                    posts.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <Card className="flex items-center justify-center min-h-[300px]">
                        <div className="text-center">
                            <Rss className="mx-auto h-12 w-12 text-muted-foreground" />
                            <h3 className="mt-4 text-lg font-semibold">Новостей пока нет</h3>
                            <p className="mt-1 text-sm text-muted-foreground">Участники команды еще ничего не опубликовали.</p>
                        </div>
                    </Card>
                )}
            </div>
            <div className="md:col-span-1">
                <Card>
                    <CardHeader>
                        <CardTitle>Об авторах</CardTitle>
                        <CardDescription>Пользователи, которые пишут в ленту команды.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Placeholder for authors list */}
                        <p className="text-sm text-muted-foreground">Список авторов будет здесь.</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
