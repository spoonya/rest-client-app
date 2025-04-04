import type { Metadata } from 'next';
import '@/app/globals.css';

import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { JetBrains_Mono } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { routing } from '@/i18n/routing';

import { Providers } from '../providers';

export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'API test app',
};

const jetBrainsMono = JetBrains_Mono({
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

type Props = {
  children: ReactNode;
  params: Promise<{ locale: Locale }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  setRequestLocale(locale);

  return (
    <html className="h-full" lang={locale}>
      <body className={jetBrainsMono.className}>
        <Providers>
          <NextIntlClientProvider>{children}</NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
