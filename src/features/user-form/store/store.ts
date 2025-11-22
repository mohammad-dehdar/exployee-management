import { create } from "zustand";
import { createJSONStorage, persist, StateStorage } from "zustand/middleware";
import type { UserRecord } from "@/types/user";
import { useAuthStore } from "@/features/auth";

interface UserProfileState {
    // Current user profile
    profile: UserRecord | null;
    
    // Actions
    setProfile: (profile: UserRecord) => void;
    updatePersonalInfo: (data: Partial<UserRecord['personal']>) => void;
    updateContactInfo: (data: Partial<UserRecord['contact']>) => void;
    updateJobInfo: (data: Partial<UserRecord['job']>) => void;
    updateFinancialInfo: (data: Partial<UserRecord['financial']>) => void;
    updateEducationInfo: (data: Partial<UserRecord['education']>) => void;
    updateWorkHistory: (workHistory: UserRecord['workHistory']) => void;
    updateCertificates: (certificates: UserRecord['certificates']) => void;
    updateAttachments: (data: Partial<UserRecord['attachments']>) => void;
    updateAdditionalInfo: (data: Partial<UserRecord['additional']>) => void;
    updateProfile: (data: Partial<UserRecord>) => void;
    resetProfile: () => void;
    
    // Computed values
    getCompletionPercent: () => number;
    getCompletionScore: () => number;
    isProfileComplete: () => boolean;
}

const fallbackStorage: StateStorage = {
    getItem: () => null,
    setItem: () => undefined,
    removeItem: () => undefined,
};

const clientStorage =
    typeof window !== "undefined" ? createJSONStorage(() => localStorage) : fallbackStorage;

const createEmptyProfile = (userId: string, email?: string): UserRecord => ({
    id: userId,
    personal: {},
    contact: { orgEmail: email },
    job: {},
    financial: {},
    education: {},
    workHistory: [],
    certificates: [],
    attachments: {},
    additional: {},
});

export const useUserProfileStore = create<UserProfileState>()(
    persist(
        (set, get) => ({
            profile: null,

            setProfile: (profile) => set({ profile }),

            updatePersonalInfo: (data) => {
                const currentProfile = get().profile;
                const currentUserId = useAuthStore.getState().currentUserId;
                
                if (!currentUserId) return;

                const profile = currentProfile ?? createEmptyProfile(currentUserId);
                set({
                    profile: {
                        ...profile,
                        personal: { ...profile.personal, ...data },
                    },
                });
                
                // Sync with auth store
                useAuthStore.getState().updateProfile(currentUserId, {
                    personal: { ...profile.personal, ...data },
                });
            },

            updateContactInfo: (data) => {
                const currentProfile = get().profile;
                const currentUserId = useAuthStore.getState().currentUserId;
                
                if (!currentUserId) return;

                const profile = currentProfile ?? createEmptyProfile(currentUserId);
                set({
                    profile: {
                        ...profile,
                        contact: { ...profile.contact, ...data },
                    },
                });
                
                useAuthStore.getState().updateProfile(currentUserId, {
                    contact: { ...profile.contact, ...data },
                });
            },

            updateJobInfo: (data) => {
                const currentProfile = get().profile;
                const currentUserId = useAuthStore.getState().currentUserId;
                
                if (!currentUserId) return;

                const profile = currentProfile ?? createEmptyProfile(currentUserId);
                set({
                    profile: {
                        ...profile,
                        job: { ...profile.job, ...data },
                    },
                });
                
                useAuthStore.getState().updateProfile(currentUserId, {
                    job: { ...profile.job, ...data },
                });
            },

            updateFinancialInfo: (data) => {
                const currentProfile = get().profile;
                const currentUserId = useAuthStore.getState().currentUserId;
                
                if (!currentUserId) return;

                const profile = currentProfile ?? createEmptyProfile(currentUserId);
                set({
                    profile: {
                        ...profile,
                        financial: { ...profile.financial, ...data },
                    },
                });
                
                useAuthStore.getState().updateProfile(currentUserId, {
                    financial: { ...profile.financial, ...data },
                });
            },

            updateEducationInfo: (data) => {
                const currentProfile = get().profile;
                const currentUserId = useAuthStore.getState().currentUserId;
                
                if (!currentUserId) return;

                const profile = currentProfile ?? createEmptyProfile(currentUserId);
                set({
                    profile: {
                        ...profile,
                        education: { ...profile.education, ...data },
                    },
                });
                
                useAuthStore.getState().updateProfile(currentUserId, {
                    education: { ...profile.education, ...data },
                });
            },

            updateWorkHistory: (workHistory) => {
                const currentProfile = get().profile;
                const currentUserId = useAuthStore.getState().currentUserId;
                
                if (!currentUserId) return;

                const profile = currentProfile ?? createEmptyProfile(currentUserId);
                set({
                    profile: {
                        ...profile,
                        workHistory,
                    },
                });
                
                useAuthStore.getState().updateProfile(currentUserId, {
                    workHistory,
                });
            },

            updateCertificates: (certificates) => {
                const currentProfile = get().profile;
                const currentUserId = useAuthStore.getState().currentUserId;
                
                if (!currentUserId) return;

                const profile = currentProfile ?? createEmptyProfile(currentUserId);
                set({
                    profile: {
                        ...profile,
                        certificates,
                    },
                });
                
                useAuthStore.getState().updateProfile(currentUserId, {
                    certificates,
                });
            },

            updateAttachments: (data) => {
                const currentProfile = get().profile;
                const currentUserId = useAuthStore.getState().currentUserId;
                
                if (!currentUserId) return;

                const profile = currentProfile ?? createEmptyProfile(currentUserId);
                set({
                    profile: {
                        ...profile,
                        attachments: { ...profile.attachments, ...data },
                    },
                });
                
                useAuthStore.getState().updateProfile(currentUserId, {
                    attachments: { ...profile.attachments, ...data },
                });
            },

            updateAdditionalInfo: (data) => {
                const currentProfile = get().profile;
                const currentUserId = useAuthStore.getState().currentUserId;
                
                if (!currentUserId) return;

                const profile = currentProfile ?? createEmptyProfile(currentUserId);
                set({
                    profile: {
                        ...profile,
                        additional: {
                            ...profile.additional,
                            ...data,
                            skills: data.skills ?? profile.additional.skills,
                        },
                    },
                });
                
                useAuthStore.getState().updateProfile(currentUserId, {
                    additional: {
                        ...profile.additional,
                        ...data,
                        skills: data.skills ?? profile.additional.skills,
                    },
                });
            },

            updateProfile: (data) => {
                const currentProfile = get().profile;
                const currentUserId = useAuthStore.getState().currentUserId;
                
                if (!currentUserId) return;

                const profile = currentProfile ?? createEmptyProfile(currentUserId);
                const updatedProfile: UserRecord = {
                    ...profile,
                    personal: { ...profile.personal, ...data.personal },
                    contact: { ...profile.contact, ...data.contact },
                    job: { ...profile.job, ...data.job },
                    financial: { ...profile.financial, ...data.financial },
                    education: { ...profile.education, ...data.education },
                    workHistory: data.workHistory ?? profile.workHistory,
                    certificates: data.certificates ?? profile.certificates,
                    attachments: { ...profile.attachments, ...data.attachments },
                    additional: {
                        ...profile.additional,
                        ...data.additional,
                        skills: data.additional?.skills ?? profile.additional.skills,
                    },
                };

                set({ profile: updatedProfile });
                
                useAuthStore.getState().updateProfile(currentUserId, updatedProfile);
            },

            resetProfile: () => {
                const currentUserId = useAuthStore.getState().currentUserId;
                if (!currentUserId) return;

                const account = useAuthStore.getState().accounts.find((acc) => acc.id === currentUserId);
                const emptyProfile = createEmptyProfile(currentUserId, account?.email);
                set({ profile: emptyProfile });
                
                useAuthStore.getState().updateProfile(currentUserId, emptyProfile);
            },

            getCompletionScore: () => {
                const profile = get().profile;
                if (!profile) return 0;

                const scores = [
                    Boolean(profile.personal && Object.keys(profile.personal).length),
                    Boolean(profile.contact && Object.keys(profile.contact).length),
                    Boolean(profile.job && Object.keys(profile.job).length),
                    Boolean(profile.education && Object.keys(profile.education).length),
                    Boolean(profile.workHistory && profile.workHistory.length > 0 && profile.workHistory.some((item) => Boolean(item.company || item.role))),
                    Boolean(profile.certificates && profile.certificates.length > 0 && profile.certificates.some((item) => Boolean(item.title || item.issuer))),
                    Boolean(profile.attachments && Object.keys(profile.attachments).length),
                    Boolean(profile.additional && Object.keys(profile.additional).length),
                ];

                return scores.filter(Boolean).length;
            },

            getCompletionPercent: () => {
                const score = get().getCompletionScore();
                return Math.round((score / 8) * 100);
            },

            isProfileComplete: () => {
                return get().getCompletionPercent() === 100;
            },
        }),
        {
            name: "user-profile-store",
            storage: clientStorage as any,
            partialize: (state) => ({ profile: state.profile }),
        }
    )
);

