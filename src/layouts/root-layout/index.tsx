'use client';

import { dana, poppins } from "@/config/fonts/fonts"
import { env } from "@/config/env"
import { ThemeProvider } from "next-themes"
import { ToastProvider } from "@/components/feedback"
import { QueryClientProviderWrapper } from "@/providers/QueryClientProviderWrapper"
import { ThemeSwitcher, LanguageSwitcher } from "@/components/shared"
import Script from "next/script"
import { PropsWithChildren } from "@/types/children"

export default function RootLayout({
  children,
  locale = "fa",
}: PropsWithChildren & {
  locale?: string
}) {
  const isRTL = locale === "fa"
  const lang = locale

  return (
    <html
      className={` ${dana.variable} ${poppins.variable} `}
      lang={lang}
      dir={isRTL ? "rtl" : "ltr"}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-neutral-5 text-neutral-110 antialiased transition-colors duration-300 dark:bg-neutral-120 dark:text-neutral-10">
        {env.NODE_ENV === "development" && (
          <Script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" strategy="afterInteractive" />
        )}
        <QueryClientProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative min-h-screen overflow-hidden">
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute -top-48 left-[18%] h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary-20 blur-[180px] dark:bg-primary/30" />
                <div className="absolute bottom-0 right-0 h-[38rem] w-[38rem] translate-x-1/4 rounded-full bg-secondary-10 blur-[200px] dark:bg-secondary/30" />
                <div className="absolute inset-0 opacity-50">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.6),_transparent_65%)] dark:bg-[radial-gradient(circle_at_top,_rgba(15,23,42,0.7),_transparent_70%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(15,23,42,0.08)_0%,rgba(148,163,184,0.05)_45%,transparent_90%)] dark:bg-[linear-gradient(115deg,rgba(255,255,255,0.04)_0%,rgba(148,163,184,0.05)_55%,transparent_95%)]" />
                </div>
              </div>
              <div className="relative z-10 flex min-h-screen flex-col">
                <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent dark:via-primary/40" />
                <div className="relative flex-1">
                  {children}
                  <div className="fixed bottom-6 right-6 flex items-center gap-3 rounded-full border border-neutral-40/40 bg-neutral-10/70 px-3 py-2 shadow-xl backdrop-blur-lg dark:border-neutral-90/60 dark:bg-neutral-110/60">
                    <LanguageSwitcher />
                    <ThemeSwitcher variant="icon" className="rounded-full bg-neutral-20/80 p-2 shadow-lg dark:bg-neutral-100/60" />
                  </div>
                </div>
                <ToastProvider />
              </div>
            </div>
          </ThemeProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  )
}
