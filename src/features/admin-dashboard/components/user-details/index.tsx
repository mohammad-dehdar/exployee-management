'use client';

import Link from "next/link";
import { useCallback, useEffect, useMemo } from "react";
import { useTranslations } from 'next-intl';
import { useRouter } from "@/i18n/routing";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { toastSuccess } from "@/components/feedback";
import { useAuthStore } from "@/store/store";
import {
    AdditionalInfo,
    AttachmentsInfo,
    CertificatesInfo,
    ContactInfo as ContactInfoFields,
    EducationInfo,
    FinancialInfo,
    JobInfo as JobInfoFields,
    PersonalInfo as PersonalInfoFields,
    WorkHistory,
} from "@/features/user-form/components";
import type { UserRecord } from "@/schemas/user.schema";

export default function UserDetails({ user }: { user: UserRecord }) {
    const t = useTranslations('adminDashboard.userDetails');
    const tOptions = useTranslations('options');
    const router = useRouter();
    const { updateProfile } = useAuthStore();
    const defaults = useMemo(
        () => ({
            ...user,
            financial: user.financial ?? {},
            education: user.education ?? {},
            attachments: user.attachments ?? {},
            additional: user.additional ?? {},
            workHistory:
                user.workHistory && user.workHistory.length > 0
                    ? user.workHistory
                    : [{ company: "", role: "", description: "", startDate: "", endDate: "" }],
            certificates:
                user.certificates && user.certificates.length > 0
                    ? user.certificates
                    : [{ title: "", issuer: "", issueDate: "", duration: "" }],
        }),
        [user]
    );

    const methods = useForm<UserRecord>({ defaultValues: defaults });

    useEffect(() => {
        methods.reset(defaults);
    }, [defaults, methods]);

    // Helper functions to translate position and contractType
    const getPositionText = useCallback((position?: string) => {
        if (!position) return t('position');
        const positionKey = position as 'frontend' | 'backend' | 'designer' | 'other';
        if (['frontend', 'backend', 'designer', 'other'].includes(position)) {
            return tOptions(`position.${positionKey}`);
        }
        return position;
    }, [t, tOptions]);

    const getContractTypeText = useCallback((contractType?: string) => {
        if (!contractType) return t('contract');
        const contractKey = contractType as 'fulltime' | 'parttime' | 'freelancer' | 'project' | 'hourly';
        if (['fulltime', 'parttime', 'freelancer', 'project', 'hourly'].includes(contractType)) {
            return tOptions(`contractType.${contractKey}`);
        }
        return contractType;
    }, [t, tOptions]);

    const header = useMemo(
        () => ({
            name: `${defaults.personal.firstName || t('name')} ${defaults.personal.lastName || t('lastName')}`.trim(),
            position: getPositionText(defaults.job.position),
            contract: getContractTypeText(defaults.job.contractType),
        }),
        [defaults.personal.firstName, defaults.personal.lastName, defaults.job.position, defaults.job.contractType, getPositionText, getContractTypeText, t]
    );

    const onSubmit = (values: UserRecord) => {
        updateProfile(user.id, values);
        toastSuccess(t('updateSuccess'));
    };

    return (
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-8">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur dark:border-slate-800/70 dark:bg-slate-900/80">
                <div className="pointer-events-none absolute inset-0 opacity-40">
                    <div className="absolute -left-8 top-8 h-40 w-40 rounded-full bg-sky-200 blur-3xl dark:bg-sky-500/30" />
                    <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-indigo-200 blur-3xl dark:bg-indigo-500/30" />
                </div>
                <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-lg font-bold text-white shadow-lg">
                            {user.personal.firstName?.[0] ?? "؟"}
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600 dark:text-indigo-300">
                                {t('profileTitle')}
                            </p>
                            <h1 className="text-2xl font-bold text-foreground">{header.name}</h1>
                            <p className="text-sm text-muted-foreground leading-6">
                                {header.position} • {header.contract}
                            </p>
                        </div>
                    </div>
                    <Link
                        href="/admin-dashboard"
                        className="inline-flex items-center justify-center rounded-xl border border-indigo-200/80 bg-indigo-50 px-4 py-2 text-sm font-semibold text-indigo-700 transition hover:-translate-y-0.5 hover:shadow-md dark:border-indigo-500/40 dark:bg-indigo-500/15 dark:text-indigo-100"
                    >
                        {t('backToList')}
                    </Link>
                </div>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="grid gap-4 lg:grid-cols-2">
                        <PersonalInfoFields editable />
                        <ContactInfoFields editable />
                    </div>

                    <JobInfoFields editable />
                    <FinancialInfo />
                    <EducationInfo />
                    <WorkHistory />
                    <CertificatesInfo />
                    <AttachmentsInfo />
                    <AdditionalInfo />

                    <div className="flex items-center gap-3">
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => router.push("/admin-dashboard")}
                            className="rounded-xl"
                        >
                            {t('back')}
                        </Button>
                        <Button type="submit" className="rounded-xl">
                            {t('saveChanges')}
                        </Button>
                        <Button type="button" variant="ghost" onClick={() => methods.reset(user)}>
                            {t('reset')}
                        </Button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}
