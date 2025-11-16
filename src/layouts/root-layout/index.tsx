import type { Metadata } from 'next';
import { dana, poppins } from '@/config/fonts/fonts';
import { env } from '@/config/env';
import { ThemeProvider } from 'next-themes';
import { ToastProvider } from '@/components/feedback';
import { QueryClientProviderWrapper } from '@/providers/QueryClientProviderWrapper';

export const metadata: Metadata = {
  title: 'Etmify',
  description: '',
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
      <head>
        {env.NODE_ENV === 'development' && (
          <script crossOrigin="anonymous" src="//unpkg.com/react-scan/dist/auto.global.js" />
        )}
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body className="antialiased">
        <QueryClientProviderWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
            <ToastProvider />
          </ThemeProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
