'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface HeroCardProps {
  completionPercent: number;
  handleLogout: () => void;
}


export function HeroCard({ completionPercent, handleLogout }: HeroCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-emerald-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-cyan-400 blur-3xl" />
      </div>
      <CardHeader className="relative z-10 px-6 pt-6">
        <p className="text-sm text-white/70">داشبورد منابع انسانی</p>
        <CardTitle className="mt-2 text-3xl font-semibold leading-10">
          {completionPercent === 100
            ? "اطلاعات شما کامل است."
            : "پروفایل شما در انتظار تکمیل است."}
        </CardTitle>
        <p className="mt-2 text-sm text-white/70 leading-6">
          لطفاً مراحل تکمیل اطلاعات را به‌صورت کامل انجام دهید تا پرونده‌ی شما
          برای HR آماده شود.
        </p>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col gap-5 px-6 pb-6">
        <div>
          <div className="flex items-center justify-between text-xs text-white/70">
            <span>درصد تکمیل</span>
            <span>%{completionPercent}</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-white transition-all"
              style={{ width: `${Math.max(completionPercent, 10)}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between gap-4">
          <Button
            as="link"
            href="/user-dashboard/user-form"
            className="w-5/6 rounded-lg bg-white/15 py-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-primary/25"
          >
            تکمیل پروفایل کاربری
          </Button>
          <Button variant="fill" color="error" className="w-1/6 py-5 bg-white/15 rounded-lg text-sm text-muted-foreground backdrop-blur hover:bg-error/25" onClick={handleLogout}>
            خروج از حساب
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
