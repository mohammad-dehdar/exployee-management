'use client';

import * as React from 'react';
import { useTranslations } from "next-intl"
import { cn } from "@/utils/ui"

export interface StatusItemProps {
  /**
   * Translation key for the section title (e.g., 'sections.personal.title')
   */
  titleKey: string;
  
  /**
   * Translation key for the section description (e.g., 'sections.personal.description')
   */
  descriptionKey: string;
  
  /**
   * Whether the section is completed
   */
  isCompleted: boolean;
  
  /**
   * Additional CSS classes
   */
  className?: string;
  
  /**
   * Custom completion status text
   */
  completedText?: string;
  
  /**
   * Custom pending status text
   */
  pendingText?: string;
}

/**
 * StatusItem - A reusable component for displaying section status (completed/pending).
 * 
 * Used in status cards to show the completion state of different profile sections.
 * 
 * @example
 * ```tsx
 * <StatusItem
 *   titleKey="sections.personal.title"
 *   descriptionKey="sections.personal.description"
 *   isCompleted={!!personalData}
 * />
 * ```
 */
export function StatusItem({
  titleKey,
  descriptionKey,
  isCompleted,
  className,
  completedText,
  pendingText,
}: StatusItemProps) {
  const t = useTranslations("userDashboard")

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border border-neutral-40 bg-neutral-10/80 px-4 py-4 shadow-sm dark:border-neutral-90 dark:bg-neutral-110/70",
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute -right-10 -top-8 size-24 rounded-full bg-primary-10 blur-3xl" />
        <div className="absolute -left-10 -bottom-12 size-24 rounded-full bg-secondary-10 blur-3xl" />
      </div>

      <div className="relative flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-neutral-110 dark:text-neutral-10">{t(titleKey)}</p>
          <p className="text-xs text-neutral-70 dark:text-neutral-50">{t(descriptionKey)}</p>
        </div>
        <span
          className={cn(
            "rounded-full px-3 py-1 text-[11px] font-semibold shadow-sm",
            isCompleted
              ? "bg-success-10 text-success-50 ring-1 ring-success-30"
              : "bg-warning-10 text-warning-50 ring-1 ring-warning-30",
          )}
        >
          {isCompleted ? completedText || t("statusCard.completed") : pendingText || t("statusCard.pending")}
        </span>
      </div>
    </div>
  )
}

