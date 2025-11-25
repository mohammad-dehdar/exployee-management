"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { FormProvider, useForm } from "react-hook-form"
import { Avatar, AvatarFallback, Badge, Button, Card, CardContent, CardHeader, Tabs, TabsContent, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui"
import { toastSuccess, toastError } from "@/components/feedback"
import { useAuthStore } from "@/store/store"
import { translateOption } from "@/utils/option-helpers"
import { updateEmployeeProfileApi, convertUserRecordToPayload } from "@/features/admin-dashboard/api"
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
} from "@/features/user-form/components"
import type { UserRecord } from "@/schemas/user.schema"
import {
  ArrowRight,
  Save,
  RotateCcw,
  User,
  Phone,
  Briefcase,
  Wallet,
  GraduationCap,
  History,
  Award,
  Paperclip,
} from "lucide-react"

export default function UserDetails({ user }: { user: UserRecord }) {
  const t = useTranslations("adminDashboard.userDetails")
  const tOptions = useTranslations("options")
  const router = useRouter()
  const { updateProfile } = useAuthStore()
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    [user],
  )

  const methods = useForm<UserRecord>({ defaultValues: defaults })

  useEffect(() => {
    methods.reset(defaults)
  }, [defaults, methods])

  const header = useMemo(
    () => ({
      name: `${defaults.personal.firstName || t("name")} ${defaults.personal.lastName || t("lastName")}`.trim(),
      position: translateOption("position", defaults.job.position, tOptions, t("position")),
      contract: translateOption("contractType", defaults.job.contractType, tOptions, t("contract")),
    }),
    [
      defaults.personal.firstName,
      defaults.personal.lastName,
      defaults.job.position,
      defaults.job.contractType,
      t,
      tOptions,
    ],
  )

  const initials =
    `${defaults.personal.firstName?.[0] ?? ""}${defaults.personal.lastName?.[0] ?? ""}`.toUpperCase() || "؟"

  const onSubmit = async (values: UserRecord) => {
    setIsSubmitting(true);
    try {
      // Convert UserRecord to API payload format
      const payload = convertUserRecordToPayload(values);
      
      // Call API to update employee profile
      const result = await updateEmployeeProfileApi(payload);
      
      if (result.success) {
        // Also update local store for immediate UI update
        await updateProfile(user.id, values);
        toastSuccess(t("updateSuccess"));
      } else {
        toastError(result.message || t("updateError") || "Update failed.");
      }
    } catch (error) {
      console.error('Error updating employee profile:', error);
      toastError(t("updateError") || "Update failed.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <Card className="relative overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-10/80 shadow-lg backdrop-blur-xl dark:border-neutral-90 dark:bg-neutral-100/70">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute -right-16 -top-20 size-52 rounded-full bg-primary-10 blur-[120px]" />
          <div className="absolute -left-20 -bottom-16 size-60 rounded-full bg-secondary-10 blur-[120px]" />
        </div>

        <CardContent className="relative z-10 p-6 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <Avatar className="size-18 border-3 border-primary-20 shadow-xl ring-4 ring-primary-10/50">
                <AvatarFallback className="bg-linear-to-br from-primary to-primary-70 text-neutral-10 text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl lg:text-3xl font-bold text-neutral-110 dark:text-neutral-10">
                    {header.name}
                  </h1>
                  <Badge className="rounded-full bg-secondary-10 px-3 py-1 text-xs font-medium text-secondary-80 dark:bg-secondary-90 dark:text-secondary-20">
                    {header.contract}
                  </Badge>
                </div>
                <p className="flex items-center gap-2 text-sm text-neutral-80 dark:text-neutral-60">
                  <Briefcase className="size-4 text-primary" />
                  {header.position}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              asChild
              className="w-fit gap-2 rounded-xl border-neutral-50 bg-transparent transition-all hover:border-primary hover:bg-primary-10"
            >
              <Link href="/admin-dashboard">
                {t("backToList")}
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs defaultValue="personal" className="w-full">
            <Card className="relative overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-10/80 shadow-lg backdrop-blur-xl dark:border-neutral-90 dark:bg-neutral-100/70">
              <div className="pointer-events-none absolute inset-0 opacity-50">
                <div className="absolute -right-12 -top-12 size-40 rounded-full bg-primary-10 blur-[100px]" />
                <div className="absolute -left-12 -bottom-12 size-40 rounded-full bg-secondary-10 blur-[100px]" />
              </div>
              <CardHeader className="relative z-10 pb-0 bg-neutral-20/50 dark:bg-neutral-110/50">
                <TabsList className="w-full justify-start gap-2 overflow-x-auto bg-transparent h-auto p-2 flex-wrap">
                  {[
                    { value: "personal", icon: User, labelKey: "tabs.personal" },
                    { value: "contact", icon: Phone, labelKey: "tabs.contact" },
                    { value: "job", icon: Briefcase, labelKey: "tabs.job" },
                    { value: "financial", icon: Wallet, labelKey: "tabs.financial" },
                    { value: "education", icon: GraduationCap, labelKey: "tabs.education" },
                    { value: "history", icon: History, labelKey: "tabs.history" },
                    { value: "attachments", icon: Paperclip, labelKey: "tabs.attachments" },
                  ].map(({ value, icon: Icon, labelKey }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="gap-2 rounded-lg border border-transparent px-4 py-2.5 text-sm font-medium transition-all data-[state=active]:border-primary data-[state=active]:bg-primary data-[state=active]:text-neutral-10 data-[state=active]:shadow-md data-[state=inactive]:hover:bg-neutral-30 dark:data-[state=inactive]:hover:bg-neutral-90"
                    >
                      <Icon className="size-4" />
                      <span className="hidden sm:inline">{t(labelKey)}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardHeader>

              <CardContent className="relative z-10 p-6">
                <TabsContent value="personal" className="mt-0 space-y-4">
                  <div className="grid gap-6">
                    <PersonalInfoFields editable />
                  </div>
                </TabsContent>

                <TabsContent value="contact" className="mt-0">
                  <ContactInfoFields editable />
                </TabsContent>

                <TabsContent value="job" className="mt-0">
                  <JobInfoFields editable />
                </TabsContent>

                <TabsContent value="financial" className="mt-0">
                  <FinancialInfo />
                </TabsContent>

                <TabsContent value="education" className="mt-0">
                  <EducationInfo />
                </TabsContent>

                <TabsContent value="history" className="mt-0 space-y-8">
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-100 dark:text-neutral-20">
                      <div className="rounded-lg bg-info-10 p-2">
                        <History className="size-5 text-info" />
                      </div>
                      {t("sections.workHistory")}
                    </h3>
                    <WorkHistory />
                  </div>
                  <div className="space-y-4">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-neutral-100 dark:text-neutral-20">
                      <div className="rounded-lg bg-success-10 p-2">
                        <Award className="size-5 text-success" />
                      </div>
                      {t("sections.certificates")}
                    </h3>
                    <CertificatesInfo />
                  </div>
                </TabsContent>

                <TabsContent value="attachments" className="mt-0 space-y-6">
                  <AttachmentsInfo />
                  <AdditionalInfo />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>

          <Card className="relative overflow-hidden rounded-xl border border-neutral-40 bg-neutral-10/80 shadow-lg backdrop-blur-xl dark:border-neutral-90 dark:bg-neutral-100/70">
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute -right-8 -top-8 size-32 rounded-full bg-primary-10 blur-[80px]" />
              <div className="absolute -left-8 -bottom-8 size-32 rounded-full bg-secondary-10 blur-[80px]" />
            </div>
            <CardContent className="relative z-10 p-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="gap-2 rounded-xl bg-linear-to-r from-success to-success-60 py-2.5 text-sm font-semibold text-neutral-10 shadow-md hover:shadow-lg disabled:opacity-60"
                >
                  <Save className="size-4" />
                  {isSubmitting ? t("common.loading") || "در حال ذخیره..." : t("saveChanges")}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin-dashboard")}
                  className="gap-2 rounded-xl border-neutral-50 transition-all hover:border-primary hover:bg-primary-10"
                >
                  <ArrowRight className="size-4" />
                  {t("back")}
                </Button>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => methods.reset(user)}
                        className="rounded-xl transition-all hover:bg-warning-10 hover:text-warning-40"
                      >
                        <RotateCcw className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="rounded-lg bg-neutral-100 text-neutral-10 shadow-lg">
                      {t("reset")}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </CardContent>
          </Card>
        </form>
      </FormProvider>
    </div>
  )
}

