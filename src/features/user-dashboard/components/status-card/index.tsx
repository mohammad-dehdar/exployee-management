'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profileSections } from "../../constants";
import { cn } from "@/utils/ui";

interface StatusCardProps {
  personal?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  job?: Record<string, unknown>;
}

export function StatusCard({ personal, contact, job }: StatusCardProps) {
  return (
    <Card className="rounded-3xl border border-border/60 bg-card/80 shadow-sm backdrop-blur">
      <CardHeader className="px-5 pt-5">
        <CardTitle className="text-base font-semibold text-foreground">
          وضعیت هر بخش
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          با تکمیل هر بخش، وضعیت به‌صورت خودکار به‌روز می‌شود.
        </p>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-3">
          {profileSections.map((section, index) => {
            const isDone = Boolean(
              index === 0
                ? personal && Object.keys(personal).length
                : index === 1
                ? contact && Object.keys(contact).length
                : job && Object.keys(job).length
            );
            return (
              <div
                key={section.title}
                className="flex items-center justify-between rounded-2xl border border-border/40 bg-background/60 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {section.title}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {section.description}
                  </p>
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-semibold",
                    isDone
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-100"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {isDone ? "تکمیل شد" : "در انتظار"}
                </span>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
