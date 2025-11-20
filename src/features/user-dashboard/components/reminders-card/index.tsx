'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { reminders } from "../../constants";

export function RemindersCard() {
  return (
    <Card className="rounded-3xl border border-border/70 bg-card/80 shadow-sm">
      <CardHeader className="px-6 pt-6">
        <CardTitle className="text-lg font-semibold text-foreground">
          یادآوری‌ها
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 px-6 pb-6 sm:grid-cols-2 lg:grid-cols-3">
        {reminders.map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-border/40 bg-background/70 px-4 py-4 text-sm leading-6"
          >
            <p className="text-xs text-muted-foreground">{item.title}</p>
            <p className="mt-2 text-sm font-medium text-foreground">
              {item.value}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
