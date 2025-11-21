import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { UserRecord } from "@/types/user";

export default function UserDetails({ user }: { user: UserRecord }) {
    const { personal, contact, job } = user;

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -left-8 top-8 h-40 w-40 rounded-full bg-sky-200 blur-3xl dark:bg-sky-500/30" />
                    <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-indigo-200 blur-3xl dark:bg-indigo-500/30" />
                </div>
                <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-lg">
                            {personal.firstName?.[0] ?? "؟"}
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                                پروفایل کاربر
                            </p>
                            <h1 className="text-2xl font-bold text-foreground">
                                {personal.firstName || "نام"} {personal.lastName || "نام خانوادگی"}
                            </h1>
                            <p className="text-sm text-muted-foreground leading-6">
                                {job.position || "سمت مشخص نشده"} • {job.contractType || "نوع قرارداد نامشخص"}
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/admin-dashboard"
                        className="inline-flex items-center justify-center rounded-xl border border-indigo-200/80 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:shadow-md dark:border-indigo-500/40 dark:bg-indigo-500/15 dark:text-indigo-100"
                    >
                        بازگشت به لیست کاربران
                    </Link>
                </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
                <Card className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm dark:border-slate-800/70">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">اطلاعات شخصی</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm leading-7 text-foreground">
                        <p>نام: {personal.firstName ?? "ثبت نشده"}</p>
                        <p>نام خانوادگی: {personal.lastName ?? "ثبت نشده"}</p>
                        <p>کد ملی: {personal.nationalId ?? "ثبت نشده"}</p>
                        <p>تاریخ تولد: {personal.birthDate ?? "ثبت نشده"}</p>
                        <p>جنسیت: {personal.gender ?? "ثبت نشده"}</p>
                    </CardContent>
                </Card>

                <Card className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm dark:border-slate-800/70">
                    <CardHeader>
                        <CardTitle className="text-lg font-semibold">اطلاعات تماس</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm leading-7 text-foreground">
                        <p>شماره موبایل: {contact.phone ?? "ثبت نشده"}</p>
                        <p>ایمیل سازمانی: {contact.orgEmail ?? "ثبت نشده"}</p>
                        <p>آدرس: {contact.address ?? "ثبت نشده"}</p>
                        <p>شهر: {contact.city ?? "ثبت نشده"}</p>
                    </CardContent>
                </Card>
            </div>

            <Card className="overflow-hidden rounded-2xl border border-slate-200/80 shadow-sm dark:border-slate-800/70">
                <CardHeader>
                    <CardTitle className="text-lg font-semibold">اطلاعات شغلی</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-2 text-sm leading-7 text-foreground md:grid-cols-2">
                    <p>سمت: {job.position ?? "ثبت نشده"}</p>
                    <p>نوع قرارداد: {job.contractType ?? "ثبت نشده"}</p>
                    <p>تاریخ شروع: {job.startDate ?? "ثبت نشده"}</p>
                    <p>تاریخ پایان: {job.endDate ?? "ثبت نشده"}</p>
                    <p>لوکیشن: {job.location ?? "ثبت نشده"}</p>
                    <p>ایمیل کاری: {contact.orgEmail ?? "ثبت نشده"}</p>
                </CardContent>
            </Card>
        </div>
    );
}
