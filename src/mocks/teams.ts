
import { playgrounds } from "./playgrounds";
import type { User } from "./users";
import { users } from "./users";
import { teamSports } from "./sports";
import { sponsors } from "./personnel";

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
  sponsorIds?: string[]; // Array of sponsor IDs
}

// --- Player Assignment Logic ---
// Key: userId, Value: array of main sport disciplines they are in
const players = users.filter(u => u.role === 'Игрок');
const playerAssignments: Record<string, string[]> = {}; 
players.forEach(p => { playerAssignments[p.id] = [] });


// --- Stable Team Generation ---
const generatedTeams: Team[] = [];
let teamIdCounter = 1;

const createTeam = (name: string, game: string) => {
    // Find a captain who is not yet assigned to this main sport
    const availableCaptains = players.filter(p => !playerAssignments[p.id].includes(game));
    if (availableCaptains.length === 0) return;

    const captain = availableCaptains[0]; // Take the first available for predictability
    
    playerAssignments[captain.id].push(game);

    const memberCount = 5;
    const availablePlayers = players.filter(p => p.id !== captain.id && !playerAssignments[p.id].includes(game));

    if (availablePlayers.length < memberCount - 1) {
        // Rollback if not enough players
        playerAssignments[captain.id] = playerAssignments[captain.id].filter(g => g !== game);
        return;
    }

    const newMembers = availablePlayers.slice(0, memberCount - 1);
    newMembers.forEach(member => {
        playerAssignments[member.id].push(game);
    });

    const teamMembers = [captain.id, ...newMembers.map(m => m.id)];
    
    const team: Team = {
        id: `team${teamIdCounter++}`,
        name,
        logoUrl: `https://placehold.co/100x100.png`,
        dataAiHint: 'sports emblem',
        game,
        captainId: captain.id,
        members: teamMembers,
        rank: 1200 + (teamIdCounter * 17 % 500), // Predictable rank
        homePlaygroundId: playgrounds[teamIdCounter % playgrounds.length].id,
        followers: [],
        following: [],
        sponsorIds: [],
    };
    generatedTeams.push(team);
};

// --- Predefined, Stable Team Names ---
const stableTeamNames = [
    "Ночные Снайперы", "Короли Асфальта", "Стальные Ястребы", "Бетонные Тигры",
    "Разрушители", "Фортуна", "Красная Фурия", "Легион", "Авангард", "Гром",
    "Молния", "Вихрь", "Соколы", "Ястребы", "Тигры", "Медведи", "Звезды",
    "Динамо", "Спартак", "Зенит", "ЦСКА", "Локомотив"
];

// Generate teams ensuring unique names per sport
teamSports.forEach(sport => {
    const sportTeams = stableTeamNames.slice(0, 4).map(name => `${name} ${sport.name.slice(0,3)}`);
     sportTeams.forEach(name => createTeam(name, sport.name));
});


// --- Populate Social Graph for Teams ---
const allTeamIds = generatedTeams.map(t => t.id);
const allUserIds = users.map(u => u.id);

generatedTeams.forEach((team, index) => {
    // Assign followers (users) - predictable
    const followersCount = (index % 5) + 3;
    for (let i = 0; i < followersCount; i++) {
        const userIndex = (index + i) % allUserIds.length;
        team.followers.push(allUserIds[userIndex]);
    }

    // Assign following (other teams) - predictable
    const followingCount = (index % 3) + 1;
     for (let i = 0; i < followingCount; i++) {
        const teamIndex = (index + i + 1) % allTeamIds.length;
        if (allTeamIds[teamIndex] !== team.id) {
           team.following.push(allTeamIds[teamIndex]);
        }
    }
});


// --- Assign Sponsors to Teams (predictable) ---
generatedTeams.forEach((team, index) => {
    if (index % 2 === 0 && sponsors.length > 0) {
        team.sponsorIds = [sponsors[index % sponsors.length].id];
    }
});


export const teams: Team[] = generatedTeams;

// A set of all user IDs that have been assigned to at least one team.
export const assignedPlayerIds = new Set(
    Object.keys(playerAssignments).filter(id => playerAssignments[id].length > 0)
);

