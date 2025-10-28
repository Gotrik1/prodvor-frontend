

'use client';

import { users } from "@/mocks";
import { PlayerPage } from "@/views/users/player";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;

export function PlayerPageTemplate() {
    return <PlayerPage user={defaultPlayer} />;
}
