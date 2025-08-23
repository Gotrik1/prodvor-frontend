
import { teams, allSports } from '@/mocks';

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
