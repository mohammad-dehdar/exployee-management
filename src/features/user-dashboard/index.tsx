'use client';

import { useMemo, useState, useEffect } from "react";
import { useAuthStore } from "@/store/store";
import { useRequireAuth } from "@/utils/route-guards";
import { StatusCard, ChangePasswordCard, HeroCard } from "./components";

export default function UserDashboardFeature() {
    const { profiles, currentUserId, getCompletionPercent } = useAuthStore();
    const { currentAccount: account } = useRequireAuth('user');
    
    const profile = useMemo(
        () => currentUserId ? profiles[currentUserId] : undefined,
        [profiles, currentUserId]
    );

    const safeProfile = useMemo(
        () => profile ?? { 
            id: account?.id ?? "pending", 
            personal: {}, 
            contact: {}, 
            job: {},
            financial: {},
            education: {},
            workHistory: [],
            certificates: [],
            attachments: {},
            additional: {},
        },
        [profile, account]
    );

    const [completionPercent, setCompletionPercent] = useState(0);

    useEffect(() => {
        let cancelled = false;
        
        const fetchCompletion = async () => {
            if (!currentUserId) {
                if (!cancelled) setCompletionPercent(0);
                return;
            }
            
            const percent = await getCompletionPercent(currentUserId);
            if (!cancelled) {
                setCompletionPercent(percent);
            }
        };
        
        fetchCompletion();
        
        return () => {
            cancelled = true;
        };
    }, [currentUserId, getCompletionPercent]);

    if (!account) {
        return null;
    }

    return (
        <>
            <section className="flex items-center justify-between gap-2 sm:gap-4 w-full min-w-0">
                <div className="flex-1 min-w-0 w-full">
                    <HeroCard completionPercent={completionPercent} />
                </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-[2fr,1fr] w-full min-w-0">
                <div className="min-w-0 w-full">
                    <StatusCard
                        personal={safeProfile.personal as Record<string, unknown> | undefined}
                        contact={safeProfile.contact as Record<string, unknown> | undefined}
                        job={safeProfile.job as Record<string, unknown> | undefined}
                        education={safeProfile.education as Record<string, unknown> | undefined}
                        workHistory={safeProfile.workHistory as Array<{ company?: string; role?: string; [key: string]: unknown }> | undefined}
                        certificates={safeProfile.certificates as Array<{ title?: string; issuer?: string; [key: string]: unknown }> | undefined}
                        attachments={safeProfile.attachments as Record<string, unknown> | undefined}
                        additional={safeProfile.additional as Record<string, unknown> | undefined}
                    />
                </div>
                <div className="min-w-0 w-full">
                    <ChangePasswordCard />
                </div>
            </section>
        </>
    );
}