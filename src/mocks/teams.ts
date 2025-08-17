
import { assignTeamsToPlaygrounds, playgrounds } from "./playgrounds";
import type { User } from "./users";
import { teamSports, allSports, Sport } from "./sports";
import { sponsors, Sponsor } from "./personnel";

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

// This function will be called from index.ts after users and other data are loaded.
export function initializeTeams(
    users: User[],
    allPlaygrounds: any[],
    allSportsList: Sport[],
    allSponsors: Sponsor[]
) {
    // Key: userId, Value: { count: number, sports: Set<string> }
    const playerTeamAssignments: Record<string, { count: number, sports: Set<string> }> = {};
    users.forEach(p => {
        if (p.role === 'Игрок') {
            playerTeamAssignments[p.id] = { count: 0, sports: new Set() };
        }
    });

    const MAX_TEAMS_PER_PLAYER = 5;

    let teamIdCounter = 1;
    const players = users.filter(u => u.role === 'Игрок').sort((a, b) => a.id.localeCompare(b.id));
    const teamSportsList = allSportsList.filter(s => s.isTeamSport);

    teamSportsList.forEach(sport => {
        // Create 2-4 teams per sport for variety
        const teamCountForSport = (sport.id.charCodeAt(sport.id.length - 1) % 3) + 2;

        for (let i = 0; i < teamCountForSport; i++) {
            const availableCaptains = players.filter(p => {
                const assignment = playerTeamAssignments[p.id];
                return assignment && assignment.count < MAX_TEAMS_PER_PLAYER && !assignment.sports.has(sport.id);
            });

            if (availableCaptains.length === 0) break;
            
            // Predictable captain selection
            const captainIndex = (teamIdCounter + i) % availableCaptains.length;
            const captain = availableCaptains[captainIndex];

            const availableMembers = players.filter(p => {
                 const assignment = playerTeamAssignments[p.id];
                 return p.id !== captain.id && assignment && assignment.count < MAX_TEAMS_PER_PLAYER && !assignment.sports.has(sport.id);
            });
            
            const memberCount = 4;
            if (availableMembers.length < memberCount) continue;

            // Predictable member selection
            const newMembers = [];
            for (let j = 0; j < memberCount; j++) {
                const memberIndex = (teamIdCounter * 3 + j * 5 + i) % availableMembers.length;
                 if (availableMembers[memberIndex] && !newMembers.includes(availableMembers[memberIndex])) {
                    newMembers.push(availableMembers[memberIndex]);
                }
            }
             if (newMembers.length < memberCount) continue; // Skip if not enough unique members found


            const teamMembersIds = [captain.id, ...newMembers.map(m => m.id)];
            
            const sportPlaygrounds = allPlaygrounds.filter(p => p.sportIds.includes(sport.id));
            let homePlaygroundIds: string[] | undefined = undefined;
            if ((teamIdCounter % 4) !== 0 && sportPlaygrounds.length > 0) { // ~75% chance
                homePlaygroundIds = [sportPlaygrounds[teamIdCounter % sportPlaygrounds.length].id];
            }
            
            const baseTeamNames = ['Ночные Снайперы', 'Короли Асфальта', 'Стальные Ястребы', 'Бетонные Тигры', 'Разрушители', 'Фортуна', 'Красная Фурия', 'Легион'];
            const teamName = `${baseTeamNames[teamIdCounter % baseTeamNames.length]} (${sport.name})`;
            
            // Assign sponsors to ~33% of teams predictably
            let sponsorIds: string[] | undefined = undefined;
            if (teamIdCounter % 3 === 0 && allSponsors.length > 0) {
                sponsorIds = [allSponsors[teamIdCounter % allSponsors.length].id];
            }

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
                followers: [], // Will be populated later
                following: [], // Will be populated later
                sponsorIds,
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

    // --- Establish Social and other relationships after all teams are created ---
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
            const teamIndexToFollow = (index * 5 + i * 3 + 1) % allTeamIds.length;
            const followedTeamId = allTeamIds[teamIndexToFollow];
            if (followedTeamId !== team.id && !team.following.includes(followedTeamId)) {
                team.following.push(followedTeamId);
                 // Also add this team to the followers of the followed team
                const followedTeam = teams.find(t => t.id === followedTeamId);
                if (followedTeam && !followedTeam.followers.includes(team.id)) {
                    followedTeam.followers.push(team.id);
                }
            }
        }
    });
    
    // Assign disciplines to users based on their teams
     users.forEach(user => {
        const userDisciplines = new Set(user.disciplines);
        const userTeams = teams.filter(t => t.members.includes(user.id));
        userTeams.forEach(team => {
            userDisciplines.add(team.sportId);
        });
        user.disciplines = Array.from(userDisciplines);
    });

    // Link teams to playgrounds after teams are created
    assignTeamsToPlaygrounds(teams);
}
