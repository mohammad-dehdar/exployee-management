'use client';

import { useTranslations } from 'next-intl';
import { Link } from "@/i18n/routing";
import { useParams } from "next/navigation";
import UserDetails from "@/features/admin-dashboard/components/user-details";
import { useAuthStore } from "@/store/store";
import { useRequireAuth } from "@/utils/route-guards";

export default function AdminUserDetailsPageFeature() {
    const t = useTranslations('adminDashboard.userDetailsPage');
    const params = useParams();
    const userId = Array.isArray(params.id) ? params.id[0] : params.id;
    const { profiles } = useAuthStore();
    const { currentAccount } = useRequireAuth('admin');

    if (!currentAccount) {
        return null;
    }

    const user = userId ? profiles[userId] : undefined;

    if (!user) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start gap-4">
                <div className="w-full rounded-3xl border border-dashed border-slate-300/80 bg-white/80 p-8 shadow-lg backdrop-blur dark:border-slate-700/70 dark:bg-slate-900/70">
                    <h1 className="text-2xl font-semibold">{t('userNotFound')}</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        {t('userNotFoundDescription')}
                    </p>
                    <Link
                        href="/admin-dashboard"
                        className="mt-4 inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:shadow-lg"
                    >
                        {t('backToAdminDashboard')}
                    </Link>
                </div>
            </div>
        );
    }

    return <UserDetails user={user} />;
}

