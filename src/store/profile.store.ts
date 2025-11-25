import { create } from "zustand";
import { createJSONStorage, persist, type PersistStorage } from "zustand/middleware";
import type { UserRecord, UpdateUserPayload } from "@/schemas/user.schema";
import { createEmptyProfile, calculateCompletionPercent } from "@/schemas/user.schema";
import type { Account } from "./auth.store";

interface ProfileState {
    profiles: Record<string, UserRecord>;
    
    updateProfile: (userId: string, data: UpdateUserPayload, account?: Account) => Promise<void>;
    getProfile: (userId: string) => UserRecord | undefined;
    getCompletionPercent: (userId: string) => Promise<number>;
    isProfileComplete: (userId: string) => Promise<boolean>;
    
    addProfile: (userId: string, profile: UserRecord) => void;
}

const clientStorage: PersistStorage<ProfileState> | undefined =
    typeof window !== "undefined" ? createJSONStorage<ProfileState>(() => localStorage) : undefined;

export const useProfileStore = create<ProfileState>()(
    persist(
        (set, get) => ({
            profiles: {},
            
            updateProfile: async (userId, data, account) => {
                const existingProfile = get().profiles[userId];
                
                const existing = existingProfile ?? createEmptyProfile(
                    userId,
                    account?.email,
                    account?.name
                );

                const existingAdditional = existing.additional || {};
                const mergedAdditional = data.additional
                    ? {
                        ...existingAdditional,
                        ...data.additional,
                        skills:
                            data.additional.skills !== undefined
                                ? data.additional.skills
                                : existingAdditional.skills || [],
                    }
                    : existingAdditional;

                const mergedProfile: UserRecord = {
                    ...existing,
                    personal: data.personal
                        ? { ...existing.personal, ...data.personal }
                        : existing.personal,
                    contact: data.contact
                        ? { ...existing.contact, ...data.contact }
                        : existing.contact,
                    job: data.job ? { ...existing.job, ...data.job } : existing.job,
                    financial: data.financial
                        ? { ...existing.financial, ...data.financial }
                        : existing.financial,
                    education: data.education
                        ? { ...existing.education, ...data.education }
                        : existing.education,
                    workHistory:
                        data.workHistory !== undefined ? data.workHistory : existing.workHistory,
                    certificates:
                        data.certificates !== undefined
                            ? data.certificates
                            : existing.certificates,
                    attachments: data.attachments
                        ? { ...existing.attachments, ...data.attachments }
                        : existing.attachments,
                    additional: mergedAdditional,
                };
                
                set((state) => ({
                    profiles: {
                        ...state.profiles,
                        [userId]: mergedProfile,
                    },
                }));
            },
            
            getProfile: (userId) => get().profiles[userId],
            
            getCompletionPercent: async (userId) => {
                const profiles = get().profiles;
                const profile = profiles[userId];
                if (!profile) return 0;
                return calculateCompletionPercent(profile);
            },
            
            isProfileComplete: async (userId) => {
                const profiles = get().profiles;
                const profile = profiles[userId];
                if (!profile) return false;
                const percent = calculateCompletionPercent(profile);
                return percent === 100;
            },
            
            addProfile: (userId, profile) => set((state) => ({
                profiles: {
                    ...state.profiles,
                    [userId]: profile,
                },
            })),
        }),
        {
            name: "profile-store",
            storage: clientStorage,
        }
    )
);

