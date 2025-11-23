'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SummaryItem } from "../../types";

interface ProfileSummaryCardProps {
  summary: SummaryItem[];
}

export function ProfileSummaryCard({ summary }: ProfileSummaryCardProps) {
  const t = useTranslations('userDashboard');
  
  return (
    <Card className="rounded-3xl border border-border/60 bg-card/80 shadow-sm backdrop-blur">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-lg font-semibold text-foreground mb-4">
          {t('profileSummaryCard.title')}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid gap-3 sm:grid-cols-2">
          {summary.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-border/30 bg-background/70 px-4 py-3"
            >
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="mt-1 text-sm font-medium text-foreground">
                {item.value}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
