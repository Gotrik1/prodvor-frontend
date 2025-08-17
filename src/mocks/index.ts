// IMPORTANT: Order of imports and exports matters to avoid circular dependencies.

// 1. Import foundational data that doesn't depend on other mocks.
import { users, initializeSocialGraphAndSponsors } from './users';
import { sponsors } from './personnel';
import { allSports } from './sports';
import { playgrounds, assignFollowersToPlaygrounds } from './playgrounds';
import { teams, initializeTeams } from './teams';

// 2. Initialize base data and establish relationships.
// It's crucial to initialize in an order that respects dependencies.
// Users are initialized first, but their social graph/sponsors depend on the full list of users.
initializeSocialGraphAndSponsors(users, sponsors);

// Teams depend on users, playgrounds, and sports. This function creates teams and links them.
// This MUST run before assigning followers to playgrounds to ensure resident teams are known.
initializeTeams(users, playgrounds, allSports, sponsors);

// Playgrounds get followers assigned after users and teams are fully initialized.
assignFollowersToPlaygrounds(users);


// 3. Import data that depends on the initialized data above.
import { posts } from './posts';
import { challenges } from './challenges';
import { tournaments } from './tournaments';
import { requirements } from './requirements';

// 4. Export everything for use in the application.
export * from './users';
export * from './teams';
export * from './posts';
export * from './sports';
export * from './personnel';
export * from './requirements';
export * from './challenges';
export * from './playgrounds';
export * from './tournaments';
