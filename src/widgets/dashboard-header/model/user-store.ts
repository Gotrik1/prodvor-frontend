
'use client';

import { create } from 'zustand';
import type { User } from '@/mocks/users';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null, // Start with no user selected
      setUser: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    {
      name: 'prodvor-user-simulation-storage', 
      storage: createJSONStorage(() => sessionStorage), // Use sessionStorage to reset on browser close
    }
  )
);
