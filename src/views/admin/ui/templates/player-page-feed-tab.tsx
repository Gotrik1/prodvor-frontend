
import { Card } from "@/shared/ui/card";
import { CreatePost } from "@/widgets/dashboard-feed/ui/create-post";
import { PostCard } from "@/widgets/dashboard-feed/ui/post-card";
import { posts } from "@/mocks";
import type { User } from "@/mocks";

export function FeedTab({ player, isOwnProfile }: { player: User; isOwnProfile: boolean }) {
    const playerPosts = posts.filter(p => p.author.id === player.id);
    return (
        <div className="space-y-4">
            {isOwnProfile && <CreatePost user={player} />}
            {playerPosts.length > 0 ? (
                 playerPosts.map(post => <PostCard key={post.id} post={post} />)
            ) : (
                <Card className="flex items-center justify-center min-h-[200px]">
                    <p className="text-muted-foreground">У игрока пока нет записей.</p>
                </Card>
            )}
        </div>
    )
};
