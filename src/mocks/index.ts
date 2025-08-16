import { assignSponsorsToSoloPlayers, users as allUsers } from './users';
import { teams as allTeams, assignedPlayerIds } from './teams';

// After both users and teams are initialized, we can safely assign sponsors
// to solo players without creating a circular dependency.
assignSponsorsToSoloPlayers(allUsers, assignedPlayerIds);

export * from './users';
export * from './teams';
export * from './posts';
export * from './sports';
export * from './personnel';
export * from './requirements';
export * from './challenges';
export * from './playgrounds';
export * from './tournaments';
