'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function RemindersCard() {
  const t = useTranslations('userDashboard');
  
  const reminders = [
    { key: 'prepareDocs' as const },
    { key: 'uploadDocs' as const },
    { key: 'hrSupport' as const },
  ];

  return (
    <Card className="rounded-3xl border border-border/70 bg-card/80 shadow-sm">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-lg font-semibold text-foreground">
          {t('remindersCard.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 px-6 pb-6 sm:grid-cols-2 lg:grid-cols-3">
        {reminders.map((item) => (
          <div
            key={item.key}
            className="rounded-2xl border border-border/40 bg-background/70 px-4 py-4 text-sm leading-6"
          >
            <p className="text-xs text-muted-foreground">
              {t(`reminders.${item.key}.title`)}
            </p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {t(`reminders.${item.key}.value`)}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
