'use client';

import Link from "next/link";
import { useParams } from "next/navigation";
import UserDetails from "@/features/admin-dashboard/components/user-details";
import { useAdminDashboardStore } from "@/features/admin-dashboard/store";

export default function AdminUserDetailsPage() {
    const params = useParams();
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;
    const user = useAdminDashboardStore((state) =>
        userId ? state.getUserById(userId) : undefined
    );

    if (!user) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start gap-4 px-6 py-10">
                <h1 className="text-2xl font-semibold">کاربر پیدا نشد</h1>
                <p className="text-muted-foreground">
                    کاربری با شناسه وارد شده در لیست ثبت نشده است.
                </p>
                <Link href="/admin-dashboard" className="text-primary hover:underline">
                    بازگشت به داشبورد ادمین
                </Link>
            </div>
        );
    }

    return <UserDetails user={user} />;
}
