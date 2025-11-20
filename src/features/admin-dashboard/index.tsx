'use client';


import UserCard from "./components/user-card";
import { useAdminDashboardStore } from "./store";


export default function AdminDashboardFeature() {
    const users = useAdminDashboardStore((s) => s.users);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}

            {users.length === 0 && (
                <p className="text-center opacity-50 col-span-full">هنوز کاربری ثبت نشده است.</p>
            )}
        </div>
    );
}
