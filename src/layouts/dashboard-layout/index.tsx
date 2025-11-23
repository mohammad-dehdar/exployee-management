'use client';

import { PropsWithChildren } from '@/types/children';

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <main className="mx-auto flex min-h-[70vh] w-full max-w-5xl flex-col gap-4 sm:gap-6 px-3 sm:px-4 md:px-5 py-6 sm:py-8 md:py-10 overflow-x-hidden">
      {children}
    </main>
  );
}

