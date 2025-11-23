'use client';

import * as React from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/utils/ui';

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
  const t = useTranslations('userDashboard');

  return (
    <div
      className={cn(
        'mt-4 items-center justify-between rounded-2xl border border-border/40 bg-background/60 px-4 py-3',
        className
      )}
    >
      <div className="relative">
        <div>
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-medium text-foreground">
              {t(titleKey)}
            </p>
            <span
              className={cn(
                'rounded-sm md:px-2 md:py-0.5 text-xs px-2 py-1 text-[8px] md:text-xs font-semibold',
                isCompleted
                  ? 'bg-success-20 text-success-40 dark:bg-success-50/20'
                  : 'bg-warning-20 text-warning-40'
              )}
            >
              {isCompleted
                ? completedText || t('statusCard.completed')
                : pendingText || t('statusCard.pending')}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            {t(descriptionKey)}
          </p>
        </div>
      </div>
    </div>
  );
}

