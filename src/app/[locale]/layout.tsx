import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import RootLayout from '@/layouts/root-layout'
import { PropsWithChildren } from '@/types/children'

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren & {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  type AppLocale = (typeof routing)["locales"][number]

  const isAppLocale = (value: string): value is AppLocale => routing.locales.includes(value as AppLocale)

  if (!isAppLocale(locale)) {
    notFound()
  }

  const messages = await getMessages()

  return (
    <NextIntlClientProvider messages={messages}>
      <RootLayout locale={locale}>{children}</RootLayout>
    </NextIntlClientProvider>
  )
}

