'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ReactNode } from "react"
import { cn } from "@/utils/ui"

interface FormSectionWrapperProps {
    sectionKey: string; // e.g., 'personal', 'contact', 'job'
    emoji: string | ReactNode;
    children: ReactNode;
    contentLayout?: 'grid' | 'stack'; // grid for 2-column layout, stack for vertical
    borderColor?: 'primary' | 'amber';
}

export const FormSectionWrapper = ({
  sectionKey,
  emoji,
  children,
  contentLayout = "grid",
  borderColor = "primary",
}: FormSectionWrapperProps) => {
  const t = useTranslations(`userForm.sections.${sectionKey}`)

  const borderClass =
    borderColor === "amber"
      ? "border border-amber-300/70 dark:border-amber-500/50"
      : "border border-primary/30 dark:border-primary/50"

  const contentClass = cn(
    "relative z-10",
    contentLayout === "grid" ? "grid gap-6 px-6 pb-6 md:grid-cols-2" : "space-y-6 px-6 pb-6",
  )

  return (
    <Card className={`relative overflow-hidden rounded-2xl ${borderClass} bg-neutral-10/80 p-0 shadow-lg backdrop-blur-xl dark:bg-neutral-110`}>
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -right-16 -top-20 size-52 rounded-full bg-primary-10 blur-[120px]" />
        <div className="absolute -left-20 -bottom-16 size-60 rounded-full bg-secondary-10 blur-[120px]" />
      </div>

      <CardHeader className="relative z-10 space-y-2 px-6 pt-6">
        <CardTitle className="flex items-center gap-3 text-xl font-bold text-neutral-110 dark:text-neutral-10">
          <span>{t("title")}</span>
          <span className="flex size-10 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-primary-60 text-lg shadow-md">
            {emoji}
          </span>
        </CardTitle>
        <CardDescription className="text-sm text-neutral-70 dark:text-neutral-40">{t("description")}</CardDescription>
      </CardHeader>

      <CardContent className={contentClass}>{children}</CardContent>
    </Card>
  )
};

// Export dir hook for use in child components
export const useFormSectionDir = () => {
    const locale = useLocale();
    return locale === 'fa' ? 'rtl' : 'ltr';
};

// Re-export SelectField
export { SelectField } from './select-field';

