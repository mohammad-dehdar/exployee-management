'use client';

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
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
                : "ثبت نشده";

        return [
            { label: "نام و نام خانوادگی", value: fullName },
            { label: "کد ملی", value: (personal?.nationalId as string | undefined) ?? "ثبت نشده" },
            { label: "شماره موبایل", value: (contact?.phone as string | undefined) ?? "ثبت نشده" },
            { label: "ایمیل سازمانی", value: (contact?.orgEmail as string | undefined) ?? account?.email ?? "" },
            { label: "سمت شغلی", value: (job?.position as string | undefined) ?? "ثبت نشده" },
            {
                label: "وضعیت پرونده",
                value: completionPercent === 100 ? "آماده ارسال" : "در انتظار تکمیل",
            },
        ];
    }, [safeProfile, completionPercent, account?.email]);

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