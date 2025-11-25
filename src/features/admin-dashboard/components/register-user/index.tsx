"use client"

import { useTranslations } from "next-intl"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { registerUserSchema, type RegisterUserFormData } from "../../schemas/register-user.schema"
import { useRegisterUserForm } from "../../hooks/useRegisterUserForm"
import { UserPlus, Mail, Lock, User, Building2 } from "lucide-react"
import { Button, Field, FieldDescription, FieldGroup, FieldLabel, FieldSet, Input, Spinner } from "@/components/ui"

export const RegisterUserForm = () => {
  const t = useTranslations()
  const { onSubmit, isLoading } = useRegisterUserForm()

  const methods = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserSchema),
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
      displayName: "",
      orgEmail: "",
    },
  })

  const {
    register,
    formState: { errors },
  } = methods

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
      <FieldSet>
        <FieldGroup className="space-y-4">
          <Field>
            <FieldLabel className="flex items-center gap-2 text-sm font-medium text-neutral-90 dark:text-neutral-40">
              <User className="size-4 text-primary" />
              {t("adminDashboard.createUser.displayName")}
            </FieldLabel>
            <Input
              id="displayName"
              {...register("displayName")}
              placeholder={t("adminDashboard.createUser.placeholders.displayName")}
              className="mt-1.5 border-neutral-50 focus:border-primary focus:ring-primary-20 bg-neutral-10 dark:bg-neutral-110"
            />
          </Field>

          <Field>
            <FieldLabel className="flex items-center gap-2 text-sm font-medium text-neutral-90 dark:text-neutral-40">
              <Mail className="size-4 text-primary" />
              {t("adminDashboard.createUser.personalEmail")}
              <span className="text-error">*</span>
            </FieldLabel>
            <Input
              id="userEmail"
              type="email"
              {...register("email")}
              placeholder={t("adminDashboard.createUser.placeholders.personalEmail")}
              className={`mt-1.5 bg-neutral-10 dark:bg-neutral-110 ${
                errors.email
                  ? "border-error focus:border-error focus:ring-error-20"
                  : "border-neutral-50 focus:border-primary focus:ring-primary-20"
              }`}
              aria-invalid={!!errors.email}
            />
            {errors.email && (
              <FieldDescription className="text-error text-xs mt-1.5 flex items-center gap-1">
                {t(errors.email.message || "validation.email.invalid")}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel className="flex items-center gap-2 text-sm font-medium text-neutral-90 dark:text-neutral-40">
              <Building2 className="size-4 text-primary" />
              {t("adminDashboard.createUser.orgEmail")}
            </FieldLabel>
            <Input
              id="orgEmail"
              type="email"
              {...register("orgEmail")}
              placeholder={t("adminDashboard.createUser.placeholders.orgEmail")}
              className={`mt-1.5 bg-neutral-10 dark:bg-neutral-110 ${
                errors.orgEmail
                  ? "border-error focus:border-error focus:ring-error-20"
                  : "border-neutral-50 focus:border-primary focus:ring-primary-20"
              }`}
              aria-invalid={!!errors.orgEmail}
            />
            {errors.orgEmail && (
              <FieldDescription className="text-error text-xs mt-1.5">
                {t(errors.orgEmail.message || "validation.email.invalid")}
              </FieldDescription>
            )}
          </Field>

          <Field>
            <FieldLabel className="flex items-center gap-2 text-sm font-medium text-neutral-90 dark:text-neutral-40">
              <Lock className="size-4 text-primary" />
              {t("adminDashboard.createUser.password")}
              <span className="text-error">*</span>
            </FieldLabel>
            <Input
              id="userPassword"
              type="password"
              {...register("password")}
              placeholder={t("adminDashboard.createUser.placeholders.password")}
              className={`mt-1.5 bg-neutral-10 dark:bg-neutral-110 ${
                errors.password
                  ? "border-error focus:border-error focus:ring-error-20"
                  : "border-neutral-50 focus:border-primary focus:ring-primary-20"
              }`}
              aria-invalid={!!errors.password}
            />
            {errors.password && (
              <FieldDescription className="text-error text-xs mt-1.5">
                {t(errors.password.message || "validation.password.required")}
              </FieldDescription>
            )}
          </Field>
        </FieldGroup>
      </FieldSet>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full gap-2 bg-primary hover:bg-primary-60 text-neutral-10 shadow-md hover:shadow-lg transition-all disabled:bg-neutral-50 disabled:text-neutral-70"
      >
        {isLoading ? (
          <>
            <Spinner className="size-4" />
            {t("common.loading") || "در حال ایجاد..."}
          </>
        ) : (
          <>
            <UserPlus className="size-4" />
            {t("adminDashboard.createUser.button")}
          </>
        )}
      </Button>
    </form>
  )
}
