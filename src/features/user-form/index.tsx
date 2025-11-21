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
        toastSuccess("اطلاعات شما با موفقیت ذخیره شد.");
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
            <div className="mx-auto max-w-3xl w-full space-y-6 px-4 py-6">

                {/* ✨ بهبود ظاهر کارت اصلی و نوار پیشرفت */}
                <Card className="rounded-xl border shadow-lg p-4 bg-background">
                    <CardHeader className="p-2 space-y-2">
                        <p className="text-xs text-muted-foreground">فرم پروفایل</p>
                        <CardTitle className="text-2xl font-bold text-foreground">
                            تکمیل اطلاعات کاربری 📝
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 p-2 pt-4">
                        <div>
                            <div className="flex items-center justify-between text-sm font-medium text-foreground">
                                <span>درصد تکمیل</span>
                                <span className="text-primary font-extrabold">%{completionPercent}</span>
                            </div>

                            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    // ✨ استفاده از رنگ Primary برای نوار پیشرفت
                                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${completionPercent}%` }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="space-y-6" // فاصله بیشتر بین بخش‌ها
                >
                    <PersonalInfo />
                    <ContactInfo />
                    <JobInfo />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-2">
                        {/* ✨ دکمه ذخیره با رنگ Primary و استایل برجسته‌تر */}
                        <Button
                            type="submit"
                            className="w-full sm:w-auto rounded-lg text-base px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                        >
                            ذخیره و ارسال اطلاعات
                        </Button>

                        {/* ✨ دکمه بازنشانی با استایل Outline هماهنگ */}
                        <Button
                            type="button"
                            variant="outline"
                            className="w-full sm:w-auto rounded-lg text-base px-6 py-3 border-border/80 text-muted-foreground hover:bg-accent hover:text-foreground"
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