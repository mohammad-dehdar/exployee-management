import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import type { UserRecord } from "@/types/user";

interface AdminDashboardStore {
    users: UserRecord[];
    addUser: (user: UserRecord) => void;
    getUserById: (id: string) => UserRecord | undefined;
}

const fallbackStorage: StateStorage = {
    getItem: () => null,
    setItem: () => undefined,
    removeItem: () => undefined,
};

const clientStorage =
    typeof window !== "undefined" ? createJSONStorage(() => localStorage) : fallbackStorage;

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
