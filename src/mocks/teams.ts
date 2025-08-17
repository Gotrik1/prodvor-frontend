
import { assignTeamsToPlaygrounds, playgrounds } from "./playgrounds";
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
  sportId: string; // ID of the sport
  rank: number;
  homePlaygroundIds?: string[];
  dataAiHint: string;
  followers: string[]; // Array of user IDs
  following: string[]; // Array of team IDs
  sponsorIds?: string[]; // Array of sponsor IDs
}


// --- Player Assignment Logic ---
// Key: userId, Value: { count: number, sports: Set<string> }
const playerTeamAssignments: Record<string, { count: number, sports: Set<string> }> = {};
users.forEach(p => { 
    if (p.role === 'Игрок') {
        playerTeamAssignments[p.id] = { count: 0, sports: new Set() };
    }
});

const MAX_TEAMS_PER_PLAYER = 5;

// --- Stable Team Generation ---
const generatedTeams: Team[] = [];
let teamIdCounter = 1;

const stableTeamNames = [
    "Ночные Снайперы", "Короли Асфальта", "Стальные Ястребы", "Бетонные Тигры",
    "Разрушители", "Фортуна", "Красная Фурия", "Легион", "Авангард", "Гром",
    "Молния", "Вихрь", "Соколы", "Ястребы", "Тигры", "Медведи", "Звезды",
    "Динамо", "Спартак", "Зенит", "ЦСКА", "Локомотив", "Сити", "Юнайтед"
];

// Sort players to ensure predictable assignment order
const players = users.filter(u => u.role === 'Игрок').sort((a, b) => a.id.localeCompare(b.id));

teamSports.forEach(sport => {
    // Create up to 4 teams per sport
    for (let i = 0; i < 4; i++) {
        // --- Find available captain ---
        const availableCaptains = players.filter(p => {
            const assignment = playerTeamAssignments[p.id];
            return assignment && assignment.count < MAX_TEAMS_PER_PLAYER && !assignment.sports.has(sport.id);
        });

        if (availableCaptains.length === 0) break; // No more captains for this sport
        const captain = availableCaptains[0];

        // --- Find available members ---
        const availableMembers = players.filter(p => {
             const assignment = playerTeamAssignments[p.id];
             return p.id !== captain.id && assignment && assignment.count < MAX_TEAMS_PER_PLAYER && !assignment.sports.has(sport.id);
        });
        
        const memberCount = 4; // 4 members + 1 captain = 5 players
        if (availableMembers.length < memberCount) continue; // Not enough players for a full team

        const newMembers = availableMembers.slice(0, memberCount);
        const teamMembersIds = [captain.id, ...newMembers.map(m => m.id)];
        
        // --- Assign Playgrounds (predictable) ---
        let homePlaygroundIds: string[] | undefined = undefined;
        // ~80% chance to have a playground, based on predictable teamId
        if ((teamIdCounter % 5) !== 0 && playgrounds.length > 0) {
            homePlaygroundIds = [];
            const count = (teamIdCounter % 3) + 1; // 1 to 3 playgrounds
            for (let j = 0; j < count; j++) {
                const playgroundIndex = (teamIdCounter + j) % playgrounds.length;
                if(playgrounds[playgroundIndex]) {
                    homePlaygroundIds.push(playgrounds[playgroundIndex].id);
                }
            }
        }

        // --- Create team (predictable name) ---
        const namePart1 = stableTeamNames[teamIdCounter % stableTeamNames.length];
        const namePart2 = stableTeamNames[(teamIdCounter + 5) % stableTeamNames.length];
        const teamName = `${namePart1} ${namePart2}`;

        const team: Team = {
            id: `team${teamIdCounter++}`,
            name: teamName,
            logoUrl: `https://placehold.co/100x100.png`,
            dataAiHint: 'sports emblem',
            game: sport.name,
            sportId: sport.id,
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
            if (playerTeamAssignments[memberId]) {
                playerTeamAssignments[memberId].count++;
                playerTeamAssignments[memberId].sports.add(sport.id);
            }
        });
    }
});

// --- Populate Social Graph for Teams (predictable) ---
const allTeamIds = generatedTeams.map(t => t.id);
const allUserIds = users.map(u => u.id);

generatedTeams.forEach((team, index) => {
    // Assign followers (users)
    const followersCount = (index % 5) + 3; // 3 to 7 followers
    for (let i = 0; i < followersCount; i++) {
        const userIndex = (index + i) % allUserIds.length;
        team.followers.push(allUserIds[userIndex]);
    }

    // Assign following (other teams)
    const followingCount = (index % 3) + 1; // 1 to 3 following
     for (let i = 0; i < followingCount; i++) {
        const teamIndex = (index + i + 1) % allTeamIds.length;
        if (allTeamIds[teamIndex] !== team.id) {
           team.following.push(allTeamIds[teamIndex]);
        }
    }
});

// --- Assign Sponsors to Teams (predictable) ---
generatedTeams.forEach((team, index) => {
    if (index % 3 === 0 && sponsors.length > 0) { // ~33% chance to have a sponsor
        team.sponsorIds = [sponsors[index % sponsors.length].id];
    }
});

export const teams: Team[] = generatedTeams;

// A set of all user IDs that have been assigned to at least one team.
export const assignedPlayerIds = new Set<string>();
Object.entries(playerTeamAssignments).forEach(([playerId, assignment]) => {
    if (assignment && assignment.count > 0) {
        assignedPlayerIds.add(playerId);
    }
});

// Finally, link the generated teams back to the playgrounds
assignTeamsToPlaygrounds(teams);
