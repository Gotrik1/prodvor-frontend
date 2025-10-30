import type { User } from "@/mocks/users";
import { allSports } from "@/mocks";

// Centralized function to get all disciplines for a user
export const getUserDisciplines = (user: User): string[] => {
    // The user.disciplines array now holds all sport IDs, both personal and from teams.
    // This logic is now handled during mock data initialization.
    return user.disciplines
        .map(id => allSports.find(s => s.id === id)?.name)
        .filter((name): name is string => !!name);
};
