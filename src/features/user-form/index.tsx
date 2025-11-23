'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from "@/i18n/routing";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUserForm } from "./hooks/useUserForm";
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
} from "./components";

export default function UserFormFeature() {
    const t = useTranslations('userForm');
    const tCommon = useTranslations('common');
    const router = useRouter();
    const { methods, onSubmit, handleReset, completionPercent, account } = useUserForm();

    if (!account) {
        return null;
    }

    return (
        <FormProvider {...methods}>
            <div className="mx-auto max-w-3xl w-full space-y-6">
                    <Card className="rounded-xl border shadow-lg p-4 bg-background">
                        <CardHeader className="p-2 space-y-2">
                            <p className="text-xs text-muted-foreground">{t('profileForm')}</p>
                            <CardTitle className="text-2xl font-bold text-foreground">{t('completeProfile')} 📝</CardTitle>
                        </CardHeader>

                        <CardContent className="space-y-3 p-2 pt-4">
                            <div>
                                <div className="flex items-center justify-between text-sm font-medium text-foreground">
                                    <span>{t('completionPercent')}</span>
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
                        <FinancialInfo editable={false} />
                        <EducationInfo />
                        <WorkHistory />
                        <CertificatesInfo />
                        <AttachmentsInfo />
                        <AdditionalInfo />

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center pt-2">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/user-dashboard")}
                                className="w-full sm:w-auto rounded-lg text-base px-6 py-3"
                            >
                                {tCommon('back')}
                            </Button>
                            <Button
                                type="submit"
                                className="w-full sm:w-auto rounded-lg text-base px-6 py-3"
                            >
                                {t('saveAndSubmit')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full sm:w-auto rounded-lg text-base px-6 py-3"
                                onClick={handleReset}
                            >
                                {t('resetForm')}
                            </Button>
                        </div>
                    </form>
            </div>
        </FormProvider>
    );
}