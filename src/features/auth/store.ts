import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import type { UserRecord } from "@/schemas/user.schema";

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
    
    // Auth methods
    login: (email: string, password: string) => { success: boolean; role?: Role; message?: string };
    logout: () => void;
            registerUser: (payload: { email: string; password: string; displayName?: string; orgEmail?: string }) => {
                success: boolean;
                message?: string;
            };
    changePassword: (
        userId: string,
        payload: { currentPassword: string; newPassword: string }
    ) => { success: boolean; message?: string };
    
    // Profile methods
    updateProfile: (userId: string, data: Partial<UserRecord>) => void;
    getProfile: (userId: string) => UserRecord | undefined;
    getCurrentProfile: () => UserRecord | undefined;
    
    // Computed values
    getCompletionPercent: (userId: string) => number;
    isProfileComplete: (userId: string) => boolean;
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

const createEmptyProfile = (userId: string, email?: string, displayName?: string, orgEmail?: string): UserRecord => ({
    id: userId,
    personal: { username: displayName },
    contact: { 
        personalEmail: email,
        orgEmail: orgEmail 
    },
    job: {},
    financial: {},
    education: {},
    workHistory: [],
    certificates: [],
    attachments: {},
    additional: {},
});

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            accounts: [defaultAdmin],
            profiles: {},
            currentUserId: undefined,
            
            login: (email, password) => {
                const normalizedEmail = email.trim().toLowerCase();
                const account = get().accounts.find(
                    (acc) => acc.email.toLowerCase() === normalizedEmail && acc.password === password
                );

                if (!account) {
                    return { success: false, message: "ایمیل یا پسورد نادرست است" };
                }

                set({ currentUserId: account.id });
                return { success: true, role: account.role };
            },
            
            logout: () => set({ currentUserId: undefined }),
            
            registerUser: ({ email, password, displayName, orgEmail }) => {
                const normalizedEmail = email.trim().toLowerCase();
                const normalizedOrgEmail = orgEmail?.trim().toLowerCase();
                const exists = get().accounts.some(
                    (acc) => acc.email.toLowerCase() === normalizedEmail
                );

                if (exists) {
                    return { success: false, message: "برای این ایمیل قبلاً حساب ساخته شده است" };
                }

                const id = crypto.randomUUID();
                const newAccount: Account = {
                    id,
                    email: normalizedEmail,
                    password,
                    role: "user",
                    displayName,
                };

                set((state) => ({
                    accounts: [...state.accounts, newAccount],
                    profiles: {
                        ...state.profiles,
                        [id]: createEmptyProfile(id, normalizedEmail, displayName, normalizedOrgEmail),
                    },
                }));

                return { success: true };
            },
            
            changePassword: (userId, { currentPassword, newPassword }) => {
                const accounts = get().accounts;
                const accountIndex = accounts.findIndex((acc) => acc.id === userId);

                if (accountIndex === -1) {
                    return { success: false, message: "کاربر یافت نشد" };
                }

                if (accounts[accountIndex].password !== currentPassword) {
                    return { success: false, message: "رمز فعلی صحیح نیست" };
                }

                const updatedAccounts = [...accounts];
                updatedAccounts[accountIndex] = {
                    ...accounts[accountIndex],
                    password: newPassword,
                };

                set({ accounts: updatedAccounts });
                return { success: true };
            },
            
            updateProfile: (userId, data) =>
                set((state) => {
                    const account = state.accounts.find(acc => acc.id === userId);
                    const existing = state.profiles[userId] ?? createEmptyProfile(userId, account?.email, account?.displayName);

                    // ✅ FIX: Safe merge for additional info with skills
                    const existingAdditional = existing.additional || {};
                    const mergedAdditional = data.additional 
                        ? {
                            ...existingAdditional,
                            ...data.additional,
                            // Only override skills if explicitly provided
                            skills: data.additional.skills !== undefined 
                                ? data.additional.skills 
                                : (existingAdditional.skills || [])
                        }
                        : existingAdditional;

                    return {
                        profiles: {
                            ...state.profiles,
                            [userId]: {
                                ...existing,
                                personal: data.personal 
                                    ? { ...existing.personal, ...data.personal }
                                    : existing.personal,
                                contact: data.contact
                                    ? { ...existing.contact, ...data.contact }
                                    : existing.contact,
                                job: data.job
                                    ? { ...existing.job, ...data.job }
                                    : existing.job,
                                financial: data.financial
                                    ? { ...existing.financial, ...data.financial }
                                    : existing.financial,
                                education: data.education
                                    ? { ...existing.education, ...data.education }
                                    : existing.education,
                                workHistory: data.workHistory !== undefined
                                    ? data.workHistory
                                    : existing.workHistory,
                                certificates: data.certificates !== undefined
                                    ? data.certificates
                                    : existing.certificates,
                                attachments: data.attachments
                                    ? { ...existing.attachments, ...data.attachments }
                                    : existing.attachments,
                                additional: mergedAdditional,
                            },
                        },
                    };
                }),
            
            getProfile: (userId) => get().profiles[userId],
            
            getCurrentProfile: () => {
                const userId = get().currentUserId;
                if (!userId) return undefined;
                return get().profiles[userId];
            },
            
            getCompletionPercent: (userId) => {
                const profile = get().profiles[userId];
                if (!profile) return 0;

                const scores = [
                    Boolean(profile.personal && Object.keys(profile.personal).length),
                    Boolean(profile.contact && Object.keys(profile.contact).length),
                    Boolean(profile.job && Object.keys(profile.job).length),
                    Boolean(profile.education && Object.keys(profile.education).length),
                    Boolean(profile.workHistory?.length && profile.workHistory.some((item: { company?: string; role?: string }) => Boolean(item.company || item.role))),
                    Boolean(profile.certificates?.length && profile.certificates.some((item: { title?: string; issuer?: string }) => Boolean(item.title || item.issuer))),
                    Boolean(profile.attachments && Object.keys(profile.attachments).length),
                    Boolean(profile.additional && Object.keys(profile.additional).length),
                ];

                return Math.round((scores.filter(Boolean).length / 8) * 100);
            },
            
            isProfileComplete: (userId) => {
                return get().getCompletionPercent(userId) === 100;
            },
        }),
        {
            name: "auth-store",
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