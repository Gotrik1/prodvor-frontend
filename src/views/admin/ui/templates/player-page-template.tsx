

'use client';

import { users, User } from "@/mocks";
import { PlayerPage } from "@/views/users/player";
import React from "react";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;

export function PlayerPageTemplate({ user }: { user?: User }) {
    // The PlayerPage component now gets its sports data directly from the user object.
    // The separate fetch for allSports is no longer needed here.
    return <PlayerPage user={user || defaultPlayer} />;
}
