"use client"

import Link from "next/link"
import { useEffect, useMemo } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { FormProvider, useForm } from "react-hook-form"
import { Avatar, AvatarFallback, Badge, Button, Card, CardContent, CardHeader, Tabs, TabsContent, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui"
import { toastSuccess } from "@/components/feedback"
import { useAuthStore } from "@/store/store"
import { translateOption } from "@/utils/option-helpers"
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
    await updateProfile(user.id, values)
    toastSuccess(t("updateSuccess"))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 space-y-6">
      <Card className="relative overflow-hidden border-neutral-40 bg-neutral-10 dark:bg-neutral-100 dark:border-neutral-90 rounded-2xl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary-10/60 blur-3xl" />
          <div className="absolute -left-20 -bottom-20 size-72 rounded-full bg-secondary-10/40 blur-3xl" />
        </div>

        <CardContent className="relative p-6 lg:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <Avatar className="size-18 border-3 border-primary-20 shadow-xl ring-4 ring-primary-10/50">
                <AvatarFallback className="bg-gradient-to-br from-primary to-primary-70 text-neutral-10 text-2xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-2">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl lg:text-3xl font-bold text-neutral-110 dark:text-neutral-10">
                    {header.name}
                  </h1>
                  <Badge className="text-xs bg-secondary-10 text-secondary-80 hover:bg-secondary-20 dark:bg-secondary-90 dark:text-secondary-20">
                    {header.contract}
                  </Badge>
                </div>
                <p className="text-sm text-neutral-80 dark:text-neutral-60 flex items-center gap-2">
                  <Briefcase className="size-4 text-primary" />
                  {header.position}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              asChild
              className="w-fit border-neutral-50 hover:border-primary hover:bg-primary-10 transition-all bg-transparent"
            >
              <Link href="/admin-dashboard" className="gap-2">
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
            <Card className="border-neutral-40 bg-neutral-10 dark:bg-neutral-100 dark:border-neutral-90 rounded-2xl overflow-hidden">
              <CardHeader className="pb-0 bg-neutral-20/50 dark:bg-neutral-110/50">
                <TabsList className="w-full justify-start gap-2 overflow-x-auto bg-transparent h-auto p-2 flex-wrap">
                  {[
                    { value: "personal", icon: User, label: "اطلاعات شخصی" },
                    { value: "contact", icon: Phone, label: "تماس" },
                    { value: "job", icon: Briefcase, label: "شغلی" },
                    { value: "financial", icon: Wallet, label: "مالی" },
                    { value: "education", icon: GraduationCap, label: "تحصیلات" },
                    { value: "history", icon: History, label: "سوابق" },
                    { value: "attachments", icon: Paperclip, label: "پیوست‌ها" },
                  ].map(({ value, icon: Icon, label }) => (
                    <TabsTrigger
                      key={value}
                      value={value}
                      className="gap-2 px-4 py-2.5 rounded-lg border border-transparent data-[state=active]:bg-primary data-[state=active]:text-neutral-10 data-[state=active]:border-primary data-[state=active]:shadow-md data-[state=inactive]:hover:bg-neutral-30 dark:data-[state=inactive]:hover:bg-neutral-90 transition-all"
                    >
                      <Icon className="size-4" />
                      <span className="hidden sm:inline text-sm font-medium">{label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </CardHeader>

              <CardContent className="p-6">
                <TabsContent value="personal" className="mt-0 space-y-4">
                  <div className="grid gap-6 lg:grid-cols-2">
                    <PersonalInfoFields editable />
                    <ContactInfoFields editable />
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
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-neutral-100 dark:text-neutral-20">
                      <div className="p-2 rounded-lg bg-info-10">
                        <History className="size-5 text-info" />
                      </div>
                      سوابق کاری
                    </h3>
                    <WorkHistory />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-neutral-100 dark:text-neutral-20">
                      <div className="p-2 rounded-lg bg-success-10">
                        <Award className="size-5 text-success" />
                      </div>
                      گواهینامه‌ها
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

          <Card className="border-neutral-40 bg-neutral-10 dark:bg-neutral-100 dark:border-neutral-90 rounded-xl">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-3">
                <Button type="submit" className="gap-2 bg-success hover:bg-success-30 text-neutral-10 shadow-md">
                  <Save className="size-4" />
                  {t("saveChanges")}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => router.push("/admin-dashboard")}
                  className="gap-2 border-neutral-50 hover:border-primary hover:bg-primary-10"
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
                        className="hover:bg-warning-10 hover:text-warning-40"
                      >
                        <RotateCcw className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-neutral-100 text-neutral-10">{t("reset")}</TooltipContent>
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
