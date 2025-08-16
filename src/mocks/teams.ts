
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
const players = users.filter(u => u.role === 'Игрок');
// Key: userId, Value: count of teams the player is in
const playerTeamCount: Record<string, number> = {};
players.forEach(p => { playerTeamCount[p.id] = 0 });

const MAX_TEAMS_PER_PLAYER = 5;

// --- Stable Team Generation ---
const generatedTeams: Team[] = [];
let teamIdCounter = 1;

const stableTeamNames = [
    "Ночные Снайперы", "Короли Асфальта", "Стальные Ястребы", "Бетонные Тигры",
    "Разрушители", "Фортуна", "Красная Фурия", "Легион", "Авангард", "Гром",
    "Молния", "Вихрь", "Соколы", "Ястребы", "Тигры", "Медведи", "Звезды",
    "Динамо", "Спартак", "Зенит", "ЦСКА", "Локомотив"
];


teamSports.forEach(sport => {
    const sportTeamsToCreate = stableTeamNames.slice(0, 4); // Create 4 teams per sport
    
    sportTeamsToCreate.forEach(baseName => {
        const teamName = `${baseName} ${sport.name.slice(0,3)}`;

        // Find available captain
        const availableCaptains = players.filter(p => playerTeamCount[p.id] < MAX_TEAMS_PER_PLAYER);
        if (availableCaptains.length === 0) return; // No more available players

        const captain = availableCaptains[0];
        
        // Find available members
        const availableMembers = players.filter(p => p.id !== captain.id && playerTeamCount[p.id] < MAX_TEAMS_PER_PLAYER);

        const memberCount = 5;
        if (availableMembers.length < memberCount - 1) return; // Not enough players for a full team

        const newMembers = availableMembers.slice(0, memberCount - 1);
        const teamMembersIds = [captain.id, ...newMembers.map(m => m.id)];

        // Create team and update counts
        const team: Team = {
            id: `team${teamIdCounter++}`,
            name: teamName,
            logoUrl: `https://placehold.co/100x100.png`,
            dataAiHint: 'sports emblem',
            game: sport.name,
            captainId: captain.id,
            members: teamMembersIds,
            rank: 1200 + (teamIdCounter * 17 % 500), // Predictable rank
            homePlaygroundId: playgrounds[teamIdCounter % playgrounds.length].id,
            followers: [],
            following: [],
            sponsorIds: [],
        };
        
        generatedTeams.push(team);
        
        // Increment team count for all members
        teamMembersIds.forEach(memberId => {
            playerTeamCount[memberId]++;
        });
    });
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
    Object.keys(playerTeamCount).filter(id => playerTeamCount[id] > 0)
);
