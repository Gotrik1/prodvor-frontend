
import type { User } from "@/mocks/users";

// Centralized function to get all disciplines for a user
export const getUserDisciplines = (user: User): string[] => {
    // The user.sports array now holds sport objects { id, name }.
    if (!user || !user.sports) {
        return [];
    }
    return user.sports.map(discipline => discipline.name);
};
