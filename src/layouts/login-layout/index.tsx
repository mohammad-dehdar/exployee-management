'use client';

import { PropsWithChildren } from "@/types/children"

export default function LoginLayout({ children }: PropsWithChildren) {
  return (
    <main className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-5 text-neutral-110 dark:bg-neutral-120 dark:text-neutral-10">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -right-32 -top-32 h-[32rem] w-[32rem] rounded-full bg-primary-20 blur-[160px] dark:bg-primary/40" />
        <div className="absolute -left-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-secondary-10 blur-[150px] dark:bg-secondary/40" />
        <div className="absolute inset-0 opacity-40">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.45),_transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.6),_transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(17,24,39,0.08)_0%,rgba(255,255,255,0.05)_60%,transparent_100%)] dark:bg-[linear-gradient(120deg,rgba(255,255,255,0.04)_0%,rgba(148,163,184,0.04)_60%,transparent_100%)]" />
        </div>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[32px] border border-neutral-40/60 bg-neutral-10/70 p-6 shadow-[0_35px_120px_-45px_rgba(15,23,42,0.65)] backdrop-blur-2xl dark:border-neutral-90/70 dark:bg-neutral-110/70 sm:p-8">
          <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent dark:via-primary/60" />
          <div className="pointer-events-none absolute inset-y-10 left-0 w-px bg-linear-to-b from-transparent via-secondary/30 to-transparent" />
          <div className="relative space-y-6">{children}</div>
        </div>
      </div>
    </main>
  )
}

