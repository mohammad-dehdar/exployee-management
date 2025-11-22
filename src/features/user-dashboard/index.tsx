'use client';

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastError, toastSuccess } from "@/components/feedback/toast-provider/toast-provider";
import { useAuthStore } from "@/features/auth";
import type { SummaryItem } from "./types";
import {
    HeroCard,
    StatusCard,
    ProfileSummaryCard,
    NextStepsCard,
    RemindersCard,
} from "./components";

export default function UserDashboardFeature() {
    const router = useRouter();
    const { profiles, currentUserId, accounts, changePassword, logout } = useAuthStore();
    const account = accounts.find((acc) => acc.id === currentUserId);
    const profile = currentUserId
        ? profiles[currentUserId] ?? { id: currentUserId, personal: {}, contact: {}, job: {} }
        : undefined;

    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    useEffect(() => {
        if (!account || account.role !== "user") {
            router.replace("/");
        }
    }, [account, router]);

    const safeProfile = profile ?? { id: account?.id ?? "pending", personal: {}, contact: {}, job: {} };

    const completionScore = [
        Boolean(safeProfile.personal && Object.keys(safeProfile.personal).length),
        Boolean(safeProfile.contact && Object.keys(safeProfile.contact).length),
        Boolean(safeProfile.job && Object.keys(safeProfile.job).length),
    ].filter(Boolean).length;

    const completionPercent = Math.round((completionScore / 3) * 100);

    const profileSummary = useMemo<SummaryItem[]>(() => {
        const fullName =
            safeProfile.personal.firstName || safeProfile.personal.lastName
                ? `${safeProfile.personal.firstName ?? ""} ${safeProfile.personal.lastName ?? ""}`.trim()
                : "ثبت نشده";

        return [
            { label: "نام و نام خانوادگی", value: fullName },
            { label: "کد ملی", value: safeProfile.personal.nationalId ?? "ثبت نشده" },
            { label: "شماره موبایل", value: safeProfile.contact.phone ?? "ثبت نشده" },
            { label: "ایمیل سازمانی", value: safeProfile.contact.orgEmail ?? account?.email ?? "" },
            { label: "سمت شغلی", value: safeProfile.job.position ?? "ثبت نشده" },
            {
                label: "وضعیت پرونده",
                value: completionPercent === 100 ? "آماده ارسال" : "در انتظار تکمیل",
            },
        ];
    }, [safeProfile, completionPercent, account?.email]);

    const handlePasswordChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = account
            ? changePassword(account.id, { currentPassword, newPassword })
            : { success: false };

        if (!result.success) {
            toastError(result.message ?? "تغییر رمز ناموفق بود");
            return;
        }

        setCurrentPassword("");
        setNewPassword("");
        toastSuccess("رمز عبور با موفقیت تغییر کرد");
    };

    const handleLogout = () => {
        logout();
        router.replace("/");
    };

    if (!account || account.role !== "user") {
        return null;
    }

    return (
        <main className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col gap-6 px-5 py-10">
            <section className="flex items-center justify-between gap-4">
                <div className="flex-1">
                    <HeroCard completionPercent={completionPercent} />
                </div>
                <Button variant="ghost" className="text-sm text-muted-foreground" onClick={handleLogout}>
                    خروج از حساب
                </Button>
            </section>

            <section className="grid gap-4 lg:grid-cols-[2fr,1fr]">
                <StatusCard
                    personal={safeProfile.personal}
                    contact={safeProfile.contact}
                    job={safeProfile.job}
                />
                <Card className="rounded-3xl border border-border/60 bg-card/80 shadow-sm backdrop-blur">
                    <CardHeader className="px-5 pt-5 pb-3">
                        <CardTitle className="text-base font-semibold">تغییر رمز عبور</CardTitle>
                        <p className="text-xs text-muted-foreground">رمز فعلی را وارد کنید و رمز جدید بسازید.</p>
                    </CardHeader>
                    <CardContent className="px-5 pb-5">
                        <form onSubmit={handlePasswordChange} className="space-y-3">
                            <div className="space-y-1">
                                <Label htmlFor="currentPassword" className="text-sm">
                                    رمز فعلی
                                </Label>
                                <Input
                                    id="currentPassword"
                                    type="password"
                                    value={currentPassword}
                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="space-y-1">
                                <Label htmlFor="newPassword" className="text-sm">
                                    رمز جدید
                                </Label>
                                <Input
                                    id="newPassword"
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <Button type="submit" className="w-full rounded-xl">
                                ثبت رمز جدید
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </section>

            <section className="grid gap-4 lg:grid-cols-[1.4fr,1fr]">
                <ProfileSummaryCard summary={profileSummary} />
                <NextStepsCard />
            </section>

            <RemindersCard />
        </main>
    );
}
