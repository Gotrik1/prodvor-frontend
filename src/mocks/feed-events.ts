
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

export const mockFeedEvents: FeedEvent[] = [
    {
        id: 'event-1',
        type: 'team_join',
        timestamp: '2025-10-27T10:00:00Z',
        userIds: ['user1'],
        teamIds: ['team1'],
        details: {},
    },
    {
        id: 'event-2',
        type: 'match_win',
        timestamp: '2025-10-26T21:30:00Z',
        userIds: [],
        teamIds: ['team2', 'team3'],
        details: { score1: 3, score2: 1 },
    },
    {
        id: 'event-3',
        type: 'achievement_unlocked',
        timestamp: '2025-10-26T15:00:00Z',
        userIds: ['user2'],
        teamIds: [],
        details: { achievementId: 'ach-fb-2' },
    },
    {
        id: 'event-4',
        type: 'team_join',
        timestamp: '2025-10-25T12:00:00Z',
        userIds: ['user4'],
        teamIds: ['team5'],
        details: {},
    },
];
