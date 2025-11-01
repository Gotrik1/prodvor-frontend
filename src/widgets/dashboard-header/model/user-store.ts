
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
  fetchUser: () => Promise<User | null>;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken });
        if (typeof window !== 'undefined') {
          localStorage.setItem('refreshToken', refreshToken);
        }
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      },
      signOut: () => {
        set({ user: null, accessToken: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('refreshToken');
        }
        delete axios.defaults.headers.common['Authorization'];
      },
      fetchUser: async () => {
          const token = get().accessToken;
          if (!token) return null;
          try {
              const response = await axios.get(`https://8080-firebase-prodvor-backend-1761850902881.cluster-ombtxv25tbd6yrjpp3lukp6zhc.cloudworkstations.dev/api/v1/users/me`);
              const user = response.data as User;
              set({ user });
              return user;
          } catch (error) {
              console.error("Failed to fetch user:", error);
              get().signOut(); // Sign out if token is invalid
              return null;
          }
      }
    }),
    {
      name: 'prodvor-user-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ user: state.user, accessToken: state.accessToken }),
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
