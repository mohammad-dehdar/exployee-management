'use client';

import UserCard from "./components/user-card";
import { useAdminDashboardStore } from "./store";

export default function AdminDashboardFeature() {
    const users = useAdminDashboardStore((state) => state.users);

    return (
        <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col gap-8 px-6 py-10">
            <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/80">
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -left-10 top-6 h-48 w-48 rounded-full bg-sky-200 blur-3xl dark:bg-sky-500/30" />
                    <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-indigo-200 blur-3xl dark:bg-indigo-500/30" />
                </div>
                <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">داشبورد ادمین</p>
                        <h1 className="text-3xl font-bold leading-tight">پروفایل‌های ثبت شده در یک نگاه</h1>
                        <p className="text-sm text-muted-foreground leading-6">
                            وضعیت کلی کاربران را مشاهده کنید و روی هر کارت کلیک کنید تا جزئیات کامل پروفایل نمایش داده شود.
                        </p>
                    </div>
                    <div className="grid w-full max-w-md grid-cols-2 gap-3 text-center text-sm font-semibold">
                        <div className="rounded-2xl border border-slate-200/70 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm dark:border-slate-800/60 dark:from-slate-800/70 dark:to-slate-900">
                            <p className="text-2xl font-bold">{users.length}</p>
                            <p className="text-xs text-muted-foreground">کاربر ثبت‌شده</p>
                        </div>
                        <div className="rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50 to-sky-50 p-4 text-indigo-700 shadow-sm dark:border-indigo-500/40 dark:from-indigo-500/10 dark:to-sky-500/10 dark:text-indigo-100">
                            <p className="text-2xl font-bold">در یک نگاه</p>
                            <p className="text-xs">کلیک برای جزئیات</p>
                        </div>
                    </div>
                </div>
            </section>

            {users.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300/80 bg-white/70 p-10 text-center text-muted-foreground shadow-lg backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/70">
                    <h2 className="text-xl font-semibold text-foreground">هنوز کاربری ثبت نشده است</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        به کاربران اطلاع دهید فرم را تکمیل کنند تا کارت‌ها اینجا نمایش داده شود.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            )}
        </main>
    );
}
