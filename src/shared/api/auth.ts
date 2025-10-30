

import { users } from '@/mocks';
import type { User } from '@/mocks';

/**
 * Mock function to simulate user login.
 * @param email - The user's email.
 * @param password - The user's password.
 * @returns The user object if login is successful, otherwise null. // The password parameter is intentionally unused in this mock.
 */
export async function signIn(email: string): Promise<User | null> {
    // This is a mock implementation. It finds the first user with the matching email.
    // In a real app, you would verify the password hash.
    const user = users.find(u => u.email === email);
    if (user) {
        console.log(`Sign in successful for ${user.nickname}`);
        return user;
    }
    console.log('Sign in failed: user not found');
    return null;
}

/**
 * Mock function to simulate user registration.
 * @param userData - The new user's data.
 * @returns The created user object.
 */
export async function signUp(userData: Omit<User, 'id'>): Promise<User> {
    console.log(`Registering new user with email: ${userData.email}`);
    const newUser: User = {
        id: `user${Date.now()}`,
        ...userData,
    };
    // In a real app, you would add this user to the database.
    users.push(newUser);
    console.log(`Registration successful for ${newUser.nickname}`);
    return newUser;
}

/**
 * Mock function to simulate user sign out.
 */
export async function signOut(): Promise<void> {
    console.log('User signed out.');
    return Promise.resolve();
}
