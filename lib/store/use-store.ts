import { create } from 'zustand';
import { User } from '@/types/user';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  user: User | null;
  token: string | null;
  cTgId: string;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>(
  persist(
    (set) => ({
      user: null,
      token: null,
      cTgId: '',
      setUser: (user: User) => set({ user }),
      setToken: (token: string) => set({ token }),
      setCTgId: (tgId: string) => set(() => ({ cTgId: tgId })),
      logout: () => set({ user: null, token: null }),
    }),
    {
      name: 'ai-trading',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
