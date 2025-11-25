'use client';

import { PropsWithChildren } from "@/types/children"

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <section className="relative isolate flex min-h-screen w-full justify-center overflow-hidden bg-neutral-5 text-neutral-110 dark:bg-neutral-120 dark:text-neutral-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 left-1/3 h-144 w-xl -translate-x-1/2 rounded-full bg-primary-10 blur-[190px] dark:bg-primary/40" />
        <div className="absolute bottom-0 right-0 h-128 w-lg translate-x-1/3 rounded-full bg-secondary-10 blur-[180px] dark:bg-secondary/40" />
        <div className="absolute inset-0 opacity-35">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.4),transparent_70%)] dark:bg-[radial-gradient(circle_at_top,rgba(15,23,42,0.6),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(15,23,42,0.08)_0%,rgba(148,163,184,0.04)_50%,transparent_100%)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.04)_0%,rgba(148,163,184,0.04)_60%,transparent_100%)]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 lg:px-10">
        <div className="relative overflow-hidden rounded-[36px] border border-neutral-40/60 bg-neutral-10/70 p-6 shadow-[0_45px_140px_-60px_rgba(15,23,42,0.7)] backdrop-blur-2xl dark:border-neutral-90/60 dark:bg-neutral-110/70 sm:p-10">
          <div className="pointer-events-none absolute inset-x-12 top-0 h-[2px] bg-linear-to-r from-transparent via-primary/30 to-transparent dark:via-primary/50" />
          <div className="pointer-events-none absolute inset-y-12 right-0 w-px bg-linear-to-b from-transparent via-secondary/25 to-transparent" />
          <div className="relative space-y-6">{children}</div>
        </div>
      </div>
    </section>
  )
}

