'use client';

import { Button } from 'antd';
import cn from 'classnames';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { locales } from '@/i18n/routing';
import { AppRoutes } from '@/services';

import classes from './locale.switcher.module.scss';

import type { Locale } from '@/i18n/routing';
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
        .join('/') || AppRoutes.HOME;

    const newPath = `/${newLocale}${pathWithoutLocale}`;
    router.push(newPath);
  };

  return (
    <div className={cn(classes.switcher, className)}>
      {locales.map((locale) => (
        <Button
          key={locale}
          type={locale === currentLocale ? 'primary' : 'default'}
          onClick={() => switchLocale(locale)}
          disabled={locale === currentLocale}
        >
          {locale.toUpperCase()}
        </Button>
      ))}
    </div>
  );
};
