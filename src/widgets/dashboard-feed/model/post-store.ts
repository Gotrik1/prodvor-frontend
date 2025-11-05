

'use client';

import { create } from 'zustand';
import { produce } from 'immer';
import api from '@/shared/api/axios-instance';
import type { Post, Comment } from '@/mocks/posts';

interface PostState {
  posts: Post[];
  fetchPosts: () => Promise<void>;
  getPostsForTeam: (teamId: string) => Post[];
  getPostsForUser: (userId: string) => Post[];
  likePost: (postId: string, like: boolean) => void;
  addComment: (postId: string, comment: Comment) => void;
}

export const usePostStore = create<PostState>()(
    (set, get) => ({
      posts: [], // Изначально массив пуст
      fetchPosts: async () => {
        try {
            const response = await api.get('/api/v1/posts');
            set({ posts: response.data as Post[] });
        } catch (error) {
            console.error(error);
        }
      },
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

    