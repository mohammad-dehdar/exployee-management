'use client';

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toastError, toastSuccess } from "@/components/feedback/toast-provider/toast-provider";
import UserCard from "./components/user-card";
import { useAuthStore } from "@/features/auth";

export default function AdminDashboardFeature() {
    const router = useRouter();
    const { accounts, profiles, registerUser, logout, currentUserId } = useAuthStore();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");

    const currentAccount = useMemo(
        () => accounts.find((acc) => acc.id === currentUserId),
        [accounts, currentUserId]
    );

    if (!currentAccount || currentAccount.role !== "admin") {
        router.replace("/");
        return null;
    }

    const userAccounts = accounts.filter((acc) => acc.role === "user");

    const users = userAccounts.map((account) =>
        profiles[account.id] ?? {
            id: account.id,
            personal: { firstName: account.displayName ?? "نام" },
            contact: { orgEmail: account.email },
            job: {},
        }
    );

    const handleCreateUser = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = registerUser({ email, password, displayName });

        if (!result.success) {
            toastError(result.message ?? "ساخت حساب با خطا مواجه شد");
            return;
        }

        toastSuccess("حساب کاربر ساخته شد");
        setEmail("");
        setPassword("");
        setDisplayName("");
    };

    const handleLogout = () => {
        logout();
        router.replace("/");
    };

    return (
        <main className="mx-auto flex min-h-[70vh] w-full max-w-6xl flex-col gap-8 px-6 py-10">
            <section className="relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white/80 p-8 shadow-xl backdrop-blur dark:border-slate-800/60 dark:bg-slate-900/80">
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -left-10 top-6 h-48 w-48 rounded-full bg-sky-200 blur-3xl dark:bg-sky-500/30" />
                    <div className="absolute bottom-0 right-0 h-64 w-64 rounded-full bg-indigo-200 blur-3xl dark:bg-indigo-500/30" />
                </div>
                <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                        <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">داشبورد ادمین</p>
                        <h1 className="text-3xl font-bold leading-tight">ساخت حساب و مشاهده پروفایل‌ها</h1>
                        <p className="text-sm text-muted-foreground leading-6">
                            از اینجا اکانت جدید بسازید و وضعیت اطلاعات هر کاربر را ببینید.
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span className="rounded-full bg-indigo-50 px-3 py-1 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-100">
                                کاربران ساخته‌شده: {userAccounts.length}
                            </span>
                            <span className="rounded-full bg-emerald-50 px-3 py-1 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-100">
                                ادمین: admin@company.com / admin123
                            </span>
                        </div>
                    </div>
                    <Card className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200/70 shadow-sm dark:border-slate-800/70">
                        <CardHeader className="pb-3">
                            <CardTitle className="text-base font-semibold">ساخت حساب کاربر</CardTitle>
                            <p className="text-xs text-muted-foreground">ایمیل و رمز عبور را وارد کنید تا کاربر بتواند وارد شود.</p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCreateUser} className="space-y-3">
                                <div className="space-y-1">
                                    <Label htmlFor="displayName" className="text-sm">نام کاربر</Label>
                                    <Input
                                        id="displayName"
                                        value={displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                        placeholder="نام و نام خانوادگی"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="userEmail" className="text-sm">ایمیل</Label>
                                    <Input
                                        id="userEmail"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="user@example.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="userPassword" className="text-sm">رمز عبور</Label>
                                    <Input
                                        id="userPassword"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="حداقل ۶ کاراکتر"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full rounded-xl">ساخت حساب</Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
                <div className="relative z-10 mt-4 flex justify-end">
                    <Button variant="ghost" className="text-sm text-muted-foreground" onClick={handleLogout}>
                        خروج از حساب
                    </Button>
                </div>
            </section>

            {users.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300/80 bg-white/70 p-10 text-center text-muted-foreground shadow-lg backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/70">
                    <h2 className="text-xl font-semibold text-foreground">هنوز کاربری ثبت نشده است</h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                        برای شروع، در بالا یک حساب بسازید و اطلاعات او بعد از ورود تکمیل می‌شود.
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
