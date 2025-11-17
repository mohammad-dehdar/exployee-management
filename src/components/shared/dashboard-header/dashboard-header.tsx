'use client';

import { LogoutIcon } from '@icons';
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/utils/ui';

export interface DashboardHeaderProps {
  greeting: string;
  description: string;
  badge: string;
  badgeClass: string;
}

export const DashboardHeader = ({ greeting, description, badge, badgeClass }: DashboardHeaderProps) => {
  const { logout, isLoggingOut } = useAuth();

  return (
    <header className="rounded-3xl border border-neutral-40/40 bg-neutral-10/80 p-6 text-neutral-90 shadow-lg backdrop-blur-md dark:border-neutral-80/60 dark:bg-neutral-110/60 dark:text-neutral-10">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <p className="text-sm text-neutral-70 dark:text-neutral-40">خوش آمدید</p>
          <h1 className="text-2xl font-semibold leading-tight">{greeting}</h1>
          <p className="text-sm text-neutral-70 dark:text-neutral-40">{description}</p>
        </div>

        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center">
          <span
            className={cn(
              'inline-flex items-center justify-center rounded-full bg-neutral-20/80 px-5 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-80 dark:bg-neutral-90/30 dark:text-neutral-10',
              badgeClass,
            )}
          >
            {badge}
          </span>

          <Button
            color="error"
            variant="outline"
            className="button-text-sm border-neutral-30/70 bg-white/70 text-neutral-80 backdrop-blur transition hover:border-error-30 hover:bg-error-10 hover:text-error-50 dark:border-neutral-70 dark:bg-neutral-90/40 dark:text-neutral-10"
            startIcon={<LogoutIcon className="size-4" />}
            onClick={() => logout()}
            isLoading={isLoggingOut}
          >
            خروج از حساب
          </Button>
        </div>
      </div>
    </header>
  );
};
