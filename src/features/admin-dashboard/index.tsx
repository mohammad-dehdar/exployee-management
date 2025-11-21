'use client';

import UserCard from "./components/user-card";
import { useAdminDashboardStore } from "./store";

export default function AdminDashboardFeature() {
    const users = useAdminDashboardStore((state) => state.users);

    return (
        <main className="mx-auto flex min-h-[60vh] w-full max-w-6xl flex-col gap-6 px-6 py-8">
            <header className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-muted-foreground">داشبورد ادمین</p>
                    <h1 className="text-2xl font-semibold">فهرست کاربران</h1>
                </div>
                <p className="text-sm text-muted-foreground">تعداد کاربران: {users.length}</p>
            </header>

            {users.length === 0 ? (
                <div className="rounded-lg border bg-card p-8 text-center text-muted-foreground">
                    هنوز کاربری ثبت نشده است.
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </div>
            )}
        </main>
    );
}
