'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuthStore } from "@/features/auth";
import { useRouter } from "@/i18n/routing";

interface HeroCardProps {
  completionPercent: number;
}

export function HeroCard({ completionPercent }: HeroCardProps) {
  const router = useRouter();
  const {logout} = useAuthStore();
  const handleLogout = () => {
    logout();
    router.replace("/");
  };
  return (
    <Card className="relative overflow-hidden rounded-3xl border border-border/60 bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-xl">
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -left-10 top-10 h-48 w-48 rounded-full bg-emerald-400 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-48 w-48 rounded-full bg-cyan-400 blur-3xl" />
      </div>
      <CardHeader className="relative z-10 p-6 mb-4">
        <CardTitle className="mt-2 text-2xl font-semibold leading-10">
          {completionPercent === 100
            ? "اطلاعات شما کامل است."
            : "پروفایل شما در انتظار تکمیل است."}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col gap-5 px-6 pb-6">
        <div>
          <div className="flex items-center justify-between text-xs text-white/70">
            <span>درصد تکمیل</span>
            <span>%{completionPercent}</span>
          </div>
          <div className="mt-2 h-2 rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-success transition-all"
              style={{ width: `${Math.max(completionPercent, 10)}%` }}
            />
          </div>
        </div>
       <div className="flex flex-col md:flex-row items-center justify-between gap-4">
       <Button
          as="link"
          href="/user-dashboard/user-form"
          className="w-full md:w-5/6 rounded-lg md:rounded-2xl bg-white/15  py-3 md:py-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-primary/25"
        >
          تکمیل پروفایل کاربری
        </Button>
        <Button variant="fill" color="error" className="w-full md:w-1/6 rounded-lg md:rounded-2xl bg-white/15 py-3 md:py-5 text-sm font-semibold text-white backdrop-blur transition hover:bg-error/25" onClick={handleLogout}>
          خروج از حساب
        </Button>
       </div>
      </CardContent>
    </Card>
  );
}
