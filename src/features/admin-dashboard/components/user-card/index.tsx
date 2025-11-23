'use client';

import Link from "next/link";
import { useTranslations } from 'next-intl';
import { Card, CardContent } from "@/components/ui/card";
import type { UserRecord } from "@/schemas/user.schema";
import { translateOption } from "@/utils/option-helpers";

export default function UserCard({ user }: { user: UserRecord }) {
    const t = useTranslations('adminDashboard.userCard');
    const tOptions = useTranslations('options');

    return (
        <Link href={`/admin-dashboard/users/${user.id}`}>
            <Card className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-200/80 bg-white/90 p-5 shadow-lg transition hover:-translate-y-1 hover:border-indigo-200 hover:shadow-2xl dark:border-slate-800/70 dark:bg-slate-900/80">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-transparent to-sky-50 opacity-0 transition group-hover:opacity-100 dark:from-indigo-500/10 dark:to-sky-500/10" />
                <CardContent className="relative space-y-2 p-0">
                    <div className="flex items-center justify-between gap-3">
                        <h2 className="text-lg font-bold text-foreground">
                            {user.personal.firstName} {user.personal.lastName}
                        </h2>
                        <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-100">
                            {translateOption('contractType', user.job.contractType, tOptions, t('contract'))}
                        </span>
                    </div>

                    <p className="text-sm text-muted-foreground">{translateOption('position', user.job.position, tOptions, t('position'))}</p>

                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{user.contact.personalEmail || t('orgEmail')}</span>
                        <span>{user.contact.phone || t('phone')}</span>
                    </div>
                </CardContent>
            </Card>
        </Link>
    );
}
