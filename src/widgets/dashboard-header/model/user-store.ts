
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
  setTokens: (accessToken: string, refreshToken: string | null) => void;
  signOut: () => void;
  fetchUser: () => Promise<User | null>;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      isHydrated: false,
      setUser: (user) => set({ user }),
      setTokens: (accessToken, refreshToken) => {
        set({ accessToken });
        if (typeof window !== 'undefined' && refreshToken) {
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
              console.log("Fetching user with token...");
              const response = await axios.get(`${API_BASE_URL}/api/v1/users/me`);
              console.log("Response from /users/me:", response.data);
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
