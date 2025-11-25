'use client';

import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuthStore } from "@/store/store"
import { useRouter } from "@/i18n/routing"
import { Sparkles, LogOut } from "lucide-react"

interface HeroCardProps {
  completionPercent: number
}

export function HeroCard({ completionPercent }: HeroCardProps) {
  const t = useTranslations("userDashboard")
  const router = useRouter()
  const { logout } = useAuthStore()

  const handleLogout = async () => {
    await logout()
    router.replace("/")
  }

  const handleCompleteProfile = () => {
    router.push("/user-dashboard/user-form")
  }

  const progressWidth = `${Math.max(completionPercent, 8)}%`

  return (
    <Card className="relative overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-10/90 text-neutral-110 shadow-lg backdrop-blur-xl dark:border-neutral-90 dark:bg-neutral-110">
      <div className="pointer-events-none absolute inset-0 opacity-70 dark:opacity-60">
        <div className="absolute -left-16 top-0 size-48 rounded-full bg-primary-20 blur-[120px]" />
        <div className="absolute right-0 -bottom-16 size-48 rounded-full bg-secondary-10 blur-[110px]" />
      </div>

      <CardHeader className="relative z-10 space-y-3 p-6 pb-2">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary-70 text-white shadow-lg">
            <Sparkles className="size-5" />
          </div>
          <div className="space-y-1">
            <Badge className="w-fit bg-primary-10 px-3 py-1 text-xs text-primary-80">{t("title")}</Badge>
            <CardTitle className="text-2xl font-semibold text-neutral-110 dark:text-neutral-10">
              {completionPercent === 100 ? t("profile.complete") : t("profile.incomplete")}
            </CardTitle>
            <CardDescription className="text-sm text-neutral-80 dark:text-neutral-50">
              {t("heroCard.completionPercent")}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 flex flex-col gap-6 p-6 pt-0">
        <div>
          <div className="flex items-center justify-between text-xs font-medium text-neutral-70 dark:text-neutral-40">
            <span>{t("heroCard.completionPercent")}</span>
            <span className="text-sm font-semibold text-neutral-110 dark:text-neutral-10">%{completionPercent}</span>
          </div>
          <div className="mt-3 h-3 rounded-full bg-neutral-30/70 dark:bg-neutral-90">
            <div className="h-full rounded-full bg-linear-to-r from-primary to-secondary transition-all" style={{ width: progressWidth }} />
          </div>
        </div>

        <div className="flex flex-col  gap-2 md:flex-row">
          <Button
            type="button"
            className="md:w-5/6 w-full rounded-xl border border-white/30 bg-linear-to-r from-primary to-primary-60 py-3 text-base font-semibold text-white shadow-lg transition hover:shadow-xl dark:border-transparent"
            onClick={handleCompleteProfile}
          >
            {t("heroCard.completeProfile")}
          </Button>
          <Button
            type="button"
            className="md:w-1/6 w-full rounded-xl border border-error/20 bg-error-10 py-3 text-sm font-semibold text-error hover:bg-error-10/40"
            onClick={handleLogout}
          >
            <LogOut className="size-4" />
            {t("heroCard.logout")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
