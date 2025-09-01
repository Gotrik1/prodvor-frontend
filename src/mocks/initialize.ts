

import type { User } from './users';
import type { Team } from './teams';
import type { Playground } from './playgrounds';
import type { Sponsor } from './personnel';
import type { Sport } from './sports';

interface MockData {
    users: User[];
    teams: Team[];
    playgrounds: Playground[];
    sponsors: Sponsor[];
    allSports: Sport[];
}

let isInitialized = false;

/**
 * Centralized initializer for all mock data.
 * This function takes raw data arrays and establishes relationships between them.
 * It MUTATES the arrays passed in.
 * @param data - An object containing all the raw data arrays.
 */
export function initializeMockData(data: MockData) {
    if (isInitialized) {
        return;
    }

    const { users, teams, playgrounds, sponsors, allSports } = data;

    // --- 1. Generate Teams ---
    generateTeams(users, playgrounds, allSports, sponsors, teams);

    // --- 2. Assign initial disciplines to all users ---
    assignInitialDisciplines(users, allSports);

    // --- 3. Establish Social Graph (Friends, Followers) for users ---
    generateUserSocialGraph(users);
    
    // --- 4. Establish Following relationships for teams ---
    generateTeamFollowing(teams);
    
    // --- 5. Assign Sponsors to users and teams ---
    assignSponsors(users, teams, sponsors);
    
    // --- 6. Assign Followers to playgrounds ---
    assignPlaygroundFollowers(users, playgrounds);

    // --- 7. Final link: Assign disciplines to users based on their final team memberships ---
    assignDisciplinesFromTeams(users, teams);

    // --- 8. Link teams to playgrounds after teams are created ---
    assignTeamsToPlaygrounds(teams, playgrounds);
    
    // --- 9. Assign clients to coaches ---
    assignClientsToCoaches(users, teams);


    isInitialized = true;
}


function generateTeams(
    allUsers: User[],
    allPlaygrounds: Playground[],
    allSportsList: Sport[],
    allSponsors: Sponsor[],
    teamsOutput: Team[] // This array will be populated
) {
    const playerTeamAssignments: Record<string, { count: number, sports: Set<string> }> = {};
    allUsers.forEach(p => {
        if (p.role === 'Игрок') {
            playerTeamAssignments[p.id] = { count: 0, sports: new Set() };
        }
    });

    const MAX_TEAMS_PER_PLAYER = 5;
    let teamIdCounter = 1;
    const players = allUsers.filter(u => u.role === 'Игрок').sort((a, b) => a.id.localeCompare(b.id));
    const teamSportsList = allSportsList.filter(s => s.isTeamSport);

    teamSportsList.forEach(sport => {
        const teamCountForSport = (sport.id.charCodeAt(sport.id.length - 1) % 3) + 2;

        for (let i = 0; i < teamCountForSport; i++) {
            const availableCaptains = players.filter(p => {
                const assignment = playerTeamAssignments[p.id];
                return assignment && assignment.count < MAX_TEAMS_PER_PLAYER && !assignment.sports.has(sport.id);
            });
            
            const memberCount = 4; // 4 members + 1 captain
            if (availableCaptains.length < memberCount + 1) continue;
            
            const captainIndex = (teamIdCounter * 13 + i * 29) % availableCaptains.length;
            const captain = availableCaptains[captainIndex];

            const availableMembers = players.filter(p => {
                 const assignment = playerTeamAssignments[p.id];
                 return p.id !== captain.id && assignment && assignment.count < MAX_TEAMS_PER_PLAYER && !assignment.sports.has(sport.id);
            });
            
            if (availableMembers.length < memberCount) continue;

            const shuffledMembers = [...availableMembers].sort((a, b) => (a.id.charCodeAt(3) * teamIdCounter * (i + 1)) % 13 - (b.id.charCodeAt(3) * teamIdCounter * (i + 1)) % 13);
            const newMembers = shuffledMembers.slice(0, memberCount);
            const teamMembersIds = [captain.id, ...newMembers.map(m => m.id)];
            
            const sportPlaygrounds = allPlaygrounds.filter(p => p.sportIds.includes(sport.id));
            let homePlaygroundIds: string[] | undefined = undefined;
            if ((teamIdCounter % 4) !== 0 && sportPlaygrounds.length > 0) {
                homePlaygroundIds = [sportPlaygrounds[teamIdCounter % sportPlaygrounds.length].id];
            }
            
            const baseTeamNames = ['Ночные Снайперы', 'Короли Асфальта', 'Стальные Ястребы', 'Бетонные Тигры', 'Разрушители', 'Фортуна', 'Красная Фурия', 'Легион', 'Авангард', 'Молот', 'Звезда', 'Циклон'];
            const teamName = `${baseTeamNames[teamIdCounter % baseTeamNames.length]} (${sport.name})`;

            const newTeam: Team = {
                id: `team${teamIdCounter++}`,
                name: teamName,
                logoUrl: `https://placehold.co/100x100.png`,
                dataAiHint: 'sports emblem',
                game: sport.name,
                sportId: sport.id,
                captainId: captain.id,
                members: teamMembersIds,
                rank: 1200, // Standard starting ELO rank
                homePlaygroundIds,
                followers: [],
                following: [],
                sponsorIds: [],
            };
            
            teamsOutput.push(newTeam);

            teamMembersIds.forEach(memberId => {
                if (playerTeamAssignments[memberId]) {
                    playerTeamAssignments[memberId].count++;
                    playerTeamAssignments[memberId].sports.add(sport.id);
                }
            });
        }
    });
}

function assignInitialDisciplines(allUsers: User[], allSportsList: Sport[]) {
    const allSportIds = allSportsList.map(s => s.id);
    allUsers.forEach((user, index) => {
        const userDisciplines = new Set<string>();
        if (allSportIds.length > 0) {
            userDisciplines.add(allSportIds[index % allSportIds.length]);
            if (index % 3 === 0) {
                 userDisciplines.add(allSportIds[(index * 7) % allSportIds.length]);
            }
        }
        user.disciplines = Array.from(userDisciplines);
    });
}

function generateUserSocialGraph(allUsers: User[]) {
    const userIds = allUsers.map(u => u.id);
    allUsers.forEach((currentUser, index) => {
        // Friends (symmetric)
        const friendCount = (index % 4) + 1;
        for (let i = 0; i < friendCount; i++) {
            const friendId = userIds[(index * 3 + i * 7) % userIds.length];
            if (friendId !== currentUser.id && !currentUser.friends.includes(friendId)) {
                currentUser.friends.push(friendId);
                const friend = allUsers.find(u => u.id === friendId);
                if (friend && !friend.friends.includes(currentUser.id)) {
                    friend.friends.push(currentUser.id);
                }
            }
        }
        // Following (asymmetric)
        const followingCount = (index % 6) + 2;
        for (let i = 0; i < followingCount; i++) {
             const userToFollowId = userIds[(index * 5 + i * 3) % userIds.length];
             if (userToFollowId !== currentUser.id && !currentUser.followingUsers.includes(userToFollowId)) {
                 currentUser.followingUsers.push(userToFollowId);
                 const followedUser = allUsers.find(u => u.id === userToFollowId);
                 if (followedUser && !followedUser.followers.includes(currentUser.id)) {
                     followedUser.followers.push(currentUser.id);
                 }
             }
        }
    });
}

function generateTeamFollowing(allTeams: Team[]) {
    const allTeamIds = allTeams.map(t => t.id);
    allTeams.forEach((team, index) => {
        // All members automatically follow their team
        team.followers = [...team.members];
        
        const followingCount = (index % 3) + 1;
        for (let i = 0; i < followingCount; i++) {
            const followedTeamId = allTeamIds[(index * 5 + i * 3 + 1) % allTeamIds.length];
            if (followedTeamId !== team.id && !team.following.includes(followedTeamId)) {
                team.following.push(followedTeamId);
                const followedTeam = allTeams.find(t => t.id === followedTeamId);
                if (followedTeam && !followedTeam.followers.includes(team.id)) {
                    followedTeam.followers.push(team.id);
                }
            }
        }
    });
}

function assignSponsors(allUsers: User[], allTeams: Team[], allSponsors: Sponsor[]) {
    if (allSponsors.length === 0) return;
    allUsers.forEach((user, index) => {
        if (index % 5 === 0) {
            user.sponsorIds = [allSponsors[index % allSponsors.length].id];
        }
    });
    allTeams.forEach((team, index) => {
        if (index % 3 === 0) {
            team.sponsorIds = [allSponsors[index % allSponsors.length].id];
        }
    });
}

function assignPlaygroundFollowers(allUsers: User[], allPlaygrounds: Playground[]) {
    allPlaygrounds.forEach((playground, index) => {
        const followersCount = (index % 15) + 5;
        const followers: string[] = [];
        for (let i = 0; i < followersCount; i++) {
            const userIndex = (index + i * 3) % allUsers.length;
            if (allUsers[userIndex]) {
                followers.push(allUsers[userIndex].id);
            }
        }
        playground.followers = Array.from(new Set(followers));
    });
}

function assignDisciplinesFromTeams(allUsers: User[], allTeams: Team[]) {
    allUsers.forEach(user => {
        const userDisciplines = new Set(user.disciplines);
        const userTeams = allTeams.filter(t => t.members.includes(user.id));
        userTeams.forEach(team => {
            userDisciplines.add(team.sportId);
            // Also, users who are members of this team should follow it
            if (!user.following.includes(team.id)) {
                user.following.push(team.id);
            }
        });
        user.disciplines = Array.from(userDisciplines);
    });
}

function assignTeamsToPlaygrounds(allTeams: Team[], allPlaygrounds: Playground[]) {
    allTeams.forEach(team => {
        if (team.homePlaygroundIds) {
            team.homePlaygroundIds.forEach((playgroundId: string) => {
                const playground = allPlaygrounds.find(p => p.id === playgroundId);
                if (playground && !playground.residentTeamIds.includes(team.id)) {
                    playground.residentTeamIds.push(team.id);
                }
            });
        }
    });
}

function assignClientsToCoaches(allUsers: User[], allTeams: Team[]) {
    const coaches = allUsers.filter(u => u.role === 'Тренер');
    const players = allUsers.filter(u => u.role === 'Игрок');

    coaches.forEach((coach, index) => {
        if (coach.coachProfile) {
            // Find teams related to the coach's primary discipline for realism
            const coachDiscipline = coach.disciplines[0];

            const relevantTeams = allTeams.filter(t => {
                return t.sportId === coachDiscipline && !coaches.some(c => c.coachProfile?.managedTeams.includes(t.id));
            });
            
            if(relevantTeams.length > 0) {
                 // Assign 1-2 teams to the coach
                coach.coachProfile.managedTeams = relevantTeams.slice(0, 2).map(t => t.id);

                // Assign players from those teams as clients
                const clientIds = new Set<string>();
                coach.coachProfile.managedTeams.forEach(teamId => {
                    const team = allTeams.find(t => t.id === teamId);
                    team?.members.forEach(memberId => clientIds.add(memberId));
                });
                
                // Add a few extra random players who might be in the same discipline
                 const extraPlayers = players
                    .filter(p => p.disciplines.includes(coachDiscipline) && !clientIds.has(p.id))
                    .slice(0, 3);
                extraPlayers.forEach(p => clientIds.add(p.id));
                
                coach.coachProfile.clients = Array.from(clientIds);
            }
        }
    });
}
