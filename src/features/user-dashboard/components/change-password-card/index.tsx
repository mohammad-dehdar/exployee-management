'use client';

import { useState } from "react"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldDescription, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { toastError, toastSuccess } from "@/components/feedback/toast-provider/toast-provider"
import { useAuthStore } from "@/store/store"
import { Lock, KeyRound } from "lucide-react"

export function ChangePasswordCard() {
  const t = useTranslations("userDashboard.changePasswordCard")
  const { accounts, currentUserId, changePassword } = useAuthStore()
  const account = accounts.find((acc) => acc.id === currentUserId)

  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handlePasswordChange = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!account || isSubmitting) return

    setIsSubmitting(true)
    try {
      const result = await changePassword(account.id, { currentPassword, newPassword })

      if (!result.success) {
        toastError(result.message ?? t("error"))
        return
      }

      setCurrentPassword("")
      setNewPassword("")
      toastSuccess(t("success"))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-10/80 shadow-lg backdrop-blur-xl dark:border-neutral-90 dark:bg-neutral-110">
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -right-16 -top-12 size-48 rounded-full bg-primary-10 blur-[100px]" />
        <div className="absolute -left-12 -bottom-16 size-44 rounded-full bg-secondary-10 blur-[110px]" />
      </div>
      <CardHeader className="relative z-10 space-y-2 px-5 pt-5">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-base font-semibold text-neutral-110 dark:text-neutral-10">{t("title")}</CardTitle>
          <Badge className="rounded-full bg-primary-10 px-3 py-1 text-xs text-primary-80">{t("title")}</Badge>
        </div>
        <CardDescription className="text-sm text-neutral-70 dark:text-neutral-50">{t("currentPasswordPlaceholder")}</CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 px-5 pb-5">
        <form onSubmit={handlePasswordChange} className="space-y-4">
          <FieldSet>
            <FieldGroup className="space-y-4">
              <Field>
                <FieldLabel className="flex items-center gap-2 text-xs font-semibold text-neutral-80 dark:text-neutral-30">
                  <Lock className="size-4 text-primary" />
                  {t("currentPassword")}
                </FieldLabel>
                <Input
                  type="password"
                  placeholder={t("currentPasswordPlaceholder")}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                  className="mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"
                />
              </Field>
              <Field>
                <FieldLabel className="flex items-center gap-2 text-xs font-semibold text-neutral-80 dark:text-neutral-30">
                  <KeyRound className="size-4 text-primary" />
                  {t("newPassword")}
                </FieldLabel>
                <Input
                  type="password"
                  placeholder={t("newPasswordPlaceholder")}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="mt-1.5 border-neutral-40 bg-neutral-20/80 text-sm text-neutral-100 focus-visible:border-primary focus-visible:ring-primary/40 dark:border-neutral-90 dark:bg-neutral-100/40 dark:text-neutral-10"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-linear-to-r from-primary to-primary-70 py-2.5 text-sm font-semibold text-white shadow-md hover:shadow-lg disabled:opacity-60"
          >
            {isSubmitting ? `${t("submit")}...` : t("submit")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

