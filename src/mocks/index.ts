// IMPORTANT: Order of imports and exports matters to avoid circular dependencies.

// 1. Import foundational data that doesn't depend on other mocks.
import { users as allUsers, assignSponsorsToSoloPlayers } from './users';
import { sponsors } from './personnel';
import { allSports, teamSports, individualSports } from './sports';
import { playgrounds } from './playgrounds';

// 2. Import data that depends on the above (e.g., teams depend on users, sports, playgrounds).
import { teams as allTeams, assignedPlayerIds } from './teams';

// 3. Import data that depends on everything (e.g., posts, challenges depend on users and teams).
import { posts } from './posts';
import { challenges } from './challenges';
import { tournaments } from './tournaments';
import { requirements } from './requirements';


// After all data is initialized, run post-initialization logic.
assignSponsorsToSoloPlayers(allUsers, assignedPlayerIds);


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
