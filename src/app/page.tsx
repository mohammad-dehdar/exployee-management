'use client';

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TextInput, textInput } from "@/components/ui";
import { Label } from "@/components/ui/label";
import { toastError, toastSuccess } from "@/components/feedback/toast-provider/toast-provider";
import { useAuthStore } from "@/features/auth";

const helpfulLinks = [
    { href: "/user-dashboard", label: "داشبورد کاربر", description: "بعد از ورود به عنوان کاربر" },
    { href: "/user-dashboard/user-form", label: "فرم اطلاعات", description: "تکمیل یا ویرایش اطلاعات" },
    { href: "/admin-dashboard", label: "داشبورد ادمین", description: "مشاهده کاربران ساخته‌شده" },
];

export default function Home() {
    const router = useRouter();
    const [email, setEmail] = useState("admin@company.com");
    const [password, setPassword] = useState("admin123");
    const login = useAuthStore((state) => state.login);
    const currentUserId = useAuthStore((state) => state.currentUserId);
    const accounts = useAuthStore((state) => state.accounts);

    useEffect(() => {
        if (!currentUserId) return;
        const account = accounts.find((acc) => acc.id === currentUserId);
        if (!account) return;
        router.replace(account.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    }, [accounts, currentUserId, router]);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const result = login(email, password);

        if (!result.success) {
            toastError(result.message ?? "ورود ناموفق بود");
            return;
        }

        toastSuccess("خوش آمدید!");
        router.replace(result.role === "admin" ? "/admin-dashboard" : "/user-dashboard");
    };

    return (
        <main className="mx-auto flex min-h-[80vh] max-w-5xl flex-col gap-8 px-6 py-12">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-sky-600 to-emerald-500 p-8 text-white shadow-2xl">
                <div className="pointer-events-none absolute inset-0 opacity-30">
                    <div className="absolute -left-16 top-0 h-56 w-56 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-10 right-10 h-64 w-64 rounded-full bg-amber-300 blur-3xl" />
                </div>
                <div className="relative z-10 grid gap-6 lg:grid-cols-[1.2fr,1fr] lg:items-center">
                    <div className="space-y-4">
                        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">ورود به سامانه</p>
                        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">مدیریت پرسنل با حساب‌های امن</h1>
                        <p className="text-base text-white/85 leading-7">
                            با ایمیل و رمز عبور وارد شوید. ادمین می‌تواند حساب کاربری بسازد و کاربران پس از ورود فرم خود را کامل کنند.
                        </p>
                        <div className="flex flex-wrap gap-3 text-xs text-white/80">
                            <span className="rounded-full bg-white/15 px-3 py-1">ادمین پیش‌فرض: admin@company.com / admin123</span>
                            <span className="rounded-full bg-white/15 px-3 py-1">حساب کاربر بعد از ساخت ادمین فعال می‌شود</span>
                        </div>
                    </div>

                    <Card className="relative overflow-hidden rounded-2xl border border-white/40 bg-white/90 shadow-xl backdrop-blur p-4">
                        <CardHeader>
                            <CardTitle className="text-lg font-bold text-slate-900">ورود</CardTitle>
                            <p className="text-sm text-slate-600">حساب ادمین یا کاربر را وارد کنید.</p>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label className="text-sm" htmlFor="email">
                                        ایمیل
                                    </Label>
                                    <TextInput
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-sm" htmlFor="password">
                                        رمز عبور
                                    </Label>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full rounded-xl bg-indigo-600 text-white hover:bg-indigo-700">
                                    ورود به سامانه
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="grid gap-4 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur lg:grid-cols-3 dark:border-slate-800/60 dark:bg-slate-900/70">
                <div className="space-y-2 lg:col-span-2">
                    <p className="text-xs uppercase tracking-wide text-indigo-600 dark:text-indigo-300">مسیر‌ها</p>
                    <h2 className="text-xl font-bold">بعد از ورود به کجا می‌روید؟</h2>
                    <p className="text-sm text-muted-foreground leading-6">
                        ادمین می‌تواند حساب بسازد و پروفایل‌ها را ببیند. کاربران تنها به فرم و داشبورد شخصی دسترسی دارند.
                    </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:col-span-1">
                    {helpfulLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="rounded-2xl border border-slate-100/80 bg-gradient-to-br from-slate-50 to-white p-4 text-sm font-semibold shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800/60 dark:from-slate-800/70 dark:to-slate-900"
                        >
                            <p className="text-indigo-600 dark:text-indigo-300">{link.label}</p>
                            <p className="text-xs text-muted-foreground">{link.description}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </main>
    );
}
