import { create } from "zustand";

export interface User {
  id: string;
  email: string;
  role?: 'admin' | 'manager' | 'user';
  name?: string;
}

interface UserState {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
