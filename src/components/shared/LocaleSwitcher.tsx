'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { routing } from '@/i18n/routing';
import { locales } from '@/services';
import { Locale } from '@/types';
import { Select, SelectItem } from '@heroui/react';

interface LocaleSwitcherProps {
  className?: string;
}

export const LocaleSwitcher = ({}: Readonly<LocaleSwitcherProps>) => {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = useLocale();
  const t = useTranslations('LocaleSwitcher');

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
    <Select
      className="max-w-lg"
      defaultSelectedKeys={[currentLocale]}
      label={t('label')}
      labelPlacement='outside-left'
      placeholder="Select lang"
    >
      {routing.locales.map((cur) => (
        <SelectItem key={cur} onPress={() => switchLocale(cur)}>
          {t('locale', { locale: cur })}
        </SelectItem>
      ))}
    </Select>
  );
};
