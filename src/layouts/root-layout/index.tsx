import type { Metadata, Viewport } from 'next';
import { dana, poppins } from '@/config/fonts/fonts';
import { env } from '@/config/env';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@/components/feedback';
import { QueryClientProviderWrapper } from '@/providers/QueryClientProviderWrapper';
import { ThemeSwitcher } from '@/components/shared';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Etmify',
  description: '',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      className={` ${dana.variable} ${poppins.variable} `}
      lang="fa"
      dir="rtl"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="antialiased">
        {env.NODE_ENV === 'development' && (
          <Script
            crossOrigin="anonymous"
            src="//unpkg.com/react-scan/dist/auto.global.js"
            strategy="afterInteractive"
          />
        )}
        <QueryClientProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <ThemeSwitcher variant='icon' className='absolute top-0  left-0' />
            <ToastProvider />
          </ThemeProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
