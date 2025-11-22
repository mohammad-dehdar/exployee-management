import { useEffect } from "react";
import { useAuthStore } from "@/features/auth";
import { useUserProfileStore } from "../store/store";

/**
 * Hook to sync user profile from auth store to user profile store
 * Call this hook in components that need to access user profile
 */
export function useSyncUserProfile() {
    const { profiles, currentUserId, accounts } = useAuthStore();
    const { setProfile } = useUserProfileStore();

    useEffect(() => {
        if (!currentUserId) {
            useUserProfileStore.setState({ profile: null });
            return;
        }

        const profile = profiles[currentUserId];
        const account = accounts.find((acc) => acc.id === currentUserId);

        if (profile) {
            setProfile(profile);
        } else if (account) {
            // Create empty profile if doesn't exist
            const emptyProfile = {
                id: currentUserId,
                personal: {},
                contact: { orgEmail: account.email },
                job: {},
                financial: {},
                education: {},
                workHistory: [],
                certificates: [],
                attachments: {},
                additional: {},
            };
            setProfile(emptyProfile);
        }
    }, [currentUserId, profiles, accounts, setProfile]);
}

/**
 * Hook to get current user profile with auto-sync
 */
export function useCurrentUserProfile() {
    useSyncUserProfile();
    const profile = useUserProfileStore((state) => state.profile);
    const { accounts, currentUserId } = useAuthStore();
    const account = accounts.find((acc) => acc.id === currentUserId);

    return { profile, account, userId: currentUserId };
}

