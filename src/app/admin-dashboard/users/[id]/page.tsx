'use client';

import { useParams } from "next/navigation";
import UserDetails from "@/features/admin-dashboard/components/user-details";
import { useAdminDashboardStore } from "@/features/admin-dashboard/store";

export default function AdminUserDetailsPage() {
    const params = useParams<{ id?: string | string[] }>();
    const id = Array.isArray(params?.id) ? params?.id[0] : params?.id;
    const user = useAdminDashboardStore((s) =>
        id ? s.getUserById(id) : undefined
    );

    if (!id) {
        return <div className="p-4">شناسه کاربر نامعتبر است.</div>;
    }

    if (!user) {
        return <div className="p-4">کاربر پیدا نشد.</div>;
    }

    return <UserDetails user={user} />;
}
