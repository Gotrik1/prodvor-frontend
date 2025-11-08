

'use client';

import { PlayerPage } from "@/views/users/player";
import React from "react";
import { useUserStore } from "@/widgets/dashboard-header/model/user-store";
import type { User } from '@/entities/user/types';

export function PlayerPageTemplate({ user: initialUser }: { user?: User }) {
    const { user: defaultUser } = useUserStore();
    
    // In a template preview, we might not have a logged-in user, so we fall back to what's passed.
    const displayUser = initialUser || defaultUser;

    if (!displayUser) {
        return <div>Загрузка...</div>;
    }

    return <PlayerPage user={displayUser} />;
}
