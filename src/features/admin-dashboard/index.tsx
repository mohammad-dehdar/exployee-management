"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useRouter } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Empty, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty"
import { Spinner } from "@/components/ui/spinner"
import { UserCard } from "./components/user-card"
import { RegisterUserForm } from "./components/register-user"
import { useAuthStore } from "@/store/store"
import { DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_PASSWORD } from "@/features/login/constants"
import { useRequireAuth } from "@/utils/route-guards"
import { Users, LogOut, Shield, UserPlus, UsersRound, ChevronLeft, ChevronRight } from "lucide-react"
import { useEmployees } from "./hooks/useEmployees"
import type { UserRecord } from "@/schemas/user.schema"

export default function AdminDashboardFeature() {
  const t = useTranslations()
  const router = useRouter()
  const { logout } = useAuthStore()
  const { currentAccount } = useRequireAuth("admin")
  const [page, setPage] = useState(1)
  const limit = 12

  const { employees, isLoading, pagination } = useEmployees(page, limit)

  // Convert EmployeeItem to UserRecord for UserCard
  const users: UserRecord[] = employees.map((emp) => {
    // Convert EmployeeItem to UserRecord format
    return {
      id: emp.id,
      personal: {
        username: emp.user.name,
        firstName: emp.firstName || emp.user.name?.split(' ')[0],
        lastName: emp.lastName || emp.user.name?.split(' ').slice(1).join(' '),
        nationalId: emp.nationalId,
      },
      contact: {
        personalEmail: emp.user.email,
        phone: emp.mobile,
      },
      job: {
        position: emp.position,
        contractType: emp.contractType,
        location: emp.workLocation,
        startDate: emp.startDate,
      },
      financial: {},
      education: emp.details?.education as UserRecord['education'] || {},
      workHistory: (emp.details?.workHistory as UserRecord['workHistory']) || [],
      certificates: (emp.details?.certificates as UserRecord['certificates']) || [],
      attachments: {},
      additional: emp.details?.additional as UserRecord['additional'] || {},
    } as UserRecord
  })

  if (!currentAccount) return null

  const handleLogout = async () => {
    await logout()
    router.replace("/")
  }

  return (
    <div className="space-y-6">
      <Card className="relative overflow-hidden border-neutral-40 bg-neutral-10 dark:bg-neutral-100 dark:border-neutral-90 rounded-2xl">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -right-24 -top-24 size-80 rounded-full bg-primary-10/70 blur-3xl" />
          <div className="absolute -left-24 -bottom-24 size-80 rounded-full bg-secondary-10/50 blur-3xl" />
        </div>

        <CardContent className="relative p-6 lg:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            {/* Welcome Section */}
            <div className="space-y-5 max-w-xl">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center size-12 rounded-xl bg-linear-to-br from-primary to-primary-70 shadow-lg">
                  <Shield className="size-6 text-neutral-10" />
                </div>
                <Badge className="bg-primary-10 text-primary-80 hover:bg-primary-20 text-sm px-3 py-1">
                  {t("adminDashboard.title")}
                </Badge>
              </div>

              <div className="space-y-3">
                <h1 className="text-2xl lg:text-3xl font-bold text-neutral-110 dark:text-neutral-10">
                  {t("adminDashboard.subtitle")}
                </h1>
                <p className="text-sm text-neutral-80 dark:text-neutral-60 leading-relaxed">
                  {t("adminDashboard.description")}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <Badge className="gap-2 py-2 px-4 bg-success-10 text-success-40 hover:bg-success-20 border-0">
                  <Users className="size-4" />
                  {t("adminDashboard.stats.usersCreated", { 
                    count: pagination?.total ?? employees.length 
                  })}
                </Badge>
                <Badge variant="outline" className="gap-2 py-2 px-4 text-xs border-neutral-50 text-neutral-80">
                  {t("adminDashboard.stats.adminHint", {
                    email: DEFAULT_ADMIN_EMAIL,
                    password: DEFAULT_ADMIN_PASSWORD,
                  })}
                </Badge>
              </div>
            </div>

            <Card className="w-full lg:max-w-sm border-neutral-40 bg-neutral-20/50 dark:bg-neutral-110/50 dark:border-neutral-90 backdrop-blur-sm rounded-xl">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center justify-center size-10 rounded-lg bg-secondary-10">
                    <UserPlus className="size-5 text-secondary" />
                  </div>
                  <div>
                    <CardTitle className="text-base font-semibold text-neutral-110 dark:text-neutral-10">
                      {t("adminDashboard.createUser.title")}
                    </CardTitle>
                    <CardDescription className="text-xs mt-0.5 text-neutral-80 dark:text-neutral-60">
                      {t("adminDashboard.createUser.description")}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <RegisterUserForm />
              </CardContent>
            </Card>
          </div>

          <div className="relative mt-6 pt-4 border-t border-neutral-40 dark:border-neutral-90 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 text-error-30  hover:text-error hover:bg-error-10 transition-all"
              onClick={handleLogout}
            >
              <LogOut className="size-4" />
              {t("common.logout")}
            </Button>
          </div>
        </CardContent>
      </Card>

      {isLoading ? (
        <Card className="border-neutral-40 bg-neutral-10 dark:bg-neutral-100 dark:border-neutral-90 rounded-xl">
          <CardContent className="py-16">
            <div className="flex flex-col items-center justify-center gap-4">
              <Spinner className="size-8 text-primary" />
              <p className="text-sm text-neutral-80 dark:text-neutral-60">
                {t("common.loading")}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : users.length === 0 ? (
        <Card className="border-dashed border-2 border-neutral-50 bg-neutral-20/30 dark:bg-neutral-110/30 rounded-xl">
          <CardContent className="py-16">
            <Empty>
              <EmptyMedia>
                <div className="flex items-center justify-center size-20 rounded-full bg-neutral-30 dark:bg-neutral-90">
                  <UsersRound className="size-10 text-neutral" />
                </div>
              </EmptyMedia>
              <EmptyHeader>
                <EmptyTitle className="text-neutral-100 dark:text-neutral-20">
                  {t("adminDashboard.emptyState.title")}
                </EmptyTitle>
                <EmptyDescription className="text-neutral-70">
                  {t("adminDashboard.emptyState.description")}
                </EmptyDescription>
              </EmptyHeader>
            </Empty>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {pagination && pagination.pages > 1 && (
            <Card className="border-neutral-40 bg-neutral-10 dark:bg-neutral-100 dark:border-neutral-90 rounded-xl">
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="text-sm text-neutral-80 dark:text-neutral-60">
                    {t("adminDashboard.pagination.showing", {
                      from: (pagination.page - 1) * pagination.limit + 1,
                      to: Math.min(pagination.page * pagination.limit, pagination.total),
                      total: pagination.total,
                    })}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={!pagination.hasPrev || isLoading}
                      className="gap-2"
                    >
                      <ChevronRight className="size-4" />
                      {t("common.previous")}
                    </Button>
                    <div className="flex items-center gap-1 px-3">
                      <span className="text-sm text-neutral-80 dark:text-neutral-60">
                        {t("adminDashboard.pagination.page", {
                          current: pagination.page,
                          total: pagination.pages,
                        })}
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPage((p) => Math.min(pagination.pages, p + 1))}
                      disabled={!pagination.hasNext || isLoading}
                      className="gap-2"
                    >
                      {t("common.next")}
                      <ChevronLeft className="size-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
