

import { User } from './users';
import { Team } from './teams';

export interface Comment {
    id: string;
    author: User;
    text: string;
}

export interface Post {
  id: string;
  author: User;
  team?: Team; // Optional team context
  content: string;
  timestamp: string;
  likes: number;
  comments: Comment[];
  shares: number;
}

export const posts: Post[] = [];
