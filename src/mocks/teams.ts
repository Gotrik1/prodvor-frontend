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
const teamSports = ['Дворовый футбол', 'Стритбол', 'Волейбол', 'CS2', 'Dota 2', 'Пейнтбол'];
const teamNamesBySport: Record<string, string[]> = {
    'Дворовый футбол': ['Ночные Снайперы', 'Стальные Ястребы'],
    'Стритбол': ['Короли Асфальта', 'Бетонные Тигры'],
    'Волейбол': ['Высокий Полет', 'Песчаные Бури'],
    'CS2': ['Red Fury', 'Legion'],
    'Dota 2': ['Phoenix', 'Destroyers'],
    'Пейнтбол': ['Фортуна', 'Неудержимые'],
};
const dataAiHints: Record<string, string[]> = {
    'Дворовый футбол': ['sniper scope', 'steel hawk'],
    'Стритбол': ['crown asphalt', 'concrete tiger'],
    'Волейбол': ['volleyball flight', 'sandstorm volleyball'],
    'CS2': ['red fury', 'legion helmet'],
    'Dota 2': ['phoenix bird', 'destroyer symbol'],
    'Пейнтбол': ['fortune paintball', 'unstoppable force'],
};

let playerPool = [...players];

const assignMembers = (captain: User, count: number): string[] => {
    const members = [captain.id];
    let attempts = 0; // prevent infinite loops
    while (members.length < count && playerPool.length > 0 && attempts < players.length) {
        const memberIndex = Math.floor(Math.random() * playerPool.length);
        const potentialMember = playerPool[memberIndex];
        if (potentialMember.id !== captain.id && !members.includes(potentialMember.id)) {
            members.push(potentialMember.id);
            playerPool.splice(memberIndex, 1);
        }
        attempts++;
    }
    return members;
};


// --- Generate Teams ---
const generatedTeams: Team[] = [];
let teamIdCounter = 1;

teamSports.forEach(sport => {
    const names = teamNamesBySport[sport];
    const hints = dataAiHints[sport];
    if (names) {
        names.forEach((name, i) => {
            if (playerPool.length > 0) {
                const captainIndex = Math.floor(Math.random() * playerPool.length);
                const captain = playerPool[captainIndex];
                playerPool.splice(captainIndex, 1); // Captain can't be a regular member elsewhere for now

                const team: Team = {
                    id: `team${teamIdCounter++}`,
                    name: name,
                    logoUrl: `https://placehold.co/100x100.png`,
                    dataAiHint: hints[i] || 'team logo',
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
        });
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
