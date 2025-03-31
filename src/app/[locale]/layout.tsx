import type { Metadata } from 'next';
import '@/styles/globals.css';
// import cn from 'classnames';
import { hasLocale, Locale, NextIntlClientProvider } from 'next-intl';
import { JetBrains_Mono } from 'next/font/google';
import { setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';
import { Providers } from '../providers';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';

export const metadata: Metadata = {
  title: 'Rest Client App',
  description: 'API test app',
};

const jetBrainsMono = JetBrains_Mono({
  weight: ['300', '400', '500', '600', '700', '800'],
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

// export default function RootLayout({
//   children,
//   params: { locale },
// }: Readonly<RootLayoutProps>) {
//   return (
//     <html lang={locale}>
//       <body className={jetBrainsMono.className}>
//         <NextIntlClientProvider locale={locale}>
//           <AntdRegistry>{children}</AntdRegistry>
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }

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
          <NextIntlClientProvider>
            <div className='w-full h-screen flex flex-col justify-between'>
            <Header />
            {children}
            <Footer/>
            </div>
            </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
