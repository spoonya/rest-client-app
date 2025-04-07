'use client';

import { useTranslations } from 'next-intl';
import { useRouter, useSelectedLayoutSegment } from 'next/navigation';

import { useAuth } from '@/hooks';
import { supabase } from '@/lib';
import { AppRoutes } from '@/services';
import { Link } from '@heroui/react';

import { Logo } from '../ui';
import { AuthButtons } from './AuthButtons';
import { LocaleSwitcher } from './LocaleSwitcher';

export function Navigation() {
  const t = useTranslations('Navigation');
  const segment = useSelectedLayoutSegment();
  const user = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    supabase.auth.signOut();
    router.replace(AppRoutes.HOME);
  };

  return (
    <div className="sticky top-0 z-50">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2 max-w-fit">
            <Link
              href={AppRoutes.HOME}
              className="flex items-center gap-2 transition-all duration-300 hover:opacity-80"
            >
              <Logo className="h-9 w-9" />
              <span className="font-bold text-slate-800 text-lg">Apicorn</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <LocaleSwitcher />
            </div>
            {segment === AppRoutes.SIGN_IN.slice(1) ||
            segment === AppRoutes.SIGN_UP.slice(1) ||
            user ? (
              <>
                <Link
                  href={AppRoutes.HOME}
                  className="px-3 py-2 text-slate-600 hover:text-blue-600 transition-all duration-300 ease-in-out"
                >
                  {t('home')}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-red-600 hover:text-red-700 transition-all duration-300 ease-in-out"
                >
                  {t('Sign Out')}
                </button>
              </>
            ) : (
              <AuthButtons />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
