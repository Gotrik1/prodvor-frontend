
import type { User } from "@/mocks/users";

// Centralized function to get all disciplines for a user
export const getUserDisciplines = (user: User): string[] => {
    // The user.disciplines array now holds sport objects { id, name }.
    if (!user || !user.disciplines) {
        return [];
    }
    return user.disciplines.map(discipline => discipline.name);
};
