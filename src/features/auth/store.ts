import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import type { UserRecord } from "@/types/user";

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
    login: (email: string, password: string) => { success: boolean; role?: Role; message?: string };
    logout: () => void;
    registerUser: (payload: { email: string; password: string; displayName?: string }) => {
        success: boolean;
        message?: string;
    };
    updateProfile: (userId: string, data: Partial<UserRecord>) => void;
    getProfile: (userId: string) => UserRecord | undefined;
    changePassword: (
        userId: string,
        payload: { currentPassword: string; newPassword: string }
    ) => { success: boolean; message?: string };
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
            registerUser: ({ email, password, displayName }) => {
                const normalizedEmail = email.trim().toLowerCase();
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
                        [id]: {
                            id,
                            personal: {},
                            contact: { orgEmail: normalizedEmail },
                            job: {},
                            financial: {},
                            education: {},
                            workHistory: [],
                            certificates: [],
                            attachments: {},
                            additional: {},
                        },
                    },
                }));

                return { success: true };
            },
            updateProfile: (userId, data) =>
                set((state) => {
                    const existing = state.profiles[userId] ?? {
                        id: userId,
                        personal: {},
                        contact: {},
                        job: {},
                        financial: {},
                        education: {},
                        workHistory: [],
                        certificates: [],
                        attachments: {},
                        additional: {},
                    };

                    return {
                        profiles: {
                            ...state.profiles,
                            [userId]: {
                                ...existing,
                                personal: { ...existing.personal, ...data.personal },
                                contact: { ...existing.contact, ...data.contact },
                                job: { ...existing.job, ...data.job },
                                financial: { ...existing.financial, ...data.financial },
                                education: { ...existing.education, ...data.education },
                                workHistory: data.workHistory ?? existing.workHistory,
                                certificates: data.certificates ?? existing.certificates,
                                attachments: { ...existing.attachments, ...data.attachments },
                                additional: {
                                    ...existing.additional,
                                    ...data.additional,
                                    skills: data.additional?.skills ?? existing.additional.skills,
                                },
                            },
                        },
                    };
                }),
            getProfile: (userId) => get().profiles[userId],
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
        }),
        {
            name: "auth-store",
            storage: clientStorage,
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
