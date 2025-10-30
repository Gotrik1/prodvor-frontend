

// IMPORTANT: Order of imports and exports matters to avoid circular dependencies.

// 1. Import all base data definitions and raw data.
import { users as baseUsers } from './users';
import { teams as baseTeams, registeredTeams as baseRegisteredTeams } from './teams';
import { playgrounds as basePlaygrounds } from './playgrounds';
import { sponsors as baseSponsors } from './personnel';
import { allSports as baseAllSports } from './sports';
import { tournaments as baseTournaments } from './tournaments';

// 2. Import and run the central initializer.
import { initializeMockData } from './initialize';

const { users, teams, playgrounds, sponsors, allSports, tournaments, registeredTeams } = initializeMockData({
    users: baseUsers,
    teams: baseTeams,
    playgrounds: basePlaygrounds,
    sponsors: baseSponsors,
    allSports: baseAllSports,
    tournaments: baseTournaments,
    registeredTeams: baseRegisteredTeams,
});

// 4. Export everything for use in the application.
export { users, teams, playgrounds, sponsors, allSports, tournaments, registeredTeams };
export * from './posts';
export * from './sports';
export * from './personnel';
export * from './requirements';
export * from './challenges';
export * from './achievements';
export * from './feed-events';


// Export types
export type { User, UserRole, UserGender, CoachProfile } from './users';
export type { Team } from './teams';
export type { Playground, FitnessService, ServiceCategory } from './playgrounds';
export type { Sponsor } from './personnel';
export type { Sport, Subdiscipline } from './sports';
export type { Post, Comment } from './posts';
export type { Requirement } from './requirements';
export type { TeamChallenge } from './challenges';
export type { Tournament, BracketMatch, TournamentStatus, TournamentLevel, MediaItem, MatchEvent, EventType } from './tournaments';
export type { Rank } from './ranks';
export type { Achievement } from './achievements';
export type { FeedEvent, TeamJoinEventDetails, MatchWinEventDetails, AchievementUnlockedEventDetails } from './feed-events';
