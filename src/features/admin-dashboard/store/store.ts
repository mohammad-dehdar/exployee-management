import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface UserRecord {
  id: string;
  personal: Record<string, unknown>;
  contact: Record<string, unknown>;
  job: Record<string, unknown>;
}

interface AdminDashboardStore {
  users: UserRecord[];
  addUser: (user: UserRecord) => void;
  getUserById: (id: string) => UserRecord | undefined;
}

const clientStorage =
  typeof window !== "undefined"
    ? createJSONStorage(() => localStorage)
    : undefined;

export const useAdminDashboardStore = create<AdminDashboardStore>()(
  persist(
    (set, get) => ({
      users: [],
      addUser: (user) =>
        set((state) => ({
          users: [...state.users, user],
        })),

      getUserById: (id) => get().users.find((u) => u.id === id),
    }),
    {
      name: "admin-dashboard-users",
      storage: clientStorage,
      partialize: (state) => ({ users: state.users }),
    }
  )
);
