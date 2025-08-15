import { playgrounds } from "./playgrounds";
import type { User } from "./users";
import { users } from "./users";

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  captainId: string;
  members: string[]; // array of user IDs
  game: string;
  rank: number;
  homePlaygroundId?: string;
  dataAiHint: string;
  followers: string[]; // Array of user IDs
  following: string[]; // Array of team IDs
}

// --- Helper Data ---
const players = users.filter(u => u.role === 'Игрок');
const teamSports = ['Дворовый футбол', 'Стритбол', 'Волейбол'];
const teamNamesBySport: Record<string, string[]> = {
    'Дворовый футбол': ['Ночные Снайперы', 'Стальные Ястребы', 'Бетонные Тигры', 'Разрушители', 'Красная Фурия', 'Легион', 'Феникс'],
    'Стритбол': ['Короли Асфальта', 'Неудержимые', 'Городские Грифоны'],
    'Волейбол': ['Высокий Полет', 'Песчаные Бури'],
};
const dataAiHints: Record<string, string[]> = {
    'Дворовый футбол': ['sniper scope', 'steel hawk', 'concrete tiger', 'destroyer symbol', 'red fury', 'legion helmet', 'phoenix bird'],
    'Стритбол': ['crown asphalt', 'unstoppable force', 'griffin basketball'],
    'Волейбол': ['volleyball flight', 'sandstorm volleyball'],
};

let playerPool = [...players];

const assignMembers = (captain: User, count: number): string[] => {
    const members = [captain.id];
    for (let i = 0; i < count - 1; i++) {
        if (playerPool.length > 0) {
            const memberIndex = playerPool.findIndex(p => p.id !== captain.id && !members.includes(p.id));
            if (memberIndex !== -1) {
                members.push(playerPool[memberIndex].id);
                playerPool.splice(memberIndex, 1);
            }
        }
    }
    return members;
};


// --- Generate Teams ---
const generatedTeams: Team[] = [];
let teamIdCounter = 1;

teamSports.forEach(sport => {
    const names = teamNamesBySport[sport];
    const hints = dataAiHints[sport];
    for (let i = 0; i < 2; i++) {
        if (playerPool.length > 0 && names[i]) {
            const captain = playerPool.pop()!;
            const team: Team = {
                id: `team${teamIdCounter++}`,
                name: names[i],
                logoUrl: `https://placehold.co/100x100.png`,
                dataAiHint: hints[i],
                game: sport,
                captainId: captain.id,
                members: assignMembers(captain, sport === 'Стритбол' ? 3 : 5),
                rank: 1400 + Math.floor(Math.random() * 300),
                homePlaygroundId: playgrounds[i % playgrounds.length].id,
                followers: [],
                following: [],
            };
            generatedTeams.push(team);
        }
    }
});

// --- Populate Social Graph for Teams ---
const allTeamIds = generatedTeams.map(t => t.id);

generatedTeams.forEach(team => {
    const userIds = users.map(u => u.id);

    // Assign followers (users)
    const followersCount = Math.floor(Math.random() * 15) + 5; // 5 to 20 followers
    for (let i = 0; i < followersCount; i++) {
        const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
        if (!team.followers.includes(randomUserId)) {
            team.followers.push(randomUserId);
        }
    }

    // Assign following (other teams)
    const followingCount = Math.floor(Math.random() * 3) + 1; // 1 to 3 teams
    for (let i = 0; i < followingCount; i++) {
        const randomTeamId = allTeamIds[Math.floor(Math.random() * allTeamIds.length)];
        if (randomTeamId !== team.id && !team.following.includes(randomTeamId)) {
            team.following.push(randomTeamId);
        }
    }
});

export const teams: Team[] = generatedTeams;
