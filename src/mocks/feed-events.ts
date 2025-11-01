

export type TeamJoinEventDetails = Record<string, never>;

export interface MatchWinEventDetails {
    score1: number;
    score2: number;
}

export interface AchievementUnlockedEventDetails {
    achievementId: string;
}

export interface FeedEvent {
    id: string;
    type: 'team_join' | 'match_win' | 'achievement_unlocked';
    timestamp: string;
    userIds: string[]; // e.g., user who joined or all players in a match
    teamIds: string[]; // e.g., team joined or teams in a match
    details: TeamJoinEventDetails | MatchWinEventDetails | AchievementUnlockedEventDetails;
}

export const mockFeedEvents: FeedEvent[] = [];
