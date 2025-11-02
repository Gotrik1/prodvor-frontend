
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
        axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
      },
      signOut: () => {
        set({ user: null, accessToken: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('refreshToken');
        }
        delete axios.defaults.headers.common['Authorization'];
      },
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

// Subscribe to user changes to update axios default header
useUserStore.subscribe(
  (state, prevState) => {
    if (state.accessToken !== prevState.accessToken) {
      if (state.accessToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${state.accessToken}`;
      } else {
        delete axios.defaults.headers.common['Authorization'];
      }
    }
  }
);


export { useUserStore };

