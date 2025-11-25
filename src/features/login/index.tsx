'use client';

import { useTranslations } from "next-intl"
import { FormProvider } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui"
import { Field, FieldDescription,FieldGroup,FieldLabel,FieldSet ,Card, CardContent, CardDescription, CardHeader, CardTitle,Input } from "@/components/ui"
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from "@/features/login/constants"
import { useLoginForm } from "./hooks/useLoginForm"
import { LogIn, Mail, Lock } from "lucide-react"

export default function LoginFeature() {
  const t = useTranslations()
  const { methods, onSubmit, isLoading } = useLoginForm()
  const {
    register,
    formState: { errors },
  } = methods
  const rootError = errors.root

  const adminHint = t("home.login.hints.admin", {
    email: DEFAULT_ADMIN_EMAIL,
    password: DEFAULT_ADMIN_PASSWORD,
  })

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-10/80 p-6 shadow-lg backdrop-blur-xl dark:border-neutral-90 dark:bg-neutral-100/70 sm:p-8">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-16 -top-20 size-60 rounded-full bg-primary-20 blur-3xl dark:bg-primary/30" />
        <div className="absolute -left-24 -bottom-24 size-72 rounded-full bg-secondary-10 blur-[110px]" />
      </div>

      <CardHeader className="relative space-y-4 p-0">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center  justify-center rounded-2xl bg-linear-to-br from-primary to-primary-70/20 text-neutral-10 shadow-lg">
            <LogIn className="size-5" />
          </div>
          <div className="space-y-2">
            {/* <Badge className="w-fit bg-primary-10 px-3 py-1 text-xs text-primary-80">{t("home.login.title")}</Badge> */}
          <CardTitle className="text-2xl font-semibold text-neutral-110 dark:text-neutral-10">
            {t("home.login.titles.user")}
          </CardTitle>
          <CardDescription className="text-sm text-neutral-80 dark:text-neutral-60">
            {t("home.login.descriptions.user")}
          </CardDescription>
          </div>
        </div>
        {/* <Badge variant="outline" className="w-full justify-start gap-2 border-dashed border-neutral-50 text-[13px] text-neutral-80">
          {adminHint}
        </Badge> */}
      </CardHeader>

      <CardContent className="relative mt-6 space-y-4 p-0">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-5">
            <FieldSet>
              <FieldGroup className="space-y-4">
                <Field>
                  <FieldLabel className="flex items-center gap-2 text-sm font-semibold text-neutral-90 dark:text-neutral-20">
                    <Mail className="size-4 text-primary" />
                    {t("common.email")}
                  </FieldLabel>
                  <Input
                    type="email"
                    placeholder={t("home.login.placeholders.email")}
                    {...register("email")}
                    className="mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"
                    aria-invalid={Boolean(errors.email)}
                  />
                  {errors.email && (
                    <FieldDescription variant="error" className="text-xs">
                      {t(errors.email.message || "validation.email.invalid")}
                    </FieldDescription>
                  )}
                </Field>

                <Field>
                  <FieldLabel className="flex items-center gap-2 text-sm font-semibold text-neutral-90 dark:text-neutral-20">
                    <Lock className="size-4 text-primary" />
                    {t("common.password")}
                  </FieldLabel>
                  <Input
                    type="password"
                    placeholder={t("home.login.placeholders.password")}
                    {...register("password")}
                    className="mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 shadow-xs focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"
                    aria-invalid={Boolean(errors.password)}
                  />
                  {errors.password && (
                    <FieldDescription variant="error" className="text-xs">
                      {t(errors.password.message || "validation.password.required")}
                    </FieldDescription>
                  )}
                </Field>
              </FieldGroup>
            </FieldSet>

            {rootError?.message && (
              <div className="rounded-xl border border-error/30 bg-error-10/40 px-4 py-2 text-sm text-error shadow-xs">
                {rootError.message}
              </div>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-xl bg-linear-to-r from-primary to-primary-70 py-3 text-base font-semibold text-white shadow-lg hover:shadow-xl disabled:opacity-60"
            >
              {isLoading ? t("common.loading") : t("common.login")}
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  )
}

