
'use client';

import { create } from 'zustand';
import type { User } from '@/mocks/users';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null, // Start with no user selected
  setUser: (user) => set({ user }),
}));
