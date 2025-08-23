
import type { User } from "@/mocks/users";
import { allSports, teams } from "@/mocks";

// Centralized function to get all disciplines for a user
export const getUserDisciplines = (user: User): string[] => {
    const personalDisciplines = user.disciplines
        .map(id => allSports.find(s => s.id === id)?.name)
        .filter((name): name is string => !!name);
    
    const teamDisciplines = teams
        .filter(team => team.members.includes(user.id))
        .map(team => team.game);
        
    const allDisciplinesSet = new Set([...personalDisciplines, ...teamDisciplines]);
    return Array.from(allDisciplinesSet);
};
