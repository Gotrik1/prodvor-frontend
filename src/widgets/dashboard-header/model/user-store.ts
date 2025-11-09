'use client';

import { create } from 'zustand';
import type { User } from '@/mocks';
import { api } from '@/shared/api/axios-instance';

interface Tokens {
  accessToken: string | null;
  refreshToken: string | null;
}

interface UserState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
  setUser: (user: User | null) => void;
  setTokens: (tokens: Tokens) => void;
  clearTokens: () => void;
  signOut: () => Promise<void>;
}

export const useUserStore = create<UserState>((set, get) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isHydrated: false, // Will be set to true on rehydration
  
  setUser: (user) => set({ user }),

  setTokens: ({ accessToken, refreshToken }) => {
    set({ accessToken, refreshToken });
    if (typeof window !== 'undefined') {
      if (accessToken) {
        sessionStorage.setItem("pd_access", accessToken);
      } else {
        sessionStorage.removeItem("pd_access");
      }
      if (refreshToken) {
        localStorage.setItem("pd_refresh", refreshToken);
      } else {
        localStorage.removeItem("pd_refresh");
      }
    }
  },

  clearTokens: () => {
    set({ accessToken: null, refreshToken: null, user: null });
     if (typeof window !== 'undefined') {
        localStorage.removeItem("pd_refresh");
        sessionStorage.removeItem("pd_access");
     }
  },
  
  signOut: async () => {
    const { refreshToken, clearTokens } = get();
    try {
      if (refreshToken) {
        await api.post(
          "/api/v1/auth/logout",
          {},
          { headers: { Authorization: `Bearer ${refreshToken}` } }
        );
      }
    } catch (error) {
      console.error("Logout failed on server, clearing client anyway:", error);
    } finally {
      clearTokens();
    }
  },
}));

// Function to restore tokens on app startup
export const restoreTokens = () => {
  if (typeof window !== 'undefined') {
    const accessToken = sessionStorage.getItem("pd_access");
    const refreshToken = localStorage.getItem("pd_refresh");
    if (accessToken || refreshToken) {
       useUserStore.getState().setTokens({ accessToken, refreshToken });
    }
  }
  useUserStore.setState({ isHydrated: true });
};

// Initial call to restore tokens when the app loads
if (typeof window !== 'undefined') {
    restoreTokens();
}
