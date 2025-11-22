import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import RootLayout from '@/layouts/root-layout';
import { PropsWithChildren } from '@/types/children';

export default async function LocaleLayout({
  children,
  params,
}: PropsWithChildren & {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as 'fa' | 'en' | 'de')) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <RootLayout locale={locale}>{children}</RootLayout>
    </NextIntlClientProvider>
  );
}

