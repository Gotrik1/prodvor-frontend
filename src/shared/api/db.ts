import { users, teams, tournaments, posts } from '@/mocks';
import type { User, Team } from '@/mocks';
import type { Tournament } from '@/views/tournaments/public-page/ui/mock-data';

/**
 * Mock function to get a list of teams.
 * In the future, this will be replaced with a Firestore query.
 */
export async function getTeams(): Promise<Team[]> {
    return Promise.resolve(teams);
}

/**
 * Mock function to get a specific team by its ID.
 * In the future, this will be replaced with a Firestore query.
 */
export async function getTeamById(id: string): Promise<Team | undefined> {
    return Promise.resolve(teams.find(t => t.id === id));
}

/**
 * Mock function to get a list of users.
 * In the future, this will be replaced with a Firestore query.
 */
export async function getUsers(): Promise<User[]> {
    return Promise.resolve(users);
}

/**
 * Mock function to get a specific user by their ID.
 * In the future, this will be replaced with a Firestore query.
 */
export async function getUserById(id: string): Promise<User | undefined> {
    return Promise.resolve(users.find(u => u.id === id));
}

/**
 * Mock function to get a list of tournaments.
 */
export async function getTournaments(): Promise<Tournament[]> {
    return Promise.resolve(tournaments);
}

/**
 * Mock function to get the social feed posts.
 */
export async function getFeedPosts() {
    return Promise.resolve(posts);
}
