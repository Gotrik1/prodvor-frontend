
'use client';

import { create } from 'zustand';
import type { User } from '@/mocks/users';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  user: User | null;
  accessToken: string | null;
  isHydrated: boolean; // Add this flag
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string | null) => void;
  signOut: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isHydrated: false, // Initialize as false
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken });
        if (typeof window !== 'undefined' && refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
      },
      signOut: () => {
        set({ user: null, accessToken: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('refreshToken');
        }
      },
    }),
    {
      name: 'prodvor-user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
      onRehydrateStorage: () => (state) => {
        if (state) {
            state.isHydrated = true;
        }
      },
    }
  )
);

export { useUserStore };
