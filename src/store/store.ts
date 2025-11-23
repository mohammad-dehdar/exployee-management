import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import type { UserRecord, UpdateUserPayload } from "@/schemas/user.schema";
import { authService } from "@/services/auth.service";
import { userService } from "@/services/user.service";

type Role = "admin" | "user";

export interface Account {
    id: string;
    email: string;
    password: string;
    role: Role;
    displayName?: string;
}

interface AuthState {
    accounts: Account[];
    profiles: Record<string, UserRecord>;
    currentUserId?: string;
    
    // Auth methods (now use services)
    login: (email: string, password: string) => Promise<{ success: boolean; role?: Role; message?: string }>;
    logout: () => Promise<void>;
    registerUser: (payload: { email: string; password: string; displayName?: string; orgEmail?: string }) => Promise<{
        success: boolean;
        message?: string;
    }>;
    changePassword: (
        userId: string,
        payload: { currentPassword: string; newPassword: string }
    ) => Promise<{ success: boolean; message?: string }>;
    
    // Profile methods (now use services)
    updateProfile: (userId: string, data: UpdateUserPayload) => Promise<void>;
    getProfile: (userId: string) => UserRecord | undefined;
    getCurrentProfile: () => UserRecord | undefined;
    
    // Computed values (now use services)
    getCompletionPercent: (userId: string) => Promise<number>;
    isProfileComplete: (userId: string) => Promise<boolean>;
    
    // Internal state setters
    setCurrentUserId: (userId: string | undefined) => void;
    addAccount: (account: Account) => void;
    addProfile: (userId: string, profile: UserRecord) => void;
    updateAccountPassword: (userId: string, newPassword: string) => void;
}

const fallbackStorage: StateStorage = {
    getItem: () => null,
    setItem: () => undefined,
    removeItem: () => undefined,
};

const clientStorage =
    typeof window !== "undefined" ? createJSONStorage(() => localStorage) : fallbackStorage;

const defaultAdmin: Account = {
    id: "admin",
    email: "admin@company.com",
    password: "admin123",
    role: "admin",
    displayName: "ادمین سیستم",
};


export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accounts: [defaultAdmin],
            profiles: {},
            currentUserId: undefined,
            
            // Auth methods using services
            login: async (email, password) => {
                const accounts = get().accounts;
                const result = await authService.login(email, password, accounts);
                
                if (result.success && result.account) {
                    set({ currentUserId: result.account.id });
                }
                
                return {
                    success: result.success,
                    role: result.role,
                    message: result.message,
                };
            },
            
            logout: async () => {
                await authService.logout();
                set({ currentUserId: undefined });
            },
            
            registerUser: async ({ email, password, displayName, orgEmail }) => {
                const accounts = get().accounts;
                const result = await authService.registerUser(
                    { email, password, displayName, orgEmail },
                    accounts
                );
                
                if (result.success && result.account && result.profile) {
                    set((state) => ({
                        accounts: [...state.accounts, result.account!],
                        profiles: {
                            ...state.profiles,
                            [result.account!.id]: result.profile!,
                        },
                    }));
                }
                
                return {
                    success: result.success,
                    message: result.message,
                };
            },
            
            changePassword: async (userId, { currentPassword, newPassword }) => {
                const accounts = get().accounts;
                const result = await authService.changePassword(userId, { currentPassword, newPassword }, accounts);
                
                if (result.success) {
                    get().updateAccountPassword(userId, newPassword);
                }
                
                return result;
            },
            
            // Profile methods using services
            updateProfile: async (userId, data) => {
                const state = get();
                const account = state.accounts.find(acc => acc.id === userId);
                const existingProfile = state.profiles[userId];
                
                const result = await userService.updateProfile(
                    userId,
                    data,
                    existingProfile,
                    account
                );
                
                if (result.success && result.profile) {
                    set((state) => ({
                        profiles: {
                            ...state.profiles,
                            [userId]: result.profile!,
                        },
                    }));
                }
            },
            
            getProfile: (userId) => get().profiles[userId],
            
            getCurrentProfile: () => {
                const userId = get().currentUserId;
                if (!userId) return undefined;
                return get().profiles[userId];
            },
            
            getCompletionPercent: async (userId) => {
                const profiles = get().profiles;
                return await userService.getCompletionPercent(userId, profiles);
            },
            
            isProfileComplete: async (userId) => {
                const profiles = get().profiles;
                return await userService.isProfileComplete(userId, profiles);
            },
            
            // Internal state setters
            setCurrentUserId: (userId) => set({ currentUserId: userId }),
            
            addAccount: (account) => set((state) => ({
                accounts: [...state.accounts, account],
            })),
            
            addProfile: (userId, profile) => set((state) => ({
                profiles: {
                    ...state.profiles,
                    [userId]: profile,
                },
            })),
            
            updateAccountPassword: (userId, newPassword) => {
                const accounts = get().accounts;
                const accountIndex = accounts.findIndex((acc) => acc.id === userId);
                
                if (accountIndex !== -1) {
                    const updatedAccounts = [...accounts];
                    updatedAccounts[accountIndex] = {
                        ...accounts[accountIndex],
                        password: newPassword,
                    };
                    set({ accounts: updatedAccounts });
                }
            },
        }),
        {
            name: "auth-store",
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            storage: clientStorage as any,
            merge: (persisted, current) => {
                const nextState = {
                    ...current,
                    ...(persisted as Partial<AuthState>),
                } as AuthState;

                const hasAdmin = nextState.accounts.some((acc) => acc.role === "admin");
                if (!hasAdmin) {
                    nextState.accounts = [defaultAdmin, ...nextState.accounts];
                }

                return nextState;
            },
        }
    )
);

