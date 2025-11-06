
'use client';

import { create } from 'zustand';
import type { User } from '@/mocks';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: { accessToken?: string | null; refreshToken?: string | null }) => void;
  signOut: () => void;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      setTokens: ({ accessToken, refreshToken }) =>
        set((s) => ({
          accessToken: accessToken ?? s.accessToken,
          refreshToken: refreshToken ?? s.refreshToken,
        })),
      signOut: () => set({ user: null, accessToken: null, refreshToken: null }),
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ 
        user: state.user, 
        accessToken: state.accessToken, 
        refreshToken: state.refreshToken 
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
            state.isHydrated = true;
        }
      },
    }
  )
);

export { useUserStore };
