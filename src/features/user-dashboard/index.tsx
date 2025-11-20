import { useMemo } from "react";
import { useUserFormStore } from "@/features/user-form/store";
import type { SummaryItem } from "./types";
import {
    HeroCard,
    StatusCard,
    ProfileSummaryCard,
    NextStepsCard,
    RemindersCard,
} from "./components";

export default function UserDashboardFeature() {
    const { personal, contact, job } = useUserFormStore();

    const completionScore = [
        Boolean(personal && Object.keys(personal).length),
        Boolean(contact && Object.keys(contact).length),
        Boolean(job && Object.keys(job).length),
    ].filter(Boolean).length;

    const completionPercent = Math.round((completionScore / 3) * 100);

    const profileSummary = useMemo<SummaryItem[]>(() => {
        const fullName =
            personal?.firstName || personal?.lastName
                ? `${personal?.firstName ?? ""} ${personal?.lastName ?? ""}`.trim()
                : "ثبت نشده";

        return [
            { label: "نام و نام خانوادگی", value: fullName },
            { label: "کد ملی", value: personal?.nationalId ?? "ثبت نشده" },
            { label: "شماره موبایل", value: contact?.phone ?? "ثبت نشده" },
            { label: "ایمیل سازمانی", value: contact?.orgEmail ?? "ثبت نشده" },
            { label: "سمت شغلی", value: job?.position ?? "ثبت نشده" },
            {
                label: "وضعیت پرونده",
                value: completionPercent === 100 ? "آماده ارسال" : "در انتظار تکمیل",
            },
        ];
    }, [personal, contact, job, completionPercent]);

    return (
        <main className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col gap-6 px-5 py-10">
            <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
                <HeroCard completionPercent={completionPercent} />
                <StatusCard personal={personal} contact={contact} job={job} />
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.4fr,1fr]">
                <ProfileSummaryCard summary={profileSummary} />
                <NextStepsCard />
            </section>

            <RemindersCard />
        </main>
    );
}
