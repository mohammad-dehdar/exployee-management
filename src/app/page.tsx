import Link from "next/link";

const links = [
    { href: "/user-dashboard", label: "داشبورد کاربر", description: "نمای کلی پرونده و وضعیت تکمیل" },
    { href: "/user-dashboard/user-form", label: "فرم تکمیل اطلاعات", description: "ویرایش و ارسال جزئیات شخصی و شغلی" },
    { href: "/admin-dashboard", label: "داشبورد ادمین", description: "مشاهده و بررسی پروفایل تمام کاربران" },
];

export default function Home() {
    return (
        <main className="mx-auto flex min-h-[80vh] max-w-6xl flex-col gap-10 px-6 py-12">
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-indigo-600 to-indigo-800 p-10 text-white shadow-2xl">
                <div className="pointer-events-none absolute inset-0 opacity-25">
                    <div className="absolute -left-16 top-0 h-52 w-52 rounded-full bg-white blur-3xl" />
                    <div className="absolute bottom-6 right-10 h-64 w-64 rounded-full bg-emerald-300 blur-3xl" />
                </div>
                <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="space-y-3 lg:max-w-2xl">
                        <p className="text-sm font-semibold uppercase tracking-wide text-white/80">سیستم مدیریت سرمایه انسانی</p>
                        <h1 className="text-3xl font-bold leading-tight sm:text-4xl">
                            یک داشبورد مدرن برای پیگیری اطلاعات پرسنل، بدون سردرگمی.
                        </h1>
                        <p className="text-base text-white/80 leading-7">
                            همه مسیرها از اینجا شروع می‌شود؛ فرم خود را کامل کنید یا پرونده‌ها را بررسی کنید.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <Link
                                href="/user-dashboard/user-form"
                                className="rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
                            >
                                شروع تکمیل اطلاعات
                            </Link>
                            <Link
                                href="/admin-dashboard"
                                className="rounded-2xl border border-white/30 bg-white/10 px-4 py-3 text-sm font-semibold text-white backdrop-blur transition hover:-translate-y-0.5 hover:border-white/60"
                            >
                                مشاهده داشبورد ادمین
                            </Link>
                        </div>
                    </div>
                    <div className="grid w-full max-w-xs grid-cols-2 gap-3 rounded-2xl bg-white/10 p-4 text-sm font-semibold text-white backdrop-blur lg:max-w-sm">
                        <div className="rounded-xl bg-white/15 p-4 text-center">
                            <p className="text-2xl font-bold">۳ مرحله</p>
                            <p className="text-xs text-white/80">برای تکمیل پروفایل</p>
                        </div>
                        <div className="rounded-xl bg-white/15 p-4 text-center">
                            <p className="text-2xl font-bold">۲ داشبورد</p>
                            <p className="text-xs text-white/80">نمای کلی و جزئیات</p>
                        </div>
                        <div className="col-span-2 rounded-xl bg-white/20 p-4 text-center">
                            <p className="text-base">دسترسی سریع به کارها و پرونده‌ها</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="group relative overflow-hidden rounded-2xl border border-slate-100 bg-white/80 p-6 shadow-lg backdrop-blur transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl dark:border-slate-800/60 dark:bg-slate-900/70"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-sky-50 opacity-0 transition group-hover:opacity-100 dark:from-indigo-500/10 dark:to-sky-500/10" />
                        <div className="relative space-y-3">
                            <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-300">{link.href}</p>
                            <p className="text-lg font-bold text-foreground">{link.label}</p>
                            <p className="text-sm text-muted-foreground leading-6">{link.description}</p>
                        </div>
                    </Link>
                ))}
            </section>

            <section className="grid gap-4 rounded-2xl border border-slate-200/70 bg-white/80 p-6 shadow-lg backdrop-blur lg:grid-cols-3 dark:border-slate-800/60 dark:bg-slate-900/70">
                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-wide text-indigo-600 dark:text-indigo-300">چرا اینجا؟</p>
                    <h2 className="text-xl font-bold">تجربه‌ای دلنشین برای تیم و ادمین</h2>
                    <p className="text-sm text-muted-foreground leading-6">
                        مسیر تکمیل اطلاعات و بررسی پرونده‌ها با کارت‌های زیبا و وضعیت‌های واضح، سریع‌تر و لذت‌بخش‌تر می‌شود.
                    </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:col-span-2">
                    {["کارت‌های گرافیکی با جزئیات کامل", "وضعیت شفاف هر مرحله", "دسترسی سریع به فرم‌ها و داشبورد"]
                        .map((item) => (
                            <div
                                key={item}
                                className="rounded-2xl border border-slate-100/70 bg-gradient-to-br from-slate-50 to-white p-4 text-sm font-medium shadow-sm dark:border-slate-800/60 dark:from-slate-800/70 dark:to-slate-900"
                            >
                                {item}
                            </div>
                        ))}
                </div>
            </section>
        </main>
    );
}
