
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
  /** Main discipline for indexing, e.g., "Футбол" */
  game: string; 
  /** Sub-discipline, e.g., "мини-футбол". A team in "Футбол" can join "мини-футбол" tournaments. */
  subdiscipline?: string; 
  rank: number;
  homePlaygroundId?: string;
  dataAiHint: string;
  followers: string[]; // Array of user IDs
  following: string[]; // Array of team IDs
  sponsorIds?: string[]; // Array of sponsor IDs
}

// --- Helper Data ---
const players = users.filter(u => u.role === 'Игрок');
const teamNamePrefixes = ['Авангард', 'Легион', 'Гром', 'Молния', 'Вихрь', 'Соколы', 'Ястребы', 'Тигры', 'Медведи', 'Звезды'];
const teamNameSuffixes = ['Сити', 'Юнайтед', 'Динамо', 'Спартак', 'Зенит', 'ЦСКА', 'Локомотив'];
const dataAiHints = ['aggressive eagle', 'flaming ball', 'abstract geometric', 'city skyline', 'powerful animal', 'sports emblem', 'dynamic shape', 'futuristic logo'];

// --- Player Assignment Logic ---
// Key: userId, Value: array of main sport disciplines they are in
const playerAssignments: Record<string, string[]> = {}; 
players.forEach(p => { playerAssignments[p.id] = [] });

const assignMembers = (captain: User, count: number, mainDiscipline: string): string[] => {
    // Filter available players: they must not be assigned to this main sport discipline already
    const availablePlayers = players.filter(p => {
        if (p.id === captain.id) return false;
        return !playerAssignments[p.id].includes(mainDiscipline);
    });
    
    // Shuffle and pick members
    availablePlayers.sort(() => Math.random() - 0.5);
    
    const newMembers = availablePlayers.slice(0, count - 1);
    
    // Mark assignments for the new members
    newMembers.forEach(member => {
        playerAssignments[member.id].push(mainDiscipline);
    });
    
    return [captain.id, ...newMembers.map(m => m.id)];
};


// --- Team Generation Logic ---
const generatedTeams: Team[] = [];
let teamIdCounter = 1;

const createTeam = (name: string, game: string, subdiscipline?: string) => {
    // Find captains who are not yet assigned to this main sport
    const availableCaptains = players.filter(p => !playerAssignments[p.id].includes(game));

    if (availableCaptains.length === 0) return; // No more available captains for this sport

    const captain = availableCaptains[Math.floor(Math.random() * availableCaptains.length)];
    // Mark captain's assignment immediately to prevent reuse in the same loop
    playerAssignments[captain.id].push(game);

    const memberCount = game === 'Стритбол' ? 3 : 5;

    const team: Team = {
        id: `team${teamIdCounter++}`,
        name,
        logoUrl: `https://placehold.co/100x100.png`,
        dataAiHint: dataAiHints[teamIdCounter % dataAiHints.length],
        game,
        subdiscipline: subdiscipline,
        captainId: captain.id,
        members: assignMembers(captain, memberCount, game),
        rank: 1200 + Math.floor(Math.random() * 500),
        homePlaygroundId: playgrounds[teamIdCounter % playgrounds.length].id,
        followers: [],
        following: [],
        sponsorIds: [], // Initialize empty
    };
    generatedTeams.push(team);
};

// Generate teams for each discipline and sub-discipline
teamSports.forEach(sport => {
    // 4 teams for the main discipline
    for (let i = 0; i < 4; i++) {
        const prefix = teamNamePrefixes[Math.floor(Math.random() * teamNamePrefixes.length)];
        const suffix = teamNameSuffixes[Math.floor(Math.random() * teamNameSuffixes.length)];
        createTeam(`${prefix} ${suffix}`, sport.name);
    }

    // 2 teams for each sub-discipline
    if (sport.subdisciplines) {
        sport.subdisciplines.forEach(sub => {
            for (let i = 0; i < 2; i++) {
                 const prefix = teamNamePrefixes[Math.floor(Math.random() * teamNamePrefixes.length)];
                 createTeam(`${prefix} (${sub.name})`, sport.name, sub.name);
            }
        });
    }
});


// --- Populate Social Graph for Teams ---
const allTeamIds = generatedTeams.map(t => t.id);
const allUserIds = users.map(u => u.id);

generatedTeams.forEach(team => {
    // Assign followers (users)
    const followersCount = Math.floor(Math.random() * 25) + 5;
    for (let i = 0; i < followersCount; i++) {
        const randomUserId = allUserIds[Math.floor(Math.random() * allUserIds.length)];
        if (!team.followers.includes(randomUserId)) {
            team.followers.push(randomUserId);
        }
    }

    // Assign following (other teams)
    const followingCount = Math.floor(Math.random() * 5) + 1;
    for (let i = 0; i < followingCount; i++) {
        const randomTeamId = allTeamIds[Math.floor(Math.random() * allTeamIds.length)];
        if (randomTeamId !== team.id && !team.following.includes(randomTeamId)) {
            team.following.push(randomTeamId);
        }
    }
});

// --- Assign Sponsors to Teams ---
// Assign one sponsor to roughly half of the teams
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
