import type { UserRecord, UpdateUserPayload } from "@/schemas/user.schema";
import { useAuthStore as useAuthStoreBase, type Account } from "./auth.store";
import { useProfileStore } from "./profile.store";
import { registerUserApi } from "@/features/admin-dashboard/api/register.api";

type Role = "admin" | "user";

export type { Account };
export { useAuthStore };

interface CombinedAuthState {
    accounts: Account[];
    profiles: Record<string, UserRecord>;
    currentUserId?: string;
    
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
    
    updateProfile: (userId: string, data: UpdateUserPayload) => Promise<void>;
    getProfile: (userId: string) => UserRecord | undefined;
    getCurrentProfile: () => UserRecord | undefined;
    
    getCompletionPercent: (userId: string) => Promise<number>;
    isProfileComplete: (userId: string) => Promise<boolean>;
    
    setCurrentUserId: (userId: string | undefined) => void;
    addAccount: (account: Account) => void;
    addProfile: (userId: string, profile: UserRecord) => void;
    
    authToken?: string;
    setAuthToken: (token: string | undefined) => void;
}

function useAuthStore(): CombinedAuthState {
    const authStore = useAuthStoreBase();
    const profileStore = useProfileStore();
    
    return {
        accounts: authStore.accounts,
        profiles: profileStore.profiles,
        currentUserId: authStore.currentUserId,
        authToken: authStore.authToken,
        
        login: authStore.login,
        logout: authStore.logout,
        registerUser: async (payload) => {
            const result = await registerUserApi(payload);
            
            if (result.success && result.account && result.profile && result.token) {
                authStore.addAccount(result.account);
                authStore.setCurrentUserId(result.account.id);
                authStore.setAuthToken(result.token);
                profileStore.addProfile(result.account.id, result.profile);
            }
            
            return {
                success: result.success,
                message: result.message,
            };
        },
        changePassword: authStore.changePassword,
        
        updateProfile: async (userId, data) => {
            const account = authStore.accounts.find(acc => acc.id === userId);
            await profileStore.updateProfile(userId, data, account);
        },
        getProfile: profileStore.getProfile,
        getCurrentProfile: () => {
            const userId = authStore.currentUserId;
            if (!userId) return undefined;
            return profileStore.getProfile(userId);
        },
        getCompletionPercent: profileStore.getCompletionPercent,
        isProfileComplete: profileStore.isProfileComplete,
        
        setCurrentUserId: authStore.setCurrentUserId,
        addAccount: authStore.addAccount,
        addProfile: profileStore.addProfile,
        
        setAuthToken: authStore.setAuthToken,
    };
}

