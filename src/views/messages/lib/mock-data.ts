

import { users, teams, User } from '@/mocks';

export interface Chat {
    id: string;
    type: 'personal' | 'team';
    name: string;
    avatarUrl: string;
    lastMessage: string;
    lastMessageTime: string;
    entityId: string; // userId or teamId
}

export interface Message {
    id: string;
    sender: User;
    text: string;
    timestamp: string;
}

// Select some users and teams for chats
const chatUsers = users.slice(1, 5);
const chatTeams = teams.slice(0, 3);
const currentUser = users[0];

export const mockChats: Chat[] = [
    ...chatTeams.map((team, index) => ({
        id: `chat-team-${index + 1}`,
        type: 'team' as const,
        name: team.name,
        avatarUrl: team.logoUrl,
        lastMessage: "Отлично, тогда встречаемся в 18:00 на площадке.",
        lastMessageTime: "14:30",
        entityId: team.id,
    })),
    ...chatUsers.map((user, index) => ({
        id: `chat-user-${index + 1}`,
        type: 'personal' as const,
        name: user.nickname,
        avatarUrl: user.avatarUrl,
        lastMessage: "Привет! Готов к завтрашней игре?",
        lastMessageTime: "вчера",
        entityId: user.id,
    })),
];

export const mockMessages: Record<string, Message[]> = {
    'chat-team-1': [
        { id: 'msg-t1-1', sender: users.find(u => u.nickname === 'Valkyrie')!, text: "Всем привет! Завтра тренировка в 19:00, не опаздывать!", timestamp: "2025-08-16T10:00:00Z" },
        { id: 'msg-t1-2', sender: currentUser, text: "Понял, буду.", timestamp: "2025-08-16T10:05:00Z" },
        { id: 'msg-t1-3', sender: users.find(u => u.nickname === 'Destroyer')!, text: "Я немного задержусь, минут на 15.", timestamp: "2025-08-16T10:06:00Z" },
        { id: 'msg-t1-4', sender: users.find(u => u.nickname === 'Valkyrie')!, text: "Хорошо, но постарайся успеть к разминке.", timestamp: "2025-08-16T10:07:00Z" },
        { id: 'msg-t1-5', sender: users.find(u => u.nickname === 'Wolf')!, text: "Отлично, тогда встречаемся в 18:00 на площадке.", timestamp: "2025-08-16T14:30:00Z" },
    ],
    'chat-user-1': [
        { id: 'msg-u1-1', sender: chatUsers[0], text: "Привет! Готов к завтрашней игре?", timestamp: "2025-08-15T18:00:00Z" },
        { id: 'msg-u1-2', sender: currentUser, text: "Привет! Конечно, в полной боевой готовности.", timestamp: "2025-08-15T18:01:00Z" },
    ],
    // Add more messages for other chats if needed
    'chat-team-2': [
        { id: 'msg-t2-1', sender: users[5], text: "Напоминаю, что завтра сдаем взносы на турнир.", timestamp: "2025-08-16T11:00:00Z" },
    ],
    'chat-user-2': [
         { id: 'msg-u2-1', sender: chatUsers[1], text: "Привет! Не хочешь сыграть товарищеский матч на выходных?", timestamp: "2025-08-15T19:00:00Z" },
    ]
};
// Ensure all message objects are populated
Object.keys(mockMessages).forEach(key => {
    if (!mockMessages[key]) mockMessages[key] = [];
})
