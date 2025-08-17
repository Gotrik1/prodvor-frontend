// IMPORTANT: Order of imports and exports matters to avoid circular dependencies.

// 1. Import foundational data that doesn't depend on other mocks.
import { users } from './users';
import { sponsors } from './personnel';
import { allSports, teamSports, individualSports } from './sports';
import { playgrounds, assignFollowersToPlaygrounds } from './playgrounds';
import { teams as allTeams, initializeTeams } from './teams';

// 2. Initialize base data and establish relationships.
// It's crucial to initialize in an order that respects dependencies.
assignFollowersToPlaygrounds(users);
initializeTeams(users, playgrounds, allSports);


// 3. Import data that depends on everything.
import { posts } from './posts';
import { challenges } from './challenges';
import { tournaments } from './tournaments';
import { requirements } from './requirements';

// 4. Export everything.
export * from './users';
export * from './teams';
export * from './posts';
export * from './sports';
export * from './personnel';
export * from './requirements';
export * from './challenges';
export * from './playgrounds';
export * from './tournaments';
