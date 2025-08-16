

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
  homePlaygroundIds?: string[];
  dataAiHint: string;
  followers: string[]; // Array of user IDs
  following: string[]; // Array of team IDs
  sponsorIds?: string[]; // Array of sponsor IDs
}


// --- Player Assignment Logic ---
const players = users.filter(u => u.role === 'Игрок');
// Key: userId, Value: Set of sport names the player is in
const playerAssignments: Record<string, Set<string>> = {};
players.forEach(p => { playerAssignments[p.id] = new Set() });

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
    // Create up to 4 teams per sport, depending on available players
    for (let i = 0; i < 4; i++) {
        // --- Find available captain ---
        const availableCaptains = players.filter(p => 
            (playerAssignments[p.id]?.size || 0) < MAX_TEAMS_PER_PLAYER && 
            !playerAssignments[p.id]?.has(sport.name)
        );

        if (availableCaptains.length === 0) break; // No more captains for this sport
        const captain = availableCaptains[0];

        // --- Find available members ---
        const availableMembers = players.filter(p => 
            p.id !== captain.id &&
            (playerAssignments[p.id]?.size || 0) < MAX_TEAMS_PER_PLAYER &&
            !playerAssignments[p.id]?.has(sport.name)
        );
        
        const memberCount = 4; // 4 members + 1 captain = 5 players
        if (availableMembers.length < memberCount) continue; // Not enough players for a full team

        const newMembers = availableMembers.slice(0, memberCount);
        const teamMembersIds = [captain.id, ...newMembers.map(m => m.id)];
        
        // --- Assign Playgrounds ---
        let homePlaygroundIds: string[] | undefined = undefined;
        // ~80% chance to have a playground
        if (Math.random() < 0.8 && playgrounds.length > 0) {
            homePlaygroundIds = [];
            const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 playgrounds
            const shuffledPlaygrounds = [...playgrounds].sort(() => 0.5 - Math.random());
            for (let j = 0; j < count; j++) {
                if(shuffledPlaygrounds[j]) {
                    homePlaygroundIds.push(shuffledPlaygrounds[j].id);
                }
            }
        }

        // --- Create team ---
        const teamName = `${stableTeamNames[teamIdCounter % stableTeamNames.length]} ${sport.name.slice(0,3)}`;

        const team: Team = {
            id: `team${teamIdCounter++}`,
            name: teamName,
            logoUrl: `https://placehold.co/100x100.png`,
            dataAiHint: 'sports emblem',
            game: sport.name,
            captainId: captain.id,
            members: teamMembersIds,
            rank: 1200 + (teamIdCounter * 17 % 500), // Predictable rank
            homePlaygroundIds,
            followers: [],
            following: [],
            sponsorIds: [],
        };
        
        generatedTeams.push(team);

        // --- Update assignments for all members ---
        teamMembersIds.forEach(memberId => {
            if (!playerAssignments[memberId]) {
                playerAssignments[memberId] = new Set();
            }
            playerAssignments[memberId].add(sport.name);
        });
    }
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
export const assignedPlayerIds = new Set<string>();
Object.entries(playerAssignments).forEach(([playerId, sports]) => {
    if (sports && sports.size > 0) {
        assignedPlayerIds.add(playerId);
    }
});
