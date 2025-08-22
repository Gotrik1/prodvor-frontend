// IMPORTANT: Order of imports and exports matters to avoid circular dependencies.

// 1. Import all base data definitions and raw data.
import { users } from './users';
import { teams } from './teams';
import { playgrounds } from './playgrounds';
import { sponsors } from './personnel';
import { allSports } from './sports';
import { posts } from './posts';
import { challenges } from './challenges';
import { tournaments } from './tournaments';
import { requirements } from './requirements';
import { ranks } from './ranks';
import { achievementsBySport } from './achievements';

// 2. Import and run the central initializer.
// This function will mutate the imported arrays to establish relationships.
import { initializeMockData } from './initialize';

initializeMockData({
    users,
    teams,
    playgrounds,
    sponsors,
    allSports
});


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
export * from './ranks';
export * from './achievements';
