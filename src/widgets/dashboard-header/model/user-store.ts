
'use client';

import { create } from 'zustand';
import type { User } from '@/mocks';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '@/shared/api/axios-instance';

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: { accessToken?: string | null; refreshToken?: string | null }) => void;
  signOut: () => Promise<void>;
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      setTokens: ({ accessToken, refreshToken }) => {
        set((state) => ({
          accessToken: accessToken ?? state.accessToken,
          refreshToken: refreshToken ?? state.refreshToken,
        }));
      },
      signOut: async () => {
        const { refreshToken } = get();
        if (refreshToken) {
          try {
            // Use a separate axios instance or configure the main one to not retry on this specific call
            await api.post('api/v1/auth/logout', { refreshToken }, { _retry: true } as any);
          } catch (error) {
            console.error("Failed to logout on backend, clearing client session anyway.", error);
          }
        }
        set({ user: null, accessToken: null, refreshToken: null });
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

export { useUserStore };

    