import type { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
    return (
        <div className="relative min-h-svh bg-linear-to-br from-neutral-20 via-neutral-10 to-secondary-10 px-4 py-10 dark:from-neutral-100 dark:via-neutral-110 dark:to-neutral-120 sm:px-8">
            <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
                {children}
            </div>
        </div>
    );
}
