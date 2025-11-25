'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from "@/i18n/routing";
import { FormProvider } from "react-hook-form";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  const t = useTranslations("userForm")
  const tCommon = useTranslations("common")
  const router = useRouter()
  const { methods, onSubmit, handleReset, completionPercent, account } = useUserForm()

  if (!account) {
    return null
  }

  return (
    <FormProvider {...methods}>
      <div className="mx-auto w-full max-w-3xl space-y-6">
        <Card className="relative overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-10/80 shadow-lg backdrop-blur-xl dark:border-neutral-90 dark:bg-neutral-110">
          <div className="pointer-events-none absolute inset-0 opacity-60">
            <div className="absolute -left-20 top-0 size-56 rounded-full bg-primary-10 blur-[120px]" />
            <div className="absolute right-0 -bottom-16 size-48 rounded-full bg-secondary-10 blur-[110px]" />
          </div>
          <CardHeader className="relative z-10 space-y-3 px-6 pt-6 pb-2">
            <Badge className="w-fit bg-primary-10 px-3 py-1 text-xs text-primary-80">{t("profileForm")}</Badge>
            <CardTitle className="flex items-center gap-3 text-2xl font-bold text-neutral-110 dark:text-neutral-10">
              {t("completeProfile")} <span className="text-2xl">📝</span>
            </CardTitle>
            <CardDescription className="text-sm text-neutral-70 dark:text-neutral-40">{t("completionPercent")}</CardDescription>
          </CardHeader>

          <CardContent className="relative z-10 space-y-3 px-6 pb-6">
            <div className="flex items-center justify-between text-sm font-medium text-neutral-80 dark:text-neutral-40">
              <span>{t("completionPercent")}</span>
              <span className="text-base font-semibold text-primary">%{completionPercent}</span>
            </div>
            <div className="h-3 rounded-full bg-neutral-30/80 dark:bg-neutral-90">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary to-secondary transition-all duration-500 ease-out"
                style={{ width: `${completionPercent}%` }}
              />
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

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/user-dashboard")}
              className="w-full rounded-xl border-neutral-40 px-6 py-3 text-base sm:w-auto"
            >
              {tCommon("back")}
            </Button>
            <Button
              type="submit"
              className="w-full rounded-xl bg-linear-to-r from-primary to-primary-70 px-6 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl sm:w-auto"
            >
              {t("saveAndSubmit")}
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="w-full rounded-xl border border-neutral-40/60 bg-transparent px-6 py-3 text-base text-neutral-80 hover:bg-neutral-20/40 dark:text-neutral-20 sm:w-auto"
              onClick={handleReset}
            >
              {t("resetForm")}
            </Button>
          </div>
        </form>
      </div>
    </FormProvider>
  )
}