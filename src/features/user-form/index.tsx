'use client';

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toastSuccess } from "@/components/feedback";
import { useAuthStore } from "@/features/auth";
import { ContactInfo, JobInfo, PersonalInfo } from "@/types/user";
import { ContactInfo as ContactInfoFields, JobInfo as JobInfoFields, PersonalInfo as PersonalInfoFields } from "./components";

interface UserFormData {
    personal: Partial<PersonalInfo>;
    contact: Partial<ContactInfo>;
    job: Partial<JobInfo>;
}

export default function UserFormFeature() {
    const router = useRouter();
    const { profiles, updateProfile, currentUserId, accounts } = useAuthStore();
    const account = accounts.find((acc) => acc.id === currentUserId);
    const profile = currentUserId
        ? profiles[currentUserId] ?? { id: currentUserId, personal: {}, contact: {}, job: {} }
        : undefined;

    useEffect(() => {
        if (!account || account.role !== "user") {
            router.replace("/");
        }
    }, [account, router]);

    const safeProfile = useMemo(
        () => profile ?? { id: account?.id ?? "pending", personal: {}, contact: {}, job: {} },
        [account?.id, profile]
    );

    const initialValues = useMemo(
        () => ({
            personal: { ...safeProfile.personal },
            contact: { ...safeProfile.contact },
            job: { ...safeProfile.job },
        }),
        [safeProfile]
    );

    const methods = useForm<UserFormData>({ defaultValues: initialValues });

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
        if (!account) return;

        updateProfile(account.id, data);
        toastSuccess("اطلاعات شما با موفقیت ذخیره شد.");
    };

    const handleReset = () => {
        methods.reset({ personal: {}, contact: {}, job: {} });
    };

    if (!account || account.role !== "user") {
        return null;
    }

    return (
        <FormProvider {...methods}>
            <div className="mx-auto max-w-3xl w-full space-y-6 px-4 py-6">
                <Card className="rounded-xl border shadow-lg p-4 bg-background">
                    <CardHeader className="p-2 space-y-2">
                        <p className="text-xs text-muted-foreground">فرم پروفایل</p>
                        <CardTitle className="text-2xl font-bold text-foreground">تکمیل اطلاعات کاربری 📝</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-3 p-2 pt-4">
                        <div>
                            <div className="flex items-center justify-between text-sm font-medium text-foreground">
                                <span>درصد تکمیل</span>
                                <span className="text-primary font-extrabold">%{completionPercent}</span>
                            </div>

                            <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                                    style={{ width: `${completionPercent}%` }}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                    <PersonalInfoFields />
                    <ContactInfoFields />
                    <JobInfoFields />

                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-2">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto rounded-lg text-base px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
                        >
                            ذخیره و ارسال اطلاعات
                        </Button>

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
