
'use client';

import { users, User } from "@/mocks";
import { PlayerPage } from "@/views/users/player";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;

export function PlayerPageTemplate({ user }: { user?: User }) {
    return <PlayerPage user={user || defaultPlayer} />;
}
