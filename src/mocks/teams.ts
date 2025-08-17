import { assignTeamsToPlaygrounds, playgrounds } from "./playgrounds";
import type { User } from "./users";
import { teamSports, allSports } from "./sports";
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

// Base teams array, to be populated by initializeTeams
export const teams: Team[] = [];

// This function will be called from index.ts after users and playgrounds are loaded.
export function initializeTeams(users: User[], allPlaygrounds: any[], allSportsList: any[]) {
    // Key: userId, Value: { count: number, sports: Set<string> }
    const playerTeamAssignments: Record<string, { count: number, sports: Set<string> }> = {};
    users.forEach(p => {
        if (p.role === 'Игрок') {
            playerTeamAssignments[p.id] = { count: 0, sports: new Set() };
        }
    });

    const MAX_TEAMS_PER_PLAYER = 5;

    // --- Stable Team Generation ---
    let teamIdCounter = 1;
    const players = users.filter(u => u.role === 'Игрок').sort((a, b) => a.id.localeCompare(b.id));
    const teamSportsList = allSportsList.filter(s => s.isTeamSport);

    teamSportsList.forEach(sport => {
        for (let i = 0; i < 2; i++) {
            const availableCaptains = players.filter(p => {
                const assignment = playerTeamAssignments[p.id];
                return assignment && assignment.count < MAX_TEAMS_PER_PLAYER && !assignment.sports.has(sport.id);
            });

            if (availableCaptains.length === 0) break;
            const captain = availableCaptains[Math.floor(sport.id.length % availableCaptains.length)];

            const availableMembers = players.filter(p => {
                 const assignment = playerTeamAssignments[p.id];
                 return p.id !== captain.id && assignment && assignment.count < MAX_TEAMS_PER_PLAYER && !assignment.sports.has(sport.id);
            });
            
            const memberCount = 4;
            if (availableMembers.length < memberCount) continue;

            const newMembers = availableMembers.slice(0, memberCount);
            const teamMembersIds = [captain.id, ...newMembers.map(m => m.id)];
            
            const sportPlaygrounds = allPlaygrounds.filter(p => p.sportIds.includes(sport.id));
            let homePlaygroundIds: string[] | undefined = undefined;
            if ((teamIdCounter % 5) !== 0 && sportPlaygrounds.length > 0) {
                homePlaygroundIds = [];
                const count = (teamIdCounter % 3) + 1;
                for (let j = 0; j < count; j++) {
                    const playgroundIndex = (teamIdCounter + j) % sportPlaygrounds.length;
                    if(sportPlaygrounds[playgroundIndex]) {
                        homePlaygroundIds.push(sportPlaygrounds[playgroundIndex].id);
                    }
                }
            }
            
            const baseTeamNames = ['Ночные Снайперы', 'Короли Асфальта', 'Стальные Ястребы', 'Бетонные Тигры', 'Разрушители', 'Фортуна', 'Красная Фурия', 'Легион'];
            const teamName = i === 0 ? `${sport.name} ${baseTeamNames[teamIdCounter % baseTeamNames.length]}` : `${sport.name} Team #${i + 1}`;

            const newTeam: Team = {
                id: `team${teamIdCounter++}`,
                name: teamName,
                logoUrl: `https://placehold.co/100x100.png`,
                dataAiHint: 'sports emblem',
                game: sport.name,
                sportId: sport.id,
                captainId: captain.id,
                members: teamMembersIds,
                rank: 1200 + (teamIdCounter * 17 % 500),
                homePlaygroundIds,
                followers: [],
                following: [],
                sponsorIds: [],
            };
            
            teams.push(newTeam);

            teamMembersIds.forEach(memberId => {
                if (playerTeamAssignments[memberId]) {
                    playerTeamAssignments[memberId].count++;
                    playerTeamAssignments[memberId].sports.add(sport.id);
                }
            });
        }
    });

    const allTeamIds = teams.map(t => t.id);

    teams.forEach((team, index) => {
        // All members automatically follow their team
        team.followers = [...team.members];
        
        // Users who are members of this team should follow it
        users.forEach(user => {
            if (team.members.includes(user.id) && !user.following.includes(team.id)) {
                user.following.push(team.id);
            }
        });

        // Predictably make teams follow a few other teams
        const followingCount = (index % 3) + 1; // 1 to 3 teams
         for (let i = 0; i < followingCount; i++) {
            const teamIndex = (index + i + 1) % allTeamIds.length;
            if (allTeamIds[teamIndex] !== team.id) {
               team.following.push(allTeamIds[teamIndex]);
            }
        }

        // Assign sponsors to ~33% of teams predictably
        if (index % 3 === 0 && sponsors.length > 0) {
            team.sponsorIds = [sponsors[index % sponsors.length].id];
        }
    });

    // Link teams to playgrounds after teams are created
    assignTeamsToPlaygrounds(teams);
}
