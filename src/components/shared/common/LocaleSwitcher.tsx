'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { locales } from '@/services';
import { Locale } from '@/types';
import { cn } from '@/utils';
import { Button } from '@heroui/react';

interface LocaleSwitcherProps {
  className?: string;
}

export const LocaleSwitcher = ({
  className,
}: Readonly<LocaleSwitcherProps>) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();

  const switchLocale = (newLocale: Locale) => {
    const segments = pathname.split('/');

    const pathWithoutLocale =
      segments
        .filter((segment, i) => i !== 1 || !locales.includes(segment as Locale))
        .join('/') || '/';

    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className={cn(className)}>
      {locales.map((locale) => (
        <Button
          key={locale}
          color={locale === currentLocale ? 'primary' : 'default'}
          onPress={() => switchLocale(locale)}
          disabled={locale === currentLocale}
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};
