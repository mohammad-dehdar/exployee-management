'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { profileSections } from "../../constants";
import { cn } from "@/utils/ui";

interface StatusCardProps {
  personal?: Record<string, unknown>;
  contact?: Record<string, unknown>;
  job?: Record<string, unknown>;
  education?: Record<string, unknown>;
  workHistory?: Array<{ company?: string; role?: string; [key: string]: unknown }>;
  certificates?: Array<{ title?: string; issuer?: string; [key: string]: unknown }>;
  attachments?: Record<string, unknown>;
  additional?: Record<string, unknown>;
}

export function StatusCard({ 
  personal, 
  contact, 
  job, 
  education, 
  workHistory, 
  certificates, 
  attachments, 
  additional 
}: StatusCardProps) {
  return (
    <Card className="rounded-xl border border-border/60 bg-card/80 shadow-sm backdrop-blur">
      <CardHeader className="px-5 pt-5">
        <CardTitle className="text-base font-semibold text-foreground">
          وضعیت هر بخش
        </CardTitle>
      </CardHeader>
      <CardContent className="px-5 pb-5">
        <div className="space-y-3">
          {profileSections.map((section, index) => {
            const isDone = Boolean(
              index === 0
                ? personal && Object.keys(personal).length
                : index === 1
                  ? contact && Object.keys(contact).length
                  : index === 2
                    ? job && Object.keys(job).length
                    : index === 3
                      ? education && Object.keys(education).length
                      : index === 4
                        ? workHistory && workHistory.length > 0 && workHistory.some((item) => Boolean(item.company || item.role))
                        : index === 5
                          ? certificates && certificates.length > 0 && certificates.some((item) => Boolean(item.title || item.issuer))
                          : index === 6
                            ? attachments && Object.keys(attachments).length
                            : additional && Object.keys(additional).length
            );
            return (
              <div
                key={section.title}
                className="mt-4 items-center justify-between rounded-2xl border border-border/40 bg-background/60 px-4 py-3"
              >
                <div className="relative">
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
                      "absolute -top-1 left-0 rounded-sm md:px-3 md:py-1 text-xs px-2 py-1 text-[8px] md:text-xs font-semibold",
                      isDone
                        ? "bg-success-20 text-success-40 dark:bg-success-50/20"
                        : "bg-warning-20 text-warning-40"
                    )}
                  >
                    {isDone ? "تکمیل شد" : "در انتظار"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
