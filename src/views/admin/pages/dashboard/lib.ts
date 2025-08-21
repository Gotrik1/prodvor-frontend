
import { teams, allSports } from '@/mocks';
import type { User } from '@/mocks';

// Create a flat list of all sports including subdisciplines for easy lookup
export const allSportsFlat = allSports.reduce((acc, sport) => {
    acc.push({ id: sport.id, name: sport.name });
    if (sport.subdisciplines) {
        sport.subdisciplines.forEach(sub => {
            acc.push({ id: sub.id, name: sub.name });
        });
    }
    return acc;
}, [] as { id: string, name: string }[]);

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
