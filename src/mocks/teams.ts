
import { playgrounds } from "./playgrounds";
import type { User } from "./users";
import { users } from "./users";
import { teamSports } from "./sports";

export interface Team {
  id: string;
  name: string;
  logoUrl: string;
  captainId: string;
  members: string[]; // array of user IDs
  game: string; // Main discipline for indexing, e.g., "Футбол"
  subdiscipline?: string; // Sub-discipline, e.g., "мини-футбол"
  rank: number;
  homePlaygroundId?: string;
  dataAiHint: string;
  followers: string[]; // Array of user IDs
  following: string[]; // Array of team IDs
}

// --- Helper Data ---
const players = users.filter(u => u.role === 'Игрок');
const teamNamePrefixes = ['Авангард', 'Легион', 'Гром', 'Молния', 'Вихрь', 'Соколы', 'Ястребы', 'Тигры', 'Медведи', 'Звезды'];
const teamNameSuffixes = ['Сити', 'Юнайтед', 'Динамо', 'Спартак', 'Зенит', 'ЦСКА', 'Локомотив'];
const dataAiHints = ['aggressive eagle', 'flaming ball', 'abstract geometric', 'city skyline', 'powerful animal', 'sports emblem', 'dynamic shape', 'futuristic logo'];

// --- Player Assignment Logic ---
const playerAssignments: Record<string, string[]> = {}; // Key: userId, Value: array of main sport disciplines they are in

const assignMembers = (captain: User, count: number, mainDiscipline: string): string[] => {
    const members = [captain.id];
    
    // Mark captain's assignment
    if (!playerAssignments[captain.id]) playerAssignments[captain.id] = [];
    if (!playerAssignments[captain.id].includes(mainDiscipline)) {
        playerAssignments[captain.id].push(mainDiscipline);
    }
    
    // Filter available players
    const availablePlayers = players.filter(p => {
        if (p.id === captain.id) return false;
        const assignments = playerAssignments[p.id];
        return !assignments || !assignments.includes(mainDiscipline);
    });
    
    // Shuffle and pick members
    availablePlayers.sort(() => Math.random() - 0.5);
    
    const newMembers = availablePlayers.slice(0, count - 1);
    
    newMembers.forEach(member => {
        members.push(member.id);
        if (!playerAssignments[member.id]) playerAssignments[member.id] = [];
        if (!playerAssignments[member.id].includes(mainDiscipline)) {
            playerAssignments[member.id].push(mainDiscipline);
        }
    });
    
    return members;
};


// --- Team Generation Logic ---
const generatedTeams: Team[] = [];
let teamIdCounter = 1;

const createTeam = (name: string, game: string, subdiscipline?: string) => {
    const availableCaptains = players.filter(p => {
        const assignments = playerAssignments[p.id];
        return !assignments || !assignments.includes(game);
    });

    if (availableCaptains.length === 0) return; // No more available captains for this sport

    const captain = availableCaptains[Math.floor(Math.random() * availableCaptains.length)];
    const memberCount = game === 'Стритбол' ? 3 : 5;

    const team: Team = {
        id: `team${teamIdCounter++}`,
        name,
        logoUrl: `https://placehold.co/100x100.png`,
        dataAiHint: dataAiHints[teamIdCounter % dataAiHints.length],
        game,
        subdiscipline,
        captainId: captain.id,
        members: assignMembers(captain, memberCount, game),
        rank: 1200 + Math.floor(Math.random() * 500),
        homePlaygroundId: playgrounds[teamIdCounter % playgrounds.length].id,
        followers: [],
        following: [],
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
                 createTeam(`${prefix} (${sub})`, sport.name, sub);
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

export const teams: Team[] = generatedTeams;
