
'use client';

import { create } from 'zustand';
import type { User } from '@/mocks/users';
import { persist, createJSONStorage } from 'zustand/middleware';

interface UserState {
  user: User | null;
  isHydrated: boolean; // <-- Новое состояние для отслеживания гидратации
  setUser: (user: User | null) => void;
  signOut: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      isHydrated: false, // <-- Начальное значение false
      setUser: (user) => set({ user }),
      signOut: () => set({ user: null }),
    }),
    {
      name: 'prodvor-user-simulation-storage', 
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state) {
            state.isHydrated = true; // <-- Устанавливаем true после загрузки
        }
      },
    }
  )
);
