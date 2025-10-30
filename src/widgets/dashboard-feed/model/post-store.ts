
'use client';

import { create } from 'zustand';
import { produce } from 'immer';
import { posts as initialPosts } from '@/mocks/posts';
import type { Post } from '@/mocks/posts';
import type { User } from '@/mocks';

// In a real app this would be a user object.
type Comment = {
    id: string;
    author: User;
    text: string;
}

interface PostState {
  posts: Post[];
  getPostsForTeam: (teamId: string) => Post[];
  getPostsForUser: (userId: string) => Post[];
  likePost: (postId: string, like: boolean) => void;
  addComment: (postId: string, comment: Comment) => void;
}

export const usePostStore = create<PostState>()(
    (set, get) => ({
      posts: initialPosts,
      getPostsForTeam: (teamId: string) => {
        return get().posts.filter(p => p.team?.id === teamId);
      },
       getPostsForUser: (userId: string) => {
        return get().posts.filter(p => p.author.id === userId);
      },
      likePost: (postId, like) => set(produce((draft: PostState) => {
        const post = draft.posts.find(p => p.id === postId);
        if (post) {
            post.likes += like ? 1 : -1;
        }
      })),
      addComment: (postId, comment) => set(produce((draft: PostState) => {
        const post = draft.posts.find(p => p.id === postId);
        if (post) {
            post.comments.push(comment);
        }
      })),
    })
);
