'use client';

import { useMemo, useState, useEffect } from "react";
import { useAuthStore } from "@/store/store";
import { useRequireAuth } from "@/utils/route-guards";
import { StatusCard, ChangePasswordCard, HeroCard } from "./components";

export default function UserDashboardFeature() {
  const { profiles, currentUserId, getCompletionPercent } = useAuthStore()
  const { currentAccount: account } = useRequireAuth("user")

  const profile = currentUserId ? profiles[currentUserId] : undefined

  const safeProfile = useMemo(
    () =>
      profile ?? {
        id: account?.id ?? "pending",
        personal: {},
        contact: {},
        job: {},
        financial: {},
        education: {},
        workHistory: [],
        certificates: [],
        attachments: {},
        additional: {},
      },
    [profile, account],
  )

  const [completionPercent, setCompletionPercent] = useState(0)

  useEffect(() => {
    let cancelled = false

    const fetchCompletion = async () => {
      if (!currentUserId) {
        if (!cancelled) setCompletionPercent(0)
        return
      }

      const percent = await getCompletionPercent(currentUserId)
      if (!cancelled) {
        setCompletionPercent(percent)
      }
    }

    fetchCompletion()

    return () => {
      cancelled = true
    }
  }, [currentUserId, getCompletionPercent])

  if (!account) {
    return null
  }

  return (
    <div className="space-y-6">
      <section className="w-full min-w-0 rounded-2xl">
        <HeroCard completionPercent={completionPercent} />
      </section>

      <section className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-[2fr,1fr]">
        <div className="min-w-0">
          <StatusCard
            personal={safeProfile.personal}
            contact={safeProfile.contact}
            job={safeProfile.job}
            education={safeProfile.education}
            workHistory={safeProfile.workHistory}
            certificates={safeProfile.certificates}
            attachments={safeProfile.attachments}
            additional={safeProfile.additional}
          />
        </div>
        <div className="min-w-0">
          <ChangePasswordCard />
        </div>
      </section>
    </div>
  )
}