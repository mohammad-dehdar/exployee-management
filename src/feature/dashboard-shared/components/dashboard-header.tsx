import { cn } from "@/utils/ui";

interface DashboardHeaderProps {
    greeting: string;
    description: string;
    badge: string;
    badgeClass: string;
}

export const DashboardHeader = ({
    greeting,
    description,
    badge,
    badgeClass,
}: DashboardHeaderProps) => (
    <header className="rounded-3xl border border-neutral-40/40 bg-neutral-10/80 p-6 text-neutral-90 shadow-lg backdrop-blur-md dark:border-neutral-80/60 dark:bg-neutral-110/60 dark:text-neutral-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <p className="text-sm text-neutral-70 dark:text-neutral-40">خوش آمدید</p>
                <h1 className="text-2xl font-semibold">{greeting}</h1>
                <p className="mt-2 text-sm text-neutral-70 dark:text-neutral-40">
                    {description}
                </p>
            </div>
            <span
                className={cn(
                    "inline-flex items-center justify-center rounded-full px-5 py-1 text-xs font-semibold uppercase tracking-[0.3em]",
                    badgeClass
                )}
            >
                {badge}
            </span>
        </div>
    </header>
);
