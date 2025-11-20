'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profileSections } from "../../constants";

export function NextStepsCard() {
  return (
    <Card className="rounded-3xl border border-dashed border-border/70 bg-muted/40 shadow-inner">
      <CardHeader className="px-5 pt-5">
        <CardTitle className="text-base font-semibold text-foreground">
          مراحل بعدی
        </CardTitle>
        <p className="text-xs text-muted-foreground">
          پس از تکمیل هر مرحله، برای شما اعلان ارسال می‌شود.
        </p>
      </CardHeader>
      <CardContent className="space-y-4 px-5 pb-5">
        {profileSections.map((step, idx) => (
          <div
            key={step.title}
            className="rounded-2xl border border-border/30 bg-background/60 px-4 py-3"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-full border border-border/50 text-sm font-semibold text-muted-foreground">
                {idx + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {step.title}
                </p>
                <p className="text-xs text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div className="rounded-2xl border border-transparent bg-emerald-500/10 px-4 py-3 text-xs leading-6 text-emerald-900 dark:text-emerald-100">
          پس از تکمیل اطلاعات، تیم HR وضعیت پرونده را بررسی و نتیجه را از طریق
          ایمیل اطلاع می‌دهد.
        </div>
      </CardContent>
    </Card>
  );
}
