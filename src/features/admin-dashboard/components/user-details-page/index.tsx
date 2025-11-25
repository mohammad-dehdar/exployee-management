"use client"

import { useTranslations } from "next-intl"
import { Link } from "@/i18n/routing"
import { useParams } from "next/navigation"
import UserDetails from "@/features/admin-dashboard/components/user-details"
import { useAuthStore } from "@/store/store"
import { useRequireAuth } from "@/utils/route-guards"
import { UserIcon , ArrowRightIcon } from "@/components/shared/icons"
import { Button, Card, CardContent, Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui"

export default function AdminUserDetailsPageFeature() {
  const t = useTranslations("adminDashboard.userDetailsPage")
  const params = useParams()
  const userId = Array.isArray(params.id) ? params.id[0] : params.id
  const { profiles } = useAuthStore()
  const { currentAccount } = useRequireAuth("admin")

  if (!currentAccount) {
    return null
  }

  const user = userId ? profiles[userId] : undefined

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-xl items-center justify-center p-4">
        <Card className="w-full border-neutral-40 bg-neutral-10 dark:bg-neutral-100 dark:border-neutral-90 rounded-2xl shadow-lg">
          <CardContent className="p-10">
            <Empty>
              <EmptyMedia>
                <div className="flex items-center justify-center size-20 rounded-full bg-error-10 ring-4 ring-error-10/50">
                  <UserIcon className="size-10 text-error" />
                </div>
              </EmptyMedia>
              <EmptyHeader className="space-y-2">
                <EmptyTitle className="text-xl font-bold text-neutral-110 dark:text-neutral-10">
                  {t("userNotFound")}
                </EmptyTitle>
                <EmptyDescription className="text-neutral-70 dark:text-neutral-60">
                  {t("userNotFoundDescription")}
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent className="pt-4">
                <Button asChild className="gap-2 bg-primary hover:bg-primary-60 text-neutral-10 shadow-md">
                  <Link href="/admin-dashboard">
                    {t("backToAdminDashboard")}
                    <ArrowRightIcon className="size-4" />
                  </Link>
                </Button>
              </EmptyContent>
            </Empty>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <UserDetails user={user} />
}
