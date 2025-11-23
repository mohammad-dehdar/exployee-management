'use client';

import { useEffect, useMemo } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "@/i18n/routing";
import { useAuthStore } from "@/features/auth";
import type { SummaryItem } from "./types";
import {
    StatusCard,
    ProfileSummaryCard,
    RemindersCard,
    ChangePasswordCard,
    HeroCard,
} from "./components";

export default function UserDashboardFeature() {
    const t = useTranslations('userDashboard');
    const tCommon = useTranslations('common');
    const tOptions = useTranslations('options');
    const router = useRouter();
    const { profiles, currentUserId, accounts, getCompletionPercent } = useAuthStore();
    
    const account = useMemo(
        () => accounts.find((acc) => acc.id === currentUserId),
        [accounts, currentUserId]
    );
    
    const profile = useMemo(
        () => currentUserId ? profiles[currentUserId] : undefined,
        [profiles, currentUserId]
    );

    useEffect(() => {
        if (!account || account.role !== "user") {
            router.replace("/");
        }
    }, [account, router]);

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

    const completionPercent = useMemo(
        () => currentUserId ? getCompletionPercent(currentUserId) : 0,
        [currentUserId, getCompletionPercent]
    );

    const profileSummary = useMemo<SummaryItem[]>(() => {
        const personal = safeProfile.personal as Record<string, unknown> | undefined;
        const contact = safeProfile.contact as Record<string, unknown> | undefined;
        const job = safeProfile.job as Record<string, unknown> | undefined;

        const firstName = personal?.firstName as string | undefined;
        const lastName = personal?.lastName as string | undefined;
        const fullName =
            firstName || lastName
                ? `${firstName ?? ""} ${lastName ?? ""}`.trim()
                : t('info.notRegistered');

        // Translate position value to localized text
        const positionValue = job?.position as string | undefined;
        let positionText = t('info.notRegistered');
        if (positionValue) {
            const positionKey = positionValue as 'frontend' | 'backend' | 'designer' | 'other';
            if (['frontend', 'backend', 'designer', 'other'].includes(positionValue)) {
                positionText = tOptions(`position.${positionKey}`);
            } else {
                positionText = positionValue;
            }
        }

        return [
            { label: t('info.fullName'), value: fullName },
            { label: t('info.nationalId'), value: (personal?.nationalId as string | undefined) ?? t('info.notRegistered') },
            { label: t('info.phone'), value: (contact?.phone as string | undefined) ?? t('info.notRegistered') },
            { label: t('info.personalEmail'), value: (contact?.personalEmail as string | undefined) ?? account?.email ?? "" },
            { label: t('info.position'), value: positionText },
            {
                label: t('info.fileStatus.ready'),
                value: completionPercent === 100 ? t('info.fileStatus.ready') : t('info.fileStatus.pending'),
            },
        ];
    }, [safeProfile, completionPercent, account?.email, t, tOptions]);

    if (!account || account.role !== "user") {
        return null;
    }

    return (
        <main className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col gap-4 sm:gap-6 px-3 sm:px-4 md:px-5 py-6 sm:py-8 md:py-10 overflow-x-hidden">
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

            <section className="grid gap-4 lg:grid-cols-[1.4fr,1fr] w-full min-w-0">
                <div className="min-w-0 w-full">
                    <ProfileSummaryCard summary={profileSummary} />
                </div>
            </section>

            <RemindersCard />
        </main>
    );
}