import { create } from 'zustand';
import { User } from '@/types/user';

interface AuthState {
  user: User | null;
  token: string | null;
  cTgId: string;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  cTgId: '',
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setCTgId: (tgId: string) => set(() => ({ cTgId: tgId })),
  logout: () => set({ user: null, token: null }),
}));
