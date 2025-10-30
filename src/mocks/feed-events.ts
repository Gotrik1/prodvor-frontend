

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
        type: 'match_win',
        timestamp: '2025-08-15T12:30:00.000Z',
        userIds: ['user1', 'user2', 'user5', 'user6'],
        teamIds: ['team1', 'team2'],
        details: {
            score1: 5,
            score2: 3
        }
    },
    {
        id: 'event-2',
        type: 'achievement_unlocked',
        timestamp: '2025-08-15T11:00:00.000Z',
        userIds: ['user1'],
        teamIds: ['team1'],
        details: {
            achievementId: 'ach-fb-2' // Хет-трик
        }
    },
    {
        id: 'event-3',
        type: 'team_join',
        timestamp: '2025-08-14T18:00:00.000Z',
        userIds: ['user8'],
        teamIds: ['team3'],
        details: {}
    },
     {
        id: 'event-4',
        type: 'match_win',
        timestamp: '2025-08-14T21:00:00.000Z',
        userIds: ['user3', 'user7', 'user5', 'user6'],
        teamIds: ['team3', 'team4'],
        details: {
            score1: 2,
            score2: 1
        }
    },
    {
        id: 'event-5',
        type: 'achievement_unlocked',
        timestamp: '2025-08-13T09:45:00.000Z',
        userIds: ['user5'],
        teamIds: ['team2'],
        details: {
            achievementId: 'ach-bask-4' // Снайпер
        }
    },
];
