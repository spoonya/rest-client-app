'use client';

import { useTranslations } from 'next-intl';

import { AppRoutes } from '@/services';
import { cn } from '@/utils';
import { Link } from '@heroui/react';

interface AuthButtonsProps {
  className?: string;
}

export function AuthButtons({ className }: AuthButtonsProps) {
  const t = useTranslations('Navigation');

  return (
    <div className={cn(className, 'flex items-center gap-4')}>
      <Link
        href={AppRoutes.SIGN_IN}
        className="px-3 py-2 text-slate-600 hover:text-blue-600 transition-all duration-300 ease-in-out"
      >
        {t('Sign In')}
      </Link>
      <Link
        href={AppRoutes.SIGN_UP}
        className="px-3 py-2 text-blue-600 hover:text-blue-700 transition-all duration-300 ease-in-out"
      >
        {t('Sign Up')}
      </Link>
    </div>
  );
}
