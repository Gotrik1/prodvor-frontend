
'use client';

import { create } from 'zustand';
import type { User } from '@/mocks/users';
import { persist, createJSONStorage } from 'zustand/middleware';
import api from '@/shared/api/axios-instance';

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
                    // Inform the backend to invalidate the session
                    await api.post('/api/v1/auth/logout', { refreshToken });
                } catch (error) {
                    console.error("Failed to logout on backend:", error);
                    // Continue with client-side logout even if backend fails
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
