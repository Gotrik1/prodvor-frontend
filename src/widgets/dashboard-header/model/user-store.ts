
'use client';

import { create } from 'zustand';
import type { User } from '@/mocks/users';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

interface UserState {
  user: User | null;
  accessToken: string | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken });
        // В реальном приложении refreshToken лучше хранить в httpOnly cookie
        localStorage.setItem('refreshToken', refreshToken);
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      },
      signOut: () => {
        set({ user: null, accessToken: null });
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
      },
    }),
    {
      name: 'prodvor-user-storage', // Новое имя, чтобы избежать конфликтов со старым стором
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken }), // Сохраняем только юзера и токен
      onRehydrateStorage: () => (state) => {
        if (state) {
            state.isHydrated = true; 
            if (state.accessToken) {
                 axios.defaults.headers.common['Authorization'] = `Bearer ${state.accessToken}`;
            }
        }
      },
    }
  )
);
