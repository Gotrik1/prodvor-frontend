

'use client';

import { useEffect } from 'react';
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import { usePostStore } from "../model/post-store";
import { PostCard } from "@/widgets/post-card";
import { EventCard } from './event-card';
import { mockFeedEvents } from '@/mocks';

// Helper to interleave and sort posts and events
const combineAndSortFeed = (posts: any[], events: any[]) => {
  const combined = [
    ...posts.map(p => ({ ...p, sortDate: new Date(p.timestamp) })),
    ...events.map(e => ({ ...e, sortDate: new Date(e.timestamp) }))
  ];
  return combined.sort((a, b) => b.sortDate.getTime() - a.sortDate.getTime());
};

export function DashboardFeed() {
  const { user: currentUser } = useUserStore();
  const { posts, fetchPosts } = usePostStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);


  if (!currentUser) {
    return null;
  }

  // Combine and sort feed
  const combinedFeed = combineAndSortFeed(posts, mockFeedEvents);


  return (
    <div className="space-y-4">
      {combinedFeed.map((item: any) => {
        // Check if it's a post or an event and render accordingly
        if ('author' in item) { // This is a Post
          return <PostCard key={`post-${item.id}`} post={item} />;
        } else { // This is an Event
          return <EventCard key={`event-${item.id}`} event={item} />;
        }
      })}
    </div>
  );
}
