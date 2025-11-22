'use client';

import { dana, poppins } from '@/config/fonts/fonts';
import { env } from '@/config/env';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@/components/feedback';
import { QueryClientProviderWrapper } from '@/providers/QueryClientProviderWrapper';
import { ThemeSwitcher, LanguageSwitcher } from '@/components/shared';
import Script from 'next/script';
import { PropsWithChildren } from '@/types/children';

export default function RootLayout({
  children,
  locale = 'fa',
}: PropsWithChildren & {
  locale?: string;
}) {
  const isRTL = locale === 'fa';
  const lang = locale;

  return (
    <html
      className={` ${dana.variable} ${poppins.variable} `}
      lang={lang}
      dir={isRTL ? 'rtl' : 'ltr'}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen bg-gradient-to-br from-slate-50 via-sky-50 to-indigo-100 text-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        {env.NODE_ENV === 'development' && (
          <Script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
            strategy="afterInteractive"
          />
        )}
        <QueryClientProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative min-h-screen overflow-hidden">
              <div className="pointer-events-none absolute inset-0 opacity-60">
                <div className="absolute -left-16 top-6 h-64 w-64 rounded-full bg-sky-300 blur-3xl dark:bg-sky-500/30" />
                <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-indigo-300 blur-3xl dark:bg-indigo-500/30" />
              </div>
              <div className="relative z-10 pb-14">
                {children}
                <div className='fixed bottom-6 right-6 flex items-baseline gap-3'>
                  <LanguageSwitcher />
                  <ThemeSwitcher variant='icon' className='rounded-full bg-white/80 shadow-lg backdrop-blur dark:bg-slate-800/70' />
                </div>
                <ToastProvider />
              </div>
            </div>
          </ThemeProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
