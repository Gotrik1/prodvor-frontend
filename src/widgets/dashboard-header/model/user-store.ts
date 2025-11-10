'use client';

import { create } from 'zustand';
import type { User } from '@/mocks';
import { httpPublic } from '@/shared/api/http';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: { accessToken: string | null; refreshToken: string | null }) => void;
  signOut: () => Promise<void>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      setTokens: (tokens) => {
        set({
          accessToken: tokens.accessToken,
          refreshToken: tokens.refreshToken,
        });
      },
      signOut: async () => {
        const { refreshToken } = get();
        try {
          if (refreshToken) {
            await httpPublic.post('/api/v1/auth/logout', { refreshToken: refreshToken });
          }
        } catch (error) {
            console.error("Failed to logout on backend, clearing client session anyway.", error);
        } finally {
            set({ user: null, accessToken: null, refreshToken: null });
        }
      },
    }),
    {
      name: 'prodvor-user-storage',
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
