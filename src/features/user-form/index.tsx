'use client';

import { useEffect, useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { toastSuccess } from "@/components/feedback";
import { useUserFormStore } from "./store";
import { useAdminDashboardStore } from "@/features/admin-dashboard/store";
import { PersonalInfo, ContactInfo, JobInfo } from "./components";


interface UserFormData {
    personal: Record<string, unknown>;
    contact: Record<string, unknown>;
    job: Record<string, unknown>;
}

export default function UserFormFeature() {
    const {
        personal,
        contact,
        job,
        setPersonal,
        setContact,
        setJob,
        reset: resetStore,
    } = useUserFormStore();
    const { addUser } = useAdminDashboardStore();

    const initialValues = useMemo(
        () => ({
            personal: personal ?? {},
            contact: contact ?? {},
            job: job ?? {},
        }),
        [personal, contact, job]
    );

    const methods = useForm<UserFormData>({
        defaultValues: initialValues,
    });

    useEffect(() => {
        methods.reset(initialValues);
    }, [initialValues, methods]);

    const completionScore = [
        Boolean(Object.keys(initialValues.personal).length),
        Boolean(Object.keys(initialValues.contact).length),
        Boolean(Object.keys(initialValues.job).length),
    ].filter(Boolean).length;

    const completionPercent = Math.round((completionScore / 3) * 100);

    const onSubmit = (data: UserFormData) => {
        setPersonal(data.personal);
        setContact(data.contact);
        setJob(data.job);

        const newUser = {
            id: crypto.randomUUID(),
            ...data,
        };

        addUser(newUser);
        toastSuccess("اطلاعات کاربر در حافظه محلی ذخیره شد. این داده‌ها در داشبورد ادمین قابل مشاهده هستند.");
    };

    const handleReset = () => {
        resetStore();
        methods.reset({
            personal: {},
            contact: {},
            job: {},
        });
    };

    return (
        <FormProvider {...methods}>
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-5 py-8">
                <Card className="rounded-3xl border border-border/60 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
                    <CardHeader className="space-y-4">
                        <p className="text-sm text-white/70">فرم تکمیل پروفایل</p>
                        <CardTitle className="text-3xl font-semibold leading-10">
                            اطلاعات خود را با دقت وارد کنید تا پرونده منابع انسانی شما کامل شود.
                        </CardTitle>
                        <p className="text-sm text-white/70 leading-6">
                            این اطلاعات بعداً به سیستم HR متصل می‌شود؛ فعلاً به‌صورت محلی ذخیره می‌شود اما
                            دقت در ورود اطلاعات باعث می‌شود انتقال به سیستم اصلی سریع‌تر انجام شود.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <div className="flex items-center justify-between text-xs text-white/70">
                                <span>درصد تکمیل</span>
                                <span>%{completionPercent}</span>
                            </div>
                            <div className="mt-2 h-2 rounded-full bg-white/15">
                                <div
                                    className="h-full rounded-full bg-white transition-all"
                                    style={{ width: `${Math.max(completionPercent, 5)}%` }}
                                />
                            </div>
                        </div>
                        <p className="text-xs text-white/70">
                            پس از تکمیل هر بخش، اطلاعات به‌صورت خودکار ذخیره می‌شود و می‌توانید از طریق داشبورد کاربری وضعیت را مشاهده کنید.
                        </p>
                    </CardContent>
                </Card>

                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div className="space-y-5">
                        <PersonalInfo />
                        <ContactInfo />
                        <JobInfo />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Button type="submit" className="w-full rounded-2xl px-6 py-4 text-sm font-semibold text-white sm:w-auto">
                            ذخیره اطلاعات
                        </Button>
                        <Button
                            type="button"
                            variant="outline"
                            color="neutral"
                            className="w-full rounded-2xl px-6 py-4 text-sm font-semibold sm:w-auto"
                            onClick={handleReset}
                        >
                            بازنشانی فرم
                        </Button>
                    </div>
                </form>
            </div>
        </FormProvider>
    );
}
