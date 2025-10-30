

import { users, teams, posts, allTournaments as tournaments } from '@/mocks';
import type { User, Team, Tournament } from '@/mocks';

/**
 * Mock function to get a list of teams.
 */
export async function getTeams(): Promise<Team[]> {
    return Promise.resolve(teams);
}

/**
 * Mock function to get a specific team by its ID.
 */
export async function getTeamById(id: string): Promise<Team | undefined> {
    return Promise.resolve(teams.find(t => t.id === id));
}

/**
 * Mock function to get a list of users.
 */
export async function getUsers(): Promise<User[]> {
    return Promise.resolve(users);
}

/**
 * Mock function to get a specific user by their ID.
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
