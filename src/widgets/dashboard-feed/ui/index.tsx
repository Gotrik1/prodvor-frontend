
'use client';

import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { CreatePost } from './create-post';
import { PostCard } from './post-card';
import { posts } from '@/mocks';

export function DashboardFeed() {
  const { user: currentUser } = useUserStore();

  if (!currentUser) {
    return null;
  }

  return (
    <div className="space-y-4">
      <CreatePost user={currentUser} />
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
