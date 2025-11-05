

import type { User } from './users';
import type { Team } from './teams';
import type { Playground } from './playgrounds';
import type { Sponsor } from './personnel';
import type { Sport } from './sports';
import { allSports as allSportsData } from './sports';
import type { Tournament } from './tournaments';

interface MockData {
    users: User[];
    teams: Team[];
    playgrounds: Playground[];
    sponsors: Sponsor[];
    allSports: Sport[];
    tournaments: Tournament[];
    registeredTeams: Team[];
}

let isInitialized = false;
let initializedData: MockData | null = null;

/**
 * Centralized initializer for all mock data.
 * This function takes raw data arrays and establishes relationships between them.
 * It now returns a new object with the processed data, avoiding direct mutations.
 * @param data - An object containing all the raw data arrays.
 */
export function initializeMockData(data: MockData): MockData {
    if (isInitialized && initializedData) {
        return initializedData;
    }

    const processedData: MockData = {
        users: JSON.parse(JSON.stringify(data.users)),
        teams: JSON.parse(JSON.stringify(data.teams)),
        playgrounds: JSON.parse(JSON.stringify(data.playgrounds)),
        sponsors: JSON.parse(JSON.stringify(data.sponsors)),
        allSports: JSON.parse(JSON.stringify(data.allSports)),
        tournaments: JSON.parse(JSON.stringify(data.tournaments)),
        registeredTeams: JSON.parse(JSON.stringify(data.registeredTeams)),
    };
    
    assignInitialDisciplines(processedData.users, processedData.allSports);
    generateUserSocialGraph(processedData.users);
    generateTeamFollowing(processedData.teams, processedData.users);
    assignSponsors(processedData.users, processedData.teams, processedData.sponsors);
    assignPlaygroundFollowers(processedData.users, processedData.playgrounds);
    assignDisciplinesFromTeams(processedData.users, processedData.teams);
    assignTeamsToPlaygrounds(processedData.teams, processedData.playgrounds);
    assignClientsToCoaches(processedData.users, processedData.teams);
    
    // Populate registeredTeams after teams have been generated
    if (processedData.teams.length >= 8) {
        processedData.registeredTeams.push(...processedData.teams.slice(0, 8));
    }


    isInitialized = true;
    initializedData = processedData;
    
    return initializedData;
}


function assignInitialDisciplines(allUsers: User[], allSportsList: Sport[]) {
    allUsers.forEach((user, index) => {
        const userSports = new Map<string, { id: string; name: string }>();
        if (allSportsList.length > 0) {
            const sport1 = allSportsList[index % allSportsList.length];
            userSports.set(sport1.id, { id: sport1.id, name: sport1.name });
            
            if (index % 3 === 0 && userSports.size < 6) {
                const sport2 = allSportsList[(index * 7) % allSportsList.length];
                userSports.set(sport2.id, { id: sport2.id, name: sport2.name });
            }
        }
        user.sports = Array.from(userSports.values());
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

function generateTeamFollowing(allTeams: Team[], allUsers: User[]) {
    const allTeamIds = allTeams.map(t => t.id);
    allTeams.forEach((team, index) => {
        // All members automatically follow their team
        team.followers = [...team.members.map(m => m.id)];
        
        // Add some random external followers from the same city
        const cityFollowers = allUsers.filter(u => u.city === team.city && !team.members.some(m => m.id === u.id));
        const extraFollowersCount = Math.min(cityFollowers.length, (index % 10) + 5);
        for(let i=0; i < extraFollowersCount; i++) {
            team.followers.push(cityFollowers[i].id);
        }
        team.followers = [...new Set(team.followers)];


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
        const userSports = new Map<string, { id: string; name: string }>();
        user.sports.forEach(sport => userSports.set(sport.id, sport));
        
        const userTeams = allTeams.filter(t => t.members.some(m => m.id === user.id));
        userTeams.forEach(team => {
            if (userSports.size < 6) {
                const teamSport = allSportsData.find(s => s.id === team.sportId);
                if(teamSport) {
                    userSports.set(teamSport.id, { id: teamSport.id, name: teamSport.name });
                }
            }
            // Also, users who are members of this team should follow it
            if (!user.following.includes(team.id)) {
                user.following.push(team.id);
            }
        });
        user.sports = Array.from(userSports.values());
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

    coaches.forEach((coach) => {
        if (coach.coachProfile) {
            // Find teams related to the coach's primary discipline AND city for realism
            const coachDisciplineId = coach.sports[0]?.id;

            const relevantTeams = allTeams.filter(t => {
                return t.sportId === coachDisciplineId && 
                       t.city === coach.city &&
                       !coaches.some(c => c.coachProfile?.managedTeams.includes(t.id));
            });
            
            if(relevantTeams.length > 0) {
                 // Assign 1-2 teams to the coach
                coach.coachProfile.managedTeams = relevantTeams.slice(0, 2).map(t => t.id);

                // Assign players from those teams as clients
                const clientIds = new Set<string>();
                coach.coachProfile.managedTeams.forEach(teamId => {
                    const team = allTeams.find(t => t.id === teamId);
                    team?.members.forEach(member => clientIds.add(member.id));
                });
                
                // Add a few extra random players from the same city and discipline
                 const extraPlayers = players
                    .filter(p => p.sports.some(s => s.id === coachDisciplineId) && p.city === coach.city && !clientIds.has(p.id))
                    .slice(0, 3);
                extraPlayers.forEach(p => clientIds.add(p.id));
                
                coach.coachProfile.clients = Array.from(clientIds);
            }
        }
    });
}
