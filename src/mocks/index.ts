
// IMPORTANT: Order of imports and exports matters to avoid circular dependencies.

// 1. Import all base data definitions and raw data.
import { users as baseUsers } from './users';
import { teams as baseTeams } from './teams';
import { playgrounds as basePlaygrounds } from './playgrounds';
import { sponsors as baseSponsors } from './personnel';
import { allSports as baseAllSports } from './sports';

// 2. Import and run the central initializer.
import { initializeMockData } from './initialize';

const { users, teams, playgrounds, sponsors, allSports } = initializeMockData({
    users: baseUsers,
    teams: baseTeams,
    playgrounds: basePlaygrounds,
    sponsors: baseSponsors,
    allSports: baseAllSports
});

// 4. Export everything for use in the application.
export { users, teams, playgrounds, sponsors, allSports };
export * from './posts';
export * from './sports';
export * from './personnel';
export * from './requirements';
export * from './challenges';
export * from './tournaments';
export * from './ranks';
export * from './achievements';
export * from './feed-events';
