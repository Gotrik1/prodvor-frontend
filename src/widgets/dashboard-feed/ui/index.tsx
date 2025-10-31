

'use client';

import { useEffect } from 'react';
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { CreatePost } from './create-post';
import { usePostStore } from "../model/post-store";
import { PostCard } from "@/widgets/post-card";

export function DashboardFeed() {
  const { user: currentUser } = useUserStore();
  const { posts, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


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
