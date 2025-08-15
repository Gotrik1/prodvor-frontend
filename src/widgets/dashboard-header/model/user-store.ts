
'use client';

import { create } from 'zustand';
import type { User } from '@/mocks/users';
import { users } from '@/mocks';

// Default user for non-simulation mode can be an admin or a specific user.
const DEFAULT_USER_ID = 'user1'; 
const defaultUser = users.find(u => u.id === DEFAULT_USER_ID);

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: defaultUser || null,
  setUser: (user) => set({ user }),
}));
