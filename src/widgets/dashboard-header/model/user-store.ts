
'use client';

import { create } from 'zustand';
import type { User } from '@/shared/api';
import { persist, createJSONStorage } from 'zustand/middleware';
import { AuthApi } from '@/shared/api';
import { apiConfig } from '@/shared/api/axios-instance';

const authApi = new AuthApi(apiConfig);

interface UserState {
  user: User | null;
  accessToken: string | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string | null) => void;
  signOut: () => Promise<void>;
}

const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken });
        if (typeof window !== 'undefined' && refreshToken) {
          localStorage.setItem('refreshToken', refreshToken);
        }
      },
      signOut: async () => {
        if (typeof window !== 'undefined') {
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                try {
                    await authApi.authLogoutPost({ refreshToken } as any);
                } catch (error) {
                    console.error("Failed to logout on backend:", error);
                }
            }
            localStorage.removeItem('refreshToken');
        }
        set({ user: null, accessToken: null });
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
