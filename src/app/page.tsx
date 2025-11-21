import Link from "next/link";

const links = [
    { href: "/user-dashboard", label: "داشبورد کاربر" },
    { href: "/user-dashboard/user-form", label: "فرم تکمیل اطلاعات" },
    { href: "/admin-dashboard", label: "داشبورد ادمین" },
];

export default function Home() {
    return (
        <main className="mx-auto flex min-h-[70vh] max-w-5xl flex-col gap-6 px-6 py-10">
            <section className="space-y-2">
                <p className="text-sm text-muted-foreground">سیستم مدیریت پرسنل</p>
                <h1 className="text-3xl font-semibold">خوش آمدید 👋</h1>
                <p className="text-base text-muted-foreground">
                    از لینک‌های زیر برای تکمیل اطلاعات کاربری یا مشاهده پرونده‌ها استفاده کنید.
                </p>
            </section>

            <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-xl border bg-card p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                    >
                        <p className="text-lg font-medium text-primary">{link.label}</p>
                        <p className="mt-2 text-sm text-muted-foreground">{link.href}</p>
                    </Link>
                ))}
            </section>
        </main>
    );
}
