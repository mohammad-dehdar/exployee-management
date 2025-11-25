"use client"

import Link from "next/link"
import { useTranslations } from "next-intl"
import type { UserRecord } from "@/schemas/user.schema"
import { translateOption } from "@/utils/option-helpers"
import { Mail, Phone, Briefcase, ChevronLeft } from "lucide-react"
import { AvatarFallback, Badge, Card, CardContent, Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui"
import { Avatar } from "@radix-ui/react-avatar"

export const UserCard = ({ user }: { user: UserRecord }) => {
  const t = useTranslations("adminDashboard.userCard")
  const tOptions = useTranslations("options")

  const initials = `${user.personal.firstName?.[0] ?? ""}${user.personal.lastName?.[0] ?? ""}`.toUpperCase() || "؟"

  return (
    <Link href={`/admin-dashboard/users/${user.id}`}>
      <TooltipProvider>
        <Card className="group relative cursor-pointer overflow-hidden rounded-xl border border-neutral-40 bg-neutral-10 transition-all duration-300 hover:-translate-y-1 hover:border-primary-30 hover:shadow-lg dark:bg-neutral-100 dark:border-neutral-90">
          <div className="absolute inset-0 bg-linear-to-br from-primary-10/50 via-transparent to-secondary-10/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          <CardContent className="relative p-5">
            <div className="flex items-start gap-4">
              <Avatar className="size-12 border-2 border-primary-20 shadow-sm transition-transform duration-300 group-hover:scale-105">
                <AvatarFallback className="bg-primary-10 text-primary font-bold text-sm">{initials}</AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h2 className="text-base font-semibold text-neutral-110 dark:text-neutral-10 truncate">
                    {user.personal.firstName} {user.personal.lastName}
                  </h2>
                  <ChevronLeft className="size-4 text-neutral opacity-0 -translate-x-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 group-hover:text-primary" />
                </div>

                <div className="flex items-center gap-2">
                  <Briefcase className="size-3.5 text-neutral" />
                  <p className="text-sm text-neutral-80 dark:text-neutral-60 truncate">
                    {translateOption("position", user.job.position, tOptions, t("position"))}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <Badge className="text-xs font-medium bg-secondary-10 text-secondary-80 hover:bg-secondary-20 dark:bg-secondary-90 dark:text-secondary-20">
                {translateOption("contractType", user.job.contractType, tOptions, t("contract"))}
              </Badge>
            </div>

            <div className="mt-4 pt-4 border-t border-neutral-40 dark:border-neutral-90 flex items-center justify-between gap-3 text-xs text-neutral-80 dark:text-neutral-60">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 truncate max-w-[60%] hover:text-primary transition-colors">
                    <Mail className="size-3.5 shrink-0" />
                    <span className="truncate">{user.contact.personalEmail || t("orgEmail")}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-neutral-100 text-neutral-10">
                  {user.contact.personalEmail || t("orgEmail")}
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-1.5 hover:text-primary transition-colors">
                    <Phone className="size-3.5 shrink-0" />
                    <span className="truncate">{user.contact.phone || t("phone")}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="bg-neutral-100 text-neutral-10">
                  {user.contact.phone || t("phone")}
                </TooltipContent>
              </Tooltip>
            </div>
          </CardContent>
        </Card>
      </TooltipProvider>
    </Link>
  )
}
