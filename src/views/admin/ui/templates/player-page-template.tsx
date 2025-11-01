
'use client';

import { users, User } from "@/mocks";
import { PlayerPage } from "@/views/users/player";
import React from "react";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;

export function PlayerPageTemplate({ user }: { user?: User }) {
    return <PlayerPage user={user || defaultPlayer} />;
}
