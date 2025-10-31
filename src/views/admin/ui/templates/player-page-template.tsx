

'use client';

import { users, User, Sport } from "@/mocks";
import { PlayerPage } from "@/views/users/player";
import { useEffect, useState } from "react";
import axios from "axios";

const defaultPlayer = users.find(u => u.role === 'Игрок')!;

export function PlayerPageTemplate({ user }: { user?: User }) {
    const [allSports, setAllSports] = useState<Sport[]>([]);

    useEffect(() => {
        async function fetchSports() {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sports`);
                setAllSports(response.data);
            } catch (error) {
                console.error("Failed to fetch sports:", error);
            }
        }
        fetchSports();
    }, []);

    return <PlayerPage user={user || defaultPlayer} allSports={allSports} />;
}
