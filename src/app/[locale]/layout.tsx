import type { Metadata } from 'next';
import '@/styles/globals.scss';

import { NextIntlClientProvider } from 'next-intl';
import { JetBrains_Mono } from 'next/font/google';

import { AntdRegistry } from '@ant-design/nextjs-registry';

export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'API test app',
};

const jetBrainsMono = JetBrains_Mono({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  display: 'swap',
});

interface RootLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<RootLayoutProps>) {
  return (
    <html lang={locale}>
      <body className={jetBrainsMono.className}>
        <NextIntlClientProvider locale={locale}>
          <AntdRegistry>{children}</AntdRegistry>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
