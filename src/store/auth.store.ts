import { create } from "zustand";
import { createJSONStorage, persist, type PersistStorage } from "zustand/middleware";
import { loginApi } from "@/features/login/api";
import { changePasswordApi } from "@/features/user-dashboard/api";
import { clearTokens } from "@/utils/auth-service";

type Role = "admin" | "user";

export interface Account {
    id: string;
    email: string;
    role: Role;
    name?: string;
}

interface AuthState {
    accounts: Account[];
    currentUserId?: string;
    
    login: (email: string, password: string) => Promise<{ success: boolean; role?: Role; message?: string }>;
    logout: () => Promise<void>;
    changePassword: (
        userId: string,
        payload: { currentPassword: string; newPassword: string }
    ) => Promise<{ success: boolean; message?: string }>;
    
    setCurrentUserId: (userId: string | undefined) => void;
    addAccount: (account: Account) => void;
    
    authToken?: string;
    setAuthToken: (token: string | undefined) => void;
}

const clientStorage: PersistStorage<Partial<AuthState>> | undefined =
    typeof window !== "undefined" ? createJSONStorage<Partial<AuthState>>(() => localStorage) : undefined;

const upsertAccount = (accounts: Account[], account: Account): Account[] => {
    const index = accounts.findIndex((item) => item.id === account.id);
    if (index === -1) {
        return [...accounts, account];
    }
    const next = [...accounts];
    next[index] = account;
    return next;
};

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accounts: [],
            currentUserId: undefined,
            authToken: undefined,
            
            login: async (email, password) => {
                const result = await loginApi(email, password);
                
                if (result.success && result.account && result.token) {
                    set((state) => ({
                        accounts: upsertAccount(state.accounts, result.account!),
                        currentUserId: result.account!.id,
                        authToken: result.token,
                    }));
                }
                
                return {
                    success: result.success,
                    role: result.role,
                    message: result.message,
                };
            },
            
            logout: async () => {
                clearTokens();
                set({ 
                    currentUserId: undefined,
                    authToken: undefined,
                });
            },
            
            changePassword: async (userId, { currentPassword, newPassword }) => {
                const result = await changePasswordApi(userId, { currentPassword, newPassword });
                
                if (result.success && result.token) {
                    set({ authToken: result.token });
                }
                
                return {
                    success: result.success,
                    message: result.message,
                };
            },
            
            setCurrentUserId: (userId) => set({ currentUserId: userId }),
            
            addAccount: (account) => set((state) => ({
                accounts: upsertAccount(state.accounts, account),
            })),
            
            setAuthToken: (token) => set({ authToken: token }),
        }),
        {
            name: "auth-store",
            storage: clientStorage,
            // SECURITY: Only persist non-sensitive data. Passwords are NEVER stored.
            // Only accounts (id, email, role, name) and currentUserId are persisted.
            partialize: (state) =>
                ({
                    accounts: state.accounts,
                    currentUserId: state.currentUserId,
                }) as Partial<AuthState>,
        }
    )
);

