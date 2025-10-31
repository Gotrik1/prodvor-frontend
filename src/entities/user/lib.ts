import type { User, Sport } from "@/mocks/users";

// Centralized function to get all disciplines for a user
export const getUserDisciplines = (user: User, allSports: Sport[]): string[] => {
    // The user.disciplines array now holds all sport IDs.
    if (!user || !user.disciplines) {
        return [];
    }
    return user.disciplines
        .map(id => allSports.find(s => s.id === id)?.name)
        .filter((name): name is string => !!name);
};
